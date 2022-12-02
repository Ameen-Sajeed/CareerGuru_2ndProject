import userinstance from "../axios";

export const DeleteJob = (id) => userinstance.delete(`/deljob/${id}`);

export const rejectJob = (id, jobId) =>
  userinstance.put(`/rejectjob/${id}`, { jobId });
