import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Badge, ListGroup, Image } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaCalendarAlt, FaBook, FaEdit, FaKey } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const TeacherProfile = () => {
  const { user } = useSelector(state => state.user);
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    avatar: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`https://rnwprojectbackend.onrender.com/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setProfile(response.data);
      setCourses(response.data.courses || []);
      
      setFormData({
        name: response.data.name,
        email: response.data.email,
        bio: response.data.bio || '',
        phone: response.data.phone || '',
        avatar: response.data.avatar || ''
      });
    } catch (error) {
      console.error('Profile fetch error:', error);
      toast.error('Failed to fetch profile data');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      await axios.put(`https://rnwprojectbackend.onrender.com/user/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Profile updated successfully');
      setIsEditing(false);
      fetchProfileData();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      const token = Cookies.get('token');
      await axios.put(`https://rnwprojectbackend.onrender.com/user/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Password changed successfully');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  return (
    <div className="profile-container">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                <Image
                  src={profile?.avatar || `https://ui-avatars.com/api/?name=${profile?.name}`}
                  roundedCircle
                  className="profile-image"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>
              <h4>{profile?.name}</h4>
              <p className="text-muted">
                <FaEnvelope className="me-2" />
                {profile?.email}
              </p>
              <Badge bg="success">Teacher</Badge>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5 className="mb-3">Statistics</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <FaBook className="me-2" />
                      Total Courses
                    </div>
                    <Badge bg="primary">{profile?.totalCourses || 0}</Badge>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <FaUser className="me-2" />
                      Total Students
                    </div>
                    <Badge bg="info">
                      {profile?.totalStudents || 0}
                    </Badge>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <FaCalendarAlt className="me-2" />
                      Joined Date
                    </div>
                    <small>{new Date(profile?.createdAt).toLocaleDateString()}</small>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Profile Details</h5>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <FaEdit className="me-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              {isEditing ? (
                <Form onSubmit={handleUpdateProfile}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Avatar URL</Form.Label>
                    <Form.Control
                      type="url"
                      value={formData.avatar}
                      onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </Form>
              ) : (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {profile?.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email:</strong> {profile?.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Bio:</strong> {profile?.bio || 'No bio added yet'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Phone:</strong> {profile?.phone || 'No phone number added'}
                  </ListGroup.Item>
                </ListGroup>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Security</h5>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                >
                  <FaKey className="me-2" />
                  {isChangingPassword ? 'Cancel' : 'Change Password'}
                </Button>
              </div>

              {isChangingPassword && (
                <Form onSubmit={handlePasswordChange}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Update Password
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherProfile; 
