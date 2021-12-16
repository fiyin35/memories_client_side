import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {

    try {
        // JWT login  
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data});
        console.log('You are supposed to route to homepage');
        history.push('/');
    } catch (err) {
        console.log(err);
    }
    
}

export const signup = (formData, history) => async (dispatch) => {
    //JWT signup 

    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data});
        history.push('/');
    } catch (err) {
        console.log(err);
    }
    

   
}