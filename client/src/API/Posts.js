import userinstance from "../axios";

export const DeletePost = (id) => userinstance.delete(`/delpost/${id}`);
