import React from 'react';

// Components
import TriviaCard from './components/TriviaCard';
const App = () => {
  const startTrivia = async () => {

  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>Trivia Game</h1>
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      <p className="score">
        Score:
      </p>
      <p>Loading Questions...</p>
      <TriviaCard />
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default App;
