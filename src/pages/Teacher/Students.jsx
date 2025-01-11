import React, { useState, useEffect } from 'react';
import { Table, Card, Form, InputGroup, Button, Badge, Spinner, Tabs, Tab } from 'react-bootstrap';
import { FaSearch, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Redux/TeacherReducer/action';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector(state => state.teacher);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('students');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filteredStudents = users?.students?.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredTeachers = users?.teachers?.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleViewDetails = (userId, role) => {
    console.log('Viewing details for:', { userId, role }); 
    navigate(`/teacher-dashboard/${role}s/${userId}`);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="students-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          {activeTab === 'students' ? (
            <><FaUserGraduate className="me-2" />Students Management</>
          ) : (
            <><FaChalkboardTeacher className="me-2" />Teachers Management</>
          )}
        </h2>
        <InputGroup style={{ width: '300px' }}>
          <Form.Control
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary">
            <FaSearch />
          </Button>
        </InputGroup>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="students" title="Students">
          <Card>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Enrolled Courses</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.enrolledCourses?.length || 0}</td>
                      <td>
                        <Badge bg={student.status === 'active' ? 'success' : 'warning'}>
                          {student.status || 'active'}
                        </Badge>
                      </td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleViewDetails(student._id, 'student')}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="teachers" title="Teachers">
          <Card>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map(teacher => (
                    <tr key={teacher._id}>
                      <td>{teacher.name}</td>
                      <td>{teacher.email}</td>
                      <td>
                        <Badge bg={teacher.status === 'active' ? 'success' : 'warning'}>
                          {teacher.status || 'active'}
                        </Badge>
                      </td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleViewDetails(teacher._id, 'teacher')}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Students; 
