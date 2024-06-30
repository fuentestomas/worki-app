import { client } from "./client";

// Trae info del chat (si existe o no y sus mensajes existentes en caso de que si)
export const getChatInfo = async (chatId) => {
  return await client
    .get(`/chat/getInfo/${chatId}`)
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};