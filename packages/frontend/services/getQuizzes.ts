import { Web3Provider } from '@ethersproject/providers'
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ethers } from 'ethers';
import { unilearnNFTAddress, unilearnAddress } from '../config';

import NFT from '../artifacts/contracts/UnilearnNFT.sol/UnilearnNFT.json';
import Unilearn from '../artifacts/contracts/Unilearn.sol/Unilearn.json';

// todo: set quiz type
export const getQuizzes = async (): Promise<any| undefined> => {
    const provider = new ethers.providers.JsonRpcProvider();

    const vayamContract = new ethers.Contract(
        unilearnAddress,
        Unilearn.abi,
        provider
    )

    const data = await vayamContract.getAllQuizzes();
    console.log('data :D : ', data);
    // const newJobs = await Promise.all(data.map(getQuizData));
    // console.log('all done: ', newJobs);
    let quizzes: any = [];
    data.forEach((item: any) => {
        quizzes.push(...item);
    });
    console.log('quizzes: ---', quizzes);

    return quizzes;
}

// const getQuizData = async (accHash: string) => {
//     const web3Modal = new Web3Modal({
//         network: 'goerli',
//         cacheProvider: true,
//     });

//     const connection = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();

//     const vayamContract = new ethers.Contract(
//         vayamAddress,
//         VaYam.abi,
//         signer
//     )
//     const newJobs = await vayamContract.fetchAllActiveJobsPerAccount(accHash);
//     console.log('fetchAllJobsPerAccount jobs in getJobData: ', newJobs);
//     // setJobs([...jobs, ...newJobs]);
//     return newJobs
// }