import React from "react"

import './css/MovieCard.css';
import ExpandableDescr from "./ExpandableDescr";


export default function MovieCard({movie}) {
    return (
        <div className="card">
            <img
                className="card--image"
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title + ' poster'}>
            </img>
            <div className="card--content">
                <h3 className="card--title">{movie.title}</h3>
                <p className="card--info">
                    <small>RELEASE DATE: {movie.release_date}</small>
                    <small className="ratings">RATING: {movie.vote_average}</small>
                </p>
                <ExpandableDescr overview={movie.overview}/>
            </div>
        </div>
    )
}