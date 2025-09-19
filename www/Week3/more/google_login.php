<?php

error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);
session_start();
require_once 'vendor/autoload.php';


$client = new Google_Client();
$client->setClientId('YOUR_CLIENT_ID');
$client->setClientSecret('YOUR_CLIENT_SECRET');
$client->setRedirectUri('YOUR_REDIRECT_URI');
$client->addScope('email');
$client->addScope('profile');

if (!isset($_GET['code'])) {
    $auth_url = $client->createAuthUrl();
    header('Location: ' . filter_var($auth_url, FILTER_SANITIZE_URL));
} else {
    $client->authenticate($_GET['code']);
    $_SESSION['access_token'] = $client->getAccessToken();
    $oauth = new Google_Service_Oauth2($client);
    $user_info = $oauth->userinfo->get();
    $_SESSION['user'] = $user_info;
    echo "Welcome, " . $user_info->name;
    print_r($user_info);
}
?>