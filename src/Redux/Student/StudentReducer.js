import { GET_ALL_COURSES, GET_COURSE_BY_ID, SET_LOADING, SET_ERROR, GET_PROFILE } from './actiontype';

const initialState = {
    courses: [],
    currentCourse: null,
    enrolledCourses: [],
    isLoading: false,
    error: null,
    profile: null
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COURSES:
            return { ...state, courses: action.payload, isLoading: false };
        case GET_COURSE_BY_ID:
            return { ...state, currentCourse: action.payload, isLoading: false };
        case SET_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload, isLoading: false };
        case GET_PROFILE:
            return { ...state, profile: action.payload, isLoading: false };
        case 'ENROLL_COURSE':
            return { 
                ...state, 
                isLoading: false 
            };
        case 'GET_ENROLLED_COURSES':
            return { 
                ...state, 
                enrolledCourses: action.payload,
                isLoading: false 
            };
        default:
            return state;
    }
};

export default studentReducer;
