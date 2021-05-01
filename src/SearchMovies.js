import React, {useState} from "react"
import MovieCard from "./MovieCard"


export default function SearchMovies() {

    // states - query, movies
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = `https://api.themoviedb.org/3/search/movie?api_key=15375abef64b958735c897dab99d2943&language=en-US&query=${query}&page=1&include_adult=false`;
        try {
            const result = await fetch(url)
            const data = await result.json()
            setMovies(data.results)
            console.log(data.results)
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="query" className="label">Movie Name</label>
                <input
                    className="input"
                    type="text"
                    name="query"
                    placeholder="What do you want to watch?"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => <MovieCard key={movie.id} movie={movie}/>)}
            </div>
        </>
    )
}