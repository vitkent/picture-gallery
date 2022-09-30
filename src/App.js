import React from "react";
import Header from "./components/Header/Header";
import PictureCards from "./components/PictureCards/PictureCards";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <Header/>
        <PictureCards/>
      </div>
    </div>
  );
}

export default App;
