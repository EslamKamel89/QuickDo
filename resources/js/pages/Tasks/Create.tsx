import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type ShowProps = {
    initial?: { message?: string };
};
const Show = ({ initial }: ShowProps) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Tasks',
            href: '/tasks/',
        },
        {
            title: 'Create ',
            href: `/tasks/create`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="mx-auto max-w-5xl p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Create Task</h1>
                </div>
                <p className="mt-4 text-sm opacity-80">
                    {initial?.message ?? 'Tasks Create'}
                </p>
            </div>
        </AppLayout>
    );
};

export default Show;
