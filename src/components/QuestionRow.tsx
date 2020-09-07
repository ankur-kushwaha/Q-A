import React from 'react'
import { FiThumbsUp,FiUser,FiMoreVertical } from "react-icons/fi";
import useFirebase from '../hooks/useFirebase';
import {EventContext} from '../context/eventContext';

import date from 'date-and-time';

// var client = new ClientJS();

export default function QuestionRow({question}) {
  
  const [state,setState] = React.useState({
    editMode:false
  });
  let {editMode} = state;
  let {key,postedTime,likes={},questionText,userDetails:{name}} = question;
  let {eventContext:{deviceId}} = React.useContext(EventContext);
  let {updateLikes,withdrawQuestion,updateQuestion} = useFirebase();

  let hightlightLikes = likes[deviceId];


  function handleLikesCount(){
    updateLikes(key,question)
  } 

  function handleClickEdit(){
    setState({
      ...state, 
      editMode:true
    })
  }

  async function handleEditKeyPress(e){
    if(e.which == 13){
      question.questionText = e.target.value;
      await updateQuestion(key, question)
      setState({
        ...state,
        editMode:false
      })
    }
  }

  return (
    <div className="question-row card" >
      <section className="question-section">
        <div className="user-info">
          <div className="avatar">
            <FiUser/>
          </div>
          <div>
            <div className="name">
              {name}
            </div>
            <div className="time">
              {date.format(new Date(postedTime),'YYYY/MM/DD HH:mm:ss')}
            </div>
          </div>
        </div>
        <div className="question-text">
          {!editMode?
            <span>{questionText}</span>:
            <input type="text" defaultValue={questionText} onKeyDown={handleEditKeyPress}/>
          }
        </div>
      </section>
      <aside className="card-aside">
        <div className={"likes-count "+ (hightlightLikes?"selected":"")} onClick={handleLikesCount}>
          <span className="count">{Object.keys(likes).length}</span>   <FiThumbsUp/>
        </div>
        <div className="menu">
          <FiMoreVertical/>
          <ul>
            <li onClick={handleClickEdit}>
              <span className="icon">

              </span>
              <span className="text">
            Edit
              </span>
            </li>
            <li>
              <span className="icon">
              </span>
              <span className="text" onClick={()=>withdrawQuestion(key)}>
            Withdraw
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}
