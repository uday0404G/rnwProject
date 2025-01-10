import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { FaBook, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, addCourse, updateCourse, deleteCourse } from '../../Redux/TeacherReducer/action';
import { toast } from 'react-toastify';

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state) => state.teacher);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
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

  const handleClose = () => {
    setShowModal(false);
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      duration: '',
      image: '',
      level: 'beginner'
    });
  };

  const handleShow = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        duration: course.duration,
        image: course.image,
        level: course.level || 'beginner'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await dispatch(updateCourse(editingCourse._id, formData));
        toast.success('Course updated successfully');
      } else {
        await dispatch(addCourse(formData));
        toast.success('Course created successfully');
      }
      handleClose();
      dispatch(getAllCourses());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await dispatch(deleteCourse(courseId));
        toast.success('Course deleted successfully');
        dispatch(getAllCourses());
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="courses-container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Courses</h2>
        <Button variant="primary" onClick={() => handleShow()}>
          <FaPlus className="me-2" />
          Add New Course
        </Button>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {courses.map((course) => (
          <Col key={course._id}>
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={course.image || 'https://via.placeholder.com/300x200'} 
                alt={course.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <div className="mt-2">
                  <small className="text-muted">
                    <strong>Duration:</strong> {course.duration}
                  </small>
                </div>
                <div className="mt-2">
                  <small className="text-muted">
                    <strong>Enrolled Students:</strong> {course.enrolledStudents?.length || 0}
                  </small>
                </div>
              </Card.Body>
              <Card.Footer className="bg-white">
                <Button 
                  variant="outline-primary" 
                  className="me-2"
                  onClick={() => handleShow(course)}
                >
                  <FaEdit /> Edit
                </Button>
                <Button 
                  variant="outline-danger"
                  onClick={() => handleDelete(course._id)}
                >
                  <FaTrash /> Delete
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCourse ? 'Edit Course' : 'Add New Course'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Level</Form.Label>
              <Form.Select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingCourse ? 'Update Course' : 'Create Course'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Courses; 