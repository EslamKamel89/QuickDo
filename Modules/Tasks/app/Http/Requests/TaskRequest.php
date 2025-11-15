<?php

namespace Modules\Tasks\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest {

    public function rules(): array {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'done' => ['sometimes', 'boolean'],
            'due_at' => ['nullable', 'date'],
        ];
    }


    public function authorize(): bool {
        return true;
    }
}
