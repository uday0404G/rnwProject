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
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://rnwprojectbackend.onrender.com';

// Helper function for headers
const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
    }
});

// Course Actions
export const getAllCourses = () => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await axios.get(`${API_URL}/courses`, getHeaders());
        dispatch({ type: GET_ALL_COURSES, payload: response.data });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.response?.data?.message || 'Failed to fetch courses' });
    }
};

export const addCourse = (courseData) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await axios.post(`${API_URL}/courses`, courseData, getHeaders());
        dispatch({ type: ADD_COURSE, payload: response.data });
        return { success: true };
    } catch (error) {
        console.error('Add course error:', error.response?.data || error.message);
        dispatch({ 
            type: SET_ERROR, 
            payload: error.response?.data?.message || error.message || 'Failed to add course' 
        });
        return { 
            success: false, 
            error: error.response?.data?.message || error.message 
        };
    }
};

export const updateCourse = (courseId, courseData) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await axios.put(`${API_URL}/courses/${courseId}`, courseData, getHeaders());
        dispatch({ type: UPDATE_COURSE, payload: response.data });
        return { success: true };
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.response?.data?.message || 'Failed to update course' });
        return { success: false, error: error.response?.data?.message };
    }
};

export const deleteCourse = (courseId) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        await axios.delete(`${API_URL}/courses/${courseId}`, getHeaders());
        dispatch({ type: DELETE_COURSE, payload: courseId });
        return { success: true };
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.response?.data?.message || 'Failed to delete course' });
        return { success: false, error: error.response?.data?.message };
    }
};

// Student Actions
export const getAllStudents = () => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await axios.get(`${API_URL}/user/getallusers`, getHeaders());
        const students = response.data
          .filter(user => user.role === 'student')
          .map(student => ({
            ...student,
            enrolledCourses: student.enrolledCourses || []
          }));
        dispatch({ type: GET_ALL_STUDENTS, payload: students });
    } catch (error) {
        console.error('Get students error:', error);
        dispatch({ type: SET_ERROR, payload: error.response?.data?.message || 'Failed to fetch students' });
    }
};

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await axios.get(`${API_URL}/user/getallusers`, getHeaders());
        dispatch({ type: GET_ALL_USERS, payload: response.data });
    } catch (error) {
        console.error('Get users error:', error);
        dispatch({ type: SET_ERROR, payload: error.response?.data?.message || 'Failed to fetch users' });
    }
};
