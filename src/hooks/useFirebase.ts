import * as React from 'react';
import firebase from 'firebase';
import {EventContext} from '../context/eventContext';
import shortHash from 'shorthash';
import {
  useParams
} from "react-router-dom";
const firebaseConfig = {
  apiKey: "AIzaSyCRuCJwmQG29Ax5dhhY2jIdlkakJeyUwaA",
  authDomain: "slido-bf925.firebaseapp.com",
  databaseURL: "https://slido-bf925.firebaseio.com",
  projectId: "slido-bf925",
  storageBucket: "slido-bf925.appspot.com",
  messagingSenderId: "24738902495",
  appId: "1:24738902495:web:4b164c638233b0ff"
  
};

firebase.initializeApp(firebaseConfig);

function useFirebase(){

  

  let loggedInEmail;
  const {eventContext:{deviceId}} = React.useContext(EventContext);
  const {eventId} = useParams()

  async function login(email, password) {
    try{
      await firebase.auth().signInWithEmailAndPassword(email, password);
      loggedInEmail = email;
    }catch(e){
      signup(email,password)
    }
  }

  async function signup(email, password){
    try{
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    }catch(f){
    }
  }

  async function postQuestion(question){

    var newPostKey = firebase.database().ref('/events/' + eventId+"/questions/").push().key;
    question.userDetails.deviceId = deviceId;

    var updates = {};
    updates['/events/' + eventId+"/questions/"+newPostKey] = question;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);

  }

  async function updateQuestion(key, question){
    var updates = {};
    console.log(key, question)
    updates['/events/' + eventId+"/questions/"+key] = question;
    return await firebase.database().ref().update(updates);
  }

  const getAllQuestions = React.useCallback((callback)=>{
    var starCountRef = firebase.database().ref('/events/' + eventId+"/questions/");
    starCountRef.on('value', function(snapshot) {
      callback(snapshot.val())
    });
  },[eventId])

  async function updateLikes(key, question){
    let likes = question.likes||{};
    if(likes[deviceId]){
      delete likes[deviceId]
    }else{
      likes[deviceId] = true;
    }
    // likes[deviceId] = !likes[deviceId];
    question.likes = likes; 
    await updateQuestion(key, question)
  }

  function withdrawQuestion(key){
    firebase.database().ref('/events/' + eventId+"/questions/"+key).set(null);
  }

  function createNewEvent(){
    var eventKey = firebase.database().ref('/events/').push().key;
    return shortHash.unique(eventKey);
  
  }


  return {
    login,
    signup,
    postQuestion, 
    getAllQuestions,
    updateLikes,
    withdrawQuestion,
    updateQuestion,
    createNewEvent
  }

}

export default useFirebase;