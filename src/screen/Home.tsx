import * as React from 'react';
import {FaArrowCircleRight} from "react-icons/fa";
import { useHistory } from "react-router-dom";


import '../App.scss'
import useFirebase from '../hooks/useFirebase';

export function Home() {
  let history = useHistory();
  const inputEl = React.useRef(null);
  const {createNewEvent} = useFirebase()
  function openEventPage(id){
    history.push("/event/"+inputEl.current.value);
  }

  function handleKeyPress(e){
    if(e.which == 13){
      openEventPage(e.target.value)
    }
  }

  function onClickCreateEvent(){
    let eventKey = createNewEvent() 
    console.log(eventKey);
    
    history.push("/event/"+eventKey);
  }

  return (
    <div className="home">
      <header className="header">
        Q&A 
      </header>
      <main>
        <article className="main-article">
          <section className="left">
            <div className="title">Join as a Participant?</div>
            <div className="subtext">No account needed!</div>
            <div className="input-container">
              <span className="hash">#</span>
              <input ref={inputEl} onKeyDown={handleKeyPress} type="text" placeholder="Enter Event Code"/>
              <span className="submit" onClick={openEventPage}>
                <FaArrowCircleRight/>
              </span> 
            </div>
          </section> 
          <section className="right">
            <div className="text-new-event" >Create a new Event</div>
            <div>
              <button className="btn-try-free" onClick={onClickCreateEvent}>Try it free</button>
            </div>
          </section>
        </article>
      </main>
     
    </div>
  )
} 

export default Home;