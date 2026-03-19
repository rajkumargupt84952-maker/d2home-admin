import { toast } from "react-toastify"

export const  errorToast = (error)=>{
    console.log(error);
    toast.error(error.response?.data?.message)
}
export const successToast = (res) =>{
    console.log(res);
    toast.success(res.data?.message)
}