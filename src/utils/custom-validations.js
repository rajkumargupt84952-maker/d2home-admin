import toast from "react-hot-toast";

export const validateField = (name, value) => {
  let error = "";

  switch (name) {
    case "name":
      if (!value.trim()) {
        error = "Name is required";
      }
      break;
      case "accountHolderName":
        if (!value.trim()) {
          error = "Holder Name is required";
        }
        break;
    case "openingTime":
      if (!value.trim()) {
        error = "Opening Time is required";
      }
      break;
    case "closingTime":
      if (!value.trim()) {
        error = "Closing Time is required";
      }
      break;

    case "email":
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = "Email is required";
      } else if (!emailPattern.test(value)) {
        error = "Email is invalid";
      }
      break;

    case "password":
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
      break;

    case "pan":
      const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!value) {
        error = "PAN is required";
      } else if (!panPattern.test(value)) {
        error = "PAN is invalid";
      }
      break;
    case "phoneno":
      const mobilePattern = /^[0-9]{10}$/;
      if (!value) {
        error = "Mobile number is required";
      } else if (!mobilePattern.test(value)) {
        error = "Mobile number is invalid";
      } else if (value.length > 10) {
        error = "Mobile number should be 10 digit";
      }
      break;
    case "phoneNo":
      const mobilePattern2 = /^[0-9]{10}$/;
      if (!value) {
        error = "Mobile number is required";
      } else if (!mobilePattern2.test(value)) {
        error = "Mobile number is invalid";
      } else if (value.length > 10) {
        error = "Mobile number should be 10 digit";
      }
      break;

    case "adhaar":
      const aadhaarPattern = /^[2-9]{1}[0-9]{11}$/;
      if (!value) {
        error = "Adhaar is required";
      } else if (!aadhaarPattern.test(value)) {
        error = "Adhaar is invalid";
      }
      break;

    case "idProof":
      if (!value) {
        error = "Proof is required";
      } else if (value.size > 1048576) {
        // 1MB file size limit
        error = "File size must be less than 1MB";
      } else if (
        !["image/jpeg", "image/png", "application/pdf"].includes(value.type)
      ) {
        error = "File type must be JPEG, PNG, or PDF";
      }
      break;
    case "fssaiImages":
      if (!value) {
        error = "Fssai Image is required";
      } else if (value.size > 1048576) {
        // 1MB file size limit
        error = "File size must be less than 1MB";
      } else if (
        !["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ) {
        error = "File type must be JPEG, PNG, or JPG";
      }
      break;
    case "gstImages":
      if (!value) {
        error = "GST Iamges is required";
      } else if (value.size > 1048576) {
        // 1MB file size limit
        error = "File size must be less than 1MB";
      } else if (
        !["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ) {
        error = "File type must be JPEG, PNG, or PDF";
      }
      break;
    case "heroImage":
      if (!value) {
        error = "Hero Iamge is required";
      } else if (value.size > 1048576) {
        // 1MB file size limit
        error = "File size must be less than 1MB";
      } else if (
        !["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ) {
        error = "File type must be JPEG, PNG, or PDF";
      }
      break;
    case "gst":
      if (!value.trim()) {
        error = "GSTIN is required";
      }
      break;

    case "owner":
      if (!value) {
        error = "Owner is required";
      }
      break;
    case "fssai":
      if (!value) {
        error = "Fssai is required";
      }
      break;
    case "latitude":
      if (!value) {
        error = "Latitude is required";
      }
      break;
    case "longitude":
      if (!value) {
        error = "Longitude is required";
      }
      break;
    case "address":
      if (!value) {
        error = "Address is required";
      }
      break;
    case "tablesQuantity":
      if (!value) {
        error = "No. of Table is required";
      }
      break;
    case "bankName":
      if (!value) {
        error = "Bank name is required";
      }
      break;
    case "ifscCode":
      if (!value) {
        error = "IFSC code is required";
      }
      break;
    case "accountNumber":
      if (!value) {
        error = "Account number is required";
      }
      break;
    case "branchCode":
      if (!value) {
        error = "Branch code is required";
      }
      break;

    default:
      if (!value) {
        error = `Mandatory Field`;
      }
      break;
  }

  return error;
};

export const isPan = (input) => {
  console.log("dad");
  let regExpe =
    /^([A-Z]){3}(C|P|H|F|A|T|B|L|J|G){1}([A-Z]){1}([0-9]){4}([A-Z]){1}?$/;

  if (!regExpe.test(input)) {
    toast.error("Invalid Pan!");
    return false;
  }
  return true;
};

export const isMobileNo = (input) => {
  const regex = /^(0|91)?[6-9][0-9]{9}$/;
  if (regex.test(input)) {
    return true;
  } else {
    toast.error("Invalid Mobile No!");
    return false;
  }
};

export const isEmail = (input) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
    return true;
  } else {
    toast.error("Invalid Email!");
    return false;
  }
};

export const isAdhaar = (input) => {
  if (/^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/.test(input)) {
    return true;
  } else {
    toast.error("Invalid Adhaar!");
    return false;
  }
};

export const isGstin = (input) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (regex.test(input)) {
    return true;
  } else {
    return false;
  }
};
