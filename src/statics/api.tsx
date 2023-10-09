import domain from "./domain";

function api(path: string) {
  const api = `${domain()}api/`;
  return api + path;
}

export default api;
