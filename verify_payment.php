<?php
require 'vendor/autoload.php';
use Razorpay\Api\Api;

$api = new Api(getenv('rzp_live_RJS0X8SOuENgkk'), getenv('aTnOY7bye9ycHqCvGenC2GlJ'));

$input = json_decode(file_get_contents('php://input'), true);
$signatureStatus = false;

try {
    $attributes = [
        'razorpay_order_id' => $input['razorpay_order_id'],
        'razorpay_payment_id' => $input['razorpay_payment_id'],
        'razorpay_signature' => $input['razorpay_signature']
    ];
    $api->utility->verifyPaymentSignature($attributes);
    $signatureStatus = true;
} catch(Exception $e) {
    $signatureStatus = false;
}

if($signatureStatus){
    echo json_encode(['success'=>true, 'message'=>'Payment verified']);
} else {
    echo json_encode(['success'=>false, 'message'=>'Invalid signature']);
}
?>
