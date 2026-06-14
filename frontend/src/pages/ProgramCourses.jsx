import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { programCoursesApi, programsApi } from '../services/api';

export default function ProgramCourses() {
  const { programId } = useParams();

  const [program, setProgram] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [programId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [programData, coursesData] = await Promise.all([
        programsApi.getById(programId),
        programCoursesApi.getByProgramId(programId),
      ]);
      setProgram(programData);
      setCourses(coursesData);
    } catch (err) {
      alert('Failed to load data. Please make sure the backend is running.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to remove this course from the program?')) {
      try {
        await programCoursesApi.delete(programId, courseId);
        setCourses(courses.filter((course) => course.id !== courseId));
        alert('Course removed successfully!');
      } catch (err) {
        alert('Failed to remove course');
        console.error('Error deleting course:', err);
      }
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(filter.toLowerCase()) ||
      course.code.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <nav style={{ '--bs-breadcrumb-divider': "'>';" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/courses/allocate">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/programs">Programs</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {program?.name} - Courses
          </li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="title-1">
          <i className="fas fa-book-open"></i>
          {program?.name} ({program?.code}) - Courses
        </div>
      </div>

      <div className="manage-wrap">
        <Link className="btn btn-primary" to={`/programs/${programId}/courses/add`}>
          <i className="fas fa-plus"></i> Add Course
        </Link>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="au-input w-100"
            placeholder="Search courses..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive table-shadow p-0 mt-4">
        <table className="table table-light table-striped mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Code</th>
              <th>Credits</th>
              <th>Semester</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <tr key={course.id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{course.name}</strong>
                  </td>
                  <td>
                    <span className="badge bg-primary">{course.code}</span>
                  </td>
                  <td>{course.credits} credits</td>
                  <td>{course.semester}</td>
                  <td>
                    <span
                      className={`badge ${
                        course.type === 'Core' ? 'bg-success' : 'bg-info text-dark'
                      }`}
                    >
                      {course.type}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        course.status === 'Active' ? 'bg-success' : 'bg-secondary'
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-sm btn-warning"
                        title="Edit"
                        onClick={() => alert('Edit course - Coming soon!')}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        title="Delete"
                        onClick={() => handleDelete(course.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-info"
                        title="View Details"
                        onClick={() => alert('View details - Coming soon!')}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  <span className="text-danger">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    No courses found.{' '}
                    <Link to={`/programs/${programId}/courses/add`}>
                      <i className="fas fa-plus-circle"> Add now</i>
                    </Link>
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredCourses.length > 0 && (
        <div className="mt-3">
          <p className="text-muted">
            <i className="fas fa-info-circle me-2"></i>
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>
      )}
    </>
  );
}
