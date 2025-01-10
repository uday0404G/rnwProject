import React, { useEffect } from 'react';
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getAllUsers } from '../../Redux/TeacherReducer/action';
import { 
  FaUsers, 
  FaBook, 
  FaUserGraduate, 
  FaChalkboardTeacher,
  FaClock,
  FaCalendarAlt,
  FaEnvelope
} from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const { courses, users } = useSelector(state => state.teacher);

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllUsers());
  }, [dispatch]);

  // Function to get last 7 days dates
  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  // Function to format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get enrollment data for last 7 days
  const getEnrollmentData = () => {
    const last7Days = getLast7Days();
    
    return last7Days.map(date => {
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      // Count enrollments for this day across all courses
      return courses?.reduce((total, course) => {
        const enrollmentsToday = course.enrolledStudents?.filter(student => {
          const enrollDate = new Date(student.enrollmentDate);
          return enrollDate >= startOfDay && enrollDate <= endOfDay;
        })?.length || 0;
        return total + enrollmentsToday;
      }, 0) || 0;
    });
  };

  // Get course completion data
  const getCompletionData = () => {
    const last7Days = getLast7Days();
    
    return last7Days.map(date => {
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      // Count completions for this day across all courses
      return courses?.reduce((total, course) => {
        const completionsToday = course.completions?.filter(completion => {
          const completeDate = new Date(completion.date);
          return completeDate >= startOfDay && completeDate <= endOfDay;
        })?.length || 0;
        return total + completionsToday;
      }, 0) || 0;
    });
  };

  // Updated line chart data with real data
  const lineChartData = {
    labels: getLast7Days().map(date => formatDate(date)),
    datasets: [
      {
        label: 'New Enrollments',
        data: getEnrollmentData(),
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
      {
        label: 'Course Completions',
        data: getCompletionData(),
        fill: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4
      }
    ]
  };

  // Enhanced chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Course Activity - Last 7 Days',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + (
                context.dataset.label === 'New Enrollments' ? ' new students' : ' completions'
              );
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students',
          font: {
            weight: 'bold'
          }
        },
        ticks: {
          stepSize: 1,
          precision: 0
        }
      },
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            weight: 'bold'
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: 'white'
      }
    }
  };

  // Updated doughnut chart data and options
  const doughnutChartData = {
    labels: ['Beginner', 'Intermediate', 'Advanced'],
    datasets: [
      {
        data: [
          courses?.filter(c => c.level === 'beginner').length || 0,
          courses?.filter(c => c.level === 'intermediate').length || 0,
          courses?.filter(c => c.level === 'advanced').length || 0
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',   // Blue for Beginner
          'rgba(255, 206, 86, 0.8)',   // Yellow for Intermediate
          'rgba(75, 192, 192, 0.8)'    // Teal for Advanced
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
        hoverOffset: 4
      }
    ]
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Course Distribution by Level',
        font: {
          size: 16
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = total ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} courses (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%', // Makes the doughnut thinner
    radius: '90%'  // Makes the chart slightly bigger
  };

  // Recent activities (you can replace this with actual data)
  const recentActivities = [
    { type: 'enrollment', student: 'John Doe', course: 'React Basics', date: '2024-02-25' },
    { type: 'completion', student: 'Jane Smith', course: 'Node.js Advanced', date: '2024-02-24' },
    { type: 'enrollment', student: 'Mike Johnson', course: 'MongoDB Essentials', date: '2024-02-23' }
  ];

  return (
    <div className="dashboard-container">
      {/* Statistics Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Students</h6>
                  <h3>{users?.students?.length || 0}</h3>
                </div>
                <FaUserGraduate size={30} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Courses</h6>
                  <h3>{courses?.length || 0}</h3>
                </div>
                <FaBook size={30} className="text-success" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Active Students</h6>
                  <h3>{users?.students?.filter(s => s.status === 'active').length || 0}</h3>
                </div>
                <FaUsers size={30} className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
    <div>
                  <h6 className="text-muted">Total Teachers</h6>
                  <h3>{users?.teachers?.length || 0}</h3>
                </div>
                <FaChalkboardTeacher size={30} className="text-info" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="mb-4">
        <Col md={8}>
          <Card className="dashboard-card">
            <Card.Body>
              <h5 className="mb-4">Course Activity Trends</h5>
              <div style={{ height: '400px' }}> {/* Increased height for better visibility */}
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <div style={{ height: '400px', position: 'relative' }}>
                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                {/* Add center text showing total courses */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                  }}
                >
                  <h3 style={{ margin: 0, color: '#2c3e50' }}>{courses?.length || 0}</h3>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Courses</p>
                </div>
              </div>
              {/* Add statistics below the chart */}
              <div className="mt-3">
                <Row className="text-center g-2">
                  {[
                    {
                      label: 'Beginner',
                      count: courses?.filter(c => c.level === 'beginner').length || 0,
                      color: 'rgba(54, 162, 235, 0.8)'
                    },
                    {
                      label: 'Intermediate',
                      count: courses?.filter(c => c.level === 'intermediate').length || 0,
                      color: 'rgba(255, 206, 86, 0.8)'
                    },
                    {
                      label: 'Advanced',
                      count: courses?.filter(c => c.level === 'advanced').length || 0,
                      color: 'rgba(75, 192, 192, 0.8)'
                    }
                  ].map((item, index) => (
                    <Col key={index} xs={4}>
                      <div 
                        className="p-2 rounded" 
                        style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                      >
                        <div 
                          className="d-inline-block rounded-circle mb-1"
                          style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: item.color
                          }}
                        />
                        <div className="small text-muted">{item.label}</div>
                        <div className="fw-bold">{item.count}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities and Latest Courses */}
      <Row>
        <Col md={6}>
          <Card className="dashboard-card">
            <Card.Body>
              <h5 className="mb-4">Recent Activities</h5>
              <div className="activity-timeline">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-content">
                      <div className="d-flex justify-content-between">
                        <span>
                          <strong>{activity.student}</strong> {activity.type === 'enrollment' ? 'enrolled in' : 'completed'} <strong>{activity.course}</strong>
                        </span>
                        <small className="text-muted">
                          <FaClock className="me-1" />
                          {new Date(activity.date).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="dashboard-card">
            <Card.Body>
              <h5 className="mb-4">Latest Courses</h5>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Level</th>
                    <th>Students</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courses?.slice(0, 5).map(course => (
                    <tr key={course._id}>
                      <td>{course.title}</td>
                      <td>
                        <Badge bg="info">{course.level}</Badge>
                      </td>
                      <td>{course.enrolledStudents?.length || 0}</td>
                      <td>
                        <Badge bg={course.status === 'active' ? 'success' : 'warning'}>
                          {course.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherDashboard;
