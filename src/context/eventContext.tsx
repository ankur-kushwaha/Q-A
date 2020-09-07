import React from 'react'
import ClientJS from 'clientjs';

let client = new ClientJS();

var fingerprint = require('browser-fingerprint')()


let Context = React.createContext();

function Provider({children}) {

  let [eventContext, setEventContext] = React.useState({
    deviceId:fingerprint
  });

  const setEventId = React.useCallback((eventId)=>{
    setEventContext({
      ...eventContext,
      eventId
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Context.Provider value={{eventContext, setEventId}}>
      {children}
    </Context.Provider>
  )
}

export{
  Provider as EventProvider, 
  Context as EventContext
}