import React, { useState } from 'react';
import { Card, Button, Modal, Row, Col, Badge } from 'react-bootstrap';
import { FaBook, FaUser, FaClock, FaSignal } from 'react-icons/fa';

const CourseDetails = ({ course, show, handleClose, handleEnroll }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{course?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <img 
              src={course?.image || 'https://via.placeholder.com/300x200'} 
              alt={course?.title}
              className="img-fluid rounded mb-3"
            />
          </Col>
          <Col md={6}>
            <div className="course-info">
              <h5>Course Details</h5>
              <div className="mb-3">
                <FaUser className="me-2 text-primary" />
                <strong>Instructor:</strong> {course?.instructor?.name}
              </div>
              <div className="mb-3">
                <FaClock className="me-2 text-primary" />
                <strong>Duration:</strong> {course?.duration || 'Not specified'}
              </div>
              <div className="mb-3">
                <FaSignal className="me-2 text-primary" />
                <strong>Level:</strong> 
                <Badge bg="info" className="ms-2">
                  {course?.level || 'Beginner'}
                </Badge>
              </div>
              <div className="mb-3">
                <FaBook className="me-2 text-primary" />
                <strong>Enrolled Students:</strong> {course?.enrolledStudents?.length || 0}
              </div>
            </div>
          </Col>
        </Row>
        <div className="mt-4">
          <h5>Course Description</h5>
          <p>{course?.description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleEnroll(course?._id)}>
          Enroll Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseDetails; 