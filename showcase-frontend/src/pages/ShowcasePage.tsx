import { ProjectList } from '../components/showcase/ProjectList';

export const ShowcasePage = () => {
    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Найди свой проект</h1>
                <p className="text-gray-500">Реализуй идеи, развивай навыки, работай в команде.</p>
            </div>

            {/* Тут будет панель фильтров (потом добавим) */}
            
            {/* А вот тут выводится список карточек */}
            <ProjectList />
        </div>
    );
};