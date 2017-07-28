export default (state = 0, action) => {
  switch(action.type) {
    case 'test':
      return state + 1
    default:
      return state
  }
}
