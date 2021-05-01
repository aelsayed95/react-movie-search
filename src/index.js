import React from "react"
import ReactDOM from "react-dom"

import SearchMovies from "./SearchMovies";
import './css/index.css';

function App() {
    return (
        <div className="container">
            <h1 className="title">Movie Search</h1>
            <SearchMovies />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById("root"))