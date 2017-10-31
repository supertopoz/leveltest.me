import React from 'react';

let arr = [];

const QuestionModule = (props) =>(
  
    <div className="q">
    <div></div>
    <button onClick={()=>{
    	arr.push(JSON.stringify(props.currentLevel))
    	return props.changeQuestion(true) 	
    }}>
    true</button>
    <button onClick={()=>{
    	arr.push(JSON.stringify(props.currentLevel))
    	return props.changeQuestion(false)

    }}>
    false</button>
        <div id="currentPosition">{arr.slice(0).reverse().map((item, index)=>{
      return <div key={"thing"+index}>{item}</div>
    })}</div>
    <p>{props.currentQuestion}</p>

    
    
    </div>
    )


export default QuestionModule;
