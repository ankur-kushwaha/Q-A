import * as React from 'react';

import { useParams } from 'react-router-dom'

import Spacer from '../components/Spacer';
import useFirebase from '../hooks/useFirebase';
import QuestionRow from '../components/QuestionRow';
import {EventContext} from '../context/eventContext';


interface Question{
  questionText:String;
  userDetails:{
    name:String;
  },
  postedTime: String;
  likes:[{
    deviceId:String
  }]
}


export function EventPage(props){

  let {eventId} = useParams();

  let [sortType, setSortType] = React.useState<string>("popular")
  let [questionText, setQuestionText] = React.useState("");
  let [questionsData, setQuestions] = React.useState([]);
  let {postQuestion, getAllQuestions}  = useFirebase();
  let {setEventId}= React.useContext(EventContext);

  
  React.useEffect(() => {
    
    getAllQuestions(function(questions){

      let updatedQuestionsData:Question[] = []

      for(var key in questions){
        updatedQuestionsData.push({
          key:key,
          ...questions[key]
        })
      }

      setQuestions(updatedQuestionsData);
    })  
  }, [getAllQuestions, setEventId, setQuestions])
  



  async function handleMouseDown(e){
    
    // setQuestionText(e.target.value)
    if(e.which == 13){
      let question = {
        questionText:e.target.value,
        userDetails:{
          name:"anonymous"
        },
        postedTime: new Date().toISOString(),
        likes:{}
      }
      await postQuestion(question);
      setQuestionText("")
    }
  }

  function handleChange(e){
    setQuestionText(e.target.value);
  }

  questionsData.sort((a,b)=>{
    if(sortType == 'popular'){
      return Object.keys(b.likes||{}).length - Object.keys(a.likes||{}).length;
    }else if(sortType == 'recent'){
      return new Date(b.postedTime).getTime() - new Date(a.postedTime).getTime()
    }
  })

  
  return (
    <div className="event-page">
      <div className="header">
        <div className="meeting-title">
          {eventId}
        </div>
        <div className="navbar">
          <nav>
            <span className="chat-logo">
            </span>
            <span className="nav-text">
              Q&A
            </span>
            <div>

            </div>
          </nav>
        </div>
        <div></div>
      </div>
      <main>
        <article>
          <section className="ask-question">
            <Spacer margin={30}/>
            <div className="title">
              Ask the speaker
            </div>
            <Spacer margin={10}></Spacer>
            <div className="input-box">
              <span className="edit-logo">

              </span>
              <input value={questionText} type="text" placeholder="type your question" 
                onChange = {handleChange}
                onKeyDown={handleMouseDown}/>
            </div>
          </section>

          <Spacer margin={20}/>

          <section className="question-list-container">

            <div className="question-header">

            
              <div className="sort-list">
                <span className={"popular "+(sortType=='popular'?'active':'') } onClick={()=>setSortType('popular')}> 
                  Popular
                </span>
                <span className={"recent "+(sortType=='recent'?'active':'') } onClick={()=>setSortType('recent')}> 
                  Recent
                </span>
              
              </div>
              
              <div className="question-count">
                {questionsData.length} questions
              </div>
            
            </div> 

            <div className=" question-list">
              {questionsData.map((question)=>{
                return <QuestionRow key={question.key} question={question}/>
                
              })}
              

            </div>

            

          </section>

        </article>

      </main>
    </div>
  )
}

export default EventPage;