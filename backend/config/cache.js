// Простий in-memory cache
const cacheStore = new Map();

/**
 * Отримати дані з кеша
 * @param {string} key
 * @returns {any|null}
 */
function getCachedData(key) {
  const cached = cacheStore.get(key);

  if (!cached) return null;

  const { data, expiration } = cached;
  if (expiration > Date.now()) {
    return data;
  }

  // Якщо TTL вийшов – очищаємо
  cacheStore.delete(key);
  return null;
}

/**
 * Записати дані в кеш
 * @param {string} key
 * @param {any} data
 * @param {number} ttl seconds (default: 3600)
 */
function setCachedData(key, data, ttl = 3600) {
  const expiration = Date.now() + ttl * 1000;
  cacheStore.set(key, { data, expiration });
}

/**
 * Видалити конкретний ключ з кеша
 * @param {string} key
 */
function invalidateCache(key) {
  cacheStore.delete(key);
}

/**
 * Повністю очистити кеш
 */
function clearCache() {
  cacheStore.clear();
}

module.exports = { 
  getCachedData, 
  setCachedData, 
  invalidateCache, 
  clearCache 
};