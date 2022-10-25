import React from "react"
import "./CardList.css"
import Card from "./Card"
import {useSelector} from 'react-redux'



function CardList() {
    const title = useSelector(state => state.trialMovie.title)
    const overView = useSelector(state => state.trialMovie.overView)
    const rating = useSelector(state => state.trialMovie.rating)
    const imgPath = useSelector(state => state.trialMovie.imgPath)
    const releaseDate = useSelector(state => state.trialMovie.releaseDate)



    return(
        <div>
            <Card
                title={title}
                overView={overView}
                rating={rating}
                imgPath={imgPath}
                releaseDate={releaseDate}
            />
        </div>
    )
}

export default CardList