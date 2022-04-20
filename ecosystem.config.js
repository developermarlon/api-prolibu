module.exports = {
    apps: [
        {
            name: 'api-prolibu',
            script: './dist/index.js',
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
            watch: true,
            env: {
                PORT: 3124,
                NODE_ENV: 'development',
                JWT_SECRET: 'marlondeveloper',
                MONGODB_URI: 'mongodb+srv://doadmin:TI46Q932K7N10ZUj@trueques24-02c134c7.mongo.ondigitalocean.com/prolibu'
            },
            env_production: {
                PORT: 3124,
                NODE_ENV: 'production',
                JWT_SECRET: 'marlondeveloper',
                MONGODB_URI: 'mongodb+srv://doadmin:TI46Q932K7N10ZUj@trueques24-02c134c7.mongo.ondigitalocean.com/prolibu'
            }
        }
    ]
};