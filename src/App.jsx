import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return(<>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  </>)


}

export default App
