import { client } from "./client";

export const postUserRegister = async (body) => {
  try {
    const { data } = await client.post("/users/register", body);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const postUserLogin = async (body) => {
  try {
    const { data } = await client.post("/users/login", body);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
