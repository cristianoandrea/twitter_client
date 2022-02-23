import './App.css';
import { Component } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import Navbar from './components/Navbar';
import TwitterSection from './sections/TwitterSection';
import TriviaSection from './sections/TriviaSection';
import ContestSection from './sections/ContestSection';
import StreamSection from './sections/StreamSection';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TwitterSection />} />
            <Route path="/twitter" element={<TwitterSection />} />
            <Route path="/trivia" element={<TriviaSection />} />
            <Route path="/contest" element={<ContestSection />} />
            <Route path="/stream" element={<StreamSection/>}/>
          </Routes>
        </BrowserRouter>

      </div>
    );
  }
}


export default App;
