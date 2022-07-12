import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password);
        const uid = await dispatch('getUid');
        const db = getDatabase();
        await set(ref(db, 'users/' + uid + '/info'), {
          bill: 10000,
          name,
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    getUid() {
      const user = getAuth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      const auth = getAuth();
      await auth.signOut();
      commit('clearInfo');
    },
  },
  mutations: {},
  modules: {},
};
