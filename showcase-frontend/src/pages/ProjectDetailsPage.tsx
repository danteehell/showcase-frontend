import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import { 
    Users, Calendar, Building2, User, 
    ArrowLeft, FileText, ListChecks, Code2,
    CheckCircle2, Loader2, AlertCircle
} from 'lucide-react';
import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';
import type { Project } from '../types';

export const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await api.get(ENDPOINTS.PROJECTS.DETAILS(id));
                setProject(response.data);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.detail || 'Не удалось загрузить проект');
                } else {
                    setError('Произошла неизвестная ошибка');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FBFF]">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FBFF] text-center p-6">
                <AlertCircle size={64} className="text-red-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Проект не найден</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <Link to="/" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowLeft size={20} /> Вернуться на витрину
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#F8FBFF] min-h-screen pb-12">
            <div className="max-w-6xl mx-auto px-4 pt-6">
                
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-6">
                    <ArrowLeft size={20} />
                    <span>К списку проектов</span>
                </Link>

                <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-indigo-50 rounded-[32px] p-8 md:p-12 mb-8 relative overflow-hidden shadow-sm border border-blue-100/50">
                    <div className="relative z-10 md:w-2/3">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-gray-600 mb-8 text-lg md:max-w-xl">
                            {project.short_description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.specialties.map((spec, idx) => (
                                <span key={idx} className="bg-white/70 text-[#7C85FC] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm backdrop-blur-sm">
                                    {spec}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/60 rounded-xl">
                                    <Users size={24} className="text-gray-700" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-medium">Квота на проект</span>
                                    <span className="font-bold text-gray-900">{project.spots_remaining} из 20</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/60 rounded-xl">
                                    <Calendar size={24} className="text-gray-700" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-medium">Срок</span>
                                    <span className="font-bold text-gray-900">Учебный год</span>
                                </div>
                            </div>
                            {project.is_active && (
                                <div className="flex items-center gap-1.5 bg-[#E8F8F2] text-[#10B981] px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                                    <CheckCircle2 size={18} />
                                    Набор открыт
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-2 space-y-6">
                        
                        <section className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 text-primary rounded-xl">
                                    <FileText size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-[#1A1A2E]">О проекте</h2>
                            </div>
                            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                {project.long_description || 'Подробное описание пока не добавлено.'}
                            </p>
                        </section>

                        {project.tasks && project.tasks.length > 0 && (
                            <section className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                                        <ListChecks size={24} />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#1A1A2E]">Что предстоит делать</h2>
                                </div>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                    {project.tasks.map((task, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                                            <span>{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {project.technologies && project.technologies.length > 0 && (
                            <section className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-green-50 text-green-600 rounded-xl">
                                        <Code2 size={24} />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#1A1A2E]">Используемые технологии</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, idx) => (
                                        <span key={idx} className="bg-[#F5F7FB] text-[#7C85FC] px-4 py-1.5 rounded-full text-sm font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="space-y-6">
                        <aside className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 sticky top-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 text-primary rounded-full">
                                    <User size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-[#1A1A2E]">Информация о проекте</h2>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <Users className="text-gray-400 shrink-0" size={22} />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Свободных мест</p>
                                        <p className="font-bold text-[#7C85FC] text-lg">{project.spots_remaining} мест</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Calendar className="text-gray-400 shrink-0" size={22} />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Период</p>
                                        <p className="font-medium text-gray-900">Учебный год</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <User className="text-gray-400 shrink-0" size={22} />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Руководитель</p>
                                        <p className="font-medium text-gray-900">{project.curator || 'Не назначен'}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Building2 className="text-gray-400 shrink-0" size={22} />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Заказчик</p>
                                        <p className="font-medium text-gray-900">{project.partner || 'Московский Политех'}</p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                className="w-full mt-8 bg-[#7C85FC] text-white py-3 rounded-xl font-bold hover:bg-[#6B74EB] transition-colors shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={project.spots_remaining <= 0}
                            >
                                {project.spots_remaining > 0 ? 'Записаться →' : 'Мест нет'}
                            </button>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};