import { axiosClient } from "../lib/apiConfig"

export const signUpUser=async(userData)=>{
    //signup logic
    const response=await axiosClient.post('/auth/register',userData)
    return response.data
}