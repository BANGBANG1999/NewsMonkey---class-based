
import './App.css';
import './components/NavBar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

const App = (props) => {

const [progress, setProgress] = useState(0)

  const pageSize = 9;
  const apiKey = process.env.REACT_APP_API_KEY

    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
        color='#f11946'
        progress={progress}
        // progress={40}
        height={3}
      />
        <Routes>
            <Route  path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="/" pageSize={pageSize} country='in' category='general'/>} />
            <Route  path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country='in' category='business'/>} />
            <Route  path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country='in' category='entertainment'/>} />
            <Route  path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country='in' category='health'/>} />
            <Route  path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country='in' category='science'/>} />
            <Route  path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country='in' category='sports'/>} />
            <Route  path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country='in' category='technology'/>} />
            <Route  path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='in' category='general'/>} />
          
        </Routes>
        </Router>
      </div>
    );
}
export default App