import { ProjectFilters } from '../components/showcase/ProjectFilters';
import { ProjectList } from '../components/showcase/ProjectList';
import { AppShell } from '../components/showcase/AppShell';

export const ShowcasePage = () => {
    return (
        <AppShell>
            <div className="mx-auto w-full space-y-6 py-2">
                <section className="relative isolate flex min-h-[180px] items-center overflow-hidden rounded-[18px] border border-[#DCE6FB] bg-[linear-gradient(105deg,#E6EEFF_0%,#D7E4FF_58%,#DFE9FF_100%)] px-5 py-6 shadow-[0_4px_4px_rgba(16,51,112,0.05)] sm:min-h-[210px] sm:rounded-[20px] sm:px-7 lg:min-h-[230px] lg:px-8">
                    <img
                        src="/assets/project-detail-asset-1.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 h-full w-full object-cover object-right"
                    />
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(226,236,255,0.98)_0%,rgba(226,236,255,0.9)_42%,rgba(226,236,255,0.08)_76%)]" />
                    <div className="relative z-10 max-w-[620px]">
                        <h1 className="text-[32px] font-bold leading-[1.05] tracking-[-1px] text-[#10234F] sm:text-[40px] lg:text-[48px]">
                            Найди свой <span className="text-[#5B2DE8]">проект</span>
                        </h1>
                        <p className="mt-3 max-w-[560px] text-[15px] leading-[1.4] text-[#6E7EAD] sm:text-[17px]">
                            Реализуй идеи, развивай навыки, работай в команде и получай опыт вместе с Московским Политехом!
                        </p>
                    </div>
                </section>
                <ProjectFilters />
                <ProjectList />
            </div>
        </AppShell>
    );
};
