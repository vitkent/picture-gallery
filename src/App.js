import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import PictureCards from "./components/PictureCards/PictureCards";
import SearchBlock from "./components/SearchBlock/SearchBlock";
import axios from "axios";

const App = () => {

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([])
  const [authors, setAuthors] = useState([])
  const [locations, setLocations] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
      setLoading(true);
      axios.all([
          axios.get('https://test-front.framework.team/paintings'),
          axios.get('https://test-front.framework.team/authors'),
          axios.get('https://test-front.framework.team/locations')
      ]).then(responce => {
          setState(responce[0].data)
          setAuthors(responce[1].data)
          setLocations(responce[2].data)
          setLoading(false);
      })
  }, [])

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

  return (
    <div className="App">
      <div className="container">
        <Header/>
        <SearchBlock authorsList={authors} locationsList={locations} searchName={searchName} onChangeSearchName={onChangeSearchName}/>
        <PictureCards result={result} loading={loading} searchName={searchName}/>
      </div>
    </div>
  );
}

export default App;
