import {createSlice} from "@reduxjs/toolkit"

const Authslice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        error:null,
        loading:false
    },
    reducers:{
        setuser:{
            reducer:(state,action)=>{
                state.user = action.payload
            }
        },
        seterror:{
            reducer:(state,action)=>{
                state.error = action.payload
            }
        },
        setloading:{
            reducer:(state,action)=>{
                state.loading = action.payload
            }
        }
    }})
export default Authslice.reducer
export const {seterror, setuser, setloading} = Authslice.actions
