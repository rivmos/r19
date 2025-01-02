import app from "./app"
import config from './utils/config'
import dotenv from 'dotenv';

dotenv.config();

app.listen(config.PORT, () => {
    console.log(`Server Running At ${config.PORT}`)
})