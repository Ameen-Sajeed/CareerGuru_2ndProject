import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function JobDesc() {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const [get, SetGet] = useState([]);
  const id = useParams().id;

  console.log(id, "oioioio");

  /* -------------------------------------------------------------------------- */
  /*                                  FIND JOBS                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    axios.get(`http://localhost:5000/findjob/${id}`).then((response) => {
      SetGet(response.data);
    });
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                APPY FOR JOB                                */
  /* -------------------------------------------------------------------------- */

  const applyJob = async ()=>{
   
    try {

      await axios.put(`http://localhost:5000/applyjob/${id}`,{userId:userId,id:get.userId}).then((response)=>{

      console.log(response);
      alert('success')
      })
    } catch (error) {
       console.log(error); 
       alert(error)
    }
  }

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
              <span className="text-2xl font-semibold text-blue-400">{get.Designation}</span>
            </div>    <div class="text-sm text-gray-500 flex space-x-1 items-cente">
              <p className="font-bold text-center p-2 text-lg text-gray-600">
                 Description
              </p>
              <span>{get.Desc}</span>
            </div>    <div class="text-sm text-gray-600 flex space-x-1 items-center">
              <p className="font-bold text-center p-2 text-lg">
                location
              </p>
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
              <span className="text-blue-400 text-xl font-semibold">{get.Company}</span>
            </div>

            <div className="fle">
              <div class="p-2">
                {
                    get.userId !== userId &&
                
                <button
                  class="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer"
                  onClick={applyJob}
                >
                  APPLY JOB
                </button>}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDesc;
