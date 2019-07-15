
export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: "ALERT",
      data: message
    })
    setTimeout(() => dispatch({
      type: "REMOVE"
    }),time * 1000)
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