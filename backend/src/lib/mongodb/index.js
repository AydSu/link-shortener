import {MongoClient} from "mongodb";
import {logger} from "../logger";

export class MongoClientInstance {
    client;
  
    db;
  
    dbName;

    logger;
  
    dbAddress;
  
    constructor(dbName, logger) {
      this.dbName = dbName;
      this.logger = logger;
  
      this.client = this.createClient();
    }
  
    createClient() {
      const DB_IP = 'localhost'; // or NOTE: Mongo DB container name
      const DB_PORT = '2717'; // or NOTE: default port Mongo DB container
      const DB_URL = `mongodb://${DB_IP}:${DB_PORT}`;
      this.dbAddress = `${DB_IP}:${DB_PORT}/${this.dbName}`;
  
      console.log('monger', DB_URL);
      this.logger?.debug(`[MONGODB] DB_URL = ${DB_URL}/${this.dbName}`);

      const client = new MongoClient(DB_URL, {
        ignoreUndefined: true,
      });
      
      client.on('error', () => {
        this.logger?.error();(`[MONGODB] Error when connected to ${this.dbAddress}`);
      });

      client.on('connectionReady', () => {
        this.logger?.info(`[MONGODB] Connected to ${this.dbAddress} (connectionReady)`);
      });
  
      client.on('close', () => {
        this.logger?.debug(`[MONGODB] Connection closed ${this.dbAddress}`);
      });
  
      return client;
    }
  
    async connect() {
      await this.client.connect();  
      this.db = this.client.db(this.dbName);
    }
  
    async close(){
      await this.client.close();
      this.logger?.verbose(`[MONGODB] Closed mongodb ${this.dbAddress} connection`);
    } 
    
  }

  export const appDb = new MongoClientInstance("appDb", logger);