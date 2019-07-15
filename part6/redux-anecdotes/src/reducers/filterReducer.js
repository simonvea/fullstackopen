
export const addFilter = (data) => {
  return {
    type: "NEW_FILTER",
    data
  }
}

export const removeFilter = () => {
  return {
    type: "REMOVE"
  }
}

function reducer(state = '', action) {
  switch(action.type) {
    case "NEW_FILTER":
      return action.data  
    case "REMOVE":
      return ''
    default:
      return state
  }

}

export default reducer