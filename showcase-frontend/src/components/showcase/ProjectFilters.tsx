import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Settings, Users, GraduationCap, Filter, LayoutGrid, List, Loader2 } from 'lucide-react';
import api from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';
import type { FiltersResponse } from '../../types';
import { SearchableSelect } from '../ui/SearchableSelect';

export const ProjectFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtersData, setFiltersData] = useState<FiltersResponse | null>(null);
    const [loading, setLoading] = useState(true);

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

    const handleFilterChange = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    const handleReset = () => {
        setSearchParams({});
    };

    if (loading) return <div className="flex justify-center py-4 mb-8"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>;

    const themes = filtersData?.["Тематика"]?.options || [];
    const specialties = filtersData?.["Специальность"]?.options || [];
    const courses = filtersData?.["Курс"]?.options || [];

    return (
        <div className="w-full mb-8">
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