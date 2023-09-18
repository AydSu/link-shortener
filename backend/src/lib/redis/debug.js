import { createClient } from 'redis';

const client = createClient({url: `redis://localhost:6379/10`});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');
const value = await client.get('f4ba787f-cacb-4019-a3ea-3b17ad37d97c');
console.log(value);
await client.disconnect();