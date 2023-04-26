import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './reset.css'
import './App.css';
import Home from './page/Home';
import Navigation from './components/Navigation';
import Members from './page/Members';
import Login from './page/Login';
import Entry from './page/Entry';

function App() {
  return (
    <div>
      <Navigation/>

      <div className='wrap'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/members' element={<Members/>}/>
          <Route path='/entry' element={<Entry/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
