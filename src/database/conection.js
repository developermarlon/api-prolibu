import mongoose from 'mongoose'
import path from 'path'

import dotenv from 'dotenv'
if (!process.env.NODE_ENV) dotenv.config()

mongoose.connect(process.env.MONGODB_URI + `?authSource=admin&replicaSet=trueques24&tls=true&tlsCAFile=${path.join(__dirname, '../../ca/ca-certificate.cer')}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((db) => console.log(`DB is connected`))
    .catch((err) => console.log(err));