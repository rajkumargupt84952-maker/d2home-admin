import { React, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import { api, baseUrl } from "../url";
import { MDBDataTable } from "mdbreact";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const UserList = () => {


    const [orderList, setOrderList] = useState([]);
    const [total, setTotal] = useState({})
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);





    const data = {
        columns: [
            {
                label: "Shipment Id",
                field: "shipmentId",
                sort: "asc",
                width: 250,
            },
            {
                label: "Billed Weight",
                field: "billedWeight",
                sort: "asc",
                width: 150,
            },
            {
                label: "Actual Weight",
                field: "actualWeight",
                sort: "asc",
                width: 150,
            },
            {
                label: "Difference",
                field: "difference",
                sort: "asc",
                width: 150,
            },
            {
                label: "status",
                field: "status",
                sort: "asc",
                width: 150,
            }

        ],
        rows: orderList,
    };


    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "text/csv") {
            setFile(selectedFile);
            console.log("selectedFile", selectedFile)
        } else {
            alert("Please select a valid CSV file!");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); // 🔹 backend should expect `file`

        try {
            setLoading(true);
            const res = await axios.post(
                "https://shippingaccountingsystem-backend.onrender.com/upload-fedex-billed-sheet",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Response:", res.data);
            setTotal(res.data?.totals)
            setOrderList(res.data?.mismatchedShipments)
        } catch (err) {
            console.error("Upload error:", err);
        } finally {
            setLoading(false);
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
                                            Welcome on Upload fedex bill                   </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <h4>Upload Fedex bill sheet</h4>
                                <div>
                                    <input type="file" accept=".csv" onChange={handleFile} />
                                    {file && (
                                        <p>
                                            <strong>Selected File:</strong> {file.name}
                                        </p>
                                    )}
                                </div>
                                <button onClick={handleUpload} type="button" className="btn btn-success mt-2" disabled={loading}>
                                    {loading ? "Uploading..." : "Upload CSV"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <>




                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Checked</th>
                                    <th scope="col">Mismatches</th>
                                    <th scope="col">ExtraBilled</th>
                                    <th scope="col">UnderBilled</th>
                                    <th scope="col">Net Difference</th>
                                    <th scope="col">Missing</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{total.checked}</th>
                                    <td>{total.mismatches}</td>
                                    <td>{total.extraBilled}</td>
                                    <td>{total.underBilled}</td>
                                    <td>{total.netDifference}</td>
                                    <td>{total.missing}</td>
                                </tr>

                            </tbody>
                        </table>

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
export default UserList;
