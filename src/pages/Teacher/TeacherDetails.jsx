import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Badge, ListGroup, Button, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaEnvelope, FaBook, FaArrowLeft, FaCalendar } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const TeacherDetails = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherDetails();
  }, [teacherId]);

  const fetchTeacherDetails = async () => {
    try {
      const token = Cookies.get('token');
      console.log('Fetching teacher details for ID:', teacherId); // Debug log

      const [teacherResponse, coursesResponse] = await Promise.all([
        axios.get(`https://rnwprojectbackend.onrender.com/user/teacher/${teacherId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`https://rnwprojectbackend.onrender.com/courses/teacher/${teacherId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      console.log('Teacher response:', teacherResponse.data); // Debug log
      console.log('Courses response:', coursesResponse.data); // Debug log

      setTeacher(teacherResponse.data);
      setTeacherCourses(coursesResponse.data);
    } catch (error) {
      console.error('Error fetching teacher details:', error.response || error);
      toast.error(error.response?.data?.message || 'Failed to fetch teacher details');
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

  if (!teacher) {
    return (
      <div className="text-center mt-5">
        <h3>Teacher not found</h3>
        <Button 
          variant="primary" 
          className="mt-3"
          onClick={() => navigate('/teacher-dashboard/students')}
        >
          <FaArrowLeft className="me-2" />
          Back to Users List
        </Button>
      </div>
    );
  }

  return (
    <div className="teacher-details-container p-4">
      <Button 
        variant="outline-primary" 
        className="mb-4"
        onClick={() => navigate('/teacher-dashboard/students')}
      >
        <FaArrowLeft className="me-2" />
        Back to Users
      </Button>

      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                <img
                  src={teacher.avatar || `https://ui-avatars.com/api/?name=${teacher.name}`}
                  alt={teacher.name}
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>
              <h4>{teacher.name}</h4>
              <p className="text-muted">
                <FaEnvelope className="me-2" />
                {teacher.email}
              </p>
              <Badge bg={teacher.status === 'active' ? 'success' : 'warning'}>
                {teacher.status || 'Active'}
              </Badge>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5 className="mb-3">Teacher Information</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Joined Date:</strong>{' '}
                  {new Date(teacher.createdAt).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Total Courses:</strong>{' '}
                  {teacherCourses.length}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Status:</strong>{' '}
                  <Badge bg={teacher.status === 'active' ? 'success' : 'warning'}>
                    {teacher.status || 'Active'}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <h5 className="mb-4">Created Courses</h5>
              {teacherCourses.length > 0 ? (
                <Row xs={1} md={2} className="g-4">
                  {teacherCourses.map(course => (
                    <Col key={course._id}>
                      <Card className="h-100 course-card">
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
                              <FaCalendar className="me-2" />
                              Duration: {course.duration}
                            </small>
                            <br />
                            <small className="text-muted">
                              <FaBook className="me-2" />
                              Enrolled Students: {course.enrolledStudents?.length || 0}
                            </small>
                          </div>
                        </Card.Body>
                        <Card.Footer className="bg-transparent">
                          <Badge bg={course.status === 'active' ? 'success' : 'warning'}>
                            {course.status}
                          </Badge>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center text-muted">
                  <FaBook size={40} className="mb-3" />
                  <p>No courses created yet</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherDetails; 
