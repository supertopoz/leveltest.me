import React from 'react';

const QuestionModule = (props) =>(
  
    <div className="q">
    <div></div>
    <button onClick={()=>(props.changeQuestion(true))}>true</button>
    <button onClick={()=>(props.changeQuestion(false))}>false</button>
    <p>{props.currentQuestion}</p>

    
    
    </div>
    )


export default QuestionModule;
