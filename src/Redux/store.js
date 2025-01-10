import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './Auth/userReducer';
import studentReducer from './Student/StudentReducer';
import teacherReducer from './TeacherReducer/teacher reducer';

const rootReducer = combineReducers({
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
