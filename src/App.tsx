import { Routes, Route } from 'react-router-dom';
import { LevelsPage } from './Components/Levels/LevelsPage';
import { SingleLevel } from './Components/Level/SingleLevel';
import { AboutTest } from './Components/AboutTest/AboutTest';
import { TestingPage } from './Components/TestingPage/TestingPage';
import { TheoryPage } from './Components/TheoryPage/TheoryPage';
import { LoginPage } from './Components/Forms/LoginPage/LoginPage';
import { RegisterPage } from './Components/Forms/RegisterPage/RegisterPage';
import { CheckAuth } from './Components/CheckAuth/CheckAuth';
import { ProfilePageContainer } from './Components/ProfilePage/ProfilePageContainer';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/registration' element={<RegisterPage />}/>
        <Route path='/' element={<CheckAuth><LevelsPage/></CheckAuth>} />
        <Route path='/level' element={<CheckAuth><SingleLevel/></CheckAuth>} />
        <Route path='/test' element={<CheckAuth><AboutTest /></CheckAuth>} />
        <Route path='/testing' element={<CheckAuth><TestingPage /></CheckAuth>} />
        <Route path='/theory' element={<CheckAuth><TheoryPage /></CheckAuth>} />
        <Route path='/profile' element={<CheckAuth><ProfilePageContainer /></CheckAuth>} />
      </Routes>
    </div>
  );
}

export default App;
