import React, { createContext, useState } from "react";

const OrderContext = createContext();

const RealTimeOrderProvider = ({ children }) => {
  const [waiterNotification, setWaiterNotification] = useState([]);
  const [orderNotifier, setOrderNotifier] = useState(false);

  const getterOfWaiterNotification = () => {
    return waiterNotification;
  };

  return (
    <OrderContext.Provider
      value={{
        waiterNotification,
        setWaiterNotification,
        getterOfWaiterNotification,
        orderNotifier,
        setOrderNotifier,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { RealTimeOrderProvider, OrderContext };
