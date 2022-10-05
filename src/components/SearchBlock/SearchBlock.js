import React from "react";
import './SearchBlock.scss';
import Select from "../ui-kit/Select/Select";

const SearchBlock = ({authorsList, locationsList, searchName, onChangeSearchName}) => {

    const authors = authorsList.map((item, key) =>  (
        {
            id: key,
            text: item.name
        }
    ))

    const locations = locationsList.map((item, key) =>  (
        {
            id: key,
            text: item.location
        }
    ))

    return (
        <form className="search-block">
            <ul className="search-block__list">
                <li className="search-block__item">
                    <input className={["input", "input--name"].join(' ')} value={searchName} onChange={onChangeSearchName} placeholder="Name" type="text"/>
                </li>
                <li className="search-block__item">
                    <Select placeholder='Author' options={authors} />
                </li>
                <li className="search-block__item">
                    <Select placeholder='Location' options={locations} />
                </li>
                <li className="search-block__item">
                    <Select placeholder='Created' options={locations} />
                </li>
            </ul>
        </form>
    )
}

export default SearchBlock