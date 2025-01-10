import React, { useEffect } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../Redux/Student/Action';
import { FaUser, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container p-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body className="text-center">
              <div className="mb-4">
                <img
                  src={profile?.avatar || `https://ui-avatars.com/api/?name=${profile?.name}`}
                  alt={profile?.name}
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>
              <h3 className="mb-3">{profile?.name}</h3>
              <p className="text-muted mb-3">
                <FaEnvelope className="me-2" />
                {profile?.email}
              </p>
              <Badge bg="primary" className="px-3 py-2">
                Student
              </Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile; 