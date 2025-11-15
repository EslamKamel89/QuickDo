import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const Show = () => {
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
    const form = useForm({
        title: '',
        description: '',
        done: false,
        due_at: '',
    });
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/tasks');
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="mx-auto w-full max-w-5xl p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Create Task</h1>
                </div>
                <form onSubmit={submit} className="w-full space-y-4">
                    <div>
                        <label className="block text-sm font-medium">
                            Title
                        </label>
                        <input
                            value={form.data.title}
                            onChange={(e) =>
                                form.setData('title', e.target.value)
                            }
                            className="w-full rounded border px-3 py-2"
                        />
                        {form.errors.title && (
                            <p className="text-sm text-red-400">
                                {form.errors.title}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            className="w-full rounded border px-3 py-2"
                        />
                        {form.errors.description && (
                            <p className="text-sm text-red-400">
                                {form.errors.description}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={form.data.done}
                                onChange={(e) =>
                                    form.setData('done', e.target.checked)
                                }
                            />
                            <span className="text-sm">Done</span>
                        </label>
                        {form.errors.done && (
                            <p className="text-sm text-red-400">
                                {form.errors.done}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                            Due Date
                        </label>
                        <input
                            type="date"
                            value={form.data.due_at}
                            onChange={(e) =>
                                form.setData('due_at', e.target.value)
                            }
                            className="w-full rounded border px-3 py-2"
                        />
                        {form.errors.due_at && (
                            <p className="text-sm text-red-400">
                                {form.errors.due_at}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded border px-3 py-2"
                        >
                            Create
                        </button>
                        <Link
                            href="/tasks"
                            className="rounded border px-3 py-2"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Show;
