import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, ListGroup, ProgressBar } from 'react-bootstrap';
import { getCourseById } from '../../Redux/Student/Action';

const CourseLearning = () => {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const { currentCourse, isLoading } = useSelector((state) => state.student);
    const [activeContent, setActiveContent] = useState(null);

    useEffect(() => {
        if (courseId) {
            dispatch(getCourseById(courseId));
        }
    }, [courseId, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!currentCourse) {
        return <div>Course not found</div>;
    }

    return (
        <div className="course-learning-container p-4">
            <h2 className="mb-4">{currentCourse.title}</h2>
            
            <Row>
                {/* Course Content Section */}
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            {activeContent ? (
                                <>
                                    <h4>{activeContent.title}</h4>
                                    <div className="content-viewer mt-3">
                                        {/* Video content */}
                                        {activeContent.type === 'video' && (
                                            <div className="video-container">
                                                <video 
                                                    controls 
                                                    className="w-100"
                                                    src={activeContent.content}
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        )}
                                        
                                        {/* Document content */}
                                        {activeContent.type === 'document' && (
                                            <div className="document-container">
                                                <iframe
                                                    src={activeContent.content}
                                                    title={activeContent.title}
                                                    width="100%"
                                                    height="600px"
                                                />
                                            </div>
                                        )}

                                        {/* Text content */}
                                        {activeContent.type === 'text' && (
                                            <div className="text-content">
                                                {activeContent.content}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-5">
                                    <h5>Select a lesson from the curriculum to start learning</h5>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Course Curriculum Section */}
                <Col md={4}>
                    <Card>
                        <Card.Header>
                            <h5 className="mb-0">Course Curriculum</h5>
                        </Card.Header>
                        <Card.Body>
                            <ProgressBar 
                                now={currentCourse.progress || 0} 
                                label={`${currentCourse.progress || 0}% Complete`}
                                className="mb-3"
                            />
                            <ListGroup variant="flush">
                                {currentCourse.curriculum?.map((item, index) => (
                                    <ListGroup.Item 
                                        key={index}
                                        action
                                        onClick={() => setActiveContent(item)}
                                        active={activeContent?.title === item.title}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        <div>
                                            <i className={`bi bi-${item.type === 'video' ? 'play-circle' : 'file-text'} me-2`}></i>
                                            {item.title}
                                        </div>
                                        {item.completed && (
                                            <i className="bi bi-check-circle-fill text-success"></i>
                                        )}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CourseLearning;