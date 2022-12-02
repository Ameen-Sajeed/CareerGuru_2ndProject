import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { DeleteJob } from "../../../../API/Job";
import JobBox from "./JobBox";

function JobFeed() {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const [showMOd, SetShowMod] = useState(false);
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
        {get.map((obj) => (
          
            obj.Reports.includes(userId) ? null

          :<JobBox key={obj.id} job={obj} />
        ))}
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
                  <textarea
                    name="Desc"
                    placeholder="Job Description"
                    onChange={handleChange}
                    className="w-full"
                  ></textarea>{" "}
                  <br /> <br />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                  />
                  {/* <input
                    type="text"
                    name="Desc"
                    placeholder="Job Description"
                    onChange={handleChange}
                  /> */}
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
