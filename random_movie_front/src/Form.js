import React from "react";
import "./Form.css";
import { useState, useEffect } from "react";
import Card from "./Card";

function Form() {
    const [isLoading, setIsLoading] = useState(false);
    const [mediaType, setMediaType] = useState('all');
    const [page, setPage] = useState(1);
    const [timeWindow, setTimeWindow] = useState('week');
    const [movies, setMovies] = useState([]);
    const localHost = "http://127.0.0.1/trending_movies";

    const getRandomInt = (max) => {
        const randomInt = Math.floor(Math.random() * max)
        if (randomInt < 1) {
            return 1
        }
        return randomInt
    }

    const getRandomMovie = () => {
        setPage(getRandomInt(60))
    }

    const previousPage = () => {
        if (page > 1){
            setPage(page - 1)
        }
        return page;
    }

    const nextPage = () => {
        setPage(page + 1)
        return page;
    }

    const handleData = (data) => {
        data.forEach(movie => {
            setMovies(movies => [...movies, {
                title: movie['title'] || movie['name'],
                overView: movie['overview'],
                rating: movie['vote_average'] ? (movie['vote_average']).toFixed(1) : null,
                imgPath: movie['backdrop_path'] || movie['poster_path'],
                releaseDate: movie['release_date'] || movie['first_air_date']
            }])
        });
    }


    const sendForm = (event) => {
        setIsLoading(true)
        event.preventDefault()
        setMovies([])
        fetch(localHost, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                'media_type': mediaType,
                'time_window': timeWindow,
                'page': page
            })
        }).then(res => {
            const responseData = res.json();
            setIsLoading(false);
            return responseData;
        }).then(responseData => {
            console.warn(responseData.results)
            handleData(responseData.results)
        }).catch(err => {
            console.warn(err);
        })
    }
    useEffect(() => {

    },[movies])

    return (
        <div className="trending">
            <div className="trending__left">
                <form onSubmit={sendForm} className="form">
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
            <div className="trending__right">
                {movies ? movies.map((user, i) => {
                    return(
                        <Card 
                            key={i}
                            title={movies[i].title}
                            overView={movies[i].overView}
                            rating={movies[i].rating}
                            imgPath={movies[i].imgPath}
                            releaseDate={movies[i].releaseDate}
                        />
                    )
                }) : <div></div>}
            </div>
        </div>
    );
}

export default Form;
