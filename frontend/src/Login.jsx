import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [formData, setFormData] = useState({
    role: "admin", // Default to admin for convenience
    username: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowAlert(false);

    if (!formData.role || !formData.username || !formData.password) {
      setAlertMessage("Please fill in all fields");
      setAlertVariant("danger");
      setShowAlert(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        role: formData.role,
        username: formData.username,
        password: formData.password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setAlertMessage(`Login successful! Redirecting...`);
      setAlertVariant("success");
      setShowAlert(true);
      
      console.log("Token received, navigating to /"); // For debugging

      // The navigation will now work because the target page can render correctly
      setTimeout(() => {
        navigate("/"); 
      }, 1500);

    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      setAlertMessage(message);
      setAlertVariant("danger");
      setShowAlert(true);
    } finally {
      // This ensures the button is re-enabled even if navigation fails for other reasons
      // Note: We don't set it here if we are navigating away, but it's good practice for error cases
      if (!localStorage.getItem('token')) {
          setLoading(false);
      }
    }
  };


  const getUsernameLabel = () => {
    if (formData.role === "professor") {
      return "Professor ID";
    }
    return "Username";
  };
  
  const getUsernamePlaceholder = () => {
    if (formData.role === "professor") {
      return "Enter your Professor ID";
    }
    return "Enter your username (e.g., admin)";
  }

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h3 className="mb-0">Login</h3>
              <p className="mb-0 mt-2 opacity-75 text-white">Welcome back! Please sign in to your account</p>
            </Card.Header>
            <Card.Body className="p-4">
              {showAlert && (
                <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)} className="mb-3">
                  {alertMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Role</Form.Label>
                  <Form.Select name="role" value={formData.role} onChange={handleInputChange} required>
                    <option value="admin">Administrator</option>
                    <option value="professor">Professor</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{getUsernameLabel()}</Form.Label>
                  <Form.Control
                    type="text" // Changed to text to accommodate IDs
                    name="username"
                    placeholder={getUsernamePlaceholder()}
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg" className="fw-bold" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;