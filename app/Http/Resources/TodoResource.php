<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'description'  => $this->description,
            'is_completed' => $this->completed_at ? true : false,
            'completed_at' => $this->completed_at,
            'product_id'   => $this->product_id,
            'product'      => $this->whenLoaded('product', function () {
                return [
                    'id'   => $this->product->id,
                    'name' => $this->product->name,
                ];
            }),
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
        ];
    }
}
