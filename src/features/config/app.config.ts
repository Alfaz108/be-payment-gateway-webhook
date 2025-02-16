const appConfig = () => ({
    environment: process.env.NODE_ENV || 'development',
    jwt_secret: process.env.JWT_SECRET,
    access_token_expiration_minute: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refresh_token_expiration_days: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    master_password: process.env.MASTER_PASSWORD,
    file_upload_url: process.env.FILE_UPLOAD_URL,
    file_upload_token: process.env.FILE_UPLOAD_TOKEN,
    sms_server_api_key: process.env.SMS_SERVER_API_KEY,
    sms_server_url: process.env.SMS_SERVER_URL,
    online_payment_url: process.env.SHUNNO_PAY_BASE_URL,
    call_back_url: process.env.BKASH_CALLBACK_URL,

    ssl_online_payment_url: process.env.SSLCOMMERZ,
});

export { appConfig };
