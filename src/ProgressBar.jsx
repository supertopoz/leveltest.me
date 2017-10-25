import React from 'react';


class QuestionType extends React.Component {
  render() {
    var qtypes ={
    	'1':'Reading',
    	'2':'Writing',
    	'3':'Listening'
    }                   
    return <h3>{qtypes[this.props.qtype+'']}</h3>
  }
}

class Chances extends React.Component {
  render(){
  	var cTypes ={ 
   	  '1':'🍭',
      '2':'🍭🍭',
      '3':'🍭🍭🍭'
    }

    return (
    <div>Chances: {cTypes[4-(this.props.chance)+'']} </div>
    )
  }
}


const ProgressBar = (props) =>(
    <div className="progress-bar"> 
      <QuestionType  qtype={ props.currentLevel.qtype}></QuestionType>
      <p>Level: <progress max="9" value={props.currentLevel.level}></progress></p>
      <p>Set: <progress max="9" value={props.currentLevel.set}></progress></p>
      <p>Questions completed: <progress max="3" value={props.currentLevel.q -1}></progress></p>
      <Chances chance={props.currentLevel.chance}></Chances>
    </div>
    )


export default ProgressBar;