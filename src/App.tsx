import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'src/App.css';
import { HomePage } from 'src/pages/home-page';
import { EmailsPage } from 'src/pages/emails-page';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/emais" element={<EmailsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
