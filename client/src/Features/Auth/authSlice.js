import { createSlice } from '@reduxjs/toolkit'



const defaultUser = JSON.parse(localStorage.getItem('user'))
console.log(defaultUser,'defaultUser');
if(defaultUser){
    var {username,email,phone,_id,status} = defaultUser
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
  
    },
    reducers:{
        update:(state,action)=>{
            state._id = action.payload._id
            state.username = action.payload.username
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.status = action.payload.status

        },
        remove:(state) => {state ={} }
    },
});


export const {update, remove} = userSlice.actions;
export default userSlice.reducer;