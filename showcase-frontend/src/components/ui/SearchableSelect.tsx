import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

export interface SelectOption {
    id: number | string;
    name: string;
}

interface SearchableSelectProps {
    label: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    icon?: React.ReactNode;
}

export const SearchableSelect = ({ label, options, value, onChange, icon }: SearchableSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt => 
        opt.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedOption = options.find(opt => String(opt.id) === value);

    const handleSelect = (id: number | string) => {
        onChange(String(id));
        setIsOpen(false);
        setSearchQuery('');
    };

    return (
        <div className="relative w-full md:w-[240px]" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary/30 transition-colors shadow-sm text-left"
            >
                <div className="text-gray-500 shrink-0">{icon}</div>
                <div className="flex flex-col items-start w-full overflow-hidden">
                    <span className="text-[11px] text-gray-400 font-medium leading-tight">{label}</span>
                    <span className="text-sm font-semibold text-gray-900 leading-tight truncate w-full">
                        {selectedOption ? selectedOption.name : 'Все'}
                    </span>
                </div>
                <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden flex flex-col max-h-80">
                    <div className="p-2 border-b border-gray-100 bg-gray-50/50">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Поиск..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary/50"
                                autoFocus
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-y-auto flex-1 p-1">
                        <button
                            onClick={() => handleSelect('')}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 ${!value ? 'bg-primary/5 text-primary font-medium' : 'text-gray-700'}`}
                        >
                            Все
                        </button>
                        
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleSelect(opt.id)}
                                    className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 ${String(opt.id) === value ? 'bg-primary/5 text-primary font-medium' : 'text-gray-700'}`}
                                >
                                    {opt.name}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-4 text-center text-sm text-gray-400">
                                Ничего не найдено
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};