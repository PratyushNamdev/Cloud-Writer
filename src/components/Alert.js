import React from 'react'

export default function Alert(props) {
  return (
    <div style={{
        minHeight :'2em'
      }}>
        {props.message &&   <div style={{
          padding:'2px',
          backgroundColor : '#198754',
          color:'#023020',

        }
        }>
          <strong style={{
            marginLeft:'5em'
          }}>{props.message}</strong>
        </div>}
      </div>
  )
}
