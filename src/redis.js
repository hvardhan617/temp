import * as redis from 'redis';

const client = redis.createClient({
    host: '3.108.105.59', // replace with your Redis server host
    port: 6379 // replace with your Redis server port
});
client
    .connect()
    .then(async (res) => {
        console.log("::::Connected to Redis::::")
    })
    .catch((err) => {
        console.log('err happened' + err);
    });


client.on('error', err => {
    console.error('Redis error:', err);
});

export default client;