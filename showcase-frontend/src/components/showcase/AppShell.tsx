import type { ReactNode } from 'react';
import {
    BookOpen,
    CalendarDays,
    CircleHelp,
    ClipboardList,
    GraduationCap,
    House,
    LayoutGrid,
    Users,
    UserRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const navigation = [
    { label: 'Главная', icon: House },
    { label: 'Мои проекты', icon: ClipboardList },
    { label: 'Витрина проектов', icon: LayoutGrid, active: true },
    { label: 'Задания', icon: BookOpen },
    { label: 'Команды', icon: Users },
    { label: 'Мероприятия', icon: CalendarDays },
    { label: 'Обучение', icon: GraduationCap },
    { label: 'Поддержка', icon: CircleHelp },
];

function Brand() {
    return (
        <Link to="/" aria-label="Московский Политех — на главную" className="flex items-center justify-center">
            <img
                src="/assets/polytech-logo.svg"
                alt="Центр проектной деятельности Московского Политеха"
                className="h-[76px] w-[210px] object-contain [filter:brightness(0)_saturate(100%)_invert(15%)_sepia(49%)_saturate(1461%)_hue-rotate(190deg)_brightness(88%)_contrast(94%)]"
            />
        </Link>
    );
}

function Sidebar() {
    return (
        <div className="xl:contents">
            <aside className="sticky top-4 hidden h-[calc(100vh-32px)] min-h-[640px] flex-col rounded-[17px] border border-[rgba(16,51,112,0.08)] bg-[#FCFCFE] px-4 pb-4 pt-5 shadow-[0_4px_4px_rgba(16,51,112,0.05)] xl:flex">
                <Brand />

                <nav aria-label="Главная навигация" className="mt-5 flex flex-col gap-1">
                    {navigation.map(({ label, icon: Icon, active }) => (
                        <Link
                            key={label}
                            to="/"
                            aria-current={active ? 'page' : undefined}
                            className={`relative flex min-h-[46px] items-center gap-3 rounded-[15px] px-3 text-[15px] font-medium transition-colors ${
                                active
                                    ? 'bg-[#C7D2FE]/60 text-[#182845] before:absolute before:-left-4 before:top-2 before:h-[30px] before:w-[5px] before:rounded-r-full before:bg-[#7F8EF8]'
                                    : 'text-[#182845] hover:bg-[#F4F7FE]'
                            }`}
                        >
                            <Icon size={29} strokeWidth={1.7} className={active ? 'text-[#7F8EF8]' : 'text-[#103370]'} aria-hidden="true" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>

                <Link to="/" className="mt-auto flex min-h-[46px] items-center gap-2 rounded-[15px] border border-[#182845]/35 px-3 text-sm font-medium text-[#182845] transition-colors hover:bg-[#F4F7FE]">
                    <UserRound size={27} strokeWidth={1.8} aria-hidden="true" />
                    <span>Личный кабинет &gt;</span>
                </Link>
            </aside>

            <header className="mb-4 flex items-center justify-between rounded-2xl border border-[rgba(16,51,112,0.08)] bg-[#FCFCFE] px-3 py-2 shadow-sm xl:hidden">
                <Brand />
                <Link to="/" aria-label="Витрина проектов" className="rounded-xl bg-[#C7D2FE]/60 p-2 text-[#7F8EF8]">
                    <LayoutGrid size={24} aria-hidden="true" />
                </Link>
            </header>
        </div>
    );
}

export const AppShell = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-[#F6FAFF] text-[#182845]">
            <div className="mx-auto grid min-h-screen max-w-[1920px] grid-cols-1 gap-0 p-3 sm:p-4 xl:grid-cols-[275px_minmax(0,1fr)] xl:gap-6">
                <Sidebar />
                <div className="min-w-0">
                    <main className="min-w-0">{children}</main>
                </div>
            </div>
        </div>
    );
};
