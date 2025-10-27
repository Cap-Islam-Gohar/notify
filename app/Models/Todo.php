<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        'title',
        'description',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime'
    ];


    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Mark the Todo as completed.
     *
     * @return void
     */
    public function complete()
    {
        if (is_null($this->completed_at)) {
            $this->forceFill(['completed_at' => $this->freshTimestamp()])->save();
        }
    }

    /**
     * Determine if a todo has been complete.
     *
     * @return bool
     */
    public function completed()
    {
        return $this->completed_at !== null;
    }

    /**
     * Determine if a todo has not been uncomplete.
     *
     * @return bool
     */
    public function uncompleted()
    {
        return $this->colmpleted_at === null;
    }

    /**
     * Scope a query to only include read notifications.
     *
     * @param  \Illuminate\Database\Eloquent\Builder<static>  $query
     * @return \Illuminate\Database\Eloquent\Builder<static>
     */
    public function scopeCompleted(Builder $query)
    {
        return $query->whereNotNull('completed_at');
    }

    /**
     * Scope a query to only include uncompleted todo.
     *
     * @param  \Illuminate\Database\Eloquent\Builder<static>  $query
     * @return \Illuminate\Database\Eloquent\Builder<static>
     */
    public function scopeUncompleted(Builder $query)
    {
        return $query->whereNull('completed_at');
    }


}
