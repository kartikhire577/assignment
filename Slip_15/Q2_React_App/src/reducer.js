import { DECREMENT, INCREMENT, RESET } from "./actions.js";

const initialState = { count: 0 };

// A reducer is a pure function: (state, action) => newState
export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT: return { ...state, count: state.count + 1 };
    case DECREMENT: return { ...state, count: state.count - 1 };
    case RESET:     return initialState;
    default:        return state;
  }
}
