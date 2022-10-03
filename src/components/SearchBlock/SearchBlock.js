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
            <input className={["input", "input--name"].join(' ')} value={searchName} onChange={onChangeSearchName} placeholder="Name" type="text"/>
            <Select selectID='select-3' placeholder='Author' options={authors} />
            <Select selectID='select-4' placeholder='Location' options={locations} />
        </form>
    )
}

export default SearchBlock