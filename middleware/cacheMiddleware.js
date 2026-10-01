const cache = {};

const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {

    let key = req.originalUrl;

    let cachedData = cache[key];

    if (cachedData) {

        let age = Date.now() - cachedData.createdAt;

        if (age < TTL) {
            res.set('X-Cache', 'HIT');

            return res.json(cachedData.data);
        }

        delete cache[key];
    }

    res.set('X-Cache', 'MISS');

    req.cache = cache;

    next();
}

function clearCache() {
    Object.keys(cache).forEach((key) => {
        delete cache[key];
    });
}

module.exports = {cacheMiddleware,clearCache,cache};