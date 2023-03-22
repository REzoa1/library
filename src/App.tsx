import React from "react";
import "./App.css";
import { Stack } from "react-bootstrap";
import { SearchBlock } from "./components/SearchBlock/SearchBlock";
import { MainBlock } from "./components/MainBlock/MainBlock";

function App() {
  return (
    <Stack className="App">
      <SearchBlock />
      <MainBlock />
    </Stack>
  );
}

export default App;
