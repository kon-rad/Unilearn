import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import { Container, RadioGroup, Radio, Stack, Button, Input, Box, VStack, Text, Textarea } from '@chakra-ui/react';
import { Question, QuestionLabel } from '../types';
import AnswerInput from '../components/answerInput';
import QuestionCrumbs from '../components/questionCrumbs';
import QuizReader from '../components/quizReader';
import { MAIN_COLOR_1, MAIN_COLOR_HOVER_1 } from '../utils/constants';
import { createQuiz, uploadQuizToIPFS } from '../services/createQuiz';
import { useWeb3React } from "@web3-react/core"

const QUESTION_LABELS = [1, 2, 3, 4, 5];
const DEFAULT_ANSWERS = ["", "", "", ""];
const QUESTION_TEMPLATE = {
    question: "",
    answers: [...DEFAULT_ANSWERS],
    answer: "",
}
const LAST_STAGE = 6;

const CreateQuiz: NextPage = () => {
    const [desc, setDesc] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [quizTitle, setQuizTitle] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>([...DEFAULT_ANSWERS]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [questionLabels, setQuestionLabels] = useState<QuestionLabel[]>([]);
    // todo: make type one of 0-4
    const [currentStage, setCurrentStage] = useState<number>(0);
    const [questionText, setQuestionText] = useState<string>("");

    const web3 = useWeb3React()

    useEffect(() => {
        const initQuestions = (new Array(4)).fill(null).map(() => {
            return ({...QUESTION_TEMPLATE})
        });
        setQuestions(initQuestions)
        setQuestionLabels(QUESTION_LABELS.map((label, i) => ({ label, isCompleted: false, isActive: i === 0 })))
    }, []);

    const handleAnswersUpdate = (data: string, index: number) => {
        const currAnswers = [...answers];
        currAnswers[index] = data;
        setAnswers(currAnswers);
    }
    const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionText(e.target.value)
    }
    const handleNext = () => {
        // update questions array with current question data
        const currQuestions = [...questions];
        const currQuestionIndex = currentStage - 1;
        currQuestions[currQuestionIndex] = {
            question: questionText,
            answer,
            answers,
        };
        // todo: validate that all fields are filled in and correct
        setQuestions(currQuestions);

        // update the question labels array
        const currQuestionLabels = [...questionLabels];
        currQuestionLabels[currQuestionIndex].isCompleted = true;
        currQuestionLabels[currQuestionIndex].isActive = false;
        // LAST_STAGE - 1 because currentStage is only updated at the bottom of this function
        if (currentStage < LAST_STAGE - 1) {
            currQuestionLabels[currentStage].isActive = true;
            // only load question form if on stage 1-5 (you're filling in questions 1-5)
            loadQuestionForm();
        } else {
            currQuestionLabels[currQuestionIndex].isCompleted = true;
        }
        setQuestionLabels(currQuestionLabels)
        setCurrentStage(currentStage === LAST_STAGE ? currentStage : currentStage + 1)
    }
    const loadQuestionForm = () => {
        const currQuestionIndex = currentStage - 1;
        setQuestionText(questions[currQuestionIndex].question);
        setAnswers([...questions[currQuestionIndex].answers]);
        setAnswer(questions[currQuestionIndex].answer);
    }
    const handleSubmit = async () => {
        // remove answers
        const questionsOnly = questions.map(({ question, answers }) => ({ question, answers }));
        const data: string = JSON.stringify({
            title: quizTitle,
            description: desc,
            questions: questionsOnly,
        });
        // combine answers into one string, e.g. 'ABCDA'
        const answers: string = questions.reduce((acc: string, curr: Question) => acc + curr.answer, '');
        if (answers.length !== 5) {
            alert("Error: a quiz must have five questions and answers");
            throw "Error: a quiz must have five questions and answers";
        }
        const url = await uploadQuizToIPFS(data);
        // for dev mode use hardcoded ipfs url
        // const url = " https://ipfs.infura.io/ipfs/QmcaCKWDrkB1JriLaWZRCXkYReBE5p1CJaA4eTyYwAw93v";

        if (web3.account && web3.library) {
            await createQuiz(web3.account, web3.library, url, answers);
        } else {
            alert("Error: user must have a connected wallet")
        }
    }
    const renderFirstStage = () => {
        return (
            <Box mb={4}>
                <Box mb={4}>
                    <Text fontSize="xl">Title</Text>
                    <Input
                        mb={4}
                        placeholder="What should the Quiz be called?"
                        value={quizTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuizTitle(e.target.value)}
                    />
                    <Text fontSize="xl">What is this Quiz on?</Text>
                    <Textarea 
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        isRequired
                        placeholder="Enter a link to an article here" />
                </Box>
                <Box mb={4}>
                    <Button
                        onClick={() => setCurrentStage(1)}
                        backgroundColor={MAIN_COLOR_1} 
                        _hover={{
                            background: MAIN_COLOR_HOVER_1,
                        }}
                        _active={{
                            background: MAIN_COLOR_HOVER_1,
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        )
    }
    const renderQuestionInputs = () => {
        return (
            <Box>
                <Box mb={4} p={4} border="1px" borderColor="gray.700" borderRadius="6">
                    <Text fontSize="xl">{desc}</Text>
                </Box>
                <Box mb={4}>
                    <Text fontSize="xl" mb="2">Questions:</Text>
                    <QuestionCrumbs questionLabels={questionLabels} />
                </Box>
                <Box mb={4}>
                    <Text fontSize="xl">What is the question?</Text>
                    <Input value={questionText} onChange={handleQuestionTextChange} placeholder="Think bite sized. Keep it under 500 characters" />
                </Box>
                <Box mb={4}>
                    {answers.map((val, i) => <AnswerInput key={`answer_${i}`} value={val} index={i} onChange={handleAnswersUpdate} />)}
                </Box>
                <Box mb={4}>
                    <Text fontSize="xl">What is the answer?</Text>
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
                    <Button
                        mr={4}
                        onClick={handleNext}
                        backgroundColor={MAIN_COLOR_1} 
                        _hover={{
                            background: MAIN_COLOR_HOVER_1,
                        }}
                        _active={{
                            background: MAIN_COLOR_HOVER_1,
                        }}
                    >
                            Next
                    </Button>
                    <Button onClick={() => setCurrentStage(currentStage - 1)}>Back</Button>
                </Box>
            </Box>
        )
    }
    const renderReviewSection = () => {
        return (
            <Box mb={4}>
                <Box mb={4}>
                    <Text fontSize="xl">Please Review Again Before Submitting!</Text>
                    <QuizReader answer={answer} desc={desc} questions={questions} />
                </Box>
                <Box mb={4}>
                    <Button
                        mr={4}
                        onClick={handleSubmit}
                        backgroundColor={MAIN_COLOR_1} 
                        _hover={{
                            background: MAIN_COLOR_HOVER_1,
                        }}
                        _active={{
                            background: MAIN_COLOR_HOVER_1,
                        }}
                    >
                        Submit
                    </Button>
                    <Button onClick={() => setCurrentStage(0)}>Edit</Button>
                </Box>
            </Box>
        )
    }
    const renderBody = () => {
        if (currentStage === 0) {
            return renderFirstStage();
        } else if (currentStage < LAST_STAGE) {
            return renderQuestionInputs();
        } else {
            return renderReviewSection();
        }
    }
  return (
    <Container>
        <Box mb={4} mt={2}>
            <VStack>
                <Text fontSize="3xl">Create a Quiz</Text>
                <Text fontSize="sm">Please note only authorized addresses are allowed to create a quiz</Text>
            </VStack>
        </Box>
        {renderBody()}
    </Container>
  )
}

export default CreateQuiz
