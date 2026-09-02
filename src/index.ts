import express from 'express'
import type {Express, Request, Response} from 'express'
import {PORT} from './secrets.js'
import rootRouter from './routes/index.js'


const app = express()

app.use('/api', rootRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Working')
})


app.listen(PORT, () => {
    console.log(`App working on port ${PORT}`)
})