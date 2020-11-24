import { storage } from "./config";

export const uploadUserImage = (image) => {
  return new Promise((resolve, reject) => {
    const uploadTask = storage.ref(`users/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        // error function ....
        reject(error);
      },
      () => {
        // complete function ....
        storage
          .ref("users")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            resolve(url);
          });
      }
    );
  });
};

export const uploadProductImage = (image) => {
  return new Promise((resolve, reject) => {
    const uploadTask = storage.ref(`products/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        // error function ....
        reject(error);
      },
      () => {
        // complete function ....
        storage
          .ref("products")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            resolve(url);
          });
      }
    );
  });
};
