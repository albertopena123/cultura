<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Establecimiento extends Model
{
    //
    protected $fillable = [
        'nombre',
        'categoria_id',
        'imagen_principal',
        'direccion',
        'lat',
        'lng',
        'telefono',
        'descripcion',
        'apertura',
        'cierre',
        'uuid'
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}
