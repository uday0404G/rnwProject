import React, { useEffect } from 'react';
import { Card, Row, Col, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../Redux/Student/Action';
import { FaEnvelope, FaUser } from 'react-icons/fa';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, isLoading, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="profile-container">
      <Row>
        <Col md={4}>
          <Card className="text-center p-4 mb-4">
            <div className="position-relative d-inline-block mx-auto mb-4">
              <Image
                src={profile.avatar}
                roundedCircle
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                className="border"
              />
            </div>
            <Card.Body>
              <Card.Title className="mb-4">
                <h3>{profile.name}</h3>
              </Card.Title>
              <div className="text-start">
                <p className="mb-2">
                  <FaUser className="me-2 text-primary" />
                  <strong>Name:</strong> {profile.name}
                </p>
                <p className="mb-2">
                  <FaEnvelope className="me-2 text-primary" />
                  <strong>Email:</strong> {profile.email}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="p-4">
            <h4 className="mb-4">About Me</h4>
            <p className="text-muted">
              Welcome to your learning journey! This is your profile page where you can view your personal information.
            </p>
            <div className="mt-4">
              <h5>Learning Progress</h5>
              <p className="text-muted">
                Track your course progress and achievements here.
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile; 