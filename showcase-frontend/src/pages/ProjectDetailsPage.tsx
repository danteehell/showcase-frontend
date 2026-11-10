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
import { AppShell } from '../components/showcase/AppShell';

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
            <AppShell>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-[#7F8EF8]" />
                </div>
            </AppShell>
        );
    }

    if (error || !project) {
        return (
            <AppShell>
                <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
                    <AlertCircle size={56} className="mb-4 text-[#7F8EF8]" />
                    <h2 className="mb-2 text-2xl font-bold text-[#182845]">Проект не найден</h2>
                    <p className="mb-6 text-[#182845]/60">{error}</p>
                    <Link to="/" className="flex items-center gap-2 text-[#7F8EF8] hover:underline">
                        <ArrowLeft size={20} /> Вернуться на витрину
                    </Link>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div className="mx-auto w-full space-y-3 py-2">
                <Link to="/" className="mb-1 inline-flex h-6 items-center gap-2 text-[13px] font-medium text-[#4769C9] transition-colors hover:text-[#7F8EF8]">
                    <ArrowLeft size={16} strokeWidth={2} />
                    <span>К списку проектов</span>
                </Link>

                <section className="relative isolate min-h-[340px] overflow-hidden rounded-[24px] border border-[#DFE8FB] bg-[linear-gradient(110deg,#E5EDFD_0%,#CADCFC_65%,#DAE6FE_100%)] px-6 py-6 shadow-[0_4px_4px_rgba(16,51,112,0.05)] sm:min-h-[360px] sm:rounded-[30px] sm:px-8 sm:py-7 xl:min-h-[393px]">
                    <img src="/assets/project-detail-asset-1.png" alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                    <div className="relative z-10 flex min-h-[290px] flex-col sm:min-h-[310px] xl:min-h-[335px]">
                        <div className="max-w-[610px]">
                            <h1 className="mb-2 max-w-[580px] text-[30px] font-bold leading-[1.08] tracking-[-0.8px] text-[#102B5C] sm:text-[36px] xl:text-[38px]">
                                {project.title}
                            </h1>
                            <p className="max-w-[500px] text-[14px] leading-[1.4] text-[#7183B3] sm:text-[15px]">
                                {project.short_description}
                            </p>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {project.specialties.map((spec, idx) => (
                                <span key={idx} className="inline-flex min-h-[30px] items-center rounded-full bg-white/65 px-3.5 text-[12px] font-medium text-[#7489FC] shadow-[0_2px_6px_rgba(16,51,112,0.04)] backdrop-blur-sm">
                                    {spec}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto flex w-full max-w-[650px] flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#DCE6FB]/90 pt-3 sm:gap-x-7">
                            <div className="flex items-center gap-2.5">
                                <Users size={29} strokeWidth={1.8} className="shrink-0 text-[#103370]" aria-hidden="true" />
                                <div className="leading-[1.25]">
                                    <span className="block text-[11px] text-[#182845]/65">Квота на проект</span>
                                    <span className="block text-[12px] font-semibold text-[#182845]">{project.spots_remaining} из 20</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Calendar size={27} strokeWidth={1.8} className="shrink-0 text-[#103370]" aria-hidden="true" />
                                <div className="leading-[1.25]">
                                    <span className="block text-[11px] text-[#182845]/65">Срок</span>
                                    <span className="block text-[12px] font-semibold text-[#182845]">Учебный год</span>
                                </div>
                            </div>
                            {project.is_active && (
                                <div className="inline-flex min-h-[34px] items-center gap-2 rounded-full bg-[#DDF8ED] px-3.5 text-[12px] font-semibold text-[#00B97D] shadow-[0_2px_5px_rgba(0,185,125,0.08)]">
                                    <CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" />
                                    Набор открыт
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-3 pt-1 lg:grid-cols-[minmax(0,1.75fr)_minmax(300px,1fr)] xl:gap-4">
                    <div className="flex flex-col gap-3 xl:gap-4">
                        <section className="rounded-[18px] border border-[rgba(16,51,112,0.07)] bg-[#FCFCFE] p-5 shadow-[0_4px_4px_rgba(16,51,112,0.045)] sm:p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex size-[38px] items-center justify-center rounded-full bg-[#EEF2FF] text-[#7F8EF8]">
                                    <FileText size={22} strokeWidth={1.8} aria-hidden="true" />
                                </div>
                                <h2 className="text-[19px] font-semibold tracking-[-0.2px] text-[#182845]">О проекте</h2>
                            </div>
                            <p className="whitespace-pre-line text-[14px] leading-[1.55] text-[#182845]/70 sm:text-[15px]">
                                {project.long_description || 'Подробное описание пока не добавлено.'}
                            </p>
                        </section>

                        {project.tasks && project.tasks.length > 0 && (
                            <section className="rounded-[18px] border border-[rgba(16,51,112,0.07)] bg-[#FCFCFE] p-5 shadow-[0_4px_4px_rgba(16,51,112,0.045)] sm:p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex size-[38px] items-center justify-center rounded-full bg-[#EEF2FF] text-[#7F8EF8]">
                                        <ListChecks size={22} strokeWidth={1.8} aria-hidden="true" />
                                    </div>
                                    <h2 className="text-[19px] font-semibold tracking-[-0.2px] text-[#182845]">Что предстоит делать</h2>
                                </div>
                                <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                                    {project.tasks.map((task, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-[14px] leading-[1.4] text-[#182845]/70">
                                            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#7F8EF8]" />
                                            <span>{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    <aside className="h-fit rounded-[18px] border border-[rgba(16,51,112,0.07)] bg-[#FCFCFE] p-5 shadow-[0_4px_4px_rgba(16,51,112,0.045)] sm:p-6 lg:sticky lg:top-4">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex size-[38px] items-center justify-center rounded-full bg-[#EEF2FF] text-[#7F8EF8]">
                                <User size={21} strokeWidth={1.8} aria-hidden="true" />
                            </div>
                            <h2 className="text-[18px] font-semibold tracking-[-0.2px] text-[#182845]">Информация о проекте</h2>
                        </div>

                        <div className="divide-y divide-[#E8EDF6]">
                            <div className="flex gap-4 py-3 first:pt-1">
                                <Users size={22} strokeWidth={1.8} className="mt-1 shrink-0 text-[#7F8EF8]" aria-hidden="true" />
                                <div>
                                    <p className="mb-1 text-[12px] text-[#182845]/50">Свободных мест</p>
                                    <p className="text-[17px] font-semibold text-[#7F8EF8]">{project.spots_remaining} мест</p>
                                </div>
                            </div>
                            <div className="flex gap-4 py-3">
                                <Calendar size={22} strokeWidth={1.8} className="mt-1 shrink-0 text-[#7F8EF8]" aria-hidden="true" />
                                <div>
                                    <p className="mb-1 text-[12px] text-[#182845]/50">Период</p>
                                    <p className="text-[14px] font-medium text-[#182845]">Учебный год</p>
                                </div>
                            </div>
                            <div className="flex gap-4 py-3">
                                <User size={22} strokeWidth={1.8} className="mt-1 shrink-0 text-[#7F8EF8]" aria-hidden="true" />
                                <div className="min-w-0">
                                    <p className="mb-1 text-[12px] text-[#182845]/50">Руководитель</p>
                                    <p className="text-[14px] font-medium text-[#182845]">{project.curator || 'Не назначен'}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 py-3">
                                <Building2 size={22} strokeWidth={1.8} className="mt-1 shrink-0 text-[#7F8EF8]" aria-hidden="true" />
                                <div>
                                    <p className="mb-1 text-[12px] text-[#182845]/50">Заказчик</p>
                                    <p className="text-[14px] font-medium text-[#182845]">{project.partner || 'Московский Политех'}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            className="mt-4 min-h-11 w-full rounded-[12px] bg-[#7F82F8] px-4 text-[14px] font-semibold text-white shadow-[0_4px_10px_rgba(127,130,248,0.22)] transition-colors hover:bg-[#7074EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8EF8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={project.spots_remaining <= 0}
                        >
                            {project.spots_remaining > 0 ? 'Записаться →' : 'Мест нет'}
                        </button>
                    </aside>

                    {project.technologies && project.technologies.length > 0 && (
                        <section className="rounded-[18px] border border-[rgba(16,51,112,0.07)] bg-[#FCFCFE] p-5 shadow-[0_4px_4px_rgba(16,51,112,0.045)] sm:p-6 lg:col-span-2">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex size-[38px] items-center justify-center rounded-full bg-[#EEF2FF] text-[#7F8EF8]">
                                    <Code2 size={22} strokeWidth={1.8} aria-hidden="true" />
                                </div>
                                <h2 className="text-[19px] font-semibold tracking-[-0.2px] text-[#182845]">Используемые технологии</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, idx) => (
                                    <span key={idx} className="inline-flex min-h-[30px] items-center rounded-full bg-[#F0F3FF] px-3.5 text-[12px] font-medium text-[#7F8EF8]">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </AppShell>
    );
};
