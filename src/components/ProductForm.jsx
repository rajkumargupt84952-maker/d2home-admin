import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { getRequest, postRequest } from "../set-apis";
import { api } from "../url";

function ProductsForm({ show, setShow }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    productName: "",
    categoryId: "",
    sellPrice: "",
    quantity: "",
    maxPrice: "",
    description: "",
    productImage: [],
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // =============================
  // Fetch Categories
  // =============================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getRequest(api.getAllCategories);
      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // =============================
  // Handle Close
  // =============================
  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  // =============================
  // Handle Change
  // =============================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "productImage") {
      const selectedFiles = Array.from(files);

      setFormData((prev) => ({
        ...prev,
        productImage: selectedFiles,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // =============================
  // Remove Selected Image
  // =============================
  const removeImage = (indexToRemove) => {
    const updatedImages = formData.productImage.filter(
      (_, index) => index !== indexToRemove
    );

    setFormData((prev) => ({
      ...prev,
      productImage: updatedImages,
    }));
  };

  // =============================
  // Validation
  // =============================
  const validate = () => {
    const newErrors = {};

    if (!formData.productName.trim())
      newErrors.productName = "Product name is required";

    if (!formData.categoryId)
      newErrors.categoryId = "Category is required";

    if (!formData.sellPrice)
      newErrors.sellPrice = "Sell price is required";
    else if (isNaN(formData.sellPrice) || formData.sellPrice <= 0)
      newErrors.sellPrice = "Sell price must be positive";

    if (!formData.maxPrice)
      newErrors.maxPrice = "Max price is required";
    else if (isNaN(formData.maxPrice) || formData.maxPrice <= 0)
      newErrors.maxPrice = "Max price must be positive";

    if (Number(formData.sellPrice) > Number(formData.maxPrice))
      newErrors.sellPrice = "Sell price cannot exceed max price";

    if (!formData.quantity)
      newErrors.quantity = "Quantity is required";
    else if (isNaN(formData.quantity) || formData.quantity < 0)
      newErrors.quantity = "Quantity must be valid number";

    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (!formData.productImage.length)
      newErrors.productImage = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =============================
  // Submit
  // =============================
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    const body = new FormData();

    body.append("productName", formData.productName);
    body.append("categoryId", formData.categoryId);
    body.append("sellPrice", formData.sellPrice);
    body.append("quantity", formData.quantity);
    body.append("maxPrice", formData.maxPrice);
    body.append("description", formData.description);

    formData.productImage.forEach((file) => {
      body.append("productImage", file); 
      // If backend expects array → productImage[]
    });

    const { error } = await postRequest(api.addProducts, body);

    setLoading(false);

    if (error) {
      alert("Something went wrong");
      return;
    }

    alert("Product Created Successfully");
    handleClose();
  };

  // =============================
  // Reset Form
  // =============================
  const resetForm = () => {
    setFormData({
      productName: "",
      categoryId: "",
      sellPrice: "",
      quantity: "",
      maxPrice: "",
      description: "",
      productImage: [],
    });

    setErrors({});

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =============================
  // UI
  // =============================
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          {/* Product Name */}
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              isInvalid={!!errors.productName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.productName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Category Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              isInvalid={!!errors.categoryId}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.categoryId}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Price Row */}
          <div className="d-flex gap-3">
            <Form.Group className="mb-3 w-100">
              <Form.Label>Sell Price</Form.Label>
              <Form.Control
                type="number"
                name="sellPrice"
                value={formData.sellPrice}
                onChange={handleChange}
                isInvalid={!!errors.sellPrice}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sellPrice}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 w-100">
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                name="maxPrice"
                value={formData.maxPrice}
                onChange={handleChange}
                isInvalid={!!errors.maxPrice}
              />
              <Form.Control.Feedback type="invalid">
                {errors.maxPrice}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          {/* Quantity */}
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              isInvalid={!!errors.quantity}
            />
            <Form.Control.Feedback type="invalid">
              {errors.quantity}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Multiple Image Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Product Images</Form.Label>
            <Form.Control
              type="file"
              name="productImage"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleChange}
              isInvalid={!!errors.productImage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.productImage}
            </Form.Control.Feedback>

            {/* Preview Thumbnails */}
            {formData.productImage.length > 0 && (
              <div className="d-flex flex-wrap gap-3 mt-3">
                {formData.productImage.map((file, index) => (
                  <div key={index} className="text-center">
                    <Image
                      src={URL.createObjectURL(file)}
                      width={100}
                      height={100}
                      rounded
                      style={{ objectFit: "cover" }}
                    />
                    <div>
                      <Button
                        variant="danger"
                        size="sm"
                        className="mt-2"
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Product"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductsForm;
