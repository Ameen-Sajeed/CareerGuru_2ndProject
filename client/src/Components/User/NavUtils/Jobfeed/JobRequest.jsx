import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import me from "../../../../assets/images/us.webp";
import { format } from "timeago.js";

function JobRequest() {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const [get, SetGet] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  /* -------------------------------------------------------------------------- */
  /*                          FIND JOBS REQUESTS                                */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    axios
      .get(`http://localhost:5000/viewJobRequests/${userId}`)
      .then((response) => {
        SetGet(response.data);
      });
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                        REJECT JOBS REQUESTS                                */
  /* -------------------------------------------------------------------------- */

  const RejectJob = async (id) => {
    console.log("reached");
    await axios
      .put(`http://localhost:5000/rejectjob/${id}`)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      });
    alert("request  rejected successfully");
  };

  return (
    <div>
      <div class=" h-screen w-full justify-center">
        {
            get.length!==0 ?
        
        <div class="w-full grid grid-cols-3 gap-4">
          {get.map((obj) => {
            return (
              <div class="bg-white shadow-xl rounded-lg py-2 w-fit ">
                <div class="photo-wrapper p-2">
                  <img
                    class="w-20 h-20 rounded-full mx-auto"
                    src={me}
                    alt="John Doe"
                  />
                </div>
                <div className=" ">
                  <p className="text-blue-400 text-center font-bold">
                    {obj.AppliedBy}
                  </p>
                  <a
                    className="text-blue-400  p-2 font-mono"
                    href={PF + obj.Resume}
                    download
                  >
                    {" "}
                    Download Resume
                  </a>
                  <div className="flex p-2 items-center">
                    <span className="text-xs p-2">Applied:</span>
                    <p className="text-blue-400 text-center text-xs font-bold ">
                      {" "}
                      {format(obj.createdAt)}
                    </p>
                  </div>
                </div>
                <div class="p-2">
                  <h3 class="text-center text-xl text-gray-800 font-extralight leading-8"></h3>
                  <div class="text-center text-gray-400 text-xs font-semibold truncate">
                    <h6></h6>
                  </div>
                  {/* <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a> */}

                  <div class="text-center p-2">
                    <button
                      className="btn bg-blue-500 text-white"
                      onClick={() => {
                        RejectJob(obj._id);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>:<p className="text-blue-400 text-3xl font-bold text-center">No Requests for you 
            </p>}
      </div>
    </div>
  );
}

export default JobRequest;
