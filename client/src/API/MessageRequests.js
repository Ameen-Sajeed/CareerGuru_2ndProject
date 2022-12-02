import userinstance from "../axios";

export const GetMessage = (id) => userinstance.get(`/message/${id}`);

export const addMessage = (data) => userinstance.post("/addMessage/", data);
