import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Pagination } from '@/types/pagination';
import { Task } from '@/types/task';
import { Head, Link, useForm } from '@inertiajs/react';
import { CheckCircle, Clock, Eye, Pencil } from 'lucide-react';
import { FormEvent } from 'react';

type IndexProps = {
    tasks?: Pagination<Task>;
    filters: {
        q?: string;
        done?: number | null;
    };
};
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/tasks/',
    },
];
const Index = ({ tasks, filters }: IndexProps) => {
    const form = useForm({ q: filters.q ?? '', done: filters.done ?? '' });
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.get('/tasks');
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                            Tasks
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Manage your tasks and track progress
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href="/tasks/export"
                            className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                        >
                            Export CSV
                        </a>
                        <Link
                            href="/tasks/create"
                            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
                        >
                            New Task
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={(e) => submit(e)}
                    className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center"
                >
                    <input
                        value={form.data.q}
                        onChange={(e) => form.setData('q', e.target.value)}
                        placeholder="Search title or description"
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-300 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                    />
                    <select
                        value={String(form.data.done)}
                        onChange={(e) =>
                            form.setData(
                                'done',
                                e.currentTarget.value === '1'
                                    ? 1
                                    : e.currentTarget.value === '0'
                                      ? 0
                                      : '',
                            )
                        }
                        className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    >
                        <option
                            value=""
                            className="dark:bg-black dark:text-white"
                        >
                            Any
                        </option>
                        <option
                            value="0"
                            className="dark:bg-black dark:text-white"
                        >
                            ⏳ Pending
                        </option>
                        <option
                            value="1"
                            className="dark:bg-black dark:text-white"
                        >
                            ✅ Done
                        </option>
                    </select>
                    <div className="flex justify-start sm:justify-end">
                        <button
                            type="submit"
                            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                            Filter
                        </button>
                    </div>
                </form>

                <div className="mt-6 overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-800">
                    <table className="w-full min-w-[720px] table-auto divide-y divide-gray-100 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                                    ID
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Title
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Owner
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Due
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Done
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-gray-900">
                            {tasks?.data?.map((task) => (
                                <tr
                                    key={`task-${task.id}`}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                                        {task.id}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                                        {task.title}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                        {task.owner?.email}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                                        {task?.due_at ?? '-'}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {task?.done ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105 dark:from-green-600 dark:to-emerald-700">
                                                <CheckCircle className="h-4 w-4" />
                                                Done
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105 dark:from-amber-500 dark:to-orange-600">
                                                <Clock className="h-4 w-4 animate-pulse" />
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="flex flex-col items-center space-y-2 px-4 py-3 text-sm">
                                        <Link
                                            href={`/tasks/${task.id}`}
                                            className="mr-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 transition-all hover:scale-105 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
                                        >
                                            <Eye className="h-4 w-4" />
                                            View
                                        </Link>
                                        <Link
                                            href={`/tasks/${task.id}/edit`}
                                            className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition-all hover:scale-105 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300"
                                        >
                                            <Pencil className="h-4 w-4" />
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    {tasks?.links?.map((link, i) => (
                        <Link
                            key={i}
                            dangerouslySetInnerHTML={{
                                __html: link.label ?? '',
                            }}
                            href={link?.url ?? ''}
                            className="inline-flex items-center rounded-md border border-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200"
                        ></Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
