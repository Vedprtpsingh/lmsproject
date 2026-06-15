import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { metadataApi, programCoursesApi } from '../services/api';

export default function AddCourse() {
  const navigate = useNavigate();
  const { programId } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: '',
    semester: '',
    type: 'Core',
    description: '',
    status: 'Active',
  });

  const [metadata, setMetadata] = useState({
    semesters: [],
    courseTypes: [],
    statuses: [],
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    metadataApi.getMetadata()
      .then((data) => setMetadata(data))
      .catch((err) => console.error('Failed to load metadata:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const requestData = {
        ...formData,
        credits: parseInt(formData.credits),
      };

      await programCoursesApi.create(programId, requestData);
      alert('Course added successfully!');
      navigate(`/programs/${programId}/courses`);
    } catch (err) {
      alert('Failed to add course. Please try again.');
      console.error('Error adding course:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="breadcrumb-enhanced">
        <nav style={{ '--bs-breadcrumb-divider': "'>';" }} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/courses/allocate">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/programs">Programs</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/programs/${programId}/courses`}>Courses</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Course
            </li>
          </ol>
        </nav>
      </div>

      <div className="page-title-enhanced">
        <i className="fas fa-book"></i>
        <h2>Add New Course to Program</h2>
      </div>

      <div className="form-card orange-header">
        <div className="card-header">
          <h5>
            <i className="fas fa-book-open"></i>
            Course Information
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-section-title">
              <i className="fas fa-info-circle"></i>
              Basic Details
            </div>

            <div className="form-row-enhanced two-col">
              <div className="form-group-enhanced">
                <label htmlFor="name" className="form-label-enhanced">
                  <i className="fas fa-book"></i>
                  Course Name
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control-enhanced"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Data Structures and Algorithms"
                  required
                />
                <div className="form-help-text">
                  <i className="fas fa-lightbulb"></i>
                  Enter the full name of the course
                </div>
              </div>

              <div className="form-group-enhanced">
                <label htmlFor="code" className="form-label-enhanced">
                  <i className="fas fa-code"></i>
                  Course Code
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control-enhanced"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., CS101"
                  required
                />
                <div className="form-help-text">
                  <i className="fas fa-lightbulb"></i>
                  Unique identifier for the course
                </div>
              </div>
            </div>

            <div className="form-section-title">
              <i className="fas fa-cog"></i>
              Course Configuration
            </div>

            <div className="form-row-enhanced">
              <div className="form-group-enhanced">
                <label htmlFor="credits" className="form-label-enhanced">
                  <i className="fas fa-star"></i>
                  Credits
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control-enhanced"
                  id="credits"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  placeholder="e.g., 3"
                  min="1"
                  max="10"
                  required
                />
              </div>

              <div className="form-group-enhanced">
                <label htmlFor="semester" className="form-label-enhanced">
                  <i className="fas fa-calendar-alt"></i>
                  Semester
                  <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select-enhanced"
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  {metadata.semesters.length > 0 ? (
                    metadata.semesters.map((semester) => (
                      <option key={semester} value={semester}>
                        {semester}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="1st Semester">1st Semester</option>
                      <option value="2nd Semester">2nd Semester</option>
                      <option value="3rd Semester">3rd Semester</option>
                      <option value="4th Semester">4th Semester</option>
                      <option value="5th Semester">5th Semester</option>
                      <option value="6th Semester">6th Semester</option>
                      <option value="7th Semester">7th Semester</option>
                      <option value="8th Semester">8th Semester</option>
                    </>
                  )}
                </select>
              </div>

              <div className="form-group-enhanced">
                <label htmlFor="type" className="form-label-enhanced">
                  <i className="fas fa-tags"></i>
                  Course Type
                  <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select-enhanced"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  {metadata.courseTypes.length > 0 ? (
                    metadata.courseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Core">Core</option>
                      <option value="Elective">Elective</option>
                      <option value="Optional">Optional</option>
                      <option value="Lab">Lab</option>
                      <option value="Project">Project</option>
                    </>
                  )}
                </select>
              </div>

              <div className="form-group-enhanced">
                <label htmlFor="status" className="form-label-enhanced">
                  <i className="fas fa-toggle-on"></i>
                  Status
                  <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select-enhanced"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  {metadata.statuses.length > 0 ? (
                    metadata.statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="form-group-enhanced">
              <label htmlFor="description" className="form-label-enhanced">
                <i className="fas fa-align-left"></i>
                Course Description
              </label>
              <textarea
                className="form-textarea-enhanced"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a detailed description of the course..."
              ></textarea>
              <div className="form-help-text">
                <i className="fas fa-lightbulb"></i>
                Provide information about course objectives, topics, and learning outcomes
              </div>
            </div>

            <div className="btn-group-enhanced">
              <button type="submit" className="btn-enhanced btn-primary-enhanced" disabled={submitting}>
                <i className="fas fa-save"></i>
                {submitting ? 'Saving...' : 'Save Course'}
              </button>
              <Link to={`/programs/${programId}/courses`} className="btn-enhanced btn-secondary-enhanced">
                <i className="fas fa-times"></i>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
