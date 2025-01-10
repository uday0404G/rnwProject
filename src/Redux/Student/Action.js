import { GET_ALL_COURSES, GET_COURSE_BY_ID, SET_LOADING, SET_ERROR, GET_PROFILE, ENROLL_COURSE, GET_ENROLLED_COURSES } from './actiontype';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

// Action to fetch all courses
export const getAllCourses = () => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await axios.get('https://rnwprojectbackend.onrender.com/courses', {
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
        const response = await axios.get(
            `https://rnwprojectbackend.onrender.com/courses/${courseId}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            }
        );
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

// Action to enroll in a course
export const enrollInCourse = (courseId) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await axios.post(
            `https://rnwprojectbackend.onrender.com/enrollment/enroll/${courseId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            }
        );
        dispatch({ type: ENROLL_COURSE, payload: response.data });
        return { success: true };
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
        return { success: false, error: error.message };
    }
};

// Action to get enrolled courses
export const getEnrolledCourses = () => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await axios.get(
            'https://rnwprojectbackend.onrender.com/enrollment/my-courses',
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            }
        );
        dispatch({ type: GET_ENROLLED_COURSES, payload: response.data });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};
