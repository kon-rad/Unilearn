import { ExternalProvider, getNetwork, JsonRpcFetchFunc } from "@ethersproject/providers"
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers"

export const injected = new InjectedConnector({
    supportedChainIds: [
        1, // mainnet
        3, // ropstand
        4, // rinkeby
        5, // Gorli
        10, // Optimistic
        42,
        137, // polygon
        1337, // local hardhat node
        31337, // local hardhat node
        80001, // mumbai
        42161
    ]
})

export function getProvider(provider: ExternalProvider | JsonRpcFetchFunc) {
    return new Web3Provider(provider)
}

export function formatAddress(value: string, length: number = 4) {
    return `${value.substring(0, length + 2)}...${value.substring(value.length - length)}`
}