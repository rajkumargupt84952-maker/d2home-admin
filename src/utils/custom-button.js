import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export const addButton = (array) => {
    array.forEach((element,index) => {
      element.edit = <div className="btn btn-primary pt-0 pb-1" ><FaEdit /></div>
      element.delete = <div className="btn btn-danger pt-0 pb-1"><FaTrash /></div>
      element.sno=index+1
    });
  }

  export  const selectCreater = (array,  name="name",_id="_id") => {
    array.forEach(element => {
      element.label = element[name]
      element.value = element[_id]
    });
  }

  export const deleteConfirmation =async () =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            console.log("eeww",result.isConfirmed);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
            });
        return  result.isConfirmed
        }
        return false
      });
  }

