const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
import react from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return(<>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  </>)


}

export default App
