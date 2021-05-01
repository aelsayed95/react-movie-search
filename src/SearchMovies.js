import React, {useState} from "react"
import {withStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import FilterList from "@material-ui/icons/FilterList";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import MovieCard from "./MovieCard"


const FilterButton = withStyles({
    root: {
      boxShadow: 'none',
      color: "white",
      backgroundColor: 'rgba(0,0,0,0.75)',
      borderColor: 'rgba(0,0,0,0.75)',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.85)',
        borderColor: 'rgba(0,0,0,0.85)',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: 'rgba(0,0,0,0.65)',
        borderColor: 'rgba(0,0,0,0.75)',
      },
      '&:focus': {
          backgroundColor: 'rgba(0,0,0,0.85)',
          borderColor: 'rgba(0,0,0,0.85)',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      }
    },
  })(IconButton);

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
            <form onSubmit={handleSubmit}>
                {/* <button className="button" type="button"><FilterList /></button> */}
                <Accordion>
                    <AccordionSummary expandIcon={<FilterButton component="span"><FilterList /></FilterButton>}>
                    <div className="search-bar">
                        <input
                            className="input"
                            type="text"
                            name="query"
                            placeholder="What do you want to watch?"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button className="button" type="submit" disabled={!query}>Search</button>
                    </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>Search Filters</p>
                    </AccordionDetails>
                </Accordion>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => <MovieCard key={movie.id} movie={movie}/>)}
            </div>
        </>
    )
}