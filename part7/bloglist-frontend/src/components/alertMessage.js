import React from 'react'

const AlertMessage = ({ type, message }) => {

  if(!type) return null

  let color, bgColor

  if(type === 'add') {
    color = 'green'
    bgColor = 'lightgreen'
  } else if (type === 'error') {
    color = 'red'
    bgColor = 'rosybrown'
  }

  const msgStyle = {
    border: `2px solid ${color}`,
    backgroundColor: `${bgColor}`,
    fontSize: 16,
    color: `${color}`,
    borderRadius: 2,
    padding: 4,
    width: 200
  }


  return (
    <div style={msgStyle}>
      {message}
    </div>
  )
}

export default AlertMessage