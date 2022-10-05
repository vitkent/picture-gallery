import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import PictureCards from "./components/PictureCards/PictureCards";
import SearchBlock from "./components/SearchBlock/SearchBlock";
import Pagination from "./components/ui-kit/Pagination/Pagination";
import axios from "axios";

const App = () => {

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([])
  const [authors, setAuthors] = useState([])
  const [locations, setLocations] = useState([])
  const [searchName, setSearchName] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const baseUrl = 'https://test-front.framework.team/';
  const limit = 12

  useEffect(() => {
      setLoading(true);
      axios.all([
          axios.get(`${baseUrl}paintings`, {
            params: {
              _limit: limit,
              _page: currentPage
            }
          }),
          axios.get(`${baseUrl}authors`),
          axios.get(`${baseUrl}locations`),
      ]).then(responce => {
          setState(responce[0].data)
          setAuthors(responce[1].data)
          setLocations(responce[2].data)
          setPageCount(Math.ceil(responce[0].headers['x-total-count'] / limit))
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

  // Фильтры
  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
  }

  // Пагинация
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

  const pageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="App">
      <div className="container">
        <Header/>
        <SearchBlock
          authorsList={authors}
          locationsList={locations}
          searchName={searchName}
          onChangeSearchName={onChangeSearchName}
        />
        <PictureCards
          result={result}
          loading={loading}
          searchName={searchName}
        />
        <Pagination
          nextPage={nextPage}
          prevPage={prevPage}
          firstPage={firstPage}
          lastPage={lastPage}
          pageChange={pageChange}
          pages={pages}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export default App;
