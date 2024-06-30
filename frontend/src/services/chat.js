import { client } from "./client";
import { loadFromLocalStorage } from "../hooks/useLocalStorage";

// Trae info del chat (si existe o no y sus mensajes existentes en caso de que si)
export const getChatInfo = async (chatId) => {
  return await client
    .get(`/chat/getInfo/${chatId}`)
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};

// Listado de chats del usuario
export const getUserChats = async () => {
  const { id, role } = await loadFromLocalStorage("auth");
  console.log(`/chat/getUserChats/${id}/${role}`)
  return await client
    .get(`/chat/getUserChats/${id}/${role}`)
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};