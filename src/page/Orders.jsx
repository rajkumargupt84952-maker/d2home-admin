import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { api } from "../url";
import { getRequest, postRequest } from "../set-apis";

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getRequest(api.getActiveOrders);
      if (response && response.data && response.data.data) {
        setOrderList(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const payload = {
        orderId: orderId,
        status: newStatus
      };
      const response = await postRequest(api.changeOrderStatus, payload);
      if (!response.error) {
        fetchOrders();
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
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
                      Welcome to Orders{" "}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="px-4">
            <div className="row mt-4 mb-5 shadow-search">
              <div className="table-responsive bg-white p-3 rounded shadow-sm">
                <table className="table table-striped table-bordered table-hover w-100 align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Order No</th>
                      <th>Date</th>
                      <th>Customer Details</th>
                      <th>Items</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4">Loading orders...</td>
                      </tr>
                    ) : orderList && orderList.length > 0 ? (
                      orderList.map((order) => (
                        <tr key={order._id}>
                          <td className="fw-bold">{order.orderNumber}</td>
                          <td className="fw-bold">{new Date(order.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                          <td>
                            <strong>{order.shippingAddress?.fullName}</strong> <br />
                            <small>{order.shippingAddress?.phone}</small> <br />
                            <small className="text-muted">{order.shippingAddress?.pincode},{order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state}</small>
                          </td>
                          <td>
                            <ul className="list-unstyled mb-0">
                              {order.orderItems?.map(item => (
                                <li key={item._id} className="mb-1">
                                  {item.productName} <span className="badge bg-secondary">x{item.quantity}</span> 
                                  <span className="text-success ms-2">₹{item.sellPrice}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="fw-bold text-success">₹{order.totalPrice}</td>
                          <td>
                             <span className={`badge ${order.orderStatus === 'DELIVERED' ? 'bg-success' : order.orderStatus === 'CANCELLED' ? 'bg-danger' : order.orderStatus === 'SHIPPED' ? 'bg-info text-dark' : 'bg-warning text-dark'}`}>
                                {order.orderStatus}
                             </span>
                          </td>
                          <td>
                            <select 
                              className="form-select form-select-sm" 
                              value={order.orderStatus || ''} 
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            >
                              <option value="PLACED">PLACED</option>
                              <option value="SHIPPED">SHIPPED</option>
                            
                              <option value="DELIVERED">DELIVERED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">No orders found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default Orders;
