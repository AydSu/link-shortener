import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import qs from 'qs';
import { appDb } from './lib/mongodb';

import { getRouter } from "./routes"
import cors from 'cors'

async function createServer(){
  try{
  const app = express()
  const port = 5000

  await appDb.connect();

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  })) 
  app.set('query parser', (str) => {
    return qs.parse(str, { arrayLimit: Infinity });
  });

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/', getRouter())

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
} catch(e){
  console.error(e);
}
}

createServer().catch((err)=> {
  console.error(err)
}) 