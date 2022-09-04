import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './auth/Login';
import Questionaire from './components/Questionaire';
import Score from './components/Score';
import Settings from './components/Settings';
import NoMatch from './auth/NoMatch';
import SignupRBA from './auth/Signup';
import Header from './auth/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignupRBA/>}/>
          <Route path='/settings' element={<Settings />} />
          <Route path='/quiz/:id' element={<Questionaire />} />
          <Route path='/score/:score' element={<Score />} />        
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
