import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Head from 'next/head'
import { Container, RadioGroup, Radio, Stack, Button, Input, Box, VStack, Text, Textarea } from '@chakra-ui/react';
import { Question, QuestionLabel } from '../types';
import AnswerInput from '../components/answerInput';
import QuestionCrumbs from '../components/questionCrumbs';
import QuizReader from '../components/quizReader';

// import { nftAddress, dlMarketAddress } from '../config';

// import NFT from '../artifacts/contracts/DLNFT.sol/DLNFT.json';
// import Market from '../artifacts/contracts/DLMarket.sol/DLMarket.json';

const QUESTION_TEMPLATE = {
    question: "",
    answers: {
        A: "",
        B: "",
        C: "",
        D: "",
    },
    answer: "",
}

const QUESTION_LABELS = [1, 2, 3, 4, 5];
const QUESTION_LABEL = { label: null, isCompleted: false};
const DEFAULT_ANSWERS = ["", "", "", ""];

const CreateQuiz: NextPage = () => {
    const [desc, setDesc] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>([...DEFAULT_ANSWERS]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [questionLabels, setQuestionLabels] = useState<QuestionLabel[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [questionText, setQuestionText] = useState<string>("");
    useEffect(() => {
        setQuestions(new Array(4).fill(QUESTION_TEMPLATE))
        setQuestionLabels(QUESTION_LABELS.map((label, i) => ({ label, isCompleted: false, isActive: i === 0 })))
    }, []);
    const handleAnswersUpdate = (data: string, index: number) => {
        const currAnswers = [...answers];
        currAnswers[index] = data;
        setAnswers(currAnswers);
    }
    const handleCorrectAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            return;
        }
        const val = e.target.value[0];
        setCorrectAnswer(val);
    }
    const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionText(e.target.value)
    }
    const handleNext = () => {
        const currQuestions = [...questions];
        currQuestions[currentQuestion] = {
            question: questionText,
            answer,
            answers,
        };
        // todo: validate that all fields are filled in and correct
        setQuestions(currQuestions);
        const currQuestionLabels = [...questionLabels];
        currQuestionLabels[currentQuestion - 1].isCompleted = true;
        currQuestionLabels[currentQuestion - 1].isActive = false;
        if (currentQuestion !== 5) {
            currQuestionLabels[currentQuestion].isActive = true;
        } else {
            currQuestionLabels[currentQuestion - 1].isCompleted = true;
        }
        setQuestionLabels(currQuestionLabels)
        setCurrentQuestion(currentQuestion === 5 ? currentQuestion : currentQuestion + 1)
        clearQuestionForm();
        if (currentQuestion === 5) {

        }
    }
    const clearQuestionForm = () => {
        setQuestionText("");
        setAnswers([...DEFAULT_ANSWERS]);
        setAnswer("");
    }
    const renderBody = () => {
        if (currentQuestion === 0) {
            return (
                <Box mb={4}>
                    <Box mb={4}>
                        <Text size="xl">What is this Quiz on?</Text>
                        <Textarea 
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            isRequired
                            placeholder="Enter a link to an article here" />
                    </Box>
                    <Box mb={4}>
                        <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</Button>
                    </Box>
                </Box>
            )
        } else if (currentQuestion < 5) {
            return (
                <Box>
                    <Box mb={4} p={4} border="1px" borderColor="gray.200" borderRadius="6">
                        <Text size="xl">{desc}</Text>
                    </Box>
                    <Box mb={4}>
                        <Text size="xl" mb="2">Questions:</Text>
                        <QuestionCrumbs questionLabels={questionLabels} currentQuestion={currentQuestion} />
                    </Box>
                    <Box mb={4}>
                        <Text size="xl">What is the question?</Text>
                        <Input value={questionText} onChange={handleQuestionTextChange} placeholder="Think bite sized. Keep it under 500 characters" />
                    </Box>
                    <Box mb={4}>
                        {answers.map((val, i) => <AnswerInput value={val} index={i} onChange={handleAnswersUpdate} />)}
                    </Box>
                    <Box mb={4}>
                        <Text size="xl">What is the answer?</Text>
                        <RadioGroup onChange={setAnswer} value={answer}>
                            <Stack direction="row">
                                <Radio value="A">A</Radio>
                                <Radio value="B">B</Radio>
                                <Radio value="C">C</Radio>
                                <Radio value="D">D</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                    <Box mb={4}>
                        <Button mr={4} onClick={handleNext}>Next</Button>
                        <Button onClick={() => setCurrentQuestion(currentQuestion - 1)}>Back</Button>
                    </Box>
                </Box>
            )
        } else {
            console.log("questions: ", questions);
            return (
                <Box mb={4}>
                    <Box mb={4}>
                        <Text size="xl">Please Review Again Before Submitting!</Text>
                        Quiz content here!!!!
                        <QuizReader questions={questions} />
                    </Box>
                    <Box mb={4}>
                        <Button onClick={() => console.log('submitted')}>Submit</Button>
                    </Box>
                </Box>
            )
        }
    }
  return (
    <Container>
        <Box mb={4} mt={2}>
            <VStack>
            <Text fontSize="3xl">Create a Quiz</Text>
            <Text fontSize="xl">Only authorized addresses</Text>
            </VStack>
        </Box>
        {renderBody()}
    </Container>
  )
}

export default CreateQuiz
