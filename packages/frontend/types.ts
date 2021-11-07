export interface Question {
    question: string;
    answers: string[];
    answer: string;
}

export type Quiz = {
    title: string,
    description: string,
    questions: Question[],
}

export interface QuestionLabel {
    label: number,
    isCompleted: boolean,
    isActive: boolean,
}
