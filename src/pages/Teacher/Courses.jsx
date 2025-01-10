import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { FaBook, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, addCourse, updateCourse, deleteCourse } from '../../Redux/TeacherReducer/action';
import { toast } from 'react-toastify';

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector(state => state.teacher);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    image: '',
    level: 'beginner'
  });

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleAddEdit = (course = null) => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        duration: course.duration,
        image: course.image
      });
      setSelectedCourse(course);
    } else {
      setFormData({
        title: '',
        description: '',
        duration: '',
        image: ''
      });
      setSelectedCourse(null);
    }
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      // Validate form data
      if (!formData.title || !formData.description) {
        toast.error('Title and description are required');
        return;
      }

      const courseData = {
        ...formData,
        status: 'active'
      };

      if (selectedCourse) {
        const result = await dispatch(updateCourse(selectedCourse._id, courseData));
        if (result.success) {
          toast.success('Course updated successfully');
          setShowModal(false);
          dispatch(getAllCourses());
        } else {
          toast.error(result.error || 'Failed to update course');
        }
      } else {
        const result = await dispatch(addCourse(courseData));
        if (result.success) {
          toast.success('Course added successfully');
          setShowModal(false);
          dispatch(getAllCourses());
        } else {
          toast.error(result.error || 'Failed to add course');
        }
      }
    } catch (error) {
      console.error('Course operation error:', error);
      toast.error('Operation failed: ' + (error.message || 'Unknown error'));
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const result = await dispatch(deleteCourse(courseId));
      if (result.success) {
        toast.success('Course deleted successfully');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="courses-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaBook className="me-2" />
          Course Management
        </h2>
        <Button variant="primary" onClick={() => handleAddEdit()}>
          <FaPlus className="me-2" />
          Add New Course
        </Button>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {courses.map(course => (
          <Col key={course.id}>
            <Card className="h-100 course-card">
              <Card.Img 
                variant="top" 
                src={course.image}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <div className="mt-3">
                  <small className="text-muted">
                    <strong>Enrolled Students:</strong> {course.enrolledStudents}
                  </small>
                  <br />
                  <small className="text-muted">
                    <strong>Duration:</strong> {course.duration}
                  </small>
                </div>
              </Card.Body>
              <Card.Footer className="bg-transparent">
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleAddEdit(course)}
                >
                  <FaEdit className="me-1" />
                  Edit
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(course._id)}>
                  <FaTrash className="me-1" />
                  Delete
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Course Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedCourse ? 'Edit Course' : 'Add New Course'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course Title*</Form.Label>
              <Form.Control 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter course title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description*</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter course description"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control 
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 8 weeks"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Level</Form.Label>
              <Form.Select
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course Image URL</Form.Label>
              <Form.Control 
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {selectedCourse ? 'Save Changes' : 'Create Course'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Courses; 