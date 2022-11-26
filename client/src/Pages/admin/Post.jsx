import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../Components/admin/Posts/Post";
import SidebarF from "../../Components/sidebar/SidebarF";
function PostsMan() {
  const navigate = useNavigate()
  useEffect(()=>{

    const token= localStorage.getItem('token')
    console.log(token,"hy there");
    if(!token){
        navigate('/admin/login')
    }
  })
  return (
    <div className="flex">
      <SidebarF />
      <Post/>
    </div>
  );
}

export default PostsMan;
