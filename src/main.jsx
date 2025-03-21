import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './scss/all.scss';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>,
)
