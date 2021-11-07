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

// import { nftAddress, dlMarketAddress } from '../config';

// import NFT from '../artifacts/contracts/DLNFT.sol/DLNFT.json';
// import Market from '../artifacts/contracts/DLMarket.sol/DLMarket.json';

const QUESTION_LABELS = [1, 2, 3, 4, 5];
const QUESTION_LABEL = { label: null, isCompleted: false};
const DEFAULT_ANSWERS = ["", "", "", ""];
const QUESTION_TEMPLATE = {
    question: "",
    answers: [...DEFAULT_ANSWERS],
    answer: "",
}

const CreateQuiz: NextPage = () => {
    const [desc, setDesc] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
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

    console.log("questions: ", questions);
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
        const currQuestionIndex = currentStage - 1;
        currQuestions[currQuestionIndex] = {
            question: questionText,
            answer,
            answers,
        };
        // todo: validate that all fields are filled in and correct
        setQuestions(currQuestions);
        const currQuestionLabels = [...questionLabels];
        currQuestionLabels[currQuestionIndex].isCompleted = true;
        currQuestionLabels[currQuestionIndex].isActive = false;
        if (currentStage !== 5) {
            currQuestionLabels[currentStage].isActive = true;
        } else {
            currQuestionLabels[currQuestionIndex].isCompleted = true;
        }
        setQuestionLabels(currQuestionLabels)
        setCurrentStage(currentStage === 5 ? currentStage : currentStage + 1)
        loadQuestionForm();
        if (currentStage === 5) {

        }
    }
    const loadQuestionForm = () => {
        const currQuestionIndex = currentStage - 1;
        setQuestionText(questions[currQuestionIndex].question);
        setAnswers([...questions[currQuestionIndex].answers]);
        setAnswer(questions[currQuestionIndex].answer);
    }
    const handleSubmit = async () => {
        // () => console.log('submitted: ', JSON.stringify(questions), quizTitle, desc)

        const questionsOnly = questions.map(({ question, answers }) => ({ question, answers }));
        const data: string = JSON.stringify({
            title: quizTitle,
            description: desc,
            questions: questionsOnly,
        });
        const answers: string = questions.reduce((acc: string, curr: Question) => acc + curr.answer, '');
        const url = await uploadQuizToIPFS(data);
        // for dev mode use hardcoded ipfs url
        // const url = " https://ipfs.infura.io/ipfs/QmcaCKWDrkB1JriLaWZRCXkYReBE5p1CJaA4eTyYwAw93v";

        console.log('ipfs url: ', url, 'data: ', data, answers);
        if (web3.account && web3.library) {
            console.log('calling create');
            await createQuiz(web3.account, web3.library, url, answers);
        } else {
            console.error("Error: user must have a connected wallet")
        }
    }
    const renderBody = () => {
        if (currentStage === 0) {
            return (
                <Box mb={4}>
                    <Box mb={4}>
                        <Text fontSize="xl">Title</Text>
                        <Input mb={4} placeholder="What should the Quiz be called?" value={quizTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuizTitle(e.target.value)}/>
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
        } else if (currentStage < 5) {
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
                        {answers.map((val, i) => <AnswerInput value={val} index={i} onChange={handleAnswersUpdate} />)}
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
        } else {
            console.log("questions: ", questions);
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
