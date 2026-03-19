import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { api } from "../url";
import { MDBDataTable } from "mdbreact";
import { getRequest } from "../set-apis";
import CategoryForm from "../components/CategoryForm";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [categoryFormVisible, setCategoryFormVisible] = useState(false);
  const data = {
    columns: [
      {
        label: "Categry ID",
        field: "_id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Category Name",
        field: "categoryName",
        sort: "asc",
        width: 250,
      },

      {
        label: "Image",
        field: "maxPrice",
        sort: "asc",
        width: 150,
      },
    ],
    rows: categories,
  };

  useEffect(() => {
    fetchCategories();
  }, [categoryFormVisible]);

  const fetchCategories = async () => {
    try {
      const res = await getRequest(api.getAllCategories);
      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleCategoryForm = () => {
    // Logic to show category form goes here
    setCategoryFormVisible(true);
  };
  return (
    <>
      <main id="main">
        <CategoryForm
          show={categoryFormVisible}
          setShow={setCategoryFormVisible}
        />
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
                      Welcome on Category part{" "}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="container-fluid"></div>
              <div className="row">
                <div className="col-lg-12">
                  <button
                    onClick={handleCategoryForm}
                    type="button"
                    className="btn btn-success mt-2"
                    disabled={false}
                  >
                    {"Add Category"}
                  </button>
                </div>
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
    </>
  );
};
export default CategoryList;
