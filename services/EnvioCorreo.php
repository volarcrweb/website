<?php
// Incluir PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Incluir los archivos de PHPMailer manualmente
require_once __DIR__ . '/PHPMailer/src/Exception.php';
require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/src/SMTP.php';

function enviarCorreo($destinatario, $nombre_destinatario, $asunto, $mensaje, $esHTML = true) {
    $mail = new PHPMailer(true);
    
    try {
        // Configuración del servidor SMTP
        $mail->SMTPDebug = 0; // Desactivar debug en producción (0 = off, 1 = client, 2 = client and server)
        $mail->isSMTP(); // Usar SMTP
        $mail->Host = 'smtp.hostinger.com'; // Servidor SMTP
        $mail->SMTPAuth = true; // Habilitar autenticación SMTP
        $mail->Username = 'reservations@volarcr.com'; // Email del remitente
        $mail->Password = 'volarReserve25#$'; // Contraseña SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Encriptación TLS
        $mail->Port = 587; // Puerto SMTP
        $mail->Timeout = 60; // Timeout aumentado
        
        // Configuración del correo
        $mail->setFrom('reservations@volarcr.com', 'Volar CR - Reservas'); // Remitente
        $mail->addAddress($destinatario, $nombre_destinatario); // Destinatario
        
        // Opcional: Agregar más destinatarios
        // $mail->addAddress('otro@email.com', 'Otro Nombre');
        // $mail->addCC('copia@email.com');
        // $mail->addBCC('copia_oculta@email.com');
        
        // Configuración de contenido
        $mail->isHTML($esHTML); // Formato HTML o texto plano
        $mail->Subject = $asunto;
        $mail->Body = $mensaje;
        
        // Mensaje alternativo en texto plano (opcional, para clientes que no soportan HTML)
        if ($esHTML) {
            $mail->AltBody = strip_tags($mensaje);
        }
        
        // Configuración adicional de cabeceras
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';
        
        // Enviar el correo
        $mail->send();
        return array('exito' => true, 'mensaje' => 'Correo enviado correctamente');
        
    } catch (Exception $e) {
        return array('exito' => false, 'mensaje' => "Error al enviar el correo: {$mail->ErrorInfo}");
    }
}

// Función para enviar correo con archivo adjunto
function enviarCorreoConAdjunto($destinatario, $nombre_destinatario, $asunto, $mensaje, $archivo_path, $archivo_nombre = null) {
    $mail = new PHPMailer(true);
    
    try {
        // Configuración del servidor SMTP (igual que antes)
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'reservations@volarcr.com';
        $mail->Password = 'volarReserve25#$';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->Timeout = 60;
        
        // Configuración del correo
        $mail->setFrom('reservations@volarcr.com', 'Pagina Web Volar');
        $mail->addAddress($destinatario, $nombre_destinatario);
        
        // Agregar archivo adjunto
        if (file_exists($archivo_path)) {
            $nombre_adjunto = $archivo_nombre ? $archivo_nombre : basename($archivo_path);
            $mail->addAttachment($archivo_path, $nombre_adjunto);
        }
        
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body = $mensaje;
        $mail->AltBody = strip_tags($mensaje);
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';
        
        $mail->send();
        return array('exito' => true, 'mensaje' => 'Correo con adjunto enviado correctamente');
        
    } catch (Exception $e) {
        return array('exito' => false, 'mensaje' => "Error al enviar el correo: {$mail->ErrorInfo}");
    }
}

// Archivo de funciones para envío de correos - Volar CR
// Las funciones están listas para ser utilizadas por el API
?>

