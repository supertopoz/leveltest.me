import React from 'react';
import QuestionModule from './QuestionModule.jsx'
import ProgressBar from './ProgressBar.jsx'
import "./css/styles.css"
import questions from './questionBank.js'



class App extends React.Component{
  constructor(props) {
  	super(props);
  	this.state = {
      questions: questions,
      q: "Somthing",
      current: {level:1, set:1, qtype:1, q:1,chance:1,},
    };
    this.changeQuestion = this.changeQuestion.bind(this)
  }



  changeQuestion(result) {
      let cur = this.state.current;
      let changeQType = false;
      if (result) {
        if (cur.q === 3) {
          changeQType = true;
        } else {
          // Check questions
          cur.q = (cur.q) + 1;
          cur.chance = 1;
        }
      } else {
        // last chance
        if (cur.chance === 3) {
          if (cur.q === 3) changeQType = true;
          cur.q += 1;
          cur.chance = 1;
          
        } else {
          // one more chance  
          cur.chance = (cur.chance) += 1;
          if (cur.q === 3) changeQType = true;
        }
      }

  if(changeQType) {
     console.log('changing type 3')
            cur.qtype += 1;
            cur.chance = 1;
            cur.q = 1;
  }
  
  let position = cur.level+'-'+'1'+'-'+cur.qtype+'-'+cur.q;
  let question = questions[position]['chance'+cur.chance];
  this.setState({current:cur});
  this.setState({q:question});

}

  componentDidMount() {
    var question = questions["1-1-1-1"].chance1;  
    console.log(question)  
    var startLevel = this.state.current
    this.setState({q:question})
    this.setState({current:startLevel})
  }
 
  render(){
  	return(
  		<div>
  		<h1>Hello</h1>

      <ProgressBar currentLevel={this.state.current}></ProgressBar>
      <QuestionModule 
        changeQuestion={this.changeQuestion} 
        currentQuestion={this.state.q} 
      >        
      </QuestionModule>
  		</div>
  	)
  }
}

export default App;




  