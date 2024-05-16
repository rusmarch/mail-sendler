import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { HomePage } from './pages/home-page';
import { EmailsPage } from './pages/emails-page';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/emails' element={<EmailsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
