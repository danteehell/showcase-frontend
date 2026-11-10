import { ProjectFilters } from '../components/showcase/ProjectFilters';
import { ProjectList } from '../components/showcase/ProjectList';
import { AppShell } from '../components/showcase/AppShell';

export const ShowcasePage = () => {
    return (
        <AppShell>
            <div className="mx-auto w-full space-y-6 py-2">
                <ProjectFilters />
                <ProjectList />
            </div>
        </AppShell>
    );
};
