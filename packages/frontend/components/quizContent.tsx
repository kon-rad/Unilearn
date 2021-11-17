import { useState } from 'react'
import { Text, Box, Button, RadioGroup, Radio, Stack } from '@chakra-ui/react'
import { Question } from '../types';
import { ANSWER_LABELS, MAIN_COLOR_1, MAIN_COLOR_HOVER_1 } from '../utils/constants';

type Props = {
    questions: Question[],
    answer: string,
    desc: string,
    handleQuizSubmit: any,
}

const DEFAULT_FORM = ["", "", "", "", ""];

const QuizContent = (props: Props) => {
    const { questions, handleQuizSubmit } = props;
    const [form, setForm] = useState<any>([...DEFAULT_FORM]);

    const setAnswer = (val: string, index: number) => {
        const currForm = [...form];
        currForm[index] = val;
        setForm(currForm);
    }
    return (
        <Box mb={4}>
            {questions.map((question, questionIndex) => (
                <Box mb={4} key={`question_${questionIndex}`}>
                    <Box mb={2}>
                        <Text fontSize="xl">Question: {question.question}</Text>
                    </Box>
                    {question.answers.map((ans, i) => (
                        <Box mb={2} key={`ans_${i}`}>
                            {ANSWER_LABELS[i]}: {ans}
                        </Box>
                    ))}
                    <Box mb={2}>
                        <Text fontSize="xl">Select one:</Text>
                        <RadioGroup onChange={(val) => setAnswer(val, questionIndex)} value={form[questionIndex]}>
                            <Stack direction="row">
                                <Radio value="A">A</Radio>
                                <Radio value="B">B</Radio>
                                <Radio value="C">C</Radio>
                                <Radio value="D">D</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>

                </Box>
            ))}
            <Box mt={4}>
                <Button
                    onClick={() => handleQuizSubmit(form.join(''))}
                    backgroundColor={MAIN_COLOR_1} 
                    _hover={{
                        background: MAIN_COLOR_HOVER_1,
                    }}
                    _active={{
                        background: MAIN_COLOR_HOVER_1,
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    )
}

export default QuizContent;