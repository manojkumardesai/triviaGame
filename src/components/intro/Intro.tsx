import React from 'react';

const Intro: React.FC<any> = ({startTrivia}) => {
  return (
    <div>
      <button className="start" onClick={startTrivia}>
        Start Game
      </button>
    </div>
  );
}

export default Intro;
