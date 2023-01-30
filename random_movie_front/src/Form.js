import React from "react";
import "./Form.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "./movieSlice";
import { selectMovies } from "./movieSlice";

function Form() {
    const stateMovies = useSelector(selectMovies)
    const [isLoading, setIsLoading] = useState(false);
    const [mediaType, setMediaType] = useState('all');
    const [page, setPage] = useState(1);
    const [timeWindow, setTimeWindow] = useState('week');
    const dispatch = useDispatch();

    const fetchData = (event) => {
        event.preventDefault();
        const dataToSend = {
            'media_type': mediaType,
            'time_window': timeWindow,
            'page': page
        }
        dispatch(getMovies(dataToSend))
    }


    const getRandomInt = (max) => {
        const randomInt = Math.floor(Math.random() * max)
        if (randomInt < 1) {
            return 1
        }
        return randomInt
    }

    const getRandomMovie = (e) => {
        setPage(getRandomInt(60))
    }

    const previousPage = (e) => {
        if (page > 1){
            setPage(page - 1)
        }
    }

    const nextPage = (e) => {
        setPage(page + 1)
    }

    useEffect(() => {

    }, [page])


    return (
        <div className="trending">
            <div className="trending__left">
                <form onSubmit={fetchData} className="form">
                    <fieldset>
                        <legend>Select media type:</legend>
                        <div className="form__option">
                            <input type="radio" name="media" id="All" value="all" onChange={(event) => setMediaType(event.target.value)} />
                            <label htmlFor="All">All</label>
                        </div>
                        <div className="form__option">
                            <input type="radio" name="media" id="Movie" value="movie" onChange={(event) => setMediaType(event.target.value)} />
                            <label htmlFor="Movie">Movie</label>
                        </div>
                        <div className="form__option">
                            <input type="radio" name="media" id="Tv" value="tv" onChange={(event) => setMediaType(event.target.value)} />
                            <label htmlFor="Tv">Tv</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Select time window:</legend>
                        <div className="form__option">
                            <input type="radio" name="time" id="Day" value="day" onChange={(event) => setTimeWindow(event.target.value)} />
                            <label htmlFor="Day">Day</label>
                        </div>
                        <div className="form__option">
                            <input type="radio" name="time" id="Week" value="week" onChange={(event) => setTimeWindow(event.target.value)} />
                            <label htmlFor="Week">Week</label>
                        </div>
                    </fieldset>
                    <button type="submit" className="form__button" onClick={getRandomMovie}>
                        {isLoading ? <div className="loader"></div> :
                            'Get Random'}
                    </button>
                    <button type="submit" className="form__button">
                        {isLoading ? <div className="loader"></div> :
                            'Get Trending'}
                    </button>
                    <div className="pages">
                        <button type="submit" className="form__button" onClick={previousPage}>
                            {isLoading ? <div className="loader"></div> :
                                'Previous Page'}
                        </button>
                        <button type="submit" className="form__button" onClick={nextPage}>
                            {isLoading ? <div className="loader"></div> :
                                'Next Page'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;
