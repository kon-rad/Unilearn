import { useState } from 'react'
import { Link, Input, Flex, Text, Textarea, Center, Box, Button } from '@chakra-ui/react'
import { ANSWER_LABELS } from '../utils/constants';
import { Quiz } from '../types';

type Props = {
    quiz: Quiz,
    tokenId: string,
    handleGoToQuiz: any,
    quizIndex: number,
}

const QuizPreview = (props: Props) => {
    const { title, description } = props.quiz;

    return (
        <Box mb={4} border="1px" borderColor="gray" borderRadius="6" p={5}>
            <Text fontSize="2xl">{title}</Text>
            <Text fontSize="sm">{description}</Text>
            <Button onClick={() => props.handleGoToQuiz(props.quizIndex)} mt={3}>Go</Button>
        </Box>
    )
}

export default QuizPreview;