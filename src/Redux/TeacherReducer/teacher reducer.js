import {
    GET_ALL_COURSES,
    ADD_COURSE,
    UPDATE_COURSE,
    DELETE_COURSE,
    GET_ALL_STUDENTS,
    SET_LOADING,
    SET_ERROR,
    GET_ALL_USERS
} from './actiontype';

const initialState = {
    courses: [],
    users: null,
    isLoading: false,
    error: null
};

const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COURSES:
            return { ...state, courses: action.payload, isLoading: false };
        case ADD_COURSE:
            return { 
                ...state, 
                courses: [...state.courses, action.payload],
                isLoading: false 
            };
        case UPDATE_COURSE:
            return {
                ...state,
                courses: state.courses.map(course => 
                    course._id === action.payload._id ? action.payload : course
                ),
                isLoading: false
            };
        case DELETE_COURSE:
            return {
                ...state,
                courses: state.courses.filter(course => course._id !== action.payload),
                isLoading: false
            };
        case GET_ALL_STUDENTS:
            return { ...state, students: action.payload, isLoading: false };
        case SET_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload, isLoading: false };
        case GET_ALL_USERS:
            return { ...state, users: action.payload, isLoading: false };
        default:
            return state;
    }
};

export default teacherReducer;
