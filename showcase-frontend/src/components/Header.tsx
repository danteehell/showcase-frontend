import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from './ui/Button.tsx';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b sticky top-0 z-10">
      <div className="text-xl font-bold text-gray-900">Витрина проектов</div>
      <div>
        <Button onClick={() => navigate('/apply')}>Предложить проект</Button>
      </div>
    </header>
  );
};