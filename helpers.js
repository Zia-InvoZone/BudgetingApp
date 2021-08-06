const { format } = require('util');
module.exports = {
  /**
   * Upload the image file to Google Storage
   * @param {File} file object that will be uploaded to Google Storage
   * @param {Bucket} bucket object that will be used to upload file to Google Storage
   */
  uploadImageToStorage(file, bucket) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No image file');
      }
      let extension = file.originalname.split('.').pop();
      let newFileName = `${Date.now()}${Date.now()}.${extension}`;
      let blob = bucket.file(newFileName);
      // const blobStream = blob.createWriteStream();

      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', (error) => {
        reject(
          `Something is wrong! Unable to upload at the moment. because ${error}`
        );
      });

      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        // const publicUrl = format(
        //   `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        // );
        resolve(blob.name);
      });

      blobStream.end(file.buffer);

      return blob.name;
    });
  },
};
