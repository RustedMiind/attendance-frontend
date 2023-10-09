import domain from "./domain";

function api(path: string) {
  const api = `${domain()}`;
  return api + path;
}

export default api;
