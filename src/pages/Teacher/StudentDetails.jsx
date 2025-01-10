import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Badge, Button, Spinner } from 'react-bootstrap';
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
      const response = await axios.get(
        `https://rnwprojectbackend.onrender.com/user/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setStudent(response.data);
    } catch (error) {
      toast.error('Failed to fetch student details');
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
                  src={`https://ui-avatars.com/api/?name=${student.name}`}
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
              <Badge bg="success">Active</Badge>
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
                          alt={course.title}
                          style={{ height: '160px', objectFit: 'cover' }}
                        />
                        <Card.Body>
                          <Card.Title>{course.title}</Card.Title>
                          <Card.Text className="text-muted">
                            {course.description?.length > 100 
                              ? `${course.description.substring(0, 100)}...` 
                              : course.description}
                          </Card.Text>
                          <div className="mt-3">
                            <small className="text-muted d-block mb-2">
                              <strong>Progress:</strong>
                            </small>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ 
                                  width: `${course.progress || 0}%`,
                                  backgroundColor: '#007bff'
                                }}
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