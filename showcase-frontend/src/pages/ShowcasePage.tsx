import { ProjectFilters } from '../components/showcase/ProjectFilters';
import { ProjectList } from '../components/showcase/ProjectList';

export const ShowcasePage = () => {
    return (
        <div className="max-w-7xl mx-auto p-6">

            {/* Фильтры тут) */}
            <ProjectFilters />
            
            {/* А вот тут выводится список карточек */}
            <ProjectList />
        </div>
    );
};