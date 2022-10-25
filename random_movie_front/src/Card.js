import React from "react";
import './Card.css'

function Card({title, overView, rating, imgPath, releaseDate}){
    return(
        <div className="card">
            <div className="card__left">
                {imgPath ? <img 
                    alt=''
                    src={'https://image.tmdb.org/t/p/w342' + imgPath}
                /> : ''}
            </div>
            <div className="card__right">
                <h3>{title}</h3>
                <p>{overView}</p>
                {rating ? <p>Rating: {rating}/10</p> :
                <p>Rating unavailable</p>}
                {releaseDate ? <p>Release date: {releaseDate}</p> : <></>}
            </div>
        </div>
    )
}

export default Card;