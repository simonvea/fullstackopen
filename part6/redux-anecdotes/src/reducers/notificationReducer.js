
export const showNotification = (message) => {
  return {
    type: "ALERT",
    data: message
  }
}

export const removeNotification = () => {
  return {
    type: "REMOVE"
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case "ALERT": 
      return action.data
    case "REMOVE":
      return null
    default: 
      return state
  }
}


export default reducer