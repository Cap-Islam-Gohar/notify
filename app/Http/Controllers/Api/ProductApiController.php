<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

/**
 * @group Products
 * 
 * APIs for managing products.
 */
class ProductApiController extends BaseApiController
{
    /**
     * 
     * List products
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 15);
        $products = Product::paginate($perPage);

        return ProductResource::collection($products);
    }

    /**
     * Create a product
     *
     * @param ProductRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ProductRequest $request)
    {
        $validated = $request->validated();

        $product = Product::create($validated);

        return $this->success(new ProductResource($product), 'Product created successfully', 201);
    }

    /**
     * Show a product
     *
     * @param Product $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update a product
     *
     * @param ProductRequest $request
     * @param Product $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        $product->update($validated);

        return $this->success(new ProductResource($product), 'Product updated successfully');
    }

    /**
     * Delete a product
     *
     * @param Product $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return $this->noContent();
    }
}
