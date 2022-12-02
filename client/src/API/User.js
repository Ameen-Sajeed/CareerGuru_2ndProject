import userinstance from "../axios";

export const getUser = (id) => userinstance.get(`/getUser/${id}`);
