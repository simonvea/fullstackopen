
export function addNotification(message) {
  return {
    type: 'NEW_NOTIFICATION',
    data: message
  }
}

export function removeNotification() {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default function notificationReducer(state = {}, action) {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return {}
  default:
    return state
  }
}