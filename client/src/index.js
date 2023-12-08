import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import ArticleStore from "./store/ArticleStore";


export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Context.Provider value={{
        user: new UserStore(),
        article: new ArticleStore(),
    }}>
        <App/>
    </Context.Provider>
);

