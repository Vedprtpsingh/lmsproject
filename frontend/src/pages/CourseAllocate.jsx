import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courseAllocationApi } from '../services/api';

export default function CourseAllocate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lecturerId: '',
    courses: [],
    session: '',
    batch: '',
  });

  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Available courses - can be loaded from backend later
  const availableCourses = [
    { code: 'CS101', name: 'Data Structures' },
    { code: 'CS201', name: 'Database Management' },
    { code: 'CS301', name: 'Web Development' },
    { code: 'CS401', name: 'Machine Learning' },
    { code: 'CS501', name: 'Software Engineering' },
  ];

  const sessions = ['2024-2025', '2025-2026', '2026-2027'];
  const batches = ['February Batch', 'August Batch', 'September Batch'];

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const data = await courseAllocationApi.getLecturers();
      setLecturers(data);
    } catch (err) {
      alert('Failed to load lecturers. Please make sure the backend is running.');
      console.error('Error fetching lecturers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseSelection = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData({ ...formData, courses: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.lecturerId || formData.courses.length === 0) {
      alert('Please select lecturer and at least one course');
      return;
    }

    try {
      setSubmitting(true);

      // Prepare data for backend
      const coursesList = formData.courses.map((courseId) => {
        const course = availableCourses.find((c) => c.code === courseId);
        return {
          courseCode: course.code,
          courseName: course.name,
        };
      });

      const requestData = {
        lecturerId: parseInt(formData.lecturerId),
        courses: coursesList,
        session: formData.session,
        batch: formData.batch,
      };

      await courseAllocationApi.create(requestData);
      alert('Course allocation saved successfully!');
      navigate('/courses/allocate');
    } catch (err) {
      alert('Failed to save allocation. Please try again.');
      console.error('Error saving allocation:', err);
    } finally {
      setSubmitting(false);
    }
  };

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
      <div className="breadcrumb-enhanced">
        <nav style={{ '--bs-breadcrumb-divider': "'>';" }} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/courses/allocate">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/courses/allocate">Course Allocations</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Allocate Course
            </li>
          </ol>
        </nav>
      </div>

      <div className="page-title-enhanced">
        <i className="fas fa-user-graduate"></i>
        <h2>Allocate Course to Lecturer</h2>
      </div>

      <div className="form-card success-header">
        <div className="card-header">
          <h5>
            <i className="fas fa-chalkboard-teacher"></i>
            Course Allocation Form
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-section-title">
              <i className="fas fa-user-tie"></i>
              Lecturer & Session Information
            </div>

            <div className="form-row-enhanced two-col">
              <div className="form-group-enhanced">
                <label htmlFor="lecturerId" className="form-label-enhanced">
                  <i className="fas fa-chalkboard-teacher"></i>
                  Select Lecturer
                  <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select-enhanced"
                  id="lecturerId"
                  name="lecturerId"
                  value={formData.lecturerId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose lecturer...</option>
                  {lecturers.map((lecturer) => (
                    <option key={lecturer.id} value={lecturer.id}>
                      {lecturer.name} - {lecturer.department}
                    </option>
                  ))}
                </select>
                <div className="form-help-text">
                  <i className="fas fa-lightbulb"></i>
                  Select the lecturer who will teach these courses
                </div>
              </div>

              <div className="form-group-enhanced">
                <label htmlFor="session" className="form-label-enhanced">
                  <i className="fas fa-calendar-alt"></i>
                  Academic Session
                  <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select-enhanced"
                  id="session"
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose session...</option>
                  {sessions.map((session) => (
                    <option key={session} value={session}>
                      {session}
                    </option>
                  ))}
                </select>
                <div className="form-help-text">
                  <i className="fas fa-lightbulb"></i>
                  Select the academic year for this allocation
                </div>
              </div>
            </div>

            <div className="form-section-title">
              <i className="fas fa-book"></i>
              Course Selection
            </div>

            <div className="form-row-enhanced two-col">
              <div className="form-group-enhanced">
                <label htmlFor="courses" className="form-label-enhanced">
                  <i className="fas fa-list-ul"></i>
                  Select Courses
                  <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select-enhanced"
                  id="courses"
                  name="courses"
                  multiple
                  size="6"
                  onChange={handleCourseSelection}
                  required
                  style={{ minHeight: '180px' }}
                >
                  {availableCourses.map((course) => (
                    <option key={course.code} value={course.code}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>
                <div className="form-help-text">
                  <i className="fas fa-info-circle"></i>
                  Hold Ctrl (Windows) or Cmd (Mac) to select multiple courses
                </div>
              </div>

              <div className="form-group-enhanced">
                <label htmlFor="batch" className="form-label-enhanced">
                  <i className="fas fa-users"></i>
                  Batch
                  <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select-enhanced"
                  id="batch"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose batch...</option>
                  {batches.map((batch) => (
                    <option key={batch} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>
                <div className="form-help-text">
                  <i className="fas fa-lightbulb"></i>
                  C-DAC batches: February, August, September
                </div>

                <div className="info-box-enhanced mt-3">
                  <h6>
                    <i className="fas fa-clipboard-list"></i>
                    Selected Courses
                  </h6>
                  {formData.courses.length > 0 ? (
                    <ul>
                      {formData.courses.map((courseCode) => {
                        const course = availableCourses.find(
                          (c) => c.code === courseCode
                        );
                        return (
                          <li key={courseCode}>
                            <strong>{course?.code}</strong> - {course?.name}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-muted mb-0" style={{ paddingLeft: '1.5rem' }}>
                      <i className="fas fa-info-circle me-2"></i>
                      No courses selected yet
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="btn-group-enhanced">
              <button type="submit" className="btn-enhanced btn-success-enhanced" disabled={submitting}>
                <i className="fas fa-check-circle"></i>
                {submitting ? 'Saving...' : 'Save Allocation'}
              </button>
              <Link to="/courses/allocate" className="btn-enhanced btn-secondary-enhanced">
                <i className="fas fa-times"></i>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="info-box-enhanced">
        <h6>
          <i className="fas fa-info-circle"></i>
          Instructions
        </h6>
        <ul>
          <li>Select a lecturer from the dropdown menu</li>
          <li>Choose the academic session and semester</li>
          <li>Select one or more courses to allocate to the lecturer</li>
          <li>Review your selection in the "Selected Courses" box</li>
          <li>Click "Save Allocation" to confirm the assignment</li>
        </ul>
      </div>
    </>
  );
}
