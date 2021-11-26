import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers';
import { unilearnNFTAddress, unilearnAddress } from '../config';
import axios from 'axios';
import NFT from '../artifacts/contracts/UnilearnNFT.sol/UnilearnNFT.json';
import Unilearn from '../artifacts/contracts/Unilearn.sol/Unilearn.json';

// todo: set quiz type
export const getQuizzes = async (provider: ethers.providers.BaseProvider): Promise<any| undefined> => {

    const unilearnContract = new ethers.Contract(
        unilearnAddress,
        Unilearn.abi,
        provider
    )

    const quizzes = await unilearnContract.getAllQuizzes();
    
    // filter out any tokens with no ID - dev env issue only
    const filteredQuizzes = quizzes.filter((q: any) => Boolean(q[0]))
    const quizzesContent = await Promise.all(
        filteredQuizzes
            .map((elem: any) => getQuizContent(elem, provider))
    );
  
    return [filteredQuizzes, quizzesContent];
}

const getQuizContent = async (quiz: any, provider: ethers.providers.BaseProvider) => {

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