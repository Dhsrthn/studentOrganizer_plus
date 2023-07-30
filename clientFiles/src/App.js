import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/welcome';
import HomePage from './pages/homepage';
import CalenderView from './pages/calenderview';
import Create from './pages/create';
import Expenses from './pages/expenses';
import NotFound from './pages/notFound';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path='/' element={<WelcomePage/>}></Route>
          <Route exact path='/home' element={<HomePage/>}></Route>
          <Route exact path='/calendar' element={<CalenderView/>}></Route>
          <Route exact path='/create/:value' element={<Create/>}></Route>
          <Route exact path='/expenses' element={<Expenses/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </Router>
    </div>
    
    
  );
}

export default App;
