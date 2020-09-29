import { config } from 'dotenv'

const { parsed } = config()

export const {
    PORT,
    MODE,
    DB,
    IN_PROD = MODE !== 'prod'
} = parsed