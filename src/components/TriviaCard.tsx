import React from 'react';
import { AnswerObject } from '../services/QUIZ_API';

type CardProps = {
    question: string;
    answers: string[];
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const TriviaCard : React.FC<CardProps> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions
}) => (
    <div>
        <p className="number">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML = {{ __html: question}} />
        <div>
            {answers.map((answer) => (
                <div key={answer}>
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default TriviaCard;
