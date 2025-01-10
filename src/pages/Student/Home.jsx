import React, { useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../Redux/Student/Action';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const { courses, isLoading, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleEnroll = async (courseId) => {
    try {
      // Implement enrollment logic here
      toast.success('Successfully enrolled in the course!');
    } catch (error) {
      toast.error('Failed to enroll in the course');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="courses-container">
      <h2 className="mb-4">Available Courses</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {courses.map((course) => (
          <Col key={course._id}>
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={course.image || 'https://via.placeholder.com/300x200'} 
                alt={course.title}
              />
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <div className="mt-auto">
                  <div className="mb-2">
                    <small className="text-muted">
                      <strong>Instructor:</strong> {course.instructor?.name}
                    </small>
                  </div>
                  <Button 
                    variant="primary" 
                    onClick={() => handleEnroll(course._id)}
                  >
                    Enroll Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
