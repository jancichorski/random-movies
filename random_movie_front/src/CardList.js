import React from "react"
import Card from "./Card"
import { useEffect, useState } from "react"
import { useSelector} from 'react-redux'
import { selectMovies } from "./movieSlice"



function CardList() {
    const stateMovies = useSelector(selectMovies);
    const [movies, setMovies] = useState([]);

    const updateMoviesData = (data) => {
        setMovies([])
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

    useEffect(() => {
        updateMoviesData(stateMovies)
    }, [stateMovies])




    return(
        <div>
            {movies === 0 ? <></> : 
                movies.map((user, i) => {
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
                })
            }
        </div>
    )
}

export default CardList