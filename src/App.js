import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Blog from './components/Blog';
import Todo from './components/Todo';
import Clock from './components/Clock'
import { BrowserRouter, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/todo" component={Todo} />
        <Route path="/clock" component={Clock} />
      </div>
    </BrowserRouter>
  );
}

export default App;
