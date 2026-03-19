const convertDateString = (timestamp)=>{
const date = new Date(timestamp);

// Get date components
const day = date.getUTCDate();
const month = date.toLocaleString('default', { month: 'long' });
const year = date.getUTCFullYear();

// Get time components
let hours = date.getUTCHours();
const minutes = date.getUTCMinutes().toString().padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12 || 12; // Convert to 12-hour format

// Format the final string
return`${day} ${month} ${year} at ${hours}:${minutes} ${ampm}`;


}