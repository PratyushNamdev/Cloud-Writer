import React from 'react'
import ReactLoading from 'react-loading'

export default function Loading() {
  return (
    <div style={{
        position:"fixed",
        top:"0",
        left:"0",
        height:"100%",
        width:"100%",
        background:"rgba(0,0,0,0.7)",
        zIndex:'10',
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }}>
      <ReactLoading type={"spin"} color={'blue'} height={"5%"} width={'10%'} />
    </div>
  )
}
