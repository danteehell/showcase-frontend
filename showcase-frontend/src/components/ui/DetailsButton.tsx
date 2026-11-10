import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DetailsButtonProps {
    projectId: number;
}

export const DetailsButton = ({ projectId }: DetailsButtonProps) => {
    return (
        <Link 
            to={`/projects/${projectId}`}
            className="inline-flex h-[35px] w-[113px] shrink-0 items-center justify-center gap-1.5 rounded-[11px] border border-[rgba(16,51,112,0.1)] bg-[#7F8EF8] px-2 text-center text-[14px] font-normal tracking-[-0.3px] text-white transition-colors hover:bg-[#6F7FEA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8EF8] focus-visible:ring-offset-2"
        >
            <span className="whitespace-nowrap">Подробнее</span>
            <ArrowRight size={14} strokeWidth={1.8} />
        </Link>
    );
};
