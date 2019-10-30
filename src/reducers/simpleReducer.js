export default (state = { counter: 0 }, action) => {
    switch (action.type) {
        case 'INCREASE_COUNTER':
            console.log(state);
            return {...state, counter: state.counter + 1 };
        default:
            return state;
    }
}