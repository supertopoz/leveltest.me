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
    this.change = this.change.bind(this)
  }

  changeSet(current){
    current.set = current.set += 1
    current.qtype = 1
    current.q = 1
    current.chance = 1
    this.setState({current:current})
  }

  change(current){
    current.level = current.level += 1
    current.set = current.set += 1
    current.qtype = 1
    current.q = 1
    current.chance = 1
    this.setState({current:current})
  }

  changeQuestion(result) {

      let cur = this.state.current;
      let changeQType = false;
      let currentPosition = Object.values(cur).slice(0,4).join('-')
      let moveToPosition = movement[currentPosition]
      console.log(moveToPosition);
      console.log(currentPosition);
      if((moveToPosition !== undefined && result) || (moveToPosition !== undefined && cur.chance === 3)){
        this.setState({current:moveToPosition})
        return
      }
      

      if (result) {
        if (cur.q === 3) {
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
        // last chance
        if (cur.chance === 3) {
          if (cur.q === 3) changeQType = true;
          cur.q += 1;
          cur.chance = 1;
          
        } else {
          // one more chance  
          if(cur.q === 3 && cur.qtype === 3) {
            this.changeSet(cur)
            return
          } else {
          cur.chance = (cur.chance) += 1;
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
    $.get('/data/eorpooouoiojpjpwpopokpeopokpokepokpkpdodpofpokpkpekpkfp',(result)=>{
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




  