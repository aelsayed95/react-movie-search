import React, {useState} from "react"

import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from "@material-ui/core/IconButton";
import FilterList from "@material-ui/icons/FilterList";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";


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
        }
        catch(err) {
            console.log(err)
        }
    }

    // Open/close filter settings
    const [open, setOpen] = React.useState(false);  
    const handleFilterClick = (event) => {
        event.preventDefault()
        setOpen(!open, [open]);
    };
  
    // Sort by Ratings
    const [ratingDesc, setRatingDesc] = React.useState(true);
    const sortRatings = (event) => {
        event.preventDefault()
        setRatingDesc(prevRatingDesc => !prevRatingDesc, [ratingDesc])
    }

    // display results
    const displayResults = () => {
        const sortFactor = ratingDesc ? -1 : 1;
        return movies
            .filter(movie => movie.poster_path)
            .sort((movie_a, movie_b) => (movie_a.vote_average -  movie_b.vote_average) * sortFactor)
            .map(movie => {
                console.log(movie.vote_average)
                return <MovieCard key={movie.id} movie={movie}/>
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="search-bar">
                        <input
                            className="input"
                            type="text"
                            name="query"
                            placeholder="What do you want to watch?"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button className="button" type="submit" disabled={!query}>Search</button>
                        <FilterButton onClick={handleFilterClick}>
                            <FilterList />
                        </FilterButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <div className="filter-settings">
                            <button
                                className="button"
                                onClick={sortRatings}
                            >
                            <span>Ratings  </span>
                            {ratingDesc ? <ArrowDownward /> : <ArrowUpward />}
                            </button>
                            <button className="button">Release Date</button>
                            </div>
                        </Collapse>
                </div>
            </form>
            <div className="card-list">
                {displayResults()}
            </div>
        </>
    )
}