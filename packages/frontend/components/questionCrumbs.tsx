import { Input, Flex, Text, Textarea, Center, Box, Button } from '@chakra-ui/react'
import { QuestionLabel } from '../types';

type Props = {
    questionLabels: QuestionLabel[],
}

const QuestionForm = (props: Props) => {
    const { questionLabels } = props;

    return (
        <Box mb={4}>
            <Flex justify="space-between">
                {
                    questionLabels.map(
                        (label, i) => {
                            return (
                                <Box key={`questionLabel_${i}`} borderRadius="50%" mr={4} py={2} px={4} border="1px" borderColor={label.isActive ? "pink.600" : label.isCompleted ? "pink.600" : "gray.400"} backgroundColor={label.isCompleted ? 'pink.600': 'gray.800'} >
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