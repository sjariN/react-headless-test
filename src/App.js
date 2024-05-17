import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Headless from './components/Headless';
import Newone from './components/Newone';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Headless />} path='/'></Route>
        <Route element={<Newone />} path='/newone'></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
