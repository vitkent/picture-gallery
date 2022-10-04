import React from "react";
import './PictureCard.scss';

const PictureCard = ({ imageUrl, namePicture, name, created, location }) => {

    const baseUrl = 'https://test-front.framework.team'

    return (
        <div className="picture-card">
            <img className="picture-card__img" src={baseUrl+imageUrl} alt={namePicture} height="275" width="360" />
            <div className="picture-card__content">
                <span className="picture-card__title">{namePicture}</span>
                <div className="picture-card__description">
                    <div className="picture-card__group">
                        <span className="picture-card__label">Author:</span>
                        <span className="picture-card__value">{name}</span>
                    </div>
                    <div className="picture-card__group">
                        <span className="picture-card__label">Created:</span>
                        <span className="picture-card__value">{created}</span>
                    </div>
                    <div className="picture-card__group">
                        <span className="picture-card__label">Location:</span>
                        <span className="picture-card__value">{location}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PictureCard