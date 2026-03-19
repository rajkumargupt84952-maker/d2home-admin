export const dateWithTime = (timestamp) => {
  if(!timestamp){
    return "NA"
  }
  const date = new Date(timestamp);
  // Add 5 hours and 30 minutes for IST
  date.setUTCHours(date.getUTCHours() + 5);
  date.setUTCMinutes(date.getUTCMinutes() + 30);
  // Get the components
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getUTCFullYear();

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  return `${formattedHours <10?"0"+formattedHours:formattedHours}:${minutes <10?"0"+minutes:minutes} ${period} (${day}/${month}/${year})`;
};

export const timeDiffrence = (time1, time2) => {
  // Convert the time strings to Date objects
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);

  const date1 = new Date(0, 0, 0, hours1, minutes1, 0); // Using a reference date
  const date2 = new Date(0, 0, 0, hours2, minutes2, 0);

  // Calculate the difference in milliseconds
  const diff = date2 - date1;

  // Convert the difference to hours and minutes
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { diffHours, diffMinutes };
};

export const dateEasyFormat = (isoDate)=>{
const date = new Date(isoDate);

// Get day, month, and year
const day = String(date.getUTCDate()).padStart(2, '0');
const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = date.getUTCFullYear();

// Format the date as DD-MM-YYYY
return`${day}-${month}-${year}`;

}

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

export const getLast30DaysDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 30); // Subtract 30 days
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

export function isWithinFiveMinutes(givenTime) {
  // Parse the given time and get the current time
  if(!givenTime){
    return "-"
  }
  const givenDate = new Date(givenTime);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = Math.abs(currentDate - givenDate);

  // Convert milliseconds to minutes
  const differenceInMinutes = differenceInMs / (1000 * 60);

  // Check if the difference is within 5 minutes
  return differenceInMinutes <= 5;
}

 export function convertTo12HourFormat(time) {
  if(!time){
    return "-"
  }
  let [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}
