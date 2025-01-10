import React, { useEffect, useState } from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/courses/enrolled', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      setEnrolledCourses(response.data);
    } catch (error) {
      toast.error('Failed to fetch enrolled courses');
    }
  };

  return (
    <div>
      <h2 className="mb-4">My Enrolled Courses</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {enrolledCourses.map((course) => (
          <Col key={course._id}>
            <Card>
              <Card.Img variant="top" src={course.imageUrl} />
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Card.Text>
                  <strong>Progress:</strong>
                </Card.Text>
                <ProgressBar now={course.progress || 0} label={`${course.progress || 0}%`} />
                <Button variant="primary" className="mt-3" href={`/student-dashboard/course/${course._id}`}>
                  Continue Learning
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyCourses; 