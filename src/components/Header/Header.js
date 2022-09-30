import React from "react";
import './Header.scss';
import Logo from "../Icons/Logo";
import Theme from "../Icons/Theme";

const Header = () => {
    return (
        <header className="header">
            <div className="header__icon-wrap">
                {React.createElement(Logo)}
            </div>
            <button className="button">
                {React.createElement(Theme)}
            </button>
        </header>
    )
}

export default Header