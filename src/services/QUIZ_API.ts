
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
    console.log(dataFromApi);
}
