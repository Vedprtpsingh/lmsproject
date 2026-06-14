import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseAllocationApi } from '../services/api';

export default function CourseAllocation() {
  const [filters, setFilters] = useState({ lecturer: '', course: '' });
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    try {
      setLoading(true);
      const data = await courseAllocationApi.getAll();
      setAllocations(data);
      setError(null);
    } catch (err) {
      setError('Failed to load allocations. Please make sure the backend is running.');
      console.error('Error fetching allocations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Filtering is done client-side below
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this allocation?')) {
      try {
        await courseAllocationApi.delete(id);
        setAllocations(allocations.filter((allocation) => allocation.id !== id));
        alert('Allocation deleted successfully!');
      } catch (err) {
        alert('Failed to delete allocation');
        console.error('Error deleting allocation:', err);
      }
    }
  };

  const filteredAllocations = allocations.filter((allocation) => {
    const matchesLecturer = filters.lecturer
      ? allocation.lecturerName.toLowerCase().includes(filters.lecturer.toLowerCase())
      : true;
    const matchesCourse = filters.course
      ? allocation.courses.some((course) =>
          course.toLowerCase().includes(filters.course.toLowerCase())
        )
      : true;
    return matchesLecturer && matchesCourse;
  });

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
          <li className="breadcrumb-item active" aria-current="page">
            Allocation list
          </li>
        </ol>
      </nav>

      <div className="manage-wrap">
        <Link className="btn btn-primary" to="/courses/allocate/assign">
          <i className="fas fa-plus"></i> Allocate Now
        </Link>
      </div>

      <div className="title-1">
        <i className="fas fa-tasks"></i>
        Course Allocations
      </div>
      <br />
      <br />

      {error && (
        <div className="alert alert-warning" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <form onSubmit={handleFilterSubmit}>
        <div className="d-flex flex-wrap align-items-center">
          <div className="mb-2 me-2">
            <input
              type="text"
              name="lecturer"
              className="au-input"
              placeholder="Lecturer"
              id="id_lecturer"
              value={filters.lecturer}
              onChange={handleFilterChange}
            />
          </div>

          <div className="mb-2 me-2">
            <input
              type="text"
              name="course"
              className="au-input"
              placeholder="Course"
              id="id_course"
              value={filters.course}
              onChange={handleFilterChange}
            />
          </div>

          <button className="btn btn-sm btn-primary mb-2 me-2" type="submit">
            <i className="fa fa-sliders me-2"></i> Filter
          </button>

          <button
            className="btn btn-sm btn-secondary mb-2"
            type="button"
            onClick={() => setFilters({ lecturer: '', course: '' })}
          >
            <i className="fas fa-redo me-2"></i> Reset
          </button>
        </div>
      </form>

      <div className="table-responsive table-shadow p-0 mt-4">
        <table className="table table-light table-striped mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Lecturer</th>
              <th>Courses</th>
              <th>Session</th>
              <th>Batch</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAllocations.length > 0 ? (
              filteredAllocations.map((allocation, index) => (
                <tr key={allocation.id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{allocation.lecturerName}</strong>
                  </td>
                  <td>
                    <ul className="mb-0 ps-3">
                      {allocation.courses.map((course, idx) => (
                        <li key={idx} className="small">
                          {course}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {allocation.session}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-secondary">{allocation.batch}</span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-sm btn-warning"
                        title="Edit"
                        onClick={() => alert('Edit functionality - Coming soon!')}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        title="Delete"
                        onClick={() => handleDelete(allocation.id)}
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
                <td colSpan="6" className="text-center py-4">
                  <span className="text-danger">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {filters.lecturer || filters.course
                      ? 'No allocations found matching your filters.'
                      : 'No Course Allocated.'}
                    {' '}
                    <Link to="/courses/allocate/assign">
                      <i className="fas fa-plus-circle" style={{ fontSize: '22px' }}>
                        {' '}Allocate now
                      </i>
                    </Link>
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredAllocations.length > 0 && (
        <div className="mt-3">
          <p className="text-muted">
            <i className="fas fa-info-circle me-2"></i>
            Showing {filteredAllocations.length} of {allocations.length} allocations
          </p>
        </div>
      )}
    </>
  );
}
