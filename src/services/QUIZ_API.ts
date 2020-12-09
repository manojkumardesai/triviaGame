// Types
import { Question } from './TriviaTypes';

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
