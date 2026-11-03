import { useEffect, useState } from 'react';
import { getProjects } from '../../api/projects';
import type { Project, AppError } from '../../types';
import { parseApiError } from '../../utils/errorHandler';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleton } from './ProjectCardSkeleton';
import { WifiOff, ServerCrash, FolderX, RefreshCw } from 'lucide-react';

export const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AppError | null>(null);
    
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const data = await getProjects();
                if (isMounted) {
                    setProjects(data.data || []);
                }
            } catch (err) {
                if (isMounted) {
                    setError(parseApiError(err));
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [refreshKey]); 

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        setRefreshKey(prev => prev + 1); 
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
            </div>
        );
    }

    if (error) {
        const Icon = error.type === 'network' ? WifiOff 
                   : error.type === 'server' ? ServerCrash 
                   : FolderX;

        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[24px] border border-gray-100 shadow-sm text-center px-4">
                <Icon size={56} className="text-gray-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {error.type === 'network' ? 'Проблема с сетью' : 
                     error.type === 'server' ? 'Сервер прилег отдохнуть' : 
                     'Не удалось загрузить'}
                </h3>
                <p className="text-gray-500 mb-6 max-w-md">{error.message}</p>
                
                {(error.type === 'network' || error.type === 'server') && (
                    <button 
                        onClick={handleRetry}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                    >
                        <RefreshCw size={18} />
                        Попробовать снова
                    </button>
                )}
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[24px] border border-gray-100">
                <FolderX size={56} className="text-gray-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Проектов пока нет</h3>
                <p className="text-gray-500">Здесь появятся проекты, как только их добавят кураторы.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};