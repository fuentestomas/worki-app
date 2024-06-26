import { client } from "./client";

// Trae todas las publicaciones
export const getPosts = async () => {
  return await client
    .get("/offers")
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};

// Trae las publicaciones creadas por el usuario
export const getUserPost = async (id) => {
  return await client
    .get(`/offers/user/${id}/offers`)
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};

// Trae el detalle de una publicación
export const getPostDetail = async (id) => {
  return await client
    .get("/offers/"+id)
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};

// Crea una nueva publicación
export const postCreateNewPost = async (body) => {
  try {
    const { data } = await client.post("/offers/createOffer", body);
    return data;
  } catch (error) {
    console.log(error.response.data.message);
    throw error;
  }
};

export const getUserAppliedPosts = async (id) => {
  return await client
    .get(`/appliers/user/applications/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};
