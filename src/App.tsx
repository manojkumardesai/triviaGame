import React, { useState } from 'react';

// API
import { fetchTriviaQuestions, Difficulty, QuizType, QuestionExtended, AnswerObject } from './services/QUIZ_API';

// Components
import TriviaCard from './components/TriviaCard';

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionExtended[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchTriviaQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
      QuizType.MULTIPLE_CHOICE
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>Trivia Game</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start Game
        </button>
        ) : null
      }
      { !gameOver ? <p className="score">Score: {score} </p> : null }
      { loading && <p>Loading Questions...</p> }
      { !loading && !gameOver && (
        <TriviaCard 
          questionNumber = {number + 1}
          totalQuestions = {TOTAL_QUESTIONS}
          question = {questions[number].question}
          answers = {questions[number].answers}
          userAnswer = {userAnswers ? userAnswers[number]: undefined}
          callback = {checkAnswer}
        /> 
        )}
      { !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
        ) : null 
      }
    </div>
  );
}

export default App;
