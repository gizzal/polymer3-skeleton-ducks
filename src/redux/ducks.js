import createDuck from "@portavita/js-portavita-utilities/redux-ducks/ducks.js";

const ducks = createDuck("App");

export const DECREASE_VALUE = ducks.defineType("DECREASE_VALUE");
export const decreaseValue = ducks.createAction(DECREASE_VALUE);

export const INCREASE_VALUE = ducks.defineType("INCREASE_VALUE");
export const increaseValue = ducks.createAction(INCREASE_VALUE);

const initialState = {
  count: 0
};

export default ducks.createReducer(
  {
    [DECREASE_VALUE]: state => ({...state, count: state.count - 1}),
    [INCREASE_VALUE]: state => ({...state, count: state.count + 1})
  },
  initialState
);
