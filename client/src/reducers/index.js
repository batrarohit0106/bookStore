import { combineReducers } from "redux";
import books from "./books"
import authentication from "./authentication"

export default combineReducers({
    books,
    authentication
});
