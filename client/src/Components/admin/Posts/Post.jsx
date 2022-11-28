import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import format from "moment";
import moment from "moment";

function Post() {
  const navigate = useNavigate();

  const [forms, setForms] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/allpost", {
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
  }, []);

  return (
    <div>
      <h2 className="text-5xl font-bold text-blue-400 p-10">Post Management</h2>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden p-4">
          <table class="min-w-full leading-normal ">
            <thead>
              <tr>
                <th class="px-5  py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SL NO:
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  POST_ID
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  IMAGE
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  POST DESCRIPTION
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  REPORTS
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  CREATED_AT
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
                    <td className="text-center p-2">
                      <img src={PF+obj.image} className="w-20 "></img> </td>
                    <td className="text-center">{obj.desc}</td>
                    <td className="text-center">{obj.Reports.length}</td>
                    <td className="text-center">{obj.date}</td>

                    <td className="text-center p-6 ">
                     <Link to={`/admin/reports/${obj._id}`}><button
                        type="button"
                        class="  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-200 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        VIEW
                      </button></Link> 
                    </td>
                    <td className="text-center p-6 ">
                      <button
                        type="button"
                        class="  inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        BLOCK
                      </button>
                    </td>
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

export default Post;
