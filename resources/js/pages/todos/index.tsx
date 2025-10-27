import { Head, Link, router, usePage } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { Todo, type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import { index, create, destroy, edit, markAsCompleted } from '@/routes/todos';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Check, Edit, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import TodosLayout from '@/layouts/todos/layout';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ToDos',
        href: index().url,
    },
];

type PageProps = {
    todos: {
        data: Todo[],
        links: { url: string | null; label: string; active: boolean }[],
        from: number;
        to: number;
        total: number;
    },
};

export default function TodoIndex() {
    const { todos } = usePage<PageProps>().props;

    const [show, setShow] = useState<boolean>(false);
    const [displayedTodo, setDisplayedTodo] = useState<Todo | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const showTodo = (todo: Todo) => {
        setShow(true);
        setDisplayedTodo(todo);
    };


    const allSelected = todos.data.length > 0 && selectedIds.length === todos.data.length;
    const partiallySelected = selectedIds.length > 0 && !allSelected;

    const handleSingleSelect = (todoId: number, checked: boolean) => {
        setSelectedIds((prev) =>
            checked ? [...prev, todoId] : prev.filter((id) => id !== todoId)
        );
    };

    const handleAllSelect = (checked: boolean) => {
        if (checked) {
            setSelectedIds(todos.data.map((todo) => todo.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleCompleteTodo = () => {
        if (selectedIds.length === 0) return;

        router.post(markAsCompleted(), { ids: selectedIds }, {
            onSuccess: () => {
                toast.success("Todos marked as completed!");
                setSelectedIds([]);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this todo?")) {
            router.visit(destroy(id).url, {
                method: 'delete',
                onSuccess: () => toast.success("Todo deleted successfully."),
            });
        }
    };

    const handlePageChange = (url: string | null) => {
        if (!url) return;
        router.visit(url, { preserveScroll: true, preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="To-Do list" />

            <TodosLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <HeadingSmall
                            title="To-do list"
                            description="Manage your Todos — view, create, update, and delete tasks."
                        />
                        <div className="flex space-x-2">
                            {selectedIds.length > 0 && (
                                <Button onClick={handleCompleteTodo} variant="secondary">
                                    Mark as Complete
                                </Button>
                            )}
                            <Button asChild>
                                <Link href={create()}>Add new</Link>
                            </Button>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Checkbox
                                        checked={
                                            allSelected
                                                ? true
                                                : partiallySelected
                                                    ? 'indeterminate'
                                                    : false
                                        }
                                        onCheckedChange={(checked) => handleAllSelect(checked === true)}
                                    />
                                </TableHead>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {todos.data.length > 0 ? (
                                todos.data.map((todo, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Checkbox
                                            className={cn(
                                                todo.completed_at && "disabled:cursor-not-allowed data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 disabled:opacity-100"
                                            )}
                                            checked={selectedIds.includes(todo.id) || !!todo.completed_at}
                                            onCheckedChange={(checked) =>
                                                handleSingleSelect(todo.id, checked === true)
                                            }
                                            disabled={!!todo.completed_at}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{todo.id}</TableCell>
                                    <TableCell>{todo.title}</TableCell>
                                    <TableCell>{todo.description}</TableCell>
                                    <TableCell className="flex text-sm space-x-2">
                                        <Link onClick={(e) => { e.preventDefault(); showTodo(todo); }}>
                                            <Eye className="hover:text-blue-500 cursor-pointer size-4" />
                                        </Link>
                                        <Link href={edit(todo.id).url}>
                                            <Edit className="hover:text-green-500 cursor-pointer size-4" />
                                        </Link>
                                        <Link onClick={(e) => { e.preventDefault(); handleDelete(todo.id); }}>
                                            <X className="hover:text-red-500 cursor-pointer size-4" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                        No todos found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableCaption>
                            <div className="space-x-1">
                                {todos.links.map((link, index) => {
                                    const isDisabled = !link.url || link.active;
                                    return (
                                        <Button
                                            size={"sm"}
                                            variant={link.active ? "default" : "ghost"}
                                            className="disabled:opacity-100"
                                            key={index}
                                            onClick={() => !isDisabled && handlePageChange(link.url)}
                                            disabled={isDisabled}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                            A list of your todos. <br />
                            Showing <strong> {todos.from} </strong> to <strong> {todos.to} </strong> of <strong> {todos.total} </strong> Todos
                        </TableCaption>
                    </Table>

                    <Dialog open={show} onOpenChange={setShow}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Quick View #{displayedTodo?.id}</DialogTitle>
                                <DialogDescription>
                                    This is a quick summary of your task. For full details, open the edit page.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center gap-2">
                                <div className="grid flex-1 gap-2">
                                    <h1 className="font-bold text-xl">{displayedTodo?.title}</h1>
                                    <p>{displayedTodo?.description}</p>
                                    <strong className="text-gray-600">
                                        {displayedTodo?.completed_at ? (
                                            <span className="text-emerald-600">Completed</span>
                                        ) : (
                                            <span className="text-red-500">Not Completed</span>
                                        )}
                                    </strong>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </TodosLayout>
        </AppLayout>
    );
}
