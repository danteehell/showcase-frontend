export const ProjectCardSkeleton = () => {
    return (
        <div aria-hidden="true" className="flex h-full min-h-[278px] flex-col rounded-[17px] border border-[rgba(16,51,112,0.1)] bg-[#FCFCFE] px-5 pb-[14px] pt-[14px] shadow-[0_4px_4px_rgba(16,51,112,0.05)]">
            <div className="mb-[10px] flex items-start justify-between">
                <div className="h-[33px] w-[76px] animate-pulse rounded-full bg-[#E8EBF4]" />
                <div className="mt-1 size-5 animate-pulse rounded bg-[#E8EBF4]" />
            </div>

            <div className="mb-[10px] mt-1 h-6 w-4/5 animate-pulse rounded bg-[#E8EBF4]" />
            <div className="mb-[11px] h-[54px] space-y-2 pt-1">
                <div className="h-3 w-full animate-pulse rounded bg-[#EEF1F7]" />
                <div className="h-3 w-full animate-pulse rounded bg-[#EEF1F7]" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-[#EEF1F7]" />
            </div>

            <div className="flex min-h-[33px] gap-2">
                <div className="h-[33px] w-[70px] animate-pulse rounded-full bg-[#EEF1F7]" />
                <div className="h-[33px] w-[50px] animate-pulse rounded-full bg-[#EEF1F7]" />
                <div className="h-[33px] w-[58px] animate-pulse rounded-full bg-[#EEF1F7]" />
            </div>

            <div className="mt-auto flex items-center gap-3 pt-4">
                <div className="h-8 min-w-0 flex-1 animate-pulse rounded bg-[#EEF1F7]" />
                <div className="h-[35px] w-[113px] shrink-0 animate-pulse rounded-[11px] bg-[#DDE4FE]" />
            </div>
        </div>
    );
};
