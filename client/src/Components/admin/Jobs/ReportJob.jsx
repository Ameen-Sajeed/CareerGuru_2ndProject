import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import format from "moment";
import moment from "moment";
import adminInstance from "../../../adminaxios";

function JobReports() {
    const navigate = useNavigate();

 const [forms, setForms] = useState([]);
 const id = useParams().id;

 console.log(id, "jhjhjhjh");

    useEffect(() => {
        adminInstance
          .get(`http://localhost:5000/admin/singleJobreport/${id}`,)
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

      console.log(forms,"hjhjh");
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-400 p-10">Reports</h2>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden p-4">
          <table class="min-w-full leading-normal ">
            <thead>
              <tr>
                <th class="px-5  py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SL NO:
                </th>
                <th class="px-5 py-3  border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  USERNAME
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  EMAIL
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  REASON
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  DATE OF REPORT
                </th>
          
              </tr>
            </thead>
            <tbody>
              {forms.map((obj, index) => {
                obj.date = moment(obj.createdAt).format("DD-MM-YYYY");
                return (
                  <tr>
                    <td className="text-center p-4">{index + 1}</td>
                    <td className="text-center p-4">{obj.userId.username}</td>
                    <td className="text-center p-4">{obj.userId.email}</td>

                    <td className="text-center p-4">{obj.Content}</td>
                    <td className="text-center p-4">{obj.date}</td>
                    
                    
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

export default JobReports;
