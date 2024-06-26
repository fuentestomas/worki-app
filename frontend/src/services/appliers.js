import { client } from "./client";

export const postApplyOffer = async (body) => {
  try {
    const { data } = await client.post("/appliers/apply", body);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getUserAppliedPosts = async (body) => {
  const { userId, offerId } = body;
  return await client
    .get(`/appliers/getUserApplication/${userId}/${offerId}`)
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};
