import axios from "axios";
import moment from "moment";
import React, { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import adminInstance from "../../../adminaxios";
function Users() {
  const [users, SetUsers] = useState("");
  const [forms, setForms] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();

  useEffect(() => {
    adminInstance
      .get("/users")
      .then((response) => {
        if (response.data) {
          // console.log(token);
          SetUsers(response.data);
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
  }, [reducerValue]);

  const blockUser = (id) => {
    adminInstance
      .patch("/blockUsers/" + id)
      .then((result) => {
        if (result.status == 200) {
          // setStatus(new Date())
          console.log(result);
          forceUpdate();
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UnblockUser = (id) => {
    adminInstance
      .put("/UnblockUsers/" + id)
      .then((result) => {
        if (result.status == 200) {
          // setStatus(new Date())
          console.log(result);
          forceUpdate();
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="text-4xl text-blue-400 p-4 font-extrabold ">
        User Management
      </h1>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden p-4">
          <table class="min-w-full leading-normal ">
            <thead>
              <tr>
                <th class="px-5  py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SL NO:
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  USER-ID
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  USERNAME
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  EMAIL
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  CONTACT-NO
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  VERIFIED
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  STATUS
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  JOINED-AT
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {forms.map((obj, index) => {
                obj.date = format(obj.createdAt);
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{obj._id}</td>
                    <td className="text-center">{obj.username}</td>
                    <td className="text-center">{obj.email}</td>
                    <td className="text-center">{obj.phone}</td>
                    <td className="text-center">{obj.verified}</td>
                    <td className="text-center">{obj.status}</td>
                    <td className="text-center">{obj.date}</td>

                    <td className="text-center p-6 ">
                      {obj.status == "active" ? (
                        <button
                          type="button"
                          class="  inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={(e) => {
                            blockUser(obj._id);
                          }}
                        >
                          BLOCK
                        </button>
                      ) : (
                        <button
                          type="button"
                          class="  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-200 hover:shadow-lg focus:bg-purple-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-200 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={(e) => {
                            UnblockUser(obj._id);
                          }}
                        >
                          UNBLOCK
                        </button>
                      )}
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

export default Users;
