import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { postRequest } from "../set-apis";
import { api } from "../url";
import { toast } from "react-toastify";

function CategoryForm({ show, setShow }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    categoryImage: null, // consistent key
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // =============================
  // Close Modal
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

    if (name === "categoryImage") {
      setFormData((prev) => ({
        ...prev,
        categoryImage: files[0], // single file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // =============================
  // Remove Image
  // =============================
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      categoryImage: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =============================
  // Validation
  // =============================
  const validate = () => {
    const newErrors = {};

    if (!formData.categoryName.trim())
      newErrors.categoryName = "Category name is required";

    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (!formData.categoryImage)
      newErrors.categoryImage = "Category image is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =============================
  // Submit
  // =============================
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const body = new FormData();
      body.append("categoryName", formData.categoryName);
      body.append("description", formData.description);
      body.append("categoryImage", formData.categoryImage);

      const { error } = await postRequest(api.addCategory, body);

      if (error) {
        toast.error("Something went wrong");
        setLoading(false);
        return;
      }

      toast.success("Category Created Successfully");
      handleClose();
    } catch (err) {
      toast.error("Unexpected error occurred");
    }

    setLoading(false);
  };

  // =============================
  // Reset Form
  // =============================
  const resetForm = () => {
    setFormData({
      categoryName: "",
      description: "",
      categoryImage: null,
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          {/* Category Name */}
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              isInvalid={!!errors.categoryName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.categoryName}
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

          {/* Image Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Category Image</Form.Label>
            <Form.Control
              type="file"
              name="categoryImage"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleChange}
              isInvalid={!!errors.categoryImage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.categoryImage}
            </Form.Control.Feedback>

            {/* Preview */}
            {formData.categoryImage && (
              <div className="mt-3 text-center">
                <Image
                  src={URL.createObjectURL(formData.categoryImage)}
                  width={120}
                  height={120}
                  rounded
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mt-2"
                    onClick={removeImage}
                  >
                    Remove
                  </Button>
                </div>
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
          {loading ? "Saving..." : "Save Category"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryForm;
