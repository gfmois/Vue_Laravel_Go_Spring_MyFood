<?php

namespace App\Http\Controllers;



class FileController extends Controller
{
    public function getImage($filename)
    {
        $file = public_path()."/uploads/".$filename;
        return response()->file($file);
    }
}
