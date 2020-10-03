import { config } from 'dotenv'

const { parsed } = config()

export const {
    PORT,
    MODE,
    BASE_URL,
    DB,
    IN_PROD = MODE !== 'prod',
    URL = `${BASE_URL}${PORT}`
} = parsed