import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
