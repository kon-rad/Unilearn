import { useState } from 'react'
import { Input, Flex, Text, Textarea, Center, Box, Button } from '@chakra-ui/react'
import { Answer, QuestionLabel } from '../types';



type Props = {
    questionLabels: QuestionLabel[],
    currentQuestion: number,
}

const QuestionForm = (props: Props) => {
    const { questionLabels } = props;

    const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // props.onChange(description, fileUrl, price);
    }

    return (
        <Box mb={4}>
            <Flex justify="space-between">
                {
                    questionLabels.map(
                        (label) => {
                            return (
                                <Box borderRadius="50%" mr={4} py={2} px={4} border="1px" borderColor={label.isActive ? "red" : "gray.100"} backgroundColor={label.isCompleted ? 'blue': 'black'} >
                                    {label.label}
                                </Box>
                            )
                        }
                    )
                }
            </Flex>
        </Box>
    )
}

export default QuestionForm;