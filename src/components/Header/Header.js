import React, {useState, useEffect} from "react";
import './Header.scss';
import Logo from "../Icons/Logo";
import Theme from "../Icons/Theme";

const Header = () => {

    const [theme, setTheme] = useState('dark')

    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    useEffect(() => {
        const backgroundColor = `var(--background-color-${theme})`
        const fontColor = `var(--font-color-${theme})`
        const backgroundInput = `var(--background-input-${theme})`
        const borderColor = `var(--border-color-${theme})`
        const placeholderColor = `var(--placeholder-color-${theme})`
        const hoverColor = `var(--hover-color-${theme})`

        document.body.style.setProperty('--background-color', backgroundColor)
        document.body.style.setProperty('--font-color', fontColor)
        document.body.style.setProperty('--background-input', backgroundInput)
        document.body.style.setProperty('--border-color', borderColor)
        document.body.style.setProperty('--placeholder-color', placeholderColor)
        document.body.style.setProperty('--hover-color', hoverColor)
    }, [theme])

    return (
        <header className="header">
            <div className="header__icon-wrap">
                {React.createElement(Logo)}
            </div>
            <button className="button" onClick={changeTheme}>
                {React.createElement(Theme)}
            </button>
        </header>
    )
}

export default Header