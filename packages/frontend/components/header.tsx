import { Text, Button, Flex, LinkBox, Spacer, Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image'
import logo from '../resources/images/logo.png';
import Wallet from './wallet';
import { AddIcon } from '@chakra-ui/icons'

const Header = () => {
    return (
        <Flex as="header" p={4} alignItems="center">
            <LinkBox>
                <NextLink href="/" passHref={true}>
                    <Text fontSize="2xl">🦄 Unilearn</Text>
                </NextLink>
            </LinkBox>
            <Spacer />
            <Box mr={4}>
                <LinkBox>
                    <NextLink href="/create-quiz" passHref={true}>
                        <Button  aria-label="Create Post">✍️{' '}Create Quiz</Button>
                    </NextLink>
                </LinkBox>
            </Box>
            <Box>
                <Wallet/>
            </Box>
        </Flex>
    )
}

export default Header;