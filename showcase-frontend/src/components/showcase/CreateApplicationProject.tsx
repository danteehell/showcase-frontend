import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../../api/instance';
import { ENDPOINTS } from '../../endpoints';
import type { ProjectApplicationPayload } from '../../types';


export const CreateApplicationProject: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Состояние формы строго по новому JSON
  const [formData, setFormData] = useState<ProjectApplicationPayload>({
    title: '',
    relevance: '',
    problem: '',
    goal: '',
    tasks: '',
    expected_result: '',
    specialties: [],
  });

  // Временное поле для ввода специальностей (через запятую)
  const [specialtiesInput, setSpecialtiesInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Разбиваем строку специальностей по запятой в массив
    const parsedSpecialties = specialtiesInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '');

    const payload: ProjectApplicationPayload = {
      ...formData,
      specialties: parsedSpecialties,
    };

    try {
      const response = await api.post(ENDPOINTS.PROJECTS.APPLICATIONS, payload);
      if (response.status === 201) {
        navigate('/');
      }
    } catch (err: any) {
      if (err.response?.status === 400 || err.response?.status === 401) {
        setError(err.response.data.detail || err.response.data.message || JSON.stringify(err.response.data));
      } else {
        setError('Сетевая ошибка. Проверьте подключение к серверу.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full p-4 border border-[#E5E7EB] rounded-xl text-[15px] text-[#1A1A1A] placeholder:text-gray-400 bg-[#F9FAFB] focus:outline-none focus:border-[#7C5CFC] focus:bg-white transition-colors font-inherit resize-none";

  return (
    <div className="max-w-[900px] mx-auto p-5 font-sans">
      
      {/* Шапка с картинкой */}
      <div className="relative flex justify-between items-center rounded-3xl p-8 mb-8 overflow-hidden bg-gradient-to-r from-[#F4F0FF] via-[#E8E3FF] to-[#D8D0FF]">
        <div className="relative z-10">
          <h1 className="text-[32px] text-[#1A1A1A] mb-3 font-bold">
            Подай заявку на <span className="text-[#7C5CFC]">проект</span>
          </h1>
          <p className="text-base text-[#4B5563] max-w-[60%] m-0 leading-relaxed">
            Опиши идею, а редактор поможет довести формулировки до нужного уровня перед отправкой.
          </p>
        </div>
        
        {/* Картинка через импорт (если файл в src/img) */}
        <div className="absolute right-0 top-0 h-full w-[45%] pointer-events-none">
         <img src="/1.png" alt="Иллюстрация" className="w-full h-full object-cover object-left" />
        </div>
      </div>

      {/* Основная форма */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-[#1A1A1A]">Название проекта <span className="text-red-500">*</span></label>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Введите название" required className={inputClasses} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-[#1A1A1A]">Актуальность <span className="text-red-500">*</span></label>
            <textarea name="relevance" value={formData.relevance} onChange={handleChange} placeholder="Почему эта тема важна сегодня" required rows={3} className={inputClasses} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-[#1A1A1A]">Проблема <span className="text-red-500">*</span></label>
            <textarea name="problem" value={formData.problem} onChange={handleChange} placeholder="Какую проблему вы решаете" required rows={3} className={inputClasses} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-[#1A1A1A]">Цель <span className="text-red-500">*</span></label>
            <textarea name="goal" value={formData.goal} onChange={handleChange} placeholder="Сформулируйте цель" required rows={2} className={inputClasses} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-[#1A1A1A]">Задачи <span className="text-red-500">*</span></label>
            <textarea name="tasks" value={formData.tasks} onChange={handleChange} placeholder="Перечислите задачи" required rows={4} className={inputClasses} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-[#1A1A1A]">Ожидаемый результат <span className="text-red-500">*</span></label>
            <textarea name="expected_result" value={formData.expected_result} onChange={handleChange} placeholder="Что получится в итоге" required rows={3} className={inputClasses} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-[#1A1A1A]">Специальности <span className="text-red-500">*</span></label>
            <p className="text-sm text-gray-500 m-0 mb-1">Введите через запятую (например: ИСиТ, ПМИ)</p>
            <input 
              value={specialtiesInput} 
              onChange={(e) => setSpecialtiesInput(e.target.value)} 
              placeholder="09.03.02, 02.03.01" 
              required 
              className={inputClasses} 
            />
          </div>

          <div className="flex justify-end mt-4 pt-6 border-t border-[#F3F4F6]">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`px-8 py-3.5 rounded-xl text-white font-medium transition-colors ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#7C5CFC] hover:bg-[#6A4CED]'}`}
            >
              {isLoading ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};