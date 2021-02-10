export default function({ store, route, redirect }: any) {
  if (!store.getters["auth/isAuthenticated"]) {
    if (!route.path.includes("/login")) {
      return redirect("/login");
    }
  } else {
    if (route.path.includes("/login")) {
      return redirect(`/`);
    }
  }
}
