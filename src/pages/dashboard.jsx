import { React, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import { api, baseUrl } from "../url";
import { MDBDataTable } from "mdbreact";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Dashboard = () => {


  const [orderList, setOrderList] = useState([]);


  // useEffect(() => {
  //   let user = JSON.parse(localStorage.getItem("user"));
  //   setUserData(user);
  //   if (user?.role === "SUPER_ADMIN") {
  //     const reqBody = {
  //       startDate: getLast30DaysDate(),
  //       endDate: getCurrentDate(),
  //       orderType,
  //     };
  //     fetchOrderList(reqBody);
  //   }
  // }, []);

  // const fetchOrderList = (reqBody) => {
  //   Http.loader(true);
  //   axios
  //     .post(baseUrl + api.getTotalRevenue, reqBody)
  //     .then((res) => {
  //       Http.loader(false);
  //       console.log(res.data.data);
  //       setTotalData(res.data?.data[0]);

  //       addKeys(res.data?.data[0]?.restaurantsList);
  //     })
  //     .catch((err) => {
  //       setOrderList([]);
  //       http.loader(false);
  //       errorToast(err);
  //     });
  // };

  // const addKeys = (array) => {
  //   array.forEach((element) => {
  //     // element.showDetail = orderType==="DINING" ?
  //     element.finalAppRevenueKey = (
  //       <div
  //         className="btn btn-success "
  //         onClick={() => goToAppRevenue(element.restaurantId,element?.restaurantName)}
  //       >

  //         <BsCashStack className="fs-3" />
  //       </div>
  //     );
  //     element.totalRevenue2 = element?.totalRevenue?.toFixed(2);
  //     element.appTotalRevenue =(((element.takeawayTotal+element.preOrderTotal)*preOrderCharge)+(element?.dininOnlineTotal*diningCharge))?.toLocaleString('en-IN')
  //   });
  //   setTempOrderType(orderType);
  //   setOrderList(array);
  // };




  const data = {
    columns: [
      {
        label: "Restaurant Name",
        field: "restaurantName",
        sort: "asc",
        width: 250,
      },
      {
        label: "Count",
        field: "count",
        sort: "asc",
        width: 150,
      },
      {
        label: "Discounted",
        field: "totalDiscount",
        sort: "asc",
        width: 150,
      },
      {
        label: "Order Value",
        field: "totalRevenue2",
        sort: "asc",
        width: 150,
      },
      {
        label: "Platform Fee",
        field: "appTotalRevenue",
        sort: "asc",
        width: 150,
      },
      {
        label: "Revenue Detail",
        field: "finalAppRevenueKey",
        sort: "asc",
        width: 150,
      },
    ],
    rows: orderList,
  };

  return (
    <>
      <main id="main">
        <div className="content-wrapper">
          <div className="page-nav">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="page-header ms-2">
                    <h3 className="page-title">
                      <span className="page-title-icon bg-gradient-primary text-white me-2">
                        <span>
                          <FaHome size="20" />
                        </span>
                      </span>
                      Dashboard                     </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h4>Welcome on D2HomeIndia dashboard</h4>
              </div>
            </div>
          </div>

          

        </div>
      </main>
    </>
  );
};
export default Dashboard;
