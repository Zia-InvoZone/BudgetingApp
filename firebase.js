const { Storage } = require('@google-cloud/storage');
// const storage = new Storage();
// A bucket is a container for objects (files).
// const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// Initialize firebase admin SDK
const storage = new Storage({
  projectId: process.env.FIREBASE_APPID,
  keyFilename: process.env.FIREBASE_KEYPATH,
});

const bucket = storage.bucket(`gs://${process.env.FIREBASE_APPID}.appspot.com`);
module.exports = { bucket };
