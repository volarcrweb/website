<?php
header('Content-Type: application/json');

// Configurar CORS para permitir peticiones desde los dominios especificados
$allowed_origins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost',
    'http://apivolar.com',
    'https://api.volarcr.com',
    'https://temporal.volarcr.com',
    'https://volarcr.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Manejar preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir el servicio de correo
require_once __DIR__ . '/services/EnvioCorreo.php';

// Función para responder con JSON
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

// Obtener la ruta de la URL
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Remover prefijos comunes
$path = str_replace('/VolarMau/ApiVolar', '', $path);
$path = str_replace('/ApiVolar', '', $path);

// Si la ruta está vacía, ponerla como raíz
if (empty($path) || $path === '/') {
    $path = '/';
}

// Debug: mostrar la ruta procesada
// error_log("Path procesado: " . $path);

// Router simple
switch ($path) {
    case '/enviar-correo':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            enviarCorreoFormulario();
        } else {
            jsonResponse(['error' => 'Método no permitido. Use POST.'], 405);
        }
        break;
    
    case '/':
    default:
        jsonResponse([
            'message' => 'API Volar - Servicio de correos', 
            'version' => '1.0',
            'endpoints' => [
                'POST /enviar-correo' => 'Enviar correo con datos del formulario'
            ],
            'path_received' => $path
        ], 200);
        break;
}

function enviarCorreoFormulario() {
    try {
        // Obtener datos del POST
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (!$data) {
            jsonResponse(['error' => 'Datos JSON inválidos'], 400);
        }
        
        // Validar campos requeridos
        $required_fields = ['name', 'email', 'location', 'destination', 'people'];
        foreach ($required_fields as $field) {
            if (empty($data[$field])) {
                jsonResponse(['error' => "El campo '$field' es requerido"], 400);
            }
        }
        
        // Validar email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            jsonResponse(['error' => 'Email inválido'], 400);
        }
        
        // Preparar datos del correo
        $nombre = htmlspecialchars($data['name']);
        $email_cliente = $data['email'];
        $origen = htmlspecialchars($data['location']);
        $destino = htmlspecialchars($data['destination']);
        $pasajeros = htmlspecialchars($data['people']);
        $telefono = htmlspecialchars($data['phone'] ?? 'No proporcionado');
        $mensaje = htmlspecialchars($data['message'] ?? 'Sin mensaje adicional');
        
        // Crear el asunto del correo
        $asunto = "Nueva solicitud de vuelo - $nombre";
        
        // Crear el cuerpo del correo en HTML
        $cuerpo_html = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Nueva Solicitud de Vuelo</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #134A4B; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background-color: #f9f9f9; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #134A4B; }
                .value { margin-left: 10px; }
                .footer { background-color: #134A4B; color: white; padding: 10px; text-align: center; font-size: 12px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                td { padding: 8px; border: 1px solid #ddd; }
                .label-cell { background-color: #f0f0f0; font-weight: bold; width: 30%; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>🛩️ Nueva Solicitud de Vuelo</h1>
                </div>
                <div class='content'>
                    <h2>Información del Cliente</h2>
                    <table>
                        <tr>
                            <td class='label-cell'>👤 Nombre:</td>
                            <td>$nombre</td>
                        </tr>
                        <tr>
                            <td class='label-cell'>📧 Email:</td>
                            <td>$email_cliente</td>
                        </tr>
                        <tr>
                            <td class='label-cell'>📱 Teléfono:</td>
                            <td>$telefono</td>
                        </tr>
                    </table>
                    
                    <h2>Información del Vuelo</h2>
                    <table>
                        <tr>
                            <td class='label-cell'>📍 Origen:</td>
                            <td>$origen</td>
                        </tr>
                        <tr>
                            <td class='label-cell'>🎯 Destino:</td>
                            <td>$destino</td>
                        </tr>
                        <tr>
                            <td class='label-cell'>👥 Pasajeros:</td>
                            <td>$pasajeros</td>
                        </tr>
                    </table>
                    
                    <h2>Mensaje Adicional</h2>
                    <div style='background-color: white; padding: 15px; border-left: 4px solid #134A4B;'>
                        $mensaje
                    </div>
                    
                    <p><strong>Fecha de solicitud:</strong> " . date('d/m/Y H:i:s') . "</p>
                </div>
                <div class='footer'>
                    <p>© " . date('Y') . " Volar CR - Sistema de Reservas</p>
                </div>
            </div>
        </body>
        </html>";
        
        // Enviar correo al administrador
        $resultado = enviarCorreo(
            'reservations@volarcr.com', // Destinatario (administrador)
            'Administrador Volar',
            $asunto,
            $cuerpo_html,
            true // Es HTML
        );
        
        if ($resultado['exito']) {
            // También enviar correo de confirmación al cliente
            $asunto_cliente = "Confirmación de solicitud de vuelo - Volar CR";
            $cuerpo_cliente = "
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='UTF-8'>
                <title>Confirmación de Solicitud</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #134A4B; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background-color: #f9f9f9; }
                    .footer { background-color: #134A4B; color: white; padding: 10px; text-align: center; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h1>✈️ ¡Gracias por contactarnos!</h1>
                    </div>
                    <div class='content'>
                        <h2>Hola $nombre,</h2>
                        <p>Hemos recibido tu solicitud de vuelo con los siguientes detalles:</p>
                        <ul>
                            <li><strong>Origen:</strong> $origen</li>
                            <li><strong>Destino:</strong> $destino</li>
                            <li><strong>Pasajeros:</strong> $pasajeros</li>
                        </ul>
                        <p>Nuestro equipo se pondrá en contacto contigo pronto para brindarte más información y ayudarte con tu reserva.</p>
                        <p><strong>¡Gracias por elegir Volar CR!</strong></p>
                    </div>
                    <div class='footer'>
                        <p>© " . date('Y') . " Volar CR - Tu aventura comienza aquí</p>
                    </div>
                </div>
            </body>
            </html>";
            
            enviarCorreo(
                $email_cliente,
                $nombre,
                $asunto_cliente,
                $cuerpo_cliente,
                true
            );
            
            jsonResponse([
                'success' => true,
                'message' => 'Correo enviado exitosamente'
            ]);
        } else {
            jsonResponse([
                'error' => 'Error al enviar el correo',
                'details' => $resultado['mensaje']
            ], 500);
        }
        
    } catch (Exception $e) {
        jsonResponse([
            'error' => 'Error interno del servidor',
            'details' => $e->getMessage()
        ], 500);
    }
}
?>