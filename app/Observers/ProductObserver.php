<?php

namespace App\Observers;

use App\Models\Product;
use App\Models\Todo;
use App\Models\User;
use App\Notifications\ProductCreated;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class ProductObserver
{
    /**
     * Handle the Product "created" event.
     *
     * @param  \App\Models\Product  $product
     * @return void
     */
    public function created(Product $product)
    {
        Todo::create([
            'title' => 'Review new product: ' . $product->name,
            'description' => 'Check product details, pricing, and marketing plan.',
            'product_id' => $product->id,
        ]);

        $users = User::where('id', '!=', Auth::id())->get();
        Notification::send($users, new ProductCreated($product));
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "restored" event.
     */
    public function restored(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "force deleted" event.
     */
    public function forceDeleted(Product $product): void
    {
        //
    }
}
