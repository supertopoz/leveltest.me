import React from 'react';
import QuestionModule from './QuestionModule.jsx'
import ProgressBar from './ProgressBar.jsx'
import ladyBug from "./img/cute-ladybug.jpg"
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
      score: 0
    };
    this.changeQuestion = this.changeQuestion.bind(this)
    this.changeSet = this.changeSet.bind(this)
    this.changeLevel = this.changeLevel.bind(this)
    this.changeToCustomPosition = this.changeToCustomPosition.bind(this)
  }



  changeSet(current){
    current.set = current.set += 1
    current.qtype = 1
    current.q = 1
    current.chance = 1
    let position = current.level +'-'+ current.set +'-1-1'
    console.log(position)
    this.setState({current:current})
    let question = this.state.questions[position]['chance'+current.chance];
    this.setState({q:question});
    this.setState({score:0});
  }

  changeLevel(current){
    current.level = current.level += 1
    current.set = current.set = 1
    current.qtype = 1
    current.q = 1
    current.chance = 1
    let position = current.level+'-1-1-1';
    let question = this.state.questions[position]['chance'+current.chance];
    this.setState({current:current});
    this.setState({q:question});

  }

  changeToCustomPosition(result){
    let cur = this.state.current;
    let currentPosition = Object.values(cur).slice(0,4).join('-')
    let moveToPosition = movement[currentPosition]
      // Custom positioning 
      if((moveToPosition !== undefined && result === true) || (moveToPosition !== undefined && cur.chance === 3)){
        console.log('hit target')
        let position = moveToPosition.format
        console.log(moveToPosition.success)
        let question = this.state.questions[moveToPosition.success]['chance1'];
        this.setState({current:position})
        this.setState({q:question});
        return true
      }
   return false

  }

  changeQuestion(result) {
       let score = 0;
      let cur = this.state.current;
      let changeQType = false;
      if(this.changeToCustomPosition(result)){
        return
      }
      if(cur.set === 3 && cur.qtype === 3 && cur.q === 3 && result ){
        this.changeLevel(cur)
        return
      }
        
        
      

      if (result) {
        score = this.state.score += 10
        this.setState({score:score});
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
        //  score -= 3;
        }
      } else {
        // Chance is set to three, but move to next question anyway
        if (cur.chance === 3) {
          console.log('Hit last chance')
          if (cur.q === 3) changeQType = true;
          cur.q += 1;
          cur.chance = 1;
          score = this.state.score -=3
          this.setState({score:score});
        //  console.log(score)
        } else {
          // Chance is set to three and it is the last question in the set.  
          if(cur.q === 3 && cur.qtype === 3) {
            this.changeSet(cur)
            console.log(score)
            return
          } else {
          // Chance is set to two add one more chance.    
          cur.chance = (cur.chance) += 1;
          score = this.state.score -=3
          this.setState({score:score});
          // Change is set to three change question type
       //   console.log(score)
          if (cur.q === 3) changeQType = true;
          }
        }
      }

  if(changeQType) {
     console.log('Changing to next question! chances gone')
            cur.qtype += 1;
            cur.chance = 1;
            cur.q = 1;
  }
  console.log(this.state.score)
  let position = cur.level+'-'+cur.set+'-'+cur.qtype+'-'+cur.q;
  let question = this.state.questions[position]['chance'+cur.chance];
  this.setState({current:cur});
  this.setState({q:question});

}

  componentDidMount() {
    console.log('mounted')
    $.get('/data',(result)=>{
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
      <section className="grid-1">
      <div className="menu">
  		<h1 id="heading-text">Level Test Me</h1>
      </div>
      <ProgressBar score={this.state.score} currentLevel={this.state.current}></ProgressBar>
      <QuestionModule 
        currentLevel={this.state.current}
        changeQuestion={this.changeQuestion} 
        currentQuestion={this.state.q} 
      >        
      </QuestionModule>
      </section>
  		</div>
  	)
  }
}

export default App;




  