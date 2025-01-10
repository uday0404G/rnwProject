import { SET_ERROR, SET_LOADING, SET_USER, Token } from "./Actiontype";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    token: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
        case Token:
            return { ...state, token: action.payload };
        default:
            return state;
    }
}   

export default userReducer;
