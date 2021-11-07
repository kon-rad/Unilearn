import { useState } from 'react'
import { Input, Flex, Text, Textarea, Center, Box, Button } from '@chakra-ui/react'
import { ANSWER_LABELS } from '../utils/constants';
import { Quiz } from '../types';

type Props = {
    quiz: Quiz,
}

const QuizPreview = (props: Props) => {
    const { title, desc } = props.quiz;

    const handleGoToQuiz = () => {
        
    }

    return (
        <Box mb={4} border="1px" borderColor="gray" borderRadius="6" p={5}>
            <Text fontSize="2xl">{title}</Text>
            <Text fontSize="sm">{desc}</Text>
            <Button onClick={handleGoToQuiz} mt={3}>Go</Button>
        </Box>
    )
}

export default QuizPreview;