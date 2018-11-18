import * as actionTypes from '../../constants/actions';

const initalState = {
    inSwapMode: false,
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.ENTER_SWAP_MODE: 
            return {
                ...state,
                inSwapMode: !state.inSwapMode,
            }
        default:
            return state;
    }
};

export default reducer;
