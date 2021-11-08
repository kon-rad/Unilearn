import { useState } from 'react'
import { Input, Flex, Text, Textarea, Center, Box, Button } from '@chakra-ui/react'
import { Question } from '../types';
import { ANSWER_LABELS } from '../utils/constants';

type Props = {
    questions: Question[],
    answer: string,
    desc: string,
}

const QuizReader = (props: Props) => {
    const { questions, desc, answer } = props;

    return (
        <Box>
            <Box mb={4}>
                <Text fontSize="3xl" mb={1}>Quiz Content:</Text>
                <Text fontSize="xl">{desc}</Text>
            </Box>
            {questions.map((question, i) => (
                <Box mb={4} key={`question_${i}`}>
                    <Box mb={2}>
                        <Text fontSize="xl">Question: {question.question}</Text>
                    </Box>
                    {question.answers.map((ans, i) => (
                        <Box mb={2} key={`answer_${i}`}>
                            {ANSWER_LABELS[i]}: {ans}
                        </Box>
                    ))}
                    <Box mb={2}>
                        <Text fontSize="xl">Correct answer:{question.answer}</Text>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default QuizReader;