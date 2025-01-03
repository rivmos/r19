import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.NODE_ENV === 'production' ?  process.env.MONGO_URI : process.env.MONGO_TEST_URI

export default { PORT, MONGO_URI }