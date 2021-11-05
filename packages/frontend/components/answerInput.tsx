import { useState } from 'react'
import { Input, Flex, Text, Textarea, Center, Box, Button } from '@chakra-ui/react'

type Props = {
    onChange: any,
    index: number,
    value: string,
}

const ANSWER_LABELS = ['A', 'B', 'C', 'D'];

const AnswerInput = (props: Props) => {
    const { value, index, onChange } = props;

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value, index);
    }

    return (
        <Box mb={4}>
            <Text size="xl">{ANSWER_LABELS[index]}:</Text>
            <Input value={value} placeholder="Type a potential answer here" onChange={handleQuestionChange} />
        </Box>
    )
}

export default AnswerInput;