import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Container, Box, VStack, Text } from '@chakra-ui/react';
import QuizPreview from '../components/quizPreview';
import { Quiz } from '../types';
import { getQuizzes, submitQuiz } from '../services/getQuizzes';
import { useWeb3React } from "@web3-react/core"
import QuizContent from '../components/quizContent';

const mockQuiz = {
  title: "mock quiz",
  desc: "mock desc", 
  questions: [{"question":"asdf","answer":"A","answers":["f","f","f","f"]},{"question":"","answer":"","answers":["","","",""]},{"question":"","answer":"","answers":["","","",""]},{"question":"","answer":"","answers":["","","",""]}],
};

const Home: NextPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizMetaData, setQuizMetaData] = useState<any>([]);
  const [showList, setShowList] = useState<boolean>(true);
  const [currentQuiz, setCurrentQuiz] = useState<any>();
  const [result, setResult] = useState<string>("");

  const web3 = useWeb3React()

  useEffect(() => {
    requestQuizzes();
  }, [])

  const requestQuizzes = async () => {
    const quizzesData = await getQuizzes();
    if (quizzesData && quizzesData.length === 2) {
      setQuizzes([...quizzesData[1]]);
      setQuizMetaData(quizzesData[0])
    }
  }

  const handleGoToQuiz = (tokenId: string) => {
    setShowList(false);
    setCurrentQuiz(tokenId);
  }
  const handleQuizSubmit = async (ans: string) => {
    const nftId = quizMetaData[currentQuiz][0];
    if (web3.library) {
      const res = await submitQuiz(nftId, ans, web3.library);
      setResult(res);
    } else {
      console.error("user must log in via metamask");
    }
  }
  const renderQuiz = () => {
    const quiz = quizzes[currentQuiz];
    return (
      <Box mt={4}>
        <Text textAlign="center" fontSize="3xl" mb="2">{quiz.title}</Text>
        <Text fontSize="xl" mb="2">{quiz.description}</Text>
        <QuizContent handleQuizSubmit={handleQuizSubmit} questions={quiz.questions} desc={quiz.description} answer={""} />
      </Box>
    )
  }
  const renderBody = () => {
    return (
      <>
        <Box mb={6} mt={2}>
          <Text fontSize="2xl">Step 1. 📜 Read an article about Uniswap</Text>
          <Text fontSize="2xl">Step 2. 📝 Take a short 5 question quiz</Text>
          <Text fontSize="2xl">Step 3. 💸 Earn NFTs and Unilearn Tokens!</Text>
        </Box>
        <Box>
            {showList ? quizzes.map(
              (quiz: any, i: number) =>
                <QuizPreview handleGoToQuiz={handleGoToQuiz} tokenId={quizMetaData[i] && quizMetaData[i][0]} quiz={quiz} key={i} quizIndex={i} />
            ) : renderQuiz()}
        </Box>
      </>
    )
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Unilearn</title>
        <meta name="description" content="Unilearn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Box mb={4} mt={2}>
          <VStack>
            <Box mb={4} mt={2}>
             <Text fontSize="3xl">🦄 A decentralized learning platform for Uniswap</Text>
            </Box>
          </VStack>
        </Box>
        <Box>
          {result ? (
            <Text fontSize="6xl">{result}</Text>
          ) : renderBody()}
        </Box>
      </Container>
    </div>
  )
}
export default Home
