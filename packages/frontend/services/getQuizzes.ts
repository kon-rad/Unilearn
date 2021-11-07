import { Web3Provider } from '@ethersproject/providers'
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ethers } from 'ethers';
import { unilearnNFTAddress, unilearnAddress } from '../config';
import axios from 'axios';
import NFT from '../artifacts/contracts/UnilearnNFT.sol/UnilearnNFT.json';
import Unilearn from '../artifacts/contracts/Unilearn.sol/Unilearn.json';

// todo: set quiz type
export const getQuizzes = async (): Promise<any| undefined> => {
    const provider = new ethers.providers.JsonRpcProvider();

    const unilearnContract = new ethers.Contract(
        unilearnAddress,
        Unilearn.abi,
        provider
    )

    const quizzes = await unilearnContract.getAllQuizzes();
    
    // filter out any tokens with no ID
    const filteredQuizzes = quizzes.filter((q: any) => Boolean(q[0]))
    console.log('data :D : ', JSON.stringify(filteredQuizzes));
    const quizzesContent = await Promise.all(
        filteredQuizzes
            .map((elem: any) => getQuizContent(elem, unilearnContract))
    );
  
    return [filteredQuizzes, quizzesContent];
}

const getQuizContent = async (quiz: any, contract: ethers.Contract) => {
    const provider = new ethers.providers.JsonRpcProvider();

    const nftContract = new ethers.Contract(
        unilearnNFTAddress,
        NFT.abi,
        provider
    )
    if (!quiz[0]) {
        return [];
    }
    const tokenUri = await nftContract.tokenURI(quiz[0]);

    const meta = await axios.get(tokenUri);
    console.log('token meta: ', meta);
    if (!meta) {
      return [];
    }
    return meta.data
}

export const submitQuiz = async (nftId: string, answers: string, provider: Web3Provider) => {
    const signer = provider.getSigner()
    const contract = new ethers.Contract(unilearnAddress, Unilearn.abi, signer);
    const response = await contract.submitQuiz(nftId, answers);

    return response;
}