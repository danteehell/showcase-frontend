import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShowcasePage } from './pages/ShowcasePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowcasePage />} />
      
        <Route 
          path="/projects/:id" 
          element={<div className="p-10 text-center text-2xl">Страница конкретного проекта в разработке...</div>} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;