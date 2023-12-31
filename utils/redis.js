#!/usr/bin/node
import { promisify } from 'util';
import redis from 'redis';

class RedisClient {
  constructor() {
    try {
      this.client = redis.createClient();
      this.connectRedis();
      this.client.on('connect',()=>{
        console.log('redis is live');
      });
    } catch (error) {
      console.error('REDIS ERROR:', error);
    }
  }
  async connectRedis() {
    await this.client.connect();
  }
  async get(key) {
    return await this.client.get.bind(this.client)(key);
  }

  async set(key, value, duration) {
    await promisify(this.client.set).bind(this.client)(key, value, 'EX', duration);
  }

  async del(key) {
    await promisify(this.client.del).bind(this.client)(key);
  }

  async hset(hashKey, key, value) {
    await promisify(this.client.hSet).bind(this.client)(hashKey, key, value);
  }
  async hgetAll(hashKey) {
    const value = await promisify(this.client.hGetAll).bind(this.client)(hashKey);
    return value;
  }
}

const redisClient = new RedisClient();
export default redisClient;