import { Bookmark, Users, Calendar, Network } from 'lucide-react';
import type { Project } from '../../types';
import { DetailsButton } from '../ui/DetailsButton';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const themeVariants = [
        'bg-[#F1EFFD] text-[#894DF2]',
        'bg-[#DEFEEC] text-[#00D681]',
        'bg-[#E8EBFF] text-[#6173FF]',
        'bg-[#FFE8EC] text-[#FF5267]',
        'bg-[#F9ECDC] text-[#FD9928]',
        'bg-[#D7F7F8] text-[#00C9C6]',
    ];
    const themeVariant = themeVariants[Math.abs(project.id) % themeVariants.length];

    return (
        <article className="flex h-full min-h-[278px] flex-col rounded-[17px] border border-[rgba(16,51,112,0.1)] bg-[#FCFCFE] px-5 pb-[14px] pt-[14px] shadow-[0_4px_4px_rgba(16,51,112,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(16,51,112,0.1)]">
            <div className="mb-[10px] flex items-start justify-between gap-3">
                {project.theme ? (
                    <div className={`inline-flex h-[33px] max-w-[calc(100%-32px)] items-center gap-2 rounded-full border border-[rgba(16,51,112,0.08)] px-3 text-[13px] font-medium ${themeVariant}`}>
                        <Network size={18} strokeWidth={2.5} aria-hidden="true" className="shrink-0" />
                        <span className="truncate">{project.theme}</span>
                    </div>
                ) : (
                    <span className="inline-flex h-[33px] items-center rounded-full bg-[#F4F7FE] px-3 text-[13px] font-medium text-[#182845]/60">
                        Без темы
                    </span>
                )}
                <button 
                    type="button" 
                    aria-label="Добавить в закладки" 
                    className="mt-1 shrink-0 text-[#182845]/75 transition-colors hover:text-[#7F8EF8] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8EF8]"
                >
                    <Bookmark size={20} strokeWidth={1.8} aria-hidden="true" />
                </button>
            </div>
            
            <h3 className="mb-[10px] line-clamp-2 min-h-[48px] text-[19px] font-semibold leading-[1.276] tracking-[-0.2px] text-[#182845]">
                {project.title}
            </h3>
            
            <p className="mb-[11px] line-clamp-3 min-h-[54px] text-[14px] font-normal leading-[1.35] tracking-[0.02em] text-[#182845]/70">
                {project.short_description}
            </p>
            
            {project.specialties.length > 0 && (
                <ul aria-label="Специальности проекта" className="flex min-h-[33px] flex-wrap gap-2">
                    {project.specialties.map((spec, index) => (
                        <li 
                            key={index} 
                            className="inline-flex min-h-[33px] items-center rounded-full border border-[rgba(16,51,112,0.06)] bg-[#F4F7FE] px-3 text-[12px] font-normal leading-tight text-[#7F8EF8]"
                        >
                            {spec}
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-3 pt-4">
                <div className="grid min-w-[220px] flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                        <Users size={30} strokeWidth={1.8} className="shrink-0 text-[#103370]" aria-hidden="true" />
                        <div className="flex min-w-0 flex-col leading-[1.25]">
                            <span className="whitespace-nowrap text-[11px] text-[#182845]/70">Квота на проект</span>
                            <span className="whitespace-nowrap text-[11px] text-[#182845]/90">{project.spots_remaining} чел.</span>
                        </div>
                    </div>
                    
                    <div className="flex min-w-0 items-center gap-2">
                        <Calendar size={26} strokeWidth={1.8} className="shrink-0 text-[#103370]" aria-hidden="true" />
                        <div className="flex min-w-0 flex-col leading-[1.25]">
                            <span className="whitespace-nowrap text-[11px] text-[#182845]/70">Срок</span>
                            <span className="whitespace-nowrap text-[11px] text-[#182845]/90">Учебный год</span>
                        </div>
                    </div>
                </div>
                
                <div className="ml-auto shrink-0">
                    <DetailsButton projectId={project.id} />
                </div>
            </div>
        </article>
    );
};
