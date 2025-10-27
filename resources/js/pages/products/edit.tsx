import { Form, Head, router, usePage } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import ProductsLayout from '@/layouts/products/layout';
import products, { index } from '@/routes/products';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import ProductController from '@/actions/App/Http/Controllers/ProductController';
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Products',
        href: products.index().url,
    },
];


interface Product {
    id: number
    name: string
    description: string
    price: number
}

type PageProps = {
    product: Product
}

export default function Edit() {

    const { product } = usePage<PageProps>().props

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <ProductsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Products"
                        description="Manage your products, show, create, update and delete any product"
                    />

                    <Form
                        {...ProductController.update.form(product.id)}
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
                                        id="name"
                                        className="mt-1 block w-full"
                                        name="name"
                                        defaultValue={product.name}
                                        required
                                        placeholder="Full name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>

                                    <Textarea
                                        id="description"
                                        defaultValue={product.description}
                                        className="mt-1 block w-full"
                                        name="description"
                                        placeholder="Product Description"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price</Label>

                                    <Input
                                        id="price"
                                        type="text"
                                        defaultValue={product.price}
                                        className="mt-1 block w-full"
                                        name="price"
                                        required
                                        placeholder="Product Price"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.price}
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
            </ProductsLayout>
        </AppLayout>
    );
}
