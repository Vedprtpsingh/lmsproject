import { useState } from 'react';

export default function LecturerTopNavbar({ onToggleSidebar }) {
  const [query, setQuery] = useState('');

  const submit = (e) => {
    e.preventDefault();
    // Search is disabled for now - only Course Allocation module is active
    alert('Search is coming soon! Currently only Course Allocation module is available.');
  };

  return (
    <div id="top-navbar" className="py-1">
      <div className="container">
        <div className="nav-wrapper">
          <div className="toggle-btn" onClick={onToggleSidebar}>
            <i className="fas fa-bars"></i>
          </div>

          <form className="form-header" onSubmit={submit}>
            <input
              id="primary-search"
              className="form-control rounded-end-0"
              type="text"
              name="q"
              value={query}
              placeholder="Search All... #course, #program, #Quiz, #News, #Events"
              onChange={(e) => setQuery(e.target.value)}
              disabled
              style={{ opacity: 0.6 }}
            />
            <button className="btn btn-dark rounded-start-0" type="submit" disabled style={{ opacity: 0.6 }}>
              <i className="fas fa-search"></i>
            </button>
          </form>

          <div className="dropdown">
            <div
              className="avatar border border-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: 'pointer' }}
            >
              <img src="/assets/images/default.png" alt="User Avatar" />
            </div>
            <div className="dropdown-menu" style={{ minWidth: '14rem' }}>
              <div className="d-flex flex-column align-items-center">
                <div className="avatar avatar-md border">
                  <img src="/assets/images/default.png" alt="User Avatar" />
                </div>
                <p className="small text-muted text-center mb-0">Last login: June 12, 2026</p>
              </div>
              <hr />

              <a className="dropdown-item disabled" href="#" style={{ opacity: 0.5 }}>
                <i className="fas fa-user-tie me-2"></i>Admin Panel
                <span className="badge bg-secondary ms-2" style={{ fontSize: '0.6rem' }}>Soon</span>
              </a>

              <a className="dropdown-item disabled" href="#" style={{ opacity: 0.5 }}>
                <i className="fas fa-user me-2"></i>Profile
                <span className="badge bg-secondary ms-2" style={{ fontSize: '0.6rem' }}>Soon</span>
              </a>

              <a className="dropdown-item disabled" href="#" style={{ opacity: 0.5 }}>
                <i className="fas fa-cog me-2"></i>Setting
                <span className="badge bg-secondary ms-2" style={{ fontSize: '0.6rem' }}>Soon</span>
              </a>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => alert('Signout coming soon!')}>
                  <i className="fas fa-sign-out-alt"></i> Signout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
