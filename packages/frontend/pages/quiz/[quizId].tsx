import React, { useEffect, useState } from "react"
import { Box, Text, Container } from '@chakra-ui/react';

type Props = {}

const Quiz = (props: Props) => {
    return (
        <Container>
            <Box>
                <Text fontSize="4xl">This is the quiz page</Text>
            </Box>
        </Container>
    )
}

export default Quiz;