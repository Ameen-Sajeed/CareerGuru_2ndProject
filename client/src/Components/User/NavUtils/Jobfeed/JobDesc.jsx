import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import userinstance from "../../../../axios";

function JobDesc() {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const [get, SetGet] = useState([]);
  const [showMOd, SetShowMod] = useState(false);
  const id = useParams().id;
  const [job, setJob] = useState({
    JobId: "",
    Resume: "",
    Applicant: "",
    AppliedBy: "",
    postedId: "",
  });

  console.log(id, "oioioio");

  const handleChange = (e) => {
    console.log("handlechange ann");
    const { name, value } = e.target;
    setJob({
      ...job,
      [name]: value,
      Applicant: userId,
      JobId: id,
      postedId: get.userId,
    });

    console.log(e.target, "tytyty");

    console.log(job);
  };
  const fileUpload = (e) => {
    setJob({
      ...job,
      file: e.target.files[0],
    });
    console.log(e.target.files, "resumeeee");
  };

  const upload = (e) => {
    // e.preventDefault()

    const formData = new FormData();
    for (let key in job) {
      formData.append(key, job[key]);
    }
    // console.log("post");
    console.log(job);
    console.log("formData");
    axios
      .post("http://localhost:5000/applyJob", formData)
      .then((response) => {
        if (response.data.status) {
          console.log("post added successfully");
          window.location.reload();
        } else {
          // setShowPostModal(false)
          console.log("something went wrong");
        }
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                                  FIND JOBS                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    userinstance.get(`http://localhost:5000/findjob/${id}`).then((response) => {
      SetGet(response.data);
    });
  }, []);

  return (
    <div className="middle  ">
      <div className="flex justify-center">
        <p className="text-4xl font-bold text-blue-400">JOB DETAILS</p>
      </div>

      <div className="feeds p-2">
        <div class="rounded-md w-full bg-white px-4 py-4 shadow-md transition transform duration-500 cursor-pointer m-4 ">
          <div class="flex flex-col justify-start">
            <div class="">
              <div class="text-sm text-gray-600 flex space-x-1 items-center">
                <p className="font-bold text-center p-2 text-lg ">
                  Designation
                </p>
                <span className="text-2xl font-semibold text-blue-400">
                  {get.Designation}
                </span>
              </div>{" "}
              <div class="text-sm text-gray-500 flex space-x-1 items-cente">
                <p className="font-bold text-center p-2 text-lg text-gray-600">
                  Description
                </p>
                <span>{get.Desc}</span>
              </div>{" "}
              <div class="text-sm text-gray-600 flex space-x-1 items-center">
                <p className="font-bold text-center p-2 text-lg">location</p>
                <span className="font-mono text-md ">{get.location}</span>
              </div>
              <div class="text-sm text-gray-600 flex space-x-1 items-center">
                <p className="font-bold text-center p-2 text-md">Salary</p>
                <span className="text-md font-mono">{get.Salary} lakh/p.a</span>
              </div>
              <div class="text-sm text-gray-600 flex space-x-1 items-center">
                <p className="font-bold text-center p-2 text-md ">Time</p>
                <span className="font-mono">{get.Time}</span>
              </div>
              <div class="text-sm text-gray-500 flex space-x-1 items-center">
                <p className="font-bold text-center p-2 text-md">Posted By:</p>
                <span className="text-blue-400 text-xl font-semibold">
                  {get.Company}
                </span>
              </div>
              {!get?.jobRequests?.includes(userId) ? (
                <div className="fle">
                  <div class="p-2">
                    {get.userId !== userId && (
                      <button
                        class="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer"
                        onClick={() => SetShowMod(true)}
                      >
                        APPLY JOB
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="font-mono text-blue-800">
                  You have applied for this job.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {showMOd ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Apply for Job</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => SetShowMod(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    type="text"
                    name="AppliedBy"
                    placeholder="Applicant Name"
                    onChange={handleChange}
                  />
                  <label htmlFor="">Add Resume</label>
                  <input
                    className="ml-5"
                    type="file"
                    name="file"
                    id="file"
                    onChange={fileUpload}
                  />
                </div>

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
                    onClick={upload}
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

export default JobDesc;
