import {v6 as uuidv6} from 'uuid';

console.log(uuidv6());
export const generateId = (): string => uuidv6();