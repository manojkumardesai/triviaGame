import React, { useState } from 'react';

// API
import { fetchTriviaQuestions, Difficulty, QuizType } from './services/QUIZ_API';

// Types
import { QuestionExtended, AnswerObject } from './services/TriviaTypes';

// Components
import TriviaCard from './components/trivia/TriviaCard';

// Styles
import { GlobalStyle, Wrapper } from './styles/App.styles';

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
      QuizType.TRUE_FALSE
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user's answer
      const answer = event.currentTarget.value;
      // correct answer
      const correct = questions[number].correct_answer === answer;
      // increment score if answer is correct
      if (correct) setScore(prev => prev + 1);
      // save user responses
      const answersObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answersObject]);
    }
  }

  const nextQuestion = () => {
    // Load next question until end of question list is reached
    const nextQuestionNumber = number + 1;

    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestionNumber);
    }
  }

  return (
    <>
    <GlobalStyle />
    <Wrapper>
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
    </Wrapper>
    </>
  );
}

export default App;
