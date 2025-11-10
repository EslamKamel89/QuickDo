import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

type IndexProps = {
    initial?: { message?: string };
};
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/tasks/',
    },
];
const Index = ({ initial }: IndexProps) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="mx-auto max-w-5xl p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Tasks</h1>
                    <Link
                        href="/tasks/create"
                        className="rounded border px-3 py-2"
                    >
                        New Task
                    </Link>
                </div>
                <p className="mt-4 text-sm opacity-80">
                    {initial?.message ?? 'Tasks Index'}
                </p>
            </div>
        </AppLayout>
    );
};

export default Index;
