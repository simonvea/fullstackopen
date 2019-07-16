
export function loginUser(user) {
  return {
    type: 'LOGIN',
    data: user
  }
}

export function logoutUser() {
  return {
    type: 'LOG_OUT',
  }
}

export default function reducer(state = null, action) {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOG_OUT':
    return { user: null, }
  default:
    return state
  }
}