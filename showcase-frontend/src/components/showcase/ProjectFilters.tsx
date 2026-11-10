import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Settings, Users, GraduationCap, Filter, LayoutGrid, List, Loader2, Search } from 'lucide-react';
import api from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';
import type { FiltersResponse } from '../../types';
import { SearchableSelect } from '../ui/SearchableSelect';

export const ProjectFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtersData, setFiltersData] = useState<FiltersResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const response = await api.get<FiltersResponse>(ENDPOINTS.PROJECTS.FILTERS);
                setFiltersData(response.data);
            } catch (error) {
                console.error('Ошибка загрузки фильтров:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFilters();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchParams(prev => {
                const newParams = new URLSearchParams(prev);
                if (searchQuery) {
                    newParams.set('search', searchQuery);
                } else {
                    newParams.delete('search');
                }
                newParams.delete('page');
                return newParams;
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, setSearchParams]);

    const handleFilterChange = (key: string, value: string) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (value) {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }
            newParams.delete('page');
            return newParams;
        });
    };

    const handleReset = () => {
        setSearchQuery('');
        setSearchParams({});
    };

    if (loading) return <div className="flex justify-center py-4 mb-8"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>;

    const themes = filtersData?.["Тематика"]?.options || [];
    const specialties = filtersData?.["Специальность"]?.options || [];
    const courses = filtersData?.["Курс"]?.options || [];

    return (
        <div className="w-full mb-8">
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-[15px]"
                    placeholder="Поиск по названию проекта, направлению, ключевым словам..."
                />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <SearchableSelect
                    label="Направление"
                    icon={<Settings size={20} />}
                    options={specialties}
                    value={searchParams.get('specialty') || ''}
                    onChange={(val) => handleFilterChange('specialty', val)}
                />

                <SearchableSelect
                    label="Тематика"
                    icon={<Users size={20} />}
                    options={themes}
                    value={searchParams.get('theme') || ''}
                    onChange={(val) => handleFilterChange('theme', val)}
                />

                <SearchableSelect
                    label="Курс студента"
                    icon={<GraduationCap size={20} />}
                    options={courses}
                    value={searchParams.get('course') || ''}
                    onChange={(val) => handleFilterChange('course', val)}
                />

                <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-3.5 text-primary hover:bg-primary/5 rounded-xl transition-colors font-medium text-sm ml-auto"
                >
                    <Filter size={18} className="rotate-90" />
                    Сбросить фильтры
                </button>

                <div className="flex items-center bg-white border border-gray-100 rounded-xl p-1 shadow-sm ml-2">
                    <button className="p-2 bg-[#7C85FC] text-white rounded-lg shadow-sm">
                        <LayoutGrid size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                        <List size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};