import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import format from "moment";
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import adminInstance from "../../../adminaxios";

function JobManagement() {
  const navigate = useNavigate();

  const [forms, setForms] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [status,SetStatus] = useState(true)


  useEffect(() => {
    adminInstance
      .get("http://localhost:5000/admin/allJobs", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data, "hjj");
          setForms(response.data);
        } else {
          console.log("erorr");
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        navigate("/admin/login");
        console.log(error, "erorr ocurred");
      });
  }, [status]);

  const postBlock = (e,id) => {

    e.preventDefault()
    confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui flex flex-col justify-center w-[400px] h-[350px] bg-slate-200 items-center rounded-2xl '>
              <h1 className='flex justify-center p-2 text-xl font-semibold'>Are you sure?</h1>
              {/* <p className='flex justify-center p-2 text-xl font-semibold'>You want to delete this file?</p> */}
              <div className='flex space-x-2 p-2 '>
              <button className='bg-white w-max h-max p-3 rounded-xl font-medium text-lg' onClick={onClose}>No</button>
              <button className='bg-red-500 w-max h-max p-3 rounded-xl font-medium text-lg text-white'
                onClick={() => {
                    // this.handleClickDelete();
                  onClose();
                  adminInstance.patch(`http://localhost:5000/admin/blockJobs/${id}`).then((result => {
                    console.log(result.status);
                    // forceUpdate()
                    SetStatus(!status)
                    // setShowModal(false)
                })).catch(error => console.log(error))
                  
                }}
              >
                Yes, Block
              </button>

              </div>
            
            </div>
          );
        }
      });
   

}

  return (
    <div>
      <h2 className="text-5xl font-bold text-blue-400 p-10">Job Management</h2>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden p-4">
          <table class="min-w-full leading-normal ">
            <thead>
              <tr>
                <th class="px-5  py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SL NO:
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  JOB_ID
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  DESIGNATION
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                COMPANY
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  REPORTS
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  CREATED_AT
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  POSTED BY:
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  STATUS
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  VIEW
                </th>

                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {forms.map((obj, index) => {
                obj.date = moment(obj.createdAt).format("DD-MM-YYYY");
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{obj._id}</td>
                    <td className="text-center">{obj.Designation}</td>
                    <td className="text-center">{obj.Company}</td>
                    <td className="text-center">{obj.Reports.length}</td>
                    <td className="text-center">{obj.date}</td>
                    <td className="text-center">{obj.userId}</td>

                    <td className="text-center">{obj.ReportStatus}</td>
                    <td className="text-center p-6 ">
                     <Link to={`/admin/Jobreports/${obj._id}`}><button
                        type="button"
                        class="  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-200 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        VIEW
                      </button></Link> 
                    </td>
                    {
                      obj.ReportStatus == "active" ?
                    
                    <td className="text-center p-6 ">
                      <button
                        type="button"
                        class="  inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" onClick={(e)=>{postBlock(e,obj._id)}}
                      >
                        BLOCK
                      </button>
                    </td>:<p className="text-red-500 p-6 font-mono">Job Blocked</p>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default JobManagement;
