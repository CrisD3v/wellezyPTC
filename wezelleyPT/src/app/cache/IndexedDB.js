// db.js
export const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('myCacheDB', 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('cacheStore')) {
          db.createObjectStore('cacheStore', { keyPath: 'url' });
        }
      };
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };
  
  export const getCache = async (url) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('cacheStore', 'readonly');
      const store = transaction.objectStore('cacheStore');
      const request = store.get(url);
  
      request.onsuccess = (event) => {
        resolve(event.target.result?.data || null);
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };
  
  export const setCache = async (url, data) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('cacheStore', 'readwrite');
      const store = transaction.objectStore('cacheStore');
      const request = store.put({ url, data });
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };
  