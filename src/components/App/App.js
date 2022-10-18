import { useState, useEffect } from "react";

import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
const [loggedIn, setLoggedIn] = useState('false');

  return (
    <div className="root">
      <Main />
    </div>
  );
}

export default App;
