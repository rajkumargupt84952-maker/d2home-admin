import {  useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { api } from "../url";
import { MDBDataTable } from "mdbreact";
import ProductsForm from "../components/ProductForm";
import { getRequest } from "../set-apis";

const ProductList = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const data = {
    columns: [
      {
        label: "Product Name",
        field: "productName",
        sort: "asc",
        width: 250,
      },
      {
        label: "Availble quantity",
        field: "quantity",
        sort: "asc",
        width: 150,
      },
      {
        label: "Max Price",
        field: "maxPrice",
        sort: "asc",
        width: 150,
      },
      {
        label: "Sell Price",
        field: "sellPrice",
        sort: "asc",
        width: 150,
      },
    
    ],
    rows: orderList,
  };

  useEffect(()=>{
    fetchProducts();
  },[show])

  const fetchProducts = async () => {
    try {
      const response = await getRequest(api.getAllProducts);
      console.log(response.data.data);
      
      setOrderList(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

 const handleProducts = () => {
   setShow(true);
  }
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
                      Welcome on Products{" "}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
               
                <button
                  onClick={handleProducts}
                  type="button"
                  className="btn btn-success mt-2"
                  disabled={loading}
                >
                  { "Add Products"}
                </button>
              </div>
            </div>
          </div>

          <>
            <section className="px-4">
              <div className="row  mt-4 mb-5 shadow-search">
                <MDBDataTable data={data} responsive />
              </div>
            </section>
          </>
        </div>
      </main>
      <ProductsForm show={show} setShow={setShow} />
    </>
  );
};
export default ProductList;
