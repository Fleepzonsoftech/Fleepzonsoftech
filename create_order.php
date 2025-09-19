<?php
require 'vendor/autoload.php';
use Razorpay\Api\Api;
$api = new Api('rzp_live_RJS0X8SOuENgkk','aTnOY7bye9ycHqCvGenC2GlJ');
$input = json_decode(file_get_contents('php://input'), true);
$amount = isset($input['amount']) ? $input['amount'] : 50000;

$orderData = [
    'amount' => $amount,
    'currency' => 'INR',
    'receipt' => 'rcpt_' . time(),
    'payment_capture' => 1
];

try {
    $order = $api->order->create($orderData);
    echo json_encode(['success' => true, 'order' => $order]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
