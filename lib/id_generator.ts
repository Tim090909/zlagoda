import { sql } from './db';

const generateRandomId = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';
  for (let i = 0; i < 10; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomId;
};

const isIdExists = async (id: string): Promise<boolean> => {
  const result = await sql`SELECT COUNT(*) AS count FROM Employee WHERE id_employee = ${id}`;
  return result[0].count > 0;
};

const generateUniqueEmployeeId = async (): Promise<string> => {
  let id: string;
  do {
    id = generateRandomId();
  } while (await isIdExists(id));
  return id;
};

export default generateUniqueEmployeeId;