export const ProjectCardSkeleton = () => {
    return (
        <div className="bg-white rounded-[24px] p-6 flex flex-col h-full border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-start mb-4">
                <div className="w-24 h-7 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="w-3/4 h-7 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="w-1/2 h-7 bg-gray-200 rounded mb-4 animate-pulse"></div>
            
            <div className="space-y-2 mb-5 flex-grow">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="flex gap-2 mb-6">
                <div className="w-16 h-7 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-16 h-7 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-16 h-7 bg-gray-200 rounded-full animate-pulse"></div>
            </div>

            <div className="flex items-end justify-between mt-auto pt-2">
                <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="w-28 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
        </div>
    );
};