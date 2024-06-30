import { client } from "./client";
import { loadFromLocalStorage } from "../hooks/useLocalStorage";

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

export const getAppliersList = async (idPost) => {
  const { id } = await loadFromLocalStorage("auth");
  return await client
    .get(`/appliers/getOfferApplications/${idPost}/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};

export const updateApplierStatus = async (body) => {
  const { idApply, status } = body;
  return await client
    .put(`/appliers/updateStatus/${idApply.toString()}/${status}`)
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};
