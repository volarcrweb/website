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
            jsonResponse(['error' => 'Method not allowed. Use POST.'], 405);
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
            jsonResponse(['error' => 'Invalid JSON data'], 400);
        }
        
        // Obtener el idioma (por defecto inglés)
        $idioma = $data['language'] ?? 'en';
        $es_espanol = ($idioma === 'es');
        
        // Validar campos requeridos
        $required_fields = ['name', 'email', 'location', 'destination', 'people'];
        foreach ($required_fields as $field) {
            if (empty($data[$field])) {
                $error_msg = $es_espanol ? "El campo '$field' es requerido" : "The field '$field' is required";
                jsonResponse(['error' => $error_msg], 400);
            }
        }
        
        // Validar email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $error_msg = $es_espanol ? 'Email inválido' : 'Invalid email address';
            jsonResponse(['error' => $error_msg], 400);
        }
        
        // Preparar datos del correo
        $nombre = htmlspecialchars($data['name']);
        $email_cliente = $data['email'];
        $origen = htmlspecialchars($data['location']);
        $destino = htmlspecialchars($data['destination']);
        $pasajeros = htmlspecialchars($data['people']);
        $telefono = htmlspecialchars($data['phone'] ?? ($es_espanol ? 'No proporcionado' : 'Not provided'));
        $mensaje = htmlspecialchars($data['message'] ?? ($es_espanol ? 'Sin mensaje adicional' : 'No additional message'));
        
        // Crear el asunto del correo según el idioma
        if ($es_espanol) {
            $asunto = "Nueva solicitud de vuelo - $nombre";
            $titulo_principal = "🚁 Nueva Solicitud de Vuelo";
            $titulo_cliente = "Información del Cliente";
            $titulo_vuelo = "Información del Vuelo";
            $titulo_mensaje = "Mensaje Adicional";
            $fecha_label = "Fecha de solicitud:";
            $footer_text = "Volar CR - Sistema de Reservas";
            $fecha_formato = 'd/m/Y H:i:s';
            $labels = [
                'name' => 'Nombre:',
                'email' => 'Email:',
                'phone' => 'Teléfono:',
                'origin' => 'Origen:',
                'destination' => 'Destino:',
                'passengers' => 'Pasajeros:'
            ];
        } else {
            $asunto = "New Flight Request - $nombre";
            $titulo_principal = "🚁 New Flight Request";
            $titulo_cliente = "Customer Information";
            $titulo_vuelo = "Flight Information";
            $titulo_mensaje = "Additional Message";
            $fecha_label = "Request Date:";
            $footer_text = "Volar CR - Reservation System";
            $fecha_formato = 'm/d/Y H:i:s';
            $labels = [
                'name' => 'Name:',
                'email' => 'Email:',
                'phone' => 'Phone:',
                'origin' => 'Origin:',
                'destination' => 'Destination:',
                'passengers' => 'Passengers:'
            ];
        }
        
        // Crear el cuerpo del correo en HTML
        $cuerpo_html = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>" . ($es_espanol ? 'Nueva Solicitud de Vuelo' : 'New Flight Request') . "</title>
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
                    <h1>$titulo_principal</h1>
                </div>
                <div class='content'>
                    <h2>$titulo_cliente</h2>
                    <table>
                        <tr>
                            <td class='label-cell'>👤 {$labels['name']}</td>
                            <td>$nombre</td>
                        </tr>
                        <tr>
                            <td class='label-cell'>📧 {$labels['email']}</td>
                            <td>$email_cliente</td>
                        </tr>
                        <tr>
                            <td class='label-cell'>📱 {$labels['phone']}</td>
                            <td>$telefono</td>
                        </tr>
                    </table>
                    
                    <h2>$titulo_vuelo</h2>
                    <table>
                        <tr>
                            <td class='label-cell'>📍 {$labels['origin']}</td>
                            <td>$origen</td>
                        </tr>
                        <tr>
                            <td class='label-cell'>🎯 {$labels['destination']}</td>
                            <td>$destino</td>
                        </tr>
                        <tr>
                            <td class='label-cell'>👥 {$labels['passengers']}</td>
                            <td>$pasajeros</td>
                        </tr>
                    </table>
                    
                    <h2>$titulo_mensaje</h2>
                    <div style='background-color: white; padding: 15px; border-left: 4px solid #134A4B;'>
                        $mensaje
                    </div>
                    
                    <p><strong>$fecha_label</strong> " . date($fecha_formato) . "</p>
                </div>
                <div class='footer'>
                    <p>© " . date('Y') . " $footer_text</p>
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
            // Crear correo de confirmación al cliente según el idioma
            if ($es_espanol) {
                $asunto_cliente = "Confirmación de solicitud de vuelo - Volar CR";
                $titulo_confirmacion = "🚁 ¡Gracias por contactarnos!";
                $saludo = "Hola $nombre,";
                $mensaje_confirmacion = "Hemos recibido tu solicitud de vuelo con los siguientes detalles:";
                $mensaje_contacto = "Nuestro equipo se pondrá en contacto contigo pronto para brindarte más información y ayudarte con tu reserva.";
                $mensaje_gracias = "¡Gracias por elegir Volar CR!";
                $footer_cliente = "Volar CR - Tu aventura comienza aquí";
                $origen_label = "Origen:";
                $destino_label = "Destino:";
                $pasajeros_label = "Pasajeros:";
            } else {
                $asunto_cliente = "Flight Request Confirmation - Volar CR";
                $titulo_confirmacion = "🚁 Thank you for contacting us!";
                $saludo = "Hello $nombre,";
                $mensaje_confirmacion = "We have received your flight request with the following details:";
                $mensaje_contacto = "Our team will contact you soon to provide you with more information and help you with your reservation.";
                $mensaje_gracias = "Thank you for choosing Volar CR!";
                $footer_cliente = "Volar CR - Your adventure begins here";
                $origen_label = "Origin:";
                $destino_label = "Destination:";
                $pasajeros_label = "Passengers:";
            }
            
            $cuerpo_cliente = "
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='UTF-8'>
                <title>" . ($es_espanol ? 'Confirmación de Solicitud' : 'Request Confirmation') . "</title>
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
                        <div style='text-align: center; padding: 20px; background-color: white;'>
                                <img src='https://www.volarcr.com/images/logo.png' alt='Volar CR Logo' style='width: 150px; max-width: 30%; height: auto; margin-bottom: 10px;'>
                        </div>
                        <h1>$titulo_confirmacion</h1>
                    </div>
                    <div class='content'>
                        <h2>$saludo</h2>
                        <p>$mensaje_confirmacion</p>
                        <ul>
                            <li><strong>$origen_label</strong> $origen</li>
                            <li><strong>$destino_label</strong> $destino</li>
                            <li><strong>$pasajeros_label</strong> $pasajeros</li>
                        </ul>
                        <p>$mensaje_contacto</p>
                        <p><strong>$mensaje_gracias</strong></p>
                    </div>
                    <div class='footer'>
                        <p>© " . date('Y') . " $footer_cliente</p>
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
            
            $success_message = $es_espanol ? 'Correo enviado exitosamente' : 'Email sent successfully';
            jsonResponse([
                'success' => true,
                'message' => $success_message
            ]);
        } else {
            $error_message = $es_espanol ? 'Error al enviar el correo' : 'Error sending email';
            jsonResponse([
                'error' => $error_message,
                'details' => $resultado['mensaje']
            ], 500);
        }
        
    } catch (Exception $e) {
        // Log del error para debugging
        error_log("Error en enviarCorreoFormulario: " . $e->getMessage());
        error_log("Stack trace: " . $e->getTraceAsString());
        
        $idioma = $data['language'] ?? 'en';
        $es_espanol = ($idioma === 'es');
        $error_message = $es_espanol ? 'Error interno del servidor' : 'Internal server error';
        
        jsonResponse([
            'error' => $error_message,
            'details' => $e->getMessage()
        ], 500);
    } catch (Error $e) {
        // Capturar errores fatales de PHP
        error_log("Error fatal en enviarCorreoFormulario: " . $e->getMessage());
        error_log("Stack trace: " . $e->getTraceAsString());
        
        jsonResponse([
            'error' => 'Error interno del servidor',
            'details' => 'Fatal error occurred'
        ], 500);
    }
}
?>