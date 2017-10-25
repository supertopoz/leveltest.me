import React from 'react';

const QuestionModule = (props) =>(
  
    <div className="q">
    <div></div>
    <p>{props.currentQuestion}</p>

    
    <button onClick={()=>(props.changeQuestion(true))}>true</button>
    <button onClick={()=>(props.changeQuestion(false))}>false</button>
    </div>
    )


export default QuestionModule;
