import { ReactNode } from 'react';
import { 
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    )
}
const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            mt={'400px'}
            >
                <Container as={Stack} maxW={'6xl'} py={10}>
                    <SimpleGrid
                        templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr'}}
                        spacing={6}>
                            <Stack spacing={6}a>
                                <Box>
                                    <Text>Unilearn</Text>
                                </Box>
                                <Text fontSize={'sm'}>
                                    &copy; 2021 Unilearn. All rights reserved.
                                </Text>
                            </Stack>
                            <Stack align={'flex-start'}>
                                <ListHeader>Product</ListHeader>
                                <Link href="#">Overview</Link>
                                <Link href="#">Features</Link>
                                <Link href="#">Roadmap</Link>
                            </Stack>
                            <Stack align={'flex-start'}>
                                <ListHeader>Follow Us</ListHeader>
                                <Link href="#">Twitter</Link>
                                <Link href="#">Instagram</Link>
                            </Stack>
                        </SimpleGrid>
                </Container>
            </Box>
    )
}

export default Footer;
