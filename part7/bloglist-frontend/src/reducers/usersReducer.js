
export function initUsers(users){
  return {
    type: 'INIT_USERS',
    data: users
  }
}

function usersReducer(state = [], action) {
  switch(action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export default usersReducer