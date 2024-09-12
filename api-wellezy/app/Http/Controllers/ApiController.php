<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{



    public function airports(Request $request, $code)
    {
        try {
            if (empty($code)) {
                return response()->json(['message' => 'No airports found in this city'], 404);
            }

            $response = Http::post('https://staging.travelflight.aiop.com.co/api/airports', [
                'code' => $code,
            ]);

            if ($response->failed()) {
                return response()->json(['message' => 'Error fetching data'], $response->status());
            }

            $data = $response->json();

            if (empty($data)) {
                return response()->json(['message' => 'No airports found in this city'], 404);
            }

            return response()->json($data);
        } catch (\Exception $e) {
            // Manejo de excepciones y retorno de error
            return response()->json(['message' => 'Error fetching data: ' . $e->getMessage()], 500);
        }
    }


    public function flights(Request $request)
    {
        // URL API
        $url = "https://staging.travelflight.aiop.com.co/api/flights";

        // Datos del cuerpo de la solicitud
        $bodyData = [
            [
                "searchs" => 250,
                "qtyPassengers" => $request->input('passengers'),
                "adult" => $request->input('adult'),
                "itinerary" => [
                    [
                        "departureCity" => $request->input('city'),
                        "arrivalCity" => $request->input('arrivalCity'),
                        "hour" => $request->input('hour')
                    ]
                ]
            ]
        ];

        try {
            // Enviar la solicitud POST y obtener la respuesta
            $response = Http::post($url, $bodyData);

            // Verificar si la solicitud falló
            if ($response->failed()) {
                throw new \Exception("Error fetching data. Status code: " . $response->status());
            }

            // Decodificar la respuesta JSON
            $data = $response->json();

            // Retornar la respuesta JSON
            return response()->json($data);
        } catch (\Exception $e) {
            // Manejo de excepciones y retorno de error
            return response()->json(['message' => 'Error fetching data: ' . $e->getMessage()], 500);
        }
    }
}
