import React from 'react'

export default function Spacer( {children="",margin=0,padding=0}) {
  return (
    <div style={{margin:`${margin}px 0`, padding:`${padding}`}} >
      {children}
    </div>
  )
}
