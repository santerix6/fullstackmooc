const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':

      return {
        good : state.good+1,
        ok : state.ok,
        bad: state.bad
      }
    case 'OK':
    return {
      ok : state.ok+1,
      good : state.good,
      bad: state.bad
    }
    case 'BAD':
    return {
      bad : state.bad+1,
      good : state.good,
      ok : state.ok

    }
    case 'ZERO':

      return {
        bad: 0,
        good: 0,
        ok:0
      }
    default: return state
  }

}

export default counterReducer
