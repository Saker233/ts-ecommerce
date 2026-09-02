import express from 'express'
import type {Express, Request, Response} from 'express'
import {PORT} from './secrets.js'


const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send('Working')
})


app.listen(PORT, () => {
    console.log(`App working on port ${PORT}`)
})