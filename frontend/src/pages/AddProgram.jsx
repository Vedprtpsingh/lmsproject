import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { programsApi, metadataApi } from '../services/api';

export default function AddProgram() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    level: '',
    duration: '',
    description: '',
    status: 'Active',
    center: '',
    department: '',
  });

  const [metadata, setMetadata] = useState({
    programLevels: [],
    centers: [],
    departments: [],
    statuses: [],
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMetadata();
    if (isEditing) {
      fetchProgram();
    }
  }, [id]);

  const fetchMetadata = async () => {
    try {
      const data = await metadataApi.getMetadata();
      setMetadata(data);
    } catch (err) {
      console.error('Failed to load metadata:', err);
    }
  };

  const fetchProgram = async () => {
    try {
      setLoading(true);
      const data = await programsApi.getById(id);
      setFormData({
        name: data.name,
        code: data.code,
        level: data.level,
        duration: data.duration,
        description: data.description || '',
        status: data.status,
        center: data.center || '',
        department: data.department || '',
      });
    } catch (err) {
      alert('Failed to load program');
      console.error('Error fetching program:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      if (isEditing) {
        await programsApi.update(id, formData);
        alert('Program updated successfully!');
      } else {
        await programsApi.create(formData);
        alert('Program added successfully!');
      }

      navigate('/programs');
    } catch (err) {
      alert(`Failed to ${isEditing ? 'update' : 'add'} program. Please try again.`);
      console.error('Error saving program:', err);
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
              <Link to="/programs">Programs</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {isEditing ? 'Edit Program' : 'Add Program'}
            </li>
          </ol>
        </nav>
      </div>

      <div className="page-title-enhanced">
        <i className="fas fa-graduation-cap"></i>
        <h2>{isEditing ? 'Edit Program' : 'Add New Program'}</h2>
      </div>

      <div className="form-card primary-header">
        <div className="card-header">
          <h5>
            <i className="fas fa-edit"></i>
            Program Information
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-section-title">
              <i className="fas fa-info-circle"></i>
              Basic Information
            </div>

            <div className="form-row-enhanced two-col">
              <div className="form-group-enhanced">
                <label htmlFor="name" className="form-label-enhanced">
                  <i className="fas fa-graduation-cap"></i>
                  Program Name
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control-enhanced"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science"
                  required
                />
                <div className="form-help-text">
                  <i className="fas fa-lightbulb"></i>
                  Enter the full name of the academic program
                </div>
              </div>

              <div className="form-group-enhanced">
                <label htmlFor="code" className="form-label-enhanced">
                  <i className="fas fa-code"></i>
                  Program Code
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control-enhanced"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., CS"
                  required
                />
                <div className="form-help-text">
                  <i className="fas fa-lightbulb"></i>
                  Short unique code for the program
                </div>
              </div>
            </div>

            <div className="form-section-title">
              <i className="fas fa-cog"></i>
              Program Details
            </div>

            <div className="form-row-enhanced three-col">
              <div className="form-group-enhanced">
                <label htmlFor="level" className="form-label-enhanced">
                  <i className="fas fa-layer-group"></i>
                  Level
                  <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select-enhanced"
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select program type...</option>
                  {metadata.programLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-enhanced">
                <label htmlFor="duration" className="form-label-enhanced">
                  <i className="fas fa-clock"></i>
                  Duration
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control-enhanced"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 6 Months, 1 Year"
                  required
                />
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

            <div className="form-row-enhanced two-col">
              <div className="form-group-enhanced">
                <label htmlFor="center" className="form-label-enhanced">
                  <i className="fas fa-building"></i>
                  C-DAC Center
                </label>
                <select
                  className="form-select-enhanced"
                  id="center"
                  name="center"
                  value={formData.center}
                  onChange={handleChange}
                >
                  <option value="">Select center...</option>
                  {metadata.centers.map((center) => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
                <div className="form-help-text">
                  <i className="fas fa-lightbulb"></i>
                  Select the C-DAC center offering this program
                </div>
              </div>

              <div className="form-group-enhanced">
                <label htmlFor="department" className="form-label-enhanced">
                  <i className="fas fa-sitemap"></i>
                  Department
                </label>
                <select
                  className="form-select-enhanced"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select department...</option>
                  {metadata.departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
                <div className="form-help-text">
                  <i className="fas fa-lightbulb"></i>
                  Select the department managing this program
                </div>
              </div>
            </div>

            <div className="form-group-enhanced">
              <label htmlFor="description" className="form-label-enhanced">
                <i className="fas fa-align-left"></i>
                Description
              </label>
              <textarea
                className="form-textarea-enhanced"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a detailed description of the program..."
              ></textarea>
              <div className="form-help-text">
                <i className="fas fa-lightbulb"></i>
                Provide information about the program objectives, curriculum, and career prospects
              </div>
            </div>

            <div className="btn-group-enhanced">
              <button type="submit" className="btn-enhanced btn-primary-enhanced" disabled={submitting}>
                <i className="fas fa-save"></i>
                {submitting ? 'Saving...' : isEditing ? 'Update Program' : 'Save Program'}
              </button>
              <Link to="/programs" className="btn-enhanced btn-secondary-enhanced">
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
