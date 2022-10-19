import { useState, useEffect } from "react";

import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import Footer from '../Footer/Footer';

import './App.css';

function App() {
const [loggedIn, setLoggedIn] = useState('false');

  return (
    <div className="app">
      <Main />
      <Movies />
    </div>
  );
}

export default App;
