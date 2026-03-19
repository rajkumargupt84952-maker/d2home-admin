import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Routing } from "../../utils/routing";
import { dateWithTime } from "../../utils/date-formater";
import CallWaiter from "../../assets/css/call-waiter.mp3";
const socket = io("https://bhukkadadminbackend.bhukkads.in/", {
  autoConnect: false,
});

export const connectFromSocket = ({
  setWaiterNotification,
  setOrderNotifier,
}) => {
  let token = localStorage.getItem("token");
  socket.connect();
  // console.log("connect to socket.");
  socket.emit("register", token);

  socket.on("connect", () => {
    // socket.emit("register", token);

    socket.on("CALL-THE-WAITER", (data) => {
      // console.log(data, "waiter");

      data.callTime = dateWithTime(new Date());

      let existingNotification = JSON.parse(
        localStorage.getItem("notifications")
      );

      if (!existingNotification) {
        existingNotification = [];
        existingNotification.push(data);
        localStorage.setItem(
          "notifications",
          JSON.stringify(existingNotification)
        );
      } else {
        existingNotification.unshift(data);
        localStorage.setItem(
          "notifications",
          JSON.stringify(existingNotification)
        );
      }
      const audio = new Audio(CallWaiter); // Replace with your sound file path
      audio.play();
      toast.info(`Waiter Call From Table ${data.tableNo}`);
      setWaiterNotification([...existingNotification]);
    });

    socket.on("ORDER-RECIEVED", (data) => {
      toast.info("New Order Received.");
      setOrderNotifier(true);
    });

    socket.on("ORDER_UPDATED", (data) => {
      toast.info("New Items Added to The Order.");
      setOrderNotifier(true);
    });
  });
};
