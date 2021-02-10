import mutationTypes from "~/consts/mutationTypes";
import authServices from "~/services/authServices";

/**
 * initial state
 */
interface StateAuth {
  token: string | null;
  isLogin: boolean;
}

const state = (): StateAuth => ({
  token: null,
  isLogin: false
});

/**
 * initial getters
 */
const getters = {
  isAuthenticated: (state: StateAuth) => state.isLogin
};

/**
 * initial actions
 */
const actions = {
  async [mutationTypes.AUTH.LOGIN]({ commit }: any, payload: any) {
    const { username, password } = payload;
    if (username === "don" && password === "don") {
      const token = new Date().getTime().toString();
      authServices.setUserLocalStorage({ username, token });
      commit(mutationTypes.AUTH.LOGIN_SUCCESS, { username, token });
      return 200;
    } else {
      return 400;
    }
  },
  async [mutationTypes.AUTH.LOGOUT]({ commit }: any) {
    commit(mutationTypes.AUTH.LOGOUT_SUCCESS);
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.AUTH.SET_TOKEN](state: StateAuth, payload: any) {
    state.token = payload.token;
    state.isLogin = true;
    authServices.setUserLocalStorage({
      username: payload.username,
      token: payload.token
    });
  },

  [mutationTypes.AUTH.LOGIN_SUCCESS](state: StateAuth, payload: any) {
    state.token = payload.token;
    state.isLogin = true;
  },

  [mutationTypes.AUTH.LOGOUT_SUCCESS](state: StateAuth, payload: any) {
    state.isLogin = false;
    state.token = null;
    authServices.removeUserLocalStorage();
    window.location.reload();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
