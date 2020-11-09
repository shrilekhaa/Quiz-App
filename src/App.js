import React, { useState } from 'react';
import questions from "./questions.js"

export default function App() {
  
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
  const [missNum, setMissNum] = useState({value:[1,2,3,4]});
  var index;
  
	const handleAnswerOptionClick = (isCorrect,id_num) => {
		if (isCorrect) {
			setScore(score + 1);
    }
    index = missNum.value.indexOf(id_num);
    if( index > -1)
    {
      missNum.value.splice(index,1);
      setMissNum({value:missNum.value})
    }    
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
    }
  };

  function handleClick(){
    setShowScore(true);
   }
  
	return (
		<div className='app'>
        <div>
        {questions.map((question) => (
            <div>     
              <div className='question-segment'>
					      	<div className='question-count'>
                      <span className="set-color"><b>QUESTION {question.id}</b></span> 
						  </div>
						  <div className='question-text'><b>{question.questionText}</b></div>
					    </div>
					    <div className='answer-segment'>
					    	{question.answerOptions.map((answerOption) => (
							  <button
                 onClick={() => handleAnswerOptionClick(answerOption.isCorrect,question.id)}>{answerOption.answerText}</button>
						  ))}  
				    	</div>
				    </div>
						))}
            <hr></hr>
            <button className="result-button" onClick={handleClick}>Get Result!</button>
            { (showScore && missNum.value.length === 0) ? (
            <div className='score-segment'>
            <b>You scored {score} out of {questions.length}.</b>
            </div>
            ) : 
            (((showScore && missNum.value.length != 0))? (<div><b>All questions are mandatory. Please answer {(missNum.value.join(","))} questions.</b> </div>):(null))}
         </div>
			 )
    </div>
	);
}

