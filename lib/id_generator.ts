import { sql } from './db';

const generateRandomId = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';
  for (let i = 0; i < 10; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomId;
};

const generateRandomCustId = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';
  for (let i = 0; i < 13; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomId;
};

const generateRandomUPC = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';
  for (let i = 0; i < 12; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomId;
};

const isIdEmplExists = async (id: string): Promise<boolean> => {
  const result = await sql`SELECT COUNT(*) AS count FROM Employee WHERE id_employee = ${id}`;
  return result[0].count > 0;
};

const isIdCheckExists = async (id: string): Promise<boolean> => {
  const result = await sql`SELECT COUNT(*) AS count FROM Employee WHERE id_employee = ${id}`;
  return result[0].count > 0;
};

const isIdCustExists = async (id: string): Promise<boolean> => {
  const result = await sql`SELECT COUNT(*) AS count FROM Customer_Card WHERE card_number = ${id}`;
  return result[0].count > 0;
};

const isUPCExists = async (id: string): Promise<boolean> => {
  const result = await sql`SELECT COUNT(*) AS count FROM Store_Product WHERE UPC = ${id}`;
  return result[0].count > 0;
};

export const generateUniqueEmployeeId = async (): Promise<string> => {
  let id: string;
  do {
    id = generateRandomId();
  } while (await isIdEmplExists(id));
  return id;
};

export const generateUniqueCustomerId = async (): Promise<string> => {
  let id: string;
  do {
    id = generateRandomCustId();
  } while (await isIdCustExists(id));
  return id;
};

export const generateUniqueUPC = async (): Promise<string> => {
  let id: string;
  do {
    id = generateRandomUPC();
  } while (await isUPCExists(id));
  return id;
};

export const generateUniqueCheckId = async (): Promise<string> => {
  let id: string;
  do {
    id = generateRandomId();
  } while (await isIdCheckExists(id));
  return id;
};
