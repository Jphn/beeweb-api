import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
if (process.env.NODE_ENV !== 'production') dotenv.config();

export default process.env;
