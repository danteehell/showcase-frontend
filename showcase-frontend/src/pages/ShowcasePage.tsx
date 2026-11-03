import { ProjectList } from '../components/showcase/ProjectList';

export const ShowcasePage = () => {
    return (
        <div className="max-w-7xl mx-auto p-6">

            {/* Тут будет панель фильтров (потом добавим) */}
            
            {/* А вот тут выводится список карточек */}
            <ProjectList />
        </div>
    );
};