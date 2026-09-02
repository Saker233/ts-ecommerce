import dotenv from 'dotenv'

dotenv.config({path:'.env'})

export const PORT = Number(process.env.PORT ?? 3000)