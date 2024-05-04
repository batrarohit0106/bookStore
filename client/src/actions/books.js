import * as api from "../api";
import {FETCH_ALL_BOOKS, CREATE_BOOK, EDIT_BOOK, DELETE_BOOK} from "../constants/actionTypes";
 
export const getBooks = (userId) => async (dispatch) =>{
    try{
        const {data} = await api.fetchBooks(userId);
        console.log("fronteak",data);
        
        dispatch({type: FETCH_ALL_BOOKS, payload: data});
    } catch(error){
        console.log(error.message)
    }
};

export const createBook = (book) => async (dispatch) =>{
    try{
        const {data} = await api.createBook(book);
        dispatch({type: CREATE_BOOK, payload: data});
    } catch(error){
        console.log(error.message);
    }
};

export const editBook = (id, book) => async (dispatch) => {
    try{
        const {data} = await api.editBook(id, book);
        dispatch({type: EDIT_BOOK, payload: data});
    } catch(error){
        console.log(error.message);
    }
};

export const deleteBook = (id) => async(dispatch) => {
    try{
        await api.deleteBook(id);
        dispatch({type: DELETE_BOOK, payload: id});
    } catch(error){
        console.log(error.message);
    }
};
