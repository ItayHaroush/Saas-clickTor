<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $appointments = $request->user()->appointments()
            ->orderBy('appointment_date', 'desc')
            ->paginate(20);

        return response()->json($appointments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_phone' => 'nullable|string|max:20',
            'client_email' => 'nullable|email|max:255',
            'appointment_date' => 'required|date',
            'duration_minutes' => 'nullable|integer|min:15|max:480',
            'notes' => 'nullable|string',
            'status' => 'nullable|in:scheduled,completed,cancelled',
        ]);

        $appointment = $request->user()->appointments()->create($validated);

        return response()->json($appointment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $appointment = $request->user()->appointments()->findOrFail($id);

        return response()->json($appointment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $appointment = $request->user()->appointments()->findOrFail($id);

        $validated = $request->validate([
            'client_name' => 'sometimes|required|string|max:255',
            'client_phone' => 'nullable|string|max:20',
            'client_email' => 'nullable|email|max:255',
            'appointment_date' => 'sometimes|required|date',
            'duration_minutes' => 'nullable|integer|min:15|max:480',
            'notes' => 'nullable|string',
            'status' => 'nullable|in:scheduled,completed,cancelled',
        ]);

        $appointment->update($validated);

        return response()->json($appointment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $appointment = $request->user()->appointments()->findOrFail($id);
        $appointment->delete();

        return response()->json(['message' => 'Appointment deleted successfully']);
    }
}
