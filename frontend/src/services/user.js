import { client } from './client'

export const postUserRegister = async (body) => {
    try {
      const { data } = await client.post('/users', body);
      return data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };