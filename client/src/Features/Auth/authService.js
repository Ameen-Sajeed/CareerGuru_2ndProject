import { userUrl } from "../../Constants/Constant";

// REGISTER USER

const register = async (userData) => {
    const response = await userUrl({
      method: "POST",
      url: "/signup",
      data: userData,
    });
    if (response.status === 201) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  
    return response.data;
  };

  // LOGIN USER

  const login = async (userData) => {
    const response = await userRequest({
        method: 'POST',
        url: '/login',
        data:userData
    });
  

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// LOGOUT USER

const logout = () => {
  localStorage.removeItem("user");
};



  const authService = {
    register,
    login,
    logout
  }

  export default authService