import { Bookmark, Users, Calendar, Network } from 'lucide-react';
import type { Project } from '../../types';
import { DetailsButton } from '../ui/DetailsButton';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <article className="bg-white rounded-[24px] p-6 flex flex-col h-full shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300">
            <div className="flex justify-between items-start mb-3 gap-2">
                {project.theme ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold bg-[#E6F9F0] text-[#10B981]">
                        <Network size={16} strokeWidth={2.5} aria-hidden="true" className="shrink-0" />
                        <span className="line-clamp-1">{project.theme}</span>
                    </div>
                ) : (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[13px] font-semibold bg-gray-100 text-gray-500">
                        Без темы
                    </span>
                )}
                <button 
                    type="button" 
                    aria-label="Добавить в закладки" 
                    className="text-[#182845] hover:text-[#7F8EF8] transition-colors shrink-0 mt-0.5"
                >
                    <Bookmark size={24} strokeWidth={1.5} aria-hidden="true" />
                </button>
            </div>
            
            <h3 className="text-[19px] font-semibold leading-[128%] text-[#182845] mb-2 line-clamp-2">
                {project.title}
            </h3>
            
            <p className="text-[15px] font-normal leading-[128%] tracking-[0.04em] text-[#182845]/70 mb-4 line-clamp-3 flex-grow">
                {project.short_description}
            </p>
            
            {project.specialties.length > 0 && (
                <ul aria-label="Специальности проекта" className="flex flex-wrap gap-2 mb-6">
                    {project.specialties.map((spec, index) => (
                        <li 
                            key={index} 
                            className="text-[12px] font-medium text-[#7F8EF8] bg-[#F3F5FF] px-3.5 py-1.5 rounded-full whitespace-normal break-words"
                        >
                            {spec}
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex items-end justify-between mt-auto pt-2 gap-4">
                <div className="flex gap-4 min-w-0">
                    <div className="flex items-start gap-2">
                        <Users size={22} strokeWidth={2} className="text-[#182845] shrink-0" aria-hidden="true" />
                        <div className="flex flex-col">
                            <span className="text-[11.16px] leading-[128%] text-[#182845]/70 whitespace-nowrap">Квота на проект</span>
                            <span className="text-[11.16px] leading-[128%] text-[#182845] font-medium whitespace-nowrap">{project.spots_remaining} чел.</span>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                        <Calendar size={22} strokeWidth={2} className="text-[#182845] shrink-0" aria-hidden="true" />
                        <div className="flex flex-col">
                            <span className="text-[11.16px] leading-[128%] text-[#182845]/70 whitespace-nowrap">Срок</span>
                            <span className="text-[11.16px] leading-[128%] text-[#182845] font-medium whitespace-nowrap">Учебный год</span>
                        </div>
                    </div>
                </div>
                
                <div className="shrink-0">
                    <DetailsButton projectId={project.id} />
                </div>
            </div>
        </article>
    );
};