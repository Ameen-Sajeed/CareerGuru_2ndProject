import userinstance from "../axios";

export const userChats = (id) => userinstance.get(`/chat/${id}`);
