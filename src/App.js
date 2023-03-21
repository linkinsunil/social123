import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Post from './pages/Post';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/post/:slug' element={<Post />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
