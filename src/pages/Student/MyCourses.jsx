import React, { useEffect } from 'react';
import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourses } from '../../Redux/Student/Action';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
    const dispatch = useDispatch();
    const { enrolledCourses, isLoading } = useSelector((state) => state.student);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getEnrolledCourses());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="courses-container">
            <h2 className="mb-4">My Enrolled Courses</h2>
            {enrolledCourses?.length > 0 ? (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {enrolledCourses.map((enrollment) => (
                        <Col key={enrollment._id}>
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={enrollment.course?.image || 'https://via.placeholder.com/300x200'} 
                                    alt={enrollment.course?.title}
                                />
                                <Card.Body>
                                    <Card.Title>{enrollment.course?.title}</Card.Title>
                                    <Card.Text>{enrollment.course?.description}</Card.Text>
                                    <div className="mt-3">
                                        <small className="text-muted d-block mb-2">
                                            <strong>Progress:</strong>
                                        </small>
                                        <ProgressBar 
                                            now={enrollment.progress || 0} 
                                            label={`${enrollment.progress || 0}%`}
                                        />
                                    </div>
                                    <Button 
                                        variant="primary" 
                                        className="mt-3 w-100"
                                        onClick={() => navigate(`/student-dashboard/course/${enrollment.course?._id}`)}
                                    >
                                        Continue Learning
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="text-center">
                    <p>You haven't enrolled in any courses yet.</p>
                </div>
            )}
        </div>
    );
};

export default MyCourses; 