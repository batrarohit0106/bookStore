import axios from 'axios';

const storedProfile = localStorage.getItem("profile");
const profile = storedProfile ? JSON.parse(storedProfile) : null;
const api = axios.create({
    baseURL: "http://localhost:5001",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': profile ? `Bearer ${profile.token}` : ''
    }
});

api.interceptors.request.use((req)=>{
    if(profile){
        req.headers.Authorization = `Bearer ${profile.token}`;
    }
    return req;
});

export const fetchBooks = async (userId) => api.get(`${"/books"}/${userId}`);
export const createBook = async (book) => api.post("/books", book);
export const editBook = async (id, book) => api.patch(`${"/books"}/${id}`, book);
export const deleteBook = async (id) => api.delete(`${"/books"}/${id}`);

export const login = async (formValues) => api.post("/user/login", formValues);
export const signup = async (formValues) => api.post("/user/signup", formValues);


