export interface Question {
    question: string;
    answers: string[];
    answer: string;
}

export type Quiz = {
    title: string,
    desc: string,
    questions: Question[],
}

// todo: delete me
// export interface Answer {
//     A: string;
//     B: string;
//     C: string;
//     D: string;
// }

export interface QuestionLabel {
    label: number,
    isCompleted: boolean,
    isActive: boolean,
}
