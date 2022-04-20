import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import moment from 'moment-timezone'
import helmet from 'helmet'

import Users from './routes/user.routes'
import Currencys from './routes/currency.routes'
import Products from './routes/product.routes'

const app = express()
app.use(cors({ origin: ['http://localhost:3000', 'https://prolibu.trueques24.com'] }))
app.use(helmet())

app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
moment.tz.setDefault("America/Bogota").locale('es')

//config routes
app.use('/users', Users)
app.use('/currencys', Currencys)
app.use('/products', Products)

export default app