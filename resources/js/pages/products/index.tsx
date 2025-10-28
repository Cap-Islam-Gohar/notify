import { Head, Link, router, usePage } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { Product, type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import ProductsLayout from '@/layouts/products/layout';
import products, { create, destroy, edit } from '@/routes/products';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Edit, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from 'sonner';
import { cn } from '@/lib/utils';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Products',
        href: products.index().url,
    },
];


type PageProps = {
    products: {
        data: Product[],
        links: { url: string | null; label: string; active: boolean }[],
        from: number;
        to: number;
        total: number;
    };
}

export default function Index() {

    const { products } = usePage<PageProps>().props

    const [show, setShow] = useState<boolean>(false);

    const [displayedProduct, setDisplayedProduct] = useState<Product | null>(null);

    const showProduct = (product: Product) => {
        setShow(true);
        setDisplayedProduct(product)
    }

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.visit(destroy(id).url, {
                method: 'delete',
                onSuccess: page => {
                    toast("Product has been deleted")
                },
            });
        }
    }

    const handlePageChange = (url: string | null) => {
        if (!url) return;
        router.visit(url, { preserveScroll: true, preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <ProductsLayout>
                <div className="space-y-6">
                    <div className="flex justify-between">
                        <HeadingSmall
                            title="Products"
                            description="Manage your products, show, create, update and delete any product"
                        />
                        <Button>
                            <Link href={create()}>
                                Add new
                            </Link>
                        </Button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.data.length > 0 ? (
                                products.data.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell className="text-right">{product.price}</TableCell>
                                        <TableCell className="flex text-sm space-x-2">
                                            <Link onClick={(e) => {
                                                e.preventDefault()
                                                showProduct(product)
                                            }}>
                                                <Eye className="hover:text-blue-500 cursor-pointer size-4"></Eye>
                                            </Link>
                                            <Link href={edit(product.id).url}>
                                                <Edit className="hover:text-green-500 cursor-pointer size-4"></Edit>
                                            </Link>
                                            <Link onClick={(e) => {
                                                e.preventDefault()
                                                handleDelete(product.id)
                                            }}>
                                                <X className="hover:text-red-500 cursor-pointer size-4"></X>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                        No products found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableCaption>
                            <div className="space-x-1">
                                {products.links.map((link, index) => {
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
                            A list of your products. <br />
                            Showing <strong> {products.from} </strong> to <strong> {products.to} </strong> of <strong> {products.total} </strong> Todos
                        </TableCaption>
                    </Table>



                    <Dialog open={show} onOpenChange={setShow}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Quick View # {displayedProduct?.id}</DialogTitle>
                                <DialogDescription>
                                    this is product summary only , go to product Page to see all details.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center gap-2">
                                <div className="grid flex-1 gap-2">
                                    <h1 className="font-bold text-xl">{displayedProduct?.name}</h1>
                                    <p>{displayedProduct?.description}</p>
                                    <strong>{displayedProduct?.price} {" "} LE</strong>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </ProductsLayout>
        </AppLayout >
    );
}
