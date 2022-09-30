import React from "react";
import preloader from '../../../assets/img/preloader.svg'

const Preloader = (props) => {
    return (
        <img src={preloader} width={props.width} height={props.height} alt='preloader'/>
    )
}

export default Preloader