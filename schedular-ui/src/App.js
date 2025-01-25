import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav';
import JobDetailsList from './components/Schedular';

function App() {
  return (
    <div className="App">
      <h1>Schedular UI Application</h1>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<JobDetailsList />} />
          {/* <Route path='/add' element={<AddProduct />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
