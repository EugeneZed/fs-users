const handlers = {

};
const initialState = {};
export default function homeReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
};
