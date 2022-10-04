import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import PictureCards from "./components/PictureCards/PictureCards";
import SearchBlock from "./components/SearchBlock/SearchBlock";
import axios from "axios";

import ArrowNext from "./components/Icons/ArrowNext";
import ArrowNextDouble from "./components/Icons/ArrowNextDouble";

const App = () => {

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([])
  const [authors, setAuthors] = useState([])
  const [locations, setLocations] = useState([])
  const [searchName, setSearchName] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const baseUrl = 'https://test-front.framework.team/';

  useEffect(() => {
      setLoading(true);
      axios.all([
          axios.get(`${baseUrl}paintings?_limit=12&_page=${currentPage}`),
          axios.get(`${baseUrl}authors`),
          axios.get(`${baseUrl}locations`),
          axios.get(`${baseUrl}paintings`),
      ]).then(responce => {
          setState(responce[0].data)
          setAuthors(responce[1].data)
          setLocations(responce[2].data)
          setPageCount(Math.ceil(responce[3].data.length/12))
          setLoading(false);
      })
  }, [currentPage])

  const editState = state.map((item) => {
    return {
      'namePicture': item.name,
      'id': item.id,
      'authorId': item.authorId,
      'created': item.created,
      'locationId': item.locationId,
      'imageUrl': item.imageUrl,
      }
  })

  const result = editState.map((item) => Object.assign(item, authors.find((item2) => item2.id === item.authorId), locations.find((item3) => item3.id === item.locationId)))

  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
  }

  const nextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  const prevPage = () => {
    setCurrentPage(prev => prev - 1)
  }

  const firstPage = () => {
    setCurrentPage(1)
  }

  const lastPage = () => {
    setCurrentPage(pageCount)
  }

  const pages = [];

  for (let i=1; i <= pageCount; i++) {
      pages.push(i);
  }

  const PageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="App">
      <div className="container">
        <Header/>
        <SearchBlock authorsList={authors} locationsList={locations} searchName={searchName} onChangeSearchName={onChangeSearchName}/>
        <PictureCards result={result} loading={loading} searchName={searchName}/>

        <div className="pagination">
          <button className={["button", "button--prev", "button--double", currentPage === 1 ? "disabled" : ""].join(' ')} onClick={firstPage}>
            {React.createElement(ArrowNextDouble)}
          </button>
          <button className={["button", "button--prev", currentPage === 1 ? "disabled" : ""].join(' ')} onClick={prevPage}>
            {React.createElement(ArrowNext)}
          </button>
          {pages.map((page, key) => (
                <span key={key}
                className={["pagination__page", currentPage === page ? "pagination__page--active" : ""].join(' ')}
                onClick={() => PageChange(page)}
                >{page}</span>
            ))}
          <button className={["button", "button--next", currentPage === pageCount ? "disabled" : ""].join(' ')} onClick={nextPage}>
            {React.createElement(ArrowNext)}
          </button>
          <button className={["button", "button--next", "button--double", currentPage === pageCount ? "disabled" : ""].join(' ')} onClick={lastPage}>
            {React.createElement(ArrowNextDouble)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
