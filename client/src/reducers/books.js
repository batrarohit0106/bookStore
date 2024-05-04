import { FETCH_ALL_BOOKS, CREATE_BOOK, EDIT_BOOK, DELETE_BOOK } from "../constants/actionTypes";

const bookReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_ALL_BOOKS:
            console.log("Hello",action.payload);
            return action.payload;
        case CREATE_BOOK:
            return [...state, action.payload];
        case EDIT_BOOK:
            return state.map(book => book.id === action.payload.id ? action.payload : book);
        case DELETE_BOOK:
            return state.filter(book => book.id !== action.payload);
        default:
            return state;
    }
}

export default bookReducer