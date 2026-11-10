import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShowcasePage } from './pages/ShowcasePage';
import { ProjectDetail } from './pages/ProjectDetailsPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowcasePage />} />
      
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;