import React, { useEffect, useState } from "react"
import { GetStaticProps, GetStaticPaths } from 'next'
import { Box, Text } from '@chakra-ui/react';

interface Props {
    journey: Journey
  }
  
  interface Params extends ParsedUrlQuery {
    journey: string
  }

const Quiz = (props: Props) => {
    return (
        <Box>
            <Text fontSize="4xl">This is the quiz page</Text>
        </Box>
    )
}