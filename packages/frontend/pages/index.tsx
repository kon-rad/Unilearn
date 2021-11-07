import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import logo from '../resources/images/logo.png';
import { Container, Box, VStack, Text } from '@chakra-ui/react';
import QuizPreview from '../components/quizPreview';
import { Quiz } from '../types';
// import { nftAddress, dlMarketAddress } from '../config';

// import NFT from '../artifacts/contracts/DLNFT.sol/DLNFT.json';
// import Market from '../artifacts/contracts/DLMarket.sol/DLMarket.json';

const mockQuiz = {
  title: "mock quiz",
  desc: "mock desc", 
  questions: [{"question":"asdf","answer":"A","answers":["f","f","f","f"]},{"question":"","answer":"","answers":["","","",""]},{"question":"","answer":"","answers":["","","",""]},{"question":"","answer":"","answers":["","","",""]}],
};

const Home: NextPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  useEffect(() => {
    setQuizzes([mockQuiz]);
  }, [])

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
        <Box mb={6} mt={2}>
          <Text fontSize="2xl">Step 1. 📜 Read an informative article about a specific topic</Text>
          <Text fontSize="2xl">Step 2. 📝 Take a short 5 question quiz</Text>
          <Text fontSize="2xl">Step 3. 💸 Earn NFTs and Unilearn Tokens!</Text>
        </Box>
        <Box>
          <div className="gallery">
            {quizzes.map(
              (quiz: any, i: number) =>
                <QuizPreview quiz={quiz} key={i} />
            )}
          </div>
        </Box>
      </Container>
    </div>
  )
}
// 📜 🤑
// 📚 📝  💸 🤑
export default Home
