export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionExtended = Question & { answers: string[]}

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard" 
}

export enum QuizType {
    MULTIPLE_CHOICE = "multiple",
    TRUE_FALSE = "boolean"
}

export const fetchTriviaQuestions = async (amount: number, difficulty: Difficulty, type: QuizType) => {
    const api = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;
    const dataFromApi = await (await fetch(api)).json();
    return dataFromApi.results.map((question: Question) => (
        {
            ...question,
            answers: [
                ...question.incorrect_answers,
                question.correct_answer
            ].sort().reverse()
        }
    ))
}
