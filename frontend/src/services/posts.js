import { client } from "./client";

export const getPosts = async () => {
  return await client
    .get("/offers")
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};

export const getPostDetail = async (id) => {
  return await client
    .get("/offers/"+id)
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};

export const postCreateNewPost = async () => {
  try {
    const { data } = await client.post("/offers");
    return data;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};
