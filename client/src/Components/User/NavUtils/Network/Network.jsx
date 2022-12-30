import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import me from "../../../../assets/images/us.webp";
import userinstance from "../../../../axios";

function Network() {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const [forms, setForms] = useState([]);
  const [check, SetCheck] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                FIND FRIENDS                               */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    userinstance
      .get("/findUsers")
      .then((response) => {
        if (response.data) {
          setForms(response.data);
        } else {
          console.log("erorr");
        }
      })
      .catch((error) => {
        console.log(error, "erorr ocurred");
      });
  }, [check]);

  /* -------------------------------------------------------------------------- */
  /*                                FOLLOW USERS                                */
  /* -------------------------------------------------------------------------- */

  const handleSubmit = async (id) => {
    await userinstance
      .put(`/follow/${userId}`, { id })
      .then((result) => {
        if (result.status === 200) {
          SetCheck(!check);
          console.log(result, "success");
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("erorr ocurred");
      });
  };
  /* -------------------------------------------------------------------------- */
  /*                               UNFOLLOW USERS                               */
  /* -------------------------------------------------------------------------- */
  const handleSubmitUndo = async (id) => {
    console.log("call");
    console.log(userData._id);
    console.log(id);
    await userinstance
      .put(`/unfollow/${userId}`, { id })
      .then((result) => {
        if (result.status === 200) {
          SetCheck(!check);
          console.log(result, "success");
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("erorr ocurred");
      });
  };

  return (
    <div>
      <div class=" h-screen w-full justify-center">
        <div class="max-w-full grid lg:grid-cols-3 lg:gap-4 md:grid  gap-2">
          {forms.map((obj) => {
            return (
              <>
                {" "}
                {obj.username !== userData.username ? (
                  <div class="bg-white shadow-xl rounded-lg py-2 ">
                    <div class="photo-wrapper p-2">
                      <img
                        class="w-20 h-20 rounded-full mx-auto"
                        src={me}
                        alt="John Doe"
                      />
                    </div>
                    <div class="p-2">
                      <h3 class="text-center text-xl text-gray-800 font-extralight leading-8">
                        {obj.username}
                      </h3>
                      <div class="text-center text-gray-400 text-xs font-semibold truncate">
                        <h6>{obj.email}</h6>
                      </div>
                      {/* <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a> */}

                      {obj.followers.includes(userId) ? (
                        <div class="text-center my-3">
                          <button
                            className="btn bg-blue-500 text-white"
                            onClick={(e) => {
                              handleSubmitUndo(obj._id);
                            }}
                          >
                            UnFollow
                          </button>
                        </div>
                      ) : (
                        <div class="text-center my-3">
                          <button
                            className="btn bg-blue-500 text-white"
                            onClick={(e) => {
                              handleSubmit(obj._id);
                            }}
                          >
                            Follow
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Network;
