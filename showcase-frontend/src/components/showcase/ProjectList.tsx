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
            <section aria-label="Проекты загружаются" className="w-full">
                <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-semibold leading-[1.276] tracking-[-0.5px] text-[#182845] sm:text-3xl">Проекты</h2>
                        <span aria-hidden="true" className="flex h-[34px] min-w-[46px] items-center justify-center rounded-[15px] bg-[#DDE4FE] px-3 text-base font-medium text-[#7D72FF] sm:text-xl">
                            ...
                        </span>
                    </div>
                </div>
                <div aria-live="polite" className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                    {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
                </div>
            </section>
        );
    }

    if (error) {
        const Icon = error.type === 'network' ? WifiOff 
                   : error.type === 'server' ? ServerCrash 
                   : FolderX;

        return (
            <section className="w-full">
                <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-semibold leading-[1.276] tracking-[-0.5px] text-[#182845] sm:text-3xl">Проекты</h2>
                    </div>
                </div>
                <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[20px] border border-[#E9EEF8] bg-[#FCFCFE] px-5 py-14 text-center shadow-[0_4px_20px_rgba(24,40,69,0.04)] sm:min-h-[340px] sm:rounded-[24px] sm:px-8 md:py-20">
                    <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-[#F3F5FF] text-[#7F8EF8] sm:size-[72px]">
                        <Icon size={32} className="sm:h-9 sm:w-9" strokeWidth={1.7} aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold tracking-[-0.2px] text-[#182845] sm:text-xl">
                        {error.type === 'network' ? 'Проблема с сетью' : 
                         error.type === 'server' ? 'Сервер прилег отдохнуть' : 
                         'Не удалось загрузить'}
                    </h3>
                    <p className="mb-6 max-w-md text-sm leading-6 text-[#182845]/65 sm:text-base">{error.message}</p>
                    
                    {(error.type === 'network' || error.type === 'server') && (
                        <button 
                            onClick={handleRetry}
                            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#7F8EF8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6F7FEA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8EF8] focus-visible:ring-offset-2 sm:px-6 sm:text-base"
                        >
                            <RefreshCw size={18} />
                            Попробовать снова
                        </button>
                    )}
                </div>
            </section>
        );
    }

    if (projects.length === 0) {
        return (
            <section className="w-full">
                <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-semibold leading-[1.276] tracking-[-0.5px] text-[#182845] sm:text-3xl">Проекты</h2>
                        <span className="flex h-[34px] min-w-[46px] items-center justify-center rounded-[15px] bg-[#DDE4FE] px-3 text-base font-medium text-[#7D72FF] sm:text-xl">
                            0
                        </span>
                    </div>
                </div>
                <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[20px] border border-[#E9EEF8] bg-[#FCFCFE] px-5 py-14 text-center sm:min-h-[340px] sm:rounded-[24px] sm:px-8 md:py-20">
                    <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-[#F3F5FF] text-[#7F8EF8] sm:size-[72px]">
                        <FolderX size={32} className="sm:h-9 sm:w-9" strokeWidth={1.7} aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold tracking-[-0.2px] text-[#182845] sm:text-xl">Проектов не найдено</h3>
                    <p className="max-w-md px-2 text-sm leading-6 text-[#182845]/65 sm:text-base">Попробуйте изменить параметры фильтрации.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <h2 className="text-[28px] font-semibold leading-[1.276] tracking-[-0.5px] text-[#182845] sm:text-3xl">Проекты</h2>
                    <span className="flex h-[34px] min-w-[46px] items-center justify-center rounded-[15px] bg-[#DDE4FE] px-3 text-base font-medium text-[#7D72FF] sm:text-xl">
                        {totalProjects}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {totalPages > 1 && (
                <nav aria-label="Страницы проектов" className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:mt-10">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Предыдущая страница"
                        className="flex size-9 items-center justify-center rounded-xl border border-[#E5EAF4] bg-[#FCFCFE] text-[#182845] transition-colors hover:bg-[#F3F5FF] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8EF8] sm:size-10"
                    >
                        <ChevronLeft size={18} className="md:w-5 md:h-5" />
                    </button>

                    {getPaginationRange().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={`dots-${index}`} className="flex size-9 items-center justify-center text-sm text-[#182845]/45 sm:size-10">
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
                                aria-current={isCurrent ? 'page' : undefined}
                                className={`flex size-9 items-center justify-center rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8EF8] focus-visible:ring-offset-2 sm:size-10 ${
                                    isCurrent 
                                        ? 'border border-[#7F8EF8] bg-[#7F8EF8] text-white shadow-[0_4px_12px_rgba(127,142,248,0.24)]'
                                        : 'border border-[#E5EAF4] bg-[#FCFCFE] text-[#182845] hover:bg-[#F3F5FF]'
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
                        className="flex size-9 items-center justify-center rounded-xl border border-[#E5EAF4] bg-[#FCFCFE] text-[#182845] transition-colors hover:bg-[#F3F5FF] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8EF8] sm:size-10"
                    >
                        <ChevronRight size={18} className="md:w-5 md:h-5" />
                    </button>
                </nav>
            )}
        </section>
    );
};
