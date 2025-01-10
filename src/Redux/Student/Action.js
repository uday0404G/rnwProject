import { GET_ALL_COURSES, GET_COURSE_BY_ID, SET_LOADING, SET_ERROR, GET_PROFILE } from './actiontype';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

// Action to fetch all courses
export const getAllCourses = () => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await axios.get('http://localhost:8080/courses', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        dispatch({ type: GET_ALL_COURSES, payload: response.data });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Action to fetch a single course by ID
export const getCourseById = (courseId) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await axios.get(`http://localhost:8080/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        dispatch({ type: GET_COURSE_BY_ID, payload: response.data });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Action to fetch user profile
export const getProfile = () => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const token = Cookies.get('token');
        const decoded = jwtDecode(token);
        
        dispatch({ 
            type: GET_PROFILE, 
            payload: {
                name: decoded.name,
                email: decoded.email,
                avatar: 'https://ui-avatars.com/api/?name=' + decoded.name
            } 
        });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};
