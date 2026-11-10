import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DetailsButtonProps {
    projectId: number;
}

export const DetailsButton = ({ projectId }: DetailsButtonProps) => {
    return (
        <Link 
            to={`/projects/${projectId}`}
            className="inline-flex items-center justify-center gap-2 bg-[#7C85FC] text-white px-5 py-2.5 rounded-xl font-medium text-[15px] hover:bg-[#6B74EB] transition-colors"
        >
            <span>Подробнее</span>
            <ArrowRight size={18} />
        </Link>
    );
};