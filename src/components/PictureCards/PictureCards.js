import React, { useState, useEffect } from "react";
import './PictureCards.scss';
import axios from "axios";
import PictureCard from "../PictureCard/PictureCard";
import Preloader from "../ui-kit/Preloader/Preloader";

const PictureCards = () => {

    const [loading, setLoading] = useState(false);
    const [array1, setArray1] = useState([])
    const [array2, setArray2] = useState([])
    const [array3, setArray3] = useState([])

    useEffect(() => {
        setLoading(true);
        axios.all([
            axios.get('https://test-front.framework.team/paintings'),
            axios.get('https://test-front.framework.team/authors'),
            axios.get('https://test-front.framework.team/locations')
        ]).then(responce => {
            setArray1(responce[0].data)
            setArray2(responce[1].data)
            setArray3(responce[2].data)
            setLoading(false);
        })
    }, [])

    const test = array1.map((item) => {
        return {'namePicture': item.name,
                'id': item.id,
                'authorId': item.authorId,
                'created': item.created,
                'locationId': item.locationId,
                'imageUrl': item.imageUrl,
                }
    })

    const result = test.map((item) => Object.assign(item, array2.find((item2) => item2.id === item.authorId), array3.find((item3) => item3.id === item.locationId)))

    const cards = result.map((card, key) => (
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
