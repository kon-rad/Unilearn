import { Web3Provider } from '@ethersproject/providers'
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ethers } from 'ethers';
import { unilearnNFTAddress, unilearnAddress } from '../config';

import NFT from '../artifacts/contracts/UnilearnNFT.sol/UnilearnNFT.json';
import Unilearn from '../artifacts/contracts/Unilearn.sol/Unilearn.json';

// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export async function uploadQuizToIPFS(quiz: string): Promise<string> {

    const added = await client.add(quiz, {
        progress: (prog: any) => console.log(`received: ${prog}`),
    });
    return `https://ipfs.infura.io/ipfs/${added.path}`;
}

export async function createQuiz(address: string, provider: Web3Provider, nftUrl: string, answers: string): Promise<string| undefined>  {
    if (!nftUrl) {
        console.error('Error: missing data: ', nftUrl);
        return;
    }

    const signer = provider.getSigner()
    /* next, create the NFT of the quiz */
    let contract = new ethers.Contract(unilearnNFTAddress, NFT.abi, signer);
    let transaction = await contract.createToken(nftUrl);
    const tx = await transaction.wait();

    if (tx.events.length < 1) {
        // was not able to get the NFT token Id
        console.error('tx has no events. tx: ', tx);
        return;
    }

    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();
    console.log('created quiz nft - tokenId: ', tokenId);

    contract = new ethers.Contract(unilearnAddress, Unilearn.abi, signer);

    transaction = await contract.createQuiz(tokenId.toString(), answers);
    await transaction.wait();
}
