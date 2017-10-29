import React from 'react';
import QuestionModule from './QuestionModule.jsx'
import ProgressBar from './ProgressBar.jsx'
import "./css/styles.css"
import $ from 'jquery'
import movement from './getQuestionData.js'


class App extends React.Component{
  constructor(props) {
  	super(props);
  	this.state = {
      questions: {},
      q: "Loading...",
      current: {level:1, set:1, qtype:1, q:1,chance:1,},
    };
    this.changeQuestion = this.changeQuestion.bind(this)
    this.changeSet = this.changeSet.bind(this)
//    this.change = this.change.bind(this)
    this.changeToCustomPosition = this.changeToCustomPosition.bind(this)
  }

  changeSet(current){
    current.set = current.set += 1
    current.qtype = 1
    current.q = 1
    current.chance = 1
    this.setState({current:current})
  }

/*  change(current){
    current.level = current.level += 1
    current.set = current.set += 1
    current.qtype = 1
    current.q = 1
    current.chance = 1
    this.setState({current:current})
  }*/

  changeToCustomPosition(result){
    let cur = this.state.current;
    let currentPosition = Object.values(cur).slice(0,4).join('-')
    let moveToPosition = movement[currentPosition]
      // Custom positioning 
      if((moveToPosition !== undefined && result === true) || (moveToPosition !== undefined && cur.chance === 3)){
        let newQuestions = Object.values(moveToPosition).slice(0,4).join('-') 
        let question = this.state.questions[newQuestions]['chance1'];
        this.setState({current:moveToPosition})
        this.setState({q:question});
        return true
      }
   return false

  }

  changeQuestion(result) {

      let cur = this.state.current;
      let changeQType = false;
      if(this.changeToCustomPosition(result)){
        return
      }
      

      if (result) {
        if (cur.q === 3) {
          // Move from one set to the next with a positive result
          if(cur.q === 3 && cur.qtype === 3) {
            this.changeSet(cur)
            return
          } 
          changeQType = true;
        } else {
          // Check questions
          cur.q = (cur.q) + 1;
          cur.chance = 1;
        }
      } else {
        // Chance is set to three, but move to next question anyway
        if (cur.chance === 3) {
          if (cur.q === 3) changeQType = true;
          cur.q += 1;
          cur.chance = 1;
          
        } else {
          // Chance is set to three and it is the last question in the set.  
          if(cur.q === 3 && cur.qtype === 3) {
            this.changeSet(cur)
            return
          } else {
          // Chance is set to two add one more chance.    
          cur.chance = (cur.chance) += 1;
          // Change is set to three change question type
          if (cur.q === 3) changeQType = true;
          }
        }
      }

  if(changeQType) {
     console.log('changing type 3')
            cur.qtype += 1;
            cur.chance = 1;
            cur.q = 1;
  }
  
  let position = cur.level+'-'+'1'+'-'+cur.qtype+'-'+cur.q;
  let question = this.state.questions[position]['chance'+cur.chance];
  this.setState({current:cur});
  this.setState({q:question});

}

  componentDidMount() {
    console.log('mounted')
    $.get('/data',(result)=>{
       //var resultSon = JSON.parse(result) 
       this.setState({questions:result})
       let question = result["1-1-1-1"].chance1;     
       this.setState({q:question})
    })
    let startLevel = this.state.current    
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




  