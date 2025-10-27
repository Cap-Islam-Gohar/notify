import { Form, Head, router } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import products, { index } from '@/routes/products';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import { Textarea } from '@/components/ui/textarea';
import TodoController from '@/actions/App/Http/Controllers/TodoController';
import TodosLayout from '@/layouts/todos/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Todo',
        href: products.index().url,
    }, {
        title: 'Create new',
        href: products.index().url,
    },
];


export default function Create() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todos" />

            <TodosLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Todos"
                        description="Manage your todos, show, create, update and delete any todo"
                    />

                    <Form
                        {...TodoController.store.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Title</Label>

                                    <Input
                                        id="title"
                                        className="mt-1 block w-full"
                                        name="title"
                                        required
                                        placeholder="What to do ?"
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
                                        className="mt-1 block w-full"
                                        name="description"
                                        placeholder="To-do Description"
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
                                        Create
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
                                            created
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
