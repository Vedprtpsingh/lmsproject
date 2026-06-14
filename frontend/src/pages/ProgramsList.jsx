import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { programsApi } from '../services/api';

export default function ProgramsList() {
  const [filters, setFilters] = useState({ program: '', level: '' });
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const data = await programsApi.getAll();
      setPrograms(data);
      setError(null);
    } catch (err) {
      setError('Failed to load programs. Please make sure the backend is running.');
      console.error('Error fetching programs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await programsApi.delete(id);
        setPrograms(programs.filter((program) => program.id !== id));
        alert('Program deleted successfully!');
      } catch (err) {
        alert('Failed to delete program');
        console.error('Error deleting program:', err);
      }
    }
  };

  const filteredPrograms = programs.filter((program) => {
    const matchesProgram = filters.program
      ? program.name.toLowerCase().includes(filters.program.toLowerCase()) ||
        program.code.toLowerCase().includes(filters.program.toLowerCase())
      : true;
    const matchesLevel = filters.level ? program.level === filters.level : true;
    return matchesProgram && matchesLevel;
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
            Programs
          </li>
        </ol>
      </nav>

      <div className="manage-wrap">
        <Link className="btn btn-primary" to="/programs/add">
          <i className="fas fa-plus"></i> Add Program
        </Link>
      </div>

      <div className="title-1">
        <i className="fas fa-graduation-cap"></i>
        Programs
      </div>
      <br />
      <br />

      {error && (
        <div className="alert alert-warning" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="d-flex flex-wrap align-items-center">
          <div className="mb-2 me-2">
            <input
              type="text"
              name="program"
              className="au-input"
              placeholder="Search Program"
              value={filters.program}
              onChange={handleFilterChange}
            />
          </div>

          <div className="mb-2 me-2">
            <select
              name="level"
              className="au-input"
              value={filters.level}
              onChange={handleFilterChange}
              style={{ minWidth: '150px' }}
            >
              <option value="">All Levels</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>

          <button
            className="btn btn-sm btn-secondary mb-2"
            type="button"
            onClick={() => setFilters({ program: '', level: '' })}
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
              <th>Program Name</th>
              <th>Code</th>
              <th>Level</th>
              <th>Duration</th>
              <th>Courses</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program, index) => (
                <tr key={program.id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{program.name}</strong>
                  </td>
                  <td>
                    <span className="badge bg-primary">{program.code}</span>
                  </td>
                  <td>{program.level}</td>
                  <td>{program.duration}</td>
                  <td>
                    <Link to={`/programs/${program.id}/courses`} className="text-decoration-none">
                      <span className="badge bg-info text-dark">
                        {program.coursesCount || 0} courses
                      </span>
                    </Link>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        program.status === 'Active' ? 'bg-success' : 'bg-secondary'
                      }`}
                    >
                      {program.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link
                        to={`/programs/edit/${program.id}`}
                        className="btn btn-sm btn-warning"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        title="Delete"
                        onClick={() => handleDelete(program.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <Link
                        to={`/programs/${program.id}/courses`}
                        className="btn btn-sm btn-info"
                        title="View Courses"
                      >
                        <i className="fas fa-book"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  <span className="text-danger">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    No programs found.{' '}
                    <Link to="/programs/add">
                      <i className="fas fa-plus-circle"> Add now</i>
                    </Link>
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredPrograms.length > 0 && (
        <div className="mt-3">
          <p className="text-muted">
            <i className="fas fa-info-circle me-2"></i>
            Showing {filteredPrograms.length} of {programs.length} programs
          </p>
        </div>
      )}
    </>
  );
}
