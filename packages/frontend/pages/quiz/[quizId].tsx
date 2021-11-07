import React, { useEffect, useState } from "react"
import { GetStaticProps, GetStaticPaths } from 'next'
import { Box, Text } from '@chakra-ui/react';

type Props = {

}

const Quiz = (props: Props) => {
    return (
        <Box>
            <Text fontSize="4xl">This is the quiz page</Text>
        </Box>
    )
}