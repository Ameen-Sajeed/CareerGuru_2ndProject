import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlagIcon from "@mui/icons-material/Flag";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { DeleteJob } from "../../../../API/Job";
import userinstance from "../../../../axios";

function JobBox({ job }) {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const [open, setOpen] = useState(false);
  const [showMOd, SetShowMod] = useState(false);

  const [report, setReport] = useState({
    userId: "",
    Content: "",
  });

  const handleChange = (e) => {
    console.log("handlechange ann");
    const { name, value } = e.target;
    setReport({
      ...report,
      [name]: value,
      userId: userId,
      JobId: job._id,
    });
    console.log(e.target, "kjk");
  };

  const handleSubmit = async (e) => {
    console.log(userId, "hhhhhurhuh");
    e.preventDefault();
    setReport({
      ...report,
    });

    try {
      userinstance
        .post(`/reportJob/${job._id}`, { ...report })
        .then((response) => {
          console.log(response);
          window.location.reload();
        });
    } catch (error) {}
  };

  /* -------------------------------------------------------------------------- */
  /*                                 DELETE JOBS                                */
  /* -------------------------------------------------------------------------- */

  const deleteJob = async () => {
    await DeleteJob(job._id);
    alert("job deleted successfully");
    window.location.reload()
  };

  return (
    <>
      <div class="rounded-md w-full bg-white px-4 py-4 shadow-md transition transform duration-500 cursor-pointer m-4 ">
        <div class="flex flex-col justify-start">
          <div class="flex justify-evenly items-center w-">
            <div class="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2">
              <svg
                class="w-7 h-7 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>

              <span>{job.Designation}</span>
            </div>
            {job.TypeofWork == "On-Site" ? (
              <span class="bg-blue-500 rounded-full uppercase text-white text-sm px-4 py-1 font-bold shadow-xl">
                {" "}
                {job.TypeofWork}{" "}
              </span>
            ) : (
              <span class="bg-green-500 rounded-full uppercase text-white text-sm px-4 py-1 font-bold shadow-xl">
                {" "}
                {job.TypeofWork}{" "}
              </span>
            )}
            <span
              onClick={(e) => {
                setOpen(!open);
              }}
            >
              <MoreHorizIcon />
            </span>
            {open && (
              <div class="absolute right-0 z-20 w-22  py-2  overflow-hidden bg-white rounded-md shadow-xl dark:bg-blue-100 mr-10 mt-16">
                {job.userId !== userData._id ? (
                  <a
                    href=""
                    class="block px-2 py-1 text-sm text-gray-600 capitalize font-extrabold  transition-colors duration-200 transform dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      SetShowMod(true);
                    }}
                  >
                    <FlagIcon />
                  </a>
                ) : (
                  <a
                    href="#"
                    class="block px-2 py-1   text-sm text-gray-600 capitalize  font-extrabold transition-colors duration-200 transform dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:text-white"
                    onClick={deleteJob}
                  >
                    {" "}
                    <DeleteIcon />
                  </a>
                )}
              </div>
            )}
          </div>
          <div class="text-sm text-gray-500 flex space-x-1 items-center">
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{job.location}</span>
          </div>
          <div className="flex justify-end">
            <p className="">
              Posted by: <span className="font-semibold">{job.Company}</span>
            </p>
          </div>

          <div className="flex">
            <div class="p-2">
              <span className="font-semibold text-xs">
                {" "}
                {format(job.createdAt)}
              </span>
            </div>
            <div class="p-2">
              <Link to={`/jobdesc/${job._id}`}>
                <button class="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                  VIEW DETAILS
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showMOd ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Report this Job?</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => SetShowMod(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex">
                  <input
                    type="radio"
                    className="m-2"
                    name="Content"
                    value="I think it's spam or scam"
                    onChange={handleChange}
                  />
                  <label htmlFor="" className="p-2">
                    I think it's spam or scam
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    className="m-2"
                    name="Content"
                    value=" I think it's dicriminatory or offensive"
                    onChange={handleChange}
                  />
                  <label htmlFor="" className="p-2">
                    I think it's dicriminatory or offensive
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    className="m-2"
                    name="Content"
                    value="I think Something is broken or offensive"
                    onChange={handleChange}
                  />
                  <label htmlFor="" className="p-2">
                    I think Something is broken or offensive
                  </label>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => SetShowMod(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default JobBox;
