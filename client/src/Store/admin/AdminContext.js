import { createContext,useState } from "react";


export const AdminContext = createContext('')


function Admin({children})
{
    const admin = JSON.parse(localStorage.getItem('admin'));


    const [adminDetails, setAdminDetails]=useState(admin)


    return(
        <AdminContext.Provider value={{adminDetails,setAdminDetails}}>
         
           {children}

        </AdminContext.Provider>
    )
}


export default Admin;