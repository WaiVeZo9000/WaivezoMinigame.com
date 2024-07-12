import React from 'react';
//import logo from './logo.svg';
import './App.css';
import MemoryGame from './components/memoryGame';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom';
import routes from './routes';
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute'
import {UserProvider, useUser} from './components/userContext';
import RPSGame from './components/rps'
import TicTacToe from './components/TicTacToe';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <UserProvider >
          <NavBar/>
          <Routes>
            {routes.map(route => 
                route.private ? (
                  <Route key={route.path} path={route.path}
                  element={<PrivateRoute element={route.component}/>}></Route>) :
                  (<Route key={route.path} path={route.path}
                  element={<route.component/>}>       
                  </Route>
                )         
              )}
          </Routes>
          </UserProvider>
        </Router>
      </AuthProvider>
      
    </div>
    
  );
}

export default App;
