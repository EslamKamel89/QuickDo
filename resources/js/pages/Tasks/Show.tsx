import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Task } from '@/types/task';
import { Head } from '@inertiajs/react';

type ShowProps = {
    task: Task;
};
const Show = ({ task }: ShowProps) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Tasks',
            href: '/tasks/',
        },
        {
            title: 'Show Task',
            href: `/tasks/${task?.id}`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="mx-auto max-w-5xl p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Task - {task?.id}</h1>
                </div>
                <p className="mt-4 text-sm opacity-80">
                    {task?.title ?? 'Tasks Show'}
                </p>
            </div>
        </AppLayout>
    );
};

export default Show;
