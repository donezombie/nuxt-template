import AuthServices from "~/services/authServices";
import mutationTypes from "~/consts/mutationTypes";

export default function({ store, req }: any) {
  const user = AuthServices.getUserLocalStorage();
  const { username, token } = user;
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (isAuthenticated) return;
  if (token) {
    store.commit(`auth/${mutationTypes.AUTH.SET_TOKEN}`, { username, token });
  }
}
