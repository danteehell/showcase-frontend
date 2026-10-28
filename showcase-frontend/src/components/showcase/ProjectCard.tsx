import { Bookmark, Users, Calendar, ArrowRight, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <article>
            <div>
                {project.theme ? (
                    <div>
                        <Network size={16} aria-hidden="true" />
                        <span>{project.theme}</span>
                    </div>
                ) : (
                    <span>Без темы</span>
                )}
                <button type="button" aria-label="Добавить в закладки">
                    <Bookmark size={24} aria-hidden="true" />
                </button>
            </div>
            
            <h3>
                {project.title}
            </h3>
            
            <p>
                {project.short_description}
            </p>
            
            {project.specialties.length > 0 && (
                <ul aria-label="Специальности проекта">
                    {project.specialties.map((spec, index) => (
                        <li key={index}>
                            {spec}
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <div>
                    <div>
                        <Users size={22} aria-hidden="true" />
                        <div>
                            <span>Квота на проект</span>
                            <span>{project.spots_remaining} чел.</span>
                        </div>
                    </div>
                    
                    <div>
                        <Calendar size={22} aria-hidden="true" />
                        <div>
                            <span>Срок</span>
                            <span>Учебный год</span>
                        </div>
                    </div>
                </div>
                
                <Link to={`/projects/${project.id}`}>
                    <span>Подробнее</span>
                    <ArrowRight size={18} aria-hidden="true" />
                </Link>
            </div>
        </article>
    );
};