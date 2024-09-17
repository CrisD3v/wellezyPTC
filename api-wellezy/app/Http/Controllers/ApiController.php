<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use app\Models\Itiner;
use app\Models\reserves;

/**
 * @OA\Info(
 *     title="API Wellezy",
 *     version="1.0.0",
 *     description="Esta es la documentación de la API de Wellezy."
 * )
 * @OA\Server(url="http://127.0.0.1:8000/")
 */

class ApiController extends Controller
{

    /**
     * @OA\SecurityScheme(
     *     type="http",
     *     scheme="bearer",
     *     bearerFormat="JWT",
     *     securityScheme="bearerAuth"
     * )
     */

    /**
     * Obtiene información de aeropuertos según el código de ciudad proporcionado.
     *
     * @OA\Post (
     *     path="/api/airports/{code}",
     *     tags={"Airports"},
     *     summary="Busca aeropuertos por el nombre de la ciudad.",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="code",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         description="Nombre de la ciudad para buscar aeropuertos",
     *         example="Medellin"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Nombre de la ciudad",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="code",
     *                 type="string",
     *                 example="Medellin"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Aeropuertos encontrados",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(
     *                     property="id",
     *                     type="number",
     *                     example=1
     *                 ),
     *                 @OA\Property(
     *                     property="city",
     *                     type="string",
     *                     example="Medellin"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string",
     *                     example="Enrique Olaya Herrera"
     *                 ),
     *                 @OA\Property(
     *                     property="country",
     *                     type="string",
     *                     example="Colombia"
     *                 ),
     *                 @OA\Property(
     *                     property="iata",
     *                     type="string",
     *                     example="EOH"
     *                 ),
     *                 @OA\Property(
     *                     property="created_at",
     *                     type="string",
     *                     example="2023-08-30T14:37:13.000000Z"
     *                 ),
     *                 @OA\Property(
     *                     property="updated_at",
     *                     type="string",
     *                     example="2023-08-30T14:37:13.000000Z"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No se encontraron aeropuertos",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="No airports found in this city"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error en la solicitud",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Error fetching data: [detalle del error]"
     *             )
     *         )
     *     )
     * )
     */

    public function airports($code)
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

    /**
     * @OA\Post(
     *     path="/api/flights",
     *     tags={"Flights"},
     *     summary="Busca vuelos según criterios proporcionados",
     *     description="Busca vuelos basados en la ciudad de salida, llegada, número de pasajeros y hora de salida.",
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Datos para buscar vuelos",
     *         @OA\JsonContent(
     *             @OA\Property(property="searchs", type="integer", example=250),
     *             @OA\Property(property="qtyPassengers", type="integer", example=1),
     *             @OA\Property(property="adult", type="integer", example=1),
     *             @OA\Property(
     *                 property="itinerary",
     *                 type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="departureCity", type="string", example="mde"),
     *                     @OA\Property(property="arrivalCity", type="string", example="lhr"),
     *                     @OA\Property(property="hour", type="string", format="date-time", example="2024-10-09T00:00:00+0000")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Vuelos encontrados",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="dateOfDeparture", type="string", format="date", example="2024-02-09"),
     *                 @OA\Property(property="timeOfDeparture", type="string", example="08:00"),
     *                 @OA\Property(property="dateOfArrival", type="string", format="date", example="2024-02-09"),
     *                 @OA\Property(property="timeOfArrival", type="string", example="10:00"),
     *                 @OA\Property(property="marketingCarrier", type="string", example="AV"),
     *                 @OA\Property(property="flightOrtrainNumber", type="string", example="AV123"),
     *                 @OA\Property(
     *                     property="locationId",
     *                     type="object",
     *                     @OA\Property(property="departureCity", type="string", example="MDE"),
     *                     @OA\Property(property="arrivalCity", type="string", example="LHR")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error en la solicitud",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Error fetching data: [detalle del error]")
     *         )
     *     )
     * )
     */

    public function flights(Request $request)
    {
        // URL API
        $url = "https://staging.travelflight.aiop.com.co/api/flights";

        try {
            // Obtener el cuerpo de la solicitud
            $bodyData = $request->json()->all(); // Obtiene el JSON completo del cuerpo de la solicitud

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

    /**
     * @OA\Post(
     *     path="/api/reserves/{id_user}",
     *     tags={"Reserves"},
     *     summary="Crea una reserva para un usuario con información de itinerarios",
     *     description="Este endpoint crea una reserva de vuelo asociada a un usuario y guarda los itinerarios proporcionados.",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id_user",
     *         in="path",
     *         description="ID del usuario para el que se crea la reserva",
     *         required=true,
     *         @OA\Schema(type="integer", example=123)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Datos necesarios para crear la reserva y los itinerarios",
     *         @OA\JsonContent(
     *             @OA\Property(property="locationName", type="string", example="Alfonso B. Aragon"),
     *             @OA\Property(property="dateOfDeparture", type="string", format="date", example="2024-10-15"),
     *             @OA\Property(property="timeOfDeparture", type="string", example="08:00"),
     *             @OA\Property(
     *                 property="itineraries",
     *                 type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="origin", type="string", example="MDE"),
     *                     @OA\Property(property="destination", type="string", example="BOG"),
     *                     @OA\Property(property="departure_date", type="string", format="date", example="2024-10-15"),
     *                     @OA\Property(property="arrival_date", type="string", format="date", example="2024-10-15")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Reserva y itinerarios creados correctamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Reservation and itineraries saved correctly.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 @OA\Property(property="locationId", type="array", @OA\Items(type="string", example="The locationName field is required.")),
     *                 @OA\Property(property="itineraries.0.origin", type="array", @OA\Items(type="string", example="The origin field is required."))
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error interno del servidor",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Error creating reservation: [detalle del error]")
     *         )
     *     )
     * )
     */


    public function reserves(Request $request, $id_user)
    {
        // Validar la solicitud
        $request->validate([
            'locationName' => 'required|string',
            'dateOfDeparture' => 'required|date',
            'timeOfDeparture' => 'required',
            'itineraries' => 'required|array',
            'itineraries.*.origin' => 'required|string',
            'itineraries.*.destination' => 'required|string',
            'itineraries.*.departure_date' => 'required|date',
            'itineraries.*.arrival_date' => 'required|date',
        ]);

        // Crear la reserva
        $reserve = reserves::create([
            'id_user' => auth()->id(), // O el ID del usuario según tu lógica
            'locationName' => $request->locationName,
            'dateOfDeparture' => $request->dateOfDeparture,
            'timeOfDeparture' => $request->timeOfDeparture,
        ]);

        // Obtener los datos de los itinerarios del vuelo
        $itinerariesData = $request->input('itineraries');

        // Crear los itinerarios asociados a la reserva
        foreach ($itinerariesData as $itinerary) {
            $reserve->itineraries()->create($itinerary);
        }

        // Responder con éxito
        return response()->json(['message' => 'Reserva creada con éxito'], 201);
    }
}
