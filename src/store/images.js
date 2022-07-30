import {
  getStorage,
  uploadBytes,
  ref as sgRef,
  getDownloadURL,
} from 'firebase/storage';
import { getDatabase, ref as dbRef, push } from 'firebase/database';

export default {
  actions: {
    async createPhoto({ commit, dispatch }, photo) {
      try {
        const uid = await dispatch('getUid');
        const sg = getStorage();
        const db = getDatabase();
        const newPhotos = dbRef(db, 'users/' + uid + '/photos');
        push(newPhotos, photo.title);
        const refPhotos = sgRef(sg, uid + '/userPhoto.jpg');
        uploadBytes(refPhotos, photo.files);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchPhoto({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const sg = getStorage();
        const refPhoto = sgRef(sg, uid + '/userPhoto.jpg');
        const refImage = sgRef(sg, 'image.png');
        return getDownloadURL(refPhoto);
      } catch (e) {
        commit('setError', e);
      }
    },
  },
};
