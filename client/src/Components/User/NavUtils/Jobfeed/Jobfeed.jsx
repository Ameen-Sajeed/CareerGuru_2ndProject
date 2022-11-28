import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRadioGroup } from "@mui/material";

function JobFeed() {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const [showMOd, SetShowMod] = useState(false);
  const [showJob, SetShowJOb] = useState(false);
  const [get, SetGet] = useState([]);
  const [Job, setJob] = useState({
    User: "",
    Designation: "",
    location: "",
    TypeofWork: "",
    Company: "",
    Desc: "",
    Salary: "",
    Time: "",
  });

  const handleChange = (e) => {
    console.log("handlechange ann");
    const { name, value } = e.target;
    setJob({
      ...Job,
      [name]: value,
    });
    console.log(Job);
    console.log(e.target.value, "drtfgyhj");
  };

  /* -------------------------------------------------------------------------- */
  /*                                  POST JOBS                                 */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = (e) => {
    console.log("hhhhhurhuh");
    e.preventDefault();
    setJob({
      ...Job,
      userId: userId,
    });

    try {
      axios
        .post("http://localhost:5000/createJob", { ...Job })
        .then((response) => {
          console.log(response);
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                  FIND JOBS                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/job/getjob").then((response) => {
        SetGet(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(get, "yyyyy");

  return (
    <div className="middle  ">
      <div className="flex justify-center">
        <label
          htmlFor="create-post "
          className="btn btn-primary  "
          onClick={() => SetShowMod(true)}
        >
          Post a Job
        </label>
      </div>

      <div className="feeds p-2">
        {get.map((obj) => {
          return (
            <>
              <div class="rounded-md w-full bg-white px-4 py-4 shadow-md transition transform duration-500 cursor-pointer m-4 ">
                <div class="flex flex-col justify-start">
                  <div class="flex justify-between items-center w-96">
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

                      <span>{obj.Designation}</span>
                    </div>
                    {obj.TypeofWork == "On-Site" ? (
                      <span class="bg-blue-500 rounded-full uppercase text-white text-sm px-4 py-1 font-bold shadow-xl">
                        {" "}
                        {obj.TypeofWork}{" "}
                      </span>
                    ) : (
                      <span class="bg-green-500 rounded-full uppercase text-white text-sm px-4 py-1 font-bold shadow-xl">
                        {" "}
                        {obj.TypeofWork}{" "}
                      </span>
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
                    <span>{obj.location}</span>
                  </div>
                  <div className="flex justify-end">
                    <p className="">
                      Posted by:{" "}
                      <span className="font-semibold">{obj.Company}</span>
                    </p>
                  </div>

                  <div className="flex">
                    <div class="p-2">
                      <span className="font-semibold text-xs">
                        {" "}
                        {format(obj.createdAt)}
                      </span>
                    </div>
                    <div class="p-2">
                   
                        <Link to={`/jobdesc/${obj._id}`}>
                          <button class="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                            VIEW DETAILS
                          </button>
                        </Link>
                      
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      {showMOd ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add a Job</h3>
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
                <div className="relative p-4 flex-auto ">
                  <input
                    type="text"
                    name="Designation"
                    placeholder="Designation"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="Company"
                    placeholder="Company Name"
                    onChange={handleChange}
                  />
                  <br /> <br />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="Desc"
                    placeholder="Job Description"
                    onChange={handleChange}
                  />
                  <input
                    type="Number"
                    name="Salary"
                    placeholder="Salary Range"
                    className="p-4"
                    onChange={handleChange}
                  />
                  <select
                    value="TypeofWork"
                    name="TypeofWork"
                    onChange={handleChange}
                  >
                    <option hidden selected>
                      TypeOfWork
                    </option>
                    <option value="Remote">Remote</option>
                    <option value="On-Site">On-Site</option>
                  </select>
                  <select
                    className="p-4"
                    value="Time"
                    name="Time"
                    onChange={handleChange}
                  >
                    <option hidden selected>
                      Time
                    </option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
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
                    onClick={handleSubmit}
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
    </div>
  );
}

export default JobFeed;
