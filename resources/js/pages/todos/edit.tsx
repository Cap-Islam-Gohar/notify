import { Form, Head, router, usePage } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { Todo, type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/todos';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import { Textarea } from '@/components/ui/textarea';
import TodosLayout from '@/layouts/todos/layout';
import TodoController from '@/actions/App/Http/Controllers/TodoController';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Todo',
        href: index().url,
    }, {
        title: 'Create new',
        href: index().url,
    },
];

type PageProps = {
    todo: Todo
}

export default function Edit() {

    const { todo } = usePage<PageProps>().props

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todos" />

            <TodosLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Products"
                        description="Manage your products, show, create, update and delete any product"
                    />

                    <Form
                        {...TodoController.update.form(todo.id)}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="title"
                                        className="mt-1 block w-full"
                                        name="title"
                                        defaultValue={todo.title}
                                        required
                                        placeholder="What to do?"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.title}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>

                                    <Textarea
                                        id="description"
                                        defaultValue={todo.description}
                                        className="mt-1 block w-full"
                                        name="description"
                                        placeholder="Product Description"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>


                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-profile-button"
                                    >
                                        Update
                                    </Button>

                                    <Button variant={"secondary"} onClick={(e) => {
                                        e.preventDefault()
                                        router.visit(index().url)
                                    }}>
                                        Cancle
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            updated
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>

                </div>
            </TodosLayout>
        </AppLayout>
    );
}
