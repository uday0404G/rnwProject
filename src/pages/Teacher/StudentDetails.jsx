import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Badge, ListGroup, Button, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaBook, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const StudentDetails = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDetails();
  }, [studentId]);

  const fetchStudentDetails = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`http://localhost:8080/user/student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Student data:', response.data); // For debugging
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch student details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center mt-5">
        <h3>Student not found</h3>
        <Button 
          variant="primary" 
          className="mt-3"
          onClick={() => navigate('/teacher-dashboard/students')}
        >
          <FaArrowLeft className="me-2" />
          Back to Students List
        </Button>
      </div>
    );
  }

  return (
    <div className="student-details-container p-4">
      <Button 
        variant="outline-primary" 
        className="mb-4"
        onClick={() => navigate('/teacher-dashboard/students')}
      >
        <FaArrowLeft className="me-2" />
        Back to Students
      </Button>

      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                <img
                  src={student.avatar || `https://ui-avatars.com/api/?name=${student.name}`}
                  alt={student.name}
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>
              <h4>{student.name}</h4>
              <p className="text-muted">
                <FaEnvelope className="me-2" />
                {student.email}
              </p>
              <Badge bg={student.status === 'active' ? 'success' : 'warning'}>
                {student.status || 'Active'}
              </Badge>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5 className="mb-3">Student Information</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Joined Date:</strong>{' '}
                  {new Date(student.createdAt).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Total Courses:</strong>{' '}
                  {student.enrolledCourses?.length || 0}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Status:</strong>{' '}
                  <Badge bg={student.status === 'active' ? 'success' : 'warning'}>
                    {student.status || 'Active'}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <h5 className="mb-4">Enrolled Courses</h5>
              {student.enrolledCourses?.length > 0 ? (
                <Row xs={1} md={2} className="g-4">
                  {student.enrolledCourses.map(course => (
                    <Col key={course._id}>
                      <Card className="h-100">
                        <Card.Img 
                          variant="top" 
                          src={course.image || 'https://via.placeholder.com/300x200'} 
                          style={{ height: '150px', objectFit: 'cover' }}
                        />
                        <Card.Body>
                          <Card.Title>{course.title}</Card.Title>
                          <Card.Text className="text-muted small">
                            {course.description}
                          </Card.Text>
                          <div className="mt-2">
                            <small className="text-muted">
                              <strong>Progress:</strong>
                            </small>
                            <div className="progress mt-1">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${course.progress || 0}%` }}
                                aria-valuenow={course.progress || 0}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {course.progress || 0}%
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center text-muted">
                  <FaBook size={40} className="mb-3" />
                  <p>No courses enrolled yet</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentDetails; 