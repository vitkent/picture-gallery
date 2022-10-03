import React from "react";
import './PictureCards.scss';
import PictureCard from "../PictureCard/PictureCard";
import Preloader from "../ui-kit/Preloader/Preloader";

const PictureCards = ({result, loading, searchName}) => {

    const cards = result.filter((card) =>{
        return card.namePicture.toLowerCase().includes(searchName.toLowerCase())})
        .map((card, key) => (
            <li key={key} className="picture-cards__item">
                <PictureCard
                    key={key}
                    namePicture={card.namePicture}
                    imageUrl={card.imageUrl}
                    created={card.created}
                    location={card.location}
                    name={card.name}
                />
            </li>
    ))

    return (
        <div className="picture-cards">
            { loading
                ?   <Preloader width='150' height='150'/>
                :   <ul className="picture-cards__list">
                        {cards}
                    </ul>
            }
        </div>
    )
}


export default PictureCards
