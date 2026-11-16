import { Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { CreateApplicationProject } from './components/showcase/CreateApplicationProject';

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      <Header />
      <Routes>
        <Route path="/" element={<div className="p-10 text-center text-xl text-gray-500">Главная страница (тут будет витрина)</div>} />
        <Route path="/apply" element={<CreateApplicationProject />} />
      </Routes>
    </div>
  );
}

export default App;