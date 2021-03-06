import { Text, Button, Flex, LinkBox, Spacer, Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import Wallet from './wallet';

const Header = () => {
    return (
        <Flex as="header" p={4} alignItems="center">
            <LinkBox>
                <NextLink href="/" passHref={true}>
                    <Text cursor="pointer" fontSize="2xl">🦄 Unilearn</Text>
                </NextLink>
            </LinkBox>
            <Spacer />
            <Box mr={4}>
                <LinkBox>
                    <NextLink href="/create-quiz" passHref={true}>
                        <Button  aria-label="Create Post">🚀{' '}Create Quiz</Button>
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