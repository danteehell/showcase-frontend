import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProjects } from '../../api/projects';
import type { Project, AppError } from '../../types';
import { parseApiError } from '../../utils/errorHandler';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleton } from './ProjectListSkeleton';
import { WifiOff, ServerCrash, FolderX, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProjectList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AppError | null>(null);
    
    const [totalPages, setTotalPages] = useState(1);
    const [totalProjects, setTotalProjects] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const searchString = searchParams.toString();

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const currentParams = new URLSearchParams(searchString);
                const params: Record<string, string> = {};
                
                currentParams.forEach((value, key) => {
                    params[key] = value;
                });
                
                params.limit = '6';

                const data = await getProjects(params);
                
                if (isMounted) {
                    setProjects(data.data || []);
                    setTotalPages(data.totalPages || 1);
                    setTotalProjects(data.totalProjects || 0);
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
    }, [searchString, refreshKey]); 

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        const newParams = new URLSearchParams(searchString);
        newParams.set('page', String(newPage));
        setSearchParams(newParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        setRefreshKey(prev => prev + 1); 
    };

    const getPaginationRange = () => {
        const totalPageNumbers = 5;
        if (totalPages <= totalPageNumbers) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const leftSiblingIndex = Math.max(currentPage - 1, 1);
        const rightSiblingIndex = Math.min(currentPage + 1, totalPages);
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3;
            const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
            return [...leftRange, '...', totalPages];
        }
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3;
            const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
            return [1, '...', ...rightRange];
        }
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = [leftSiblingIndex, currentPage, rightSiblingIndex];
            return [1, '...', ...middleRange, '...', totalPages];
        }
        return [];
    };

    if (loading) {
        return (
            <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A1A2E]">Проекты</h2>
                        <span className="bg-[#F0F3FF] text-[#7C85FC] px-2.5 py-1 rounded-lg text-sm font-bold">
                            ...
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
                </div>
            </div>
        );
    }

    if (error) {
        const Icon = error.type === 'network' ? WifiOff 
                   : error.type === 'server' ? ServerCrash 
                   : FolderX;

        return (
            <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A1A2E]">Проекты</h2>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center py-16 md:py-24 bg-white rounded-[24px] border border-gray-100 shadow-sm text-center px-4">
                    <Icon size={48} className="text-gray-400 mb-4 md:w-14 md:h-14" strokeWidth={1.5} />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                        {error.type === 'network' ? 'Проблема с сетью' : 
                         error.type === 'server' ? 'Сервер прилег отдохнуть' : 
                         'Не удалось загрузить'}
                    </h3>
                    <p className="text-sm md:text-base text-gray-500 mb-6 max-w-md">{error.message}</p>
                    
                    {(error.type === 'network' || error.type === 'server') && (
                        <button 
                            onClick={handleRetry}
                            className="flex items-center gap-2 bg-[#7C85FC] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#6B74EB] transition-colors text-sm md:text-base"
                        >
                            <RefreshCw size={18} />
                            Попробовать снова
                        </button>
                    )}
                </div>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A1A2E]">Проекты</h2>
                        <span className="bg-[#F0F3FF] text-[#7C85FC] px-2.5 py-1 rounded-lg text-sm font-bold">
                            0
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center py-16 md:py-24 bg-white rounded-[24px] border border-gray-100">
                    <FolderX size={48} className="text-gray-400 mb-4 md:w-14 md:h-14" strokeWidth={1.5} />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Проектов не найдено</h3>
                    <p className="text-sm md:text-base text-gray-500 text-center px-4">Попробуйте изменить параметры фильтрации.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl md:text-2xl font-bold text-[#1A1A2E]">Проекты</h2>
                    <span className="bg-[#F0F3FF] text-[#7C85FC] px-2.5 py-1 rounded-lg text-sm font-bold">
                        {totalProjects}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm text-gray-400">Сортировка:</span>
                    <select className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 outline-none text-xs md:text-sm font-medium text-gray-700 cursor-pointer focus:border-[#7C85FC] transition-colors">
                        <option>По популярности</option>
                        <option>Сначала новые</option>
                        <option>По алфавиту</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 mt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Предыдущая страница"
                        className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                        <ChevronLeft size={18} className="md:w-5 md:h-5" />
                    </button>

                    {getPaginationRange().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={`dots-${index}`} className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-400 text-sm">
                                    ...
                                </span>
                            );
                        }

                        const pageNumber = page as number;
                        const isCurrent = pageNumber === currentPage;
                        
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                                    isCurrent 
                                        ? 'bg-[#7C85FC] text-white border-transparent shadow-sm' 
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Следующая страница"
                        className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                        <ChevronRight size={18} className="md:w-5 md:h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};