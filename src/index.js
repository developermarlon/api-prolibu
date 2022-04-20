import dotenv from 'dotenv'
if (!process.env.NODE_ENV) dotenv.config()

//config db
import './database/conection'
import './database/config'

//configure authentication strategies
import './middlewares/local-strategy'
import './middlewares/jwt-strategy'

import app from './app'

app.listen(process.env.PORT, () => {
    console.log(`listen on port ${process.env.PORT}`)
})