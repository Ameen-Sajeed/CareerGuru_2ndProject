import { createSlice } from '@reduxjs/toolkit'



const defaultUser = JSON.parse(localStorage.getItem('user'))
console.log(defaultUser,'defaultUser');
if(defaultUser){
    var {username,email,phone,_id,status,followings,
        followers} = defaultUser
}else{

}


const userSlice = createSlice({
    name:'user',
    initialState:{
        _id,
        username,
        email,
        phone,
        status,
        followings,
        followers,
  
    },
    reducers:{
        update:(state,action)=>{
            state._id = action.payload._id
            state.username = action.payload.username
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.status = action.payload.status
            state.followings = action.payload.followings
            state.followers = action.payload.followers

        },
     
    },
});


export const {update} = userSlice.actions;
export default userSlice.reducer;