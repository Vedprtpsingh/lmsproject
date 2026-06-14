import { Link, useLocation } from 'react-router-dom';

const mainNavItems = [
  { to: '#', icon: 'fas fa-tachometer-alt', label: 'Dashboard', disabled: true },
  { to: '#', icon: 'fas fa-home', label: 'Home', disabled: true },
  { to: '#', icon: 'fas fa-user', label: 'Profile', disabled: true },
  { to: '#', icon: 'fas fa-user-tie', label: 'Admin Panel', disabled: true },
  { to: '#', icon: 'fas fa-chalkboard-teacher', label: 'Lecturers', disabled: true },
  { to: '#', icon: 'fas fa-user-graduate', label: 'Students', disabled: true },
  { to: '/programs', icon: 'fas fa-book-open', label: 'Programs & Courses', activeOn: ['/programs'], disabled: false },
  { to: '#', icon: 'fas fa-check-double', label: 'Complete Exams', disabled: true },
  { to: '#', icon: 'fas fa-record-vinyl', label: 'Quiz Progress Rec', disabled: true },
  { to: '/courses/allocate', icon: 'fas fa-tasks', label: 'Course Allocation', activeOn: ['/courses/allocate'], disabled: false },
  { to: '#', icon: 'fas fa-calendar-week', label: 'Manage Session', disabled: true },
  { to: '#', icon: 'fas fa-calendar-alt', label: 'Manage Semester', disabled: true },
];

const secondaryNavItems = [
  { to: '#', icon: 'fas fa-cogs', label: 'Account Setting', disabled: true },
  { to: '#', icon: 'fas fa-key', label: 'Change Password', disabled: true },
];

function isItemActive(item, pathname) {
  if (item.disabled) return false;
  return item.activeOn?.some(path => {
    if (path === '/courses/allocate') return pathname === '/courses/allocate' || pathname.startsWith('/courses/allocate/');
    if (path === '/programs') return pathname === '/programs' || pathname.startsWith('/programs/');
    return path === pathname || pathname.startsWith(`${path}/`);
  });
}

function SidebarLink({ item, pathname, onNavigate }) {
  const isActive = isItemActive(item, pathname);

  if (item.disabled) {
    return (
      <li className={isActive ? 'active' : ''} style={{ opacity: 0.5, cursor: 'not-allowed' }}>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ pointerEvents: 'none' }}>
          <i className={item.icon} />
          {item.label}
          <span className="badge bg-secondary ms-2" style={{ fontSize: '0.65rem' }}>Soon</span>
        </a>
      </li>
    );
  }

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={item.to} onClick={onNavigate}>
        <i className={item.icon} />
        {item.label}
      </Link>
    </li>
  );
}

export default function LecturerSidebar({ open, onNavigate }) {
  const { pathname } = useLocation();

  return (
    <>
      <aside id="side-nav" className={open ? 'show' : ''}>
        <div className="main-menu">
          <div className="top-side text-center py-4">
            <div className="desktop-hide">
              <div className="toggle-btn" onClick={onNavigate}>
                <i className="fas fa-times"></i>
              </div>
            </div>
            <Link to="/courses/allocate" onClick={onNavigate} style={{ textDecoration: 'none' }}>
              <div className="logo-mark" style={{ margin: '0 auto 1rem' }}>
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="brand-title">C-DAC Bangalore</div>
              <div className="role-pill" style={{ marginTop: '0.5rem' }}>
                Learning Management System
              </div>
            </Link>
          </div>

          <ul>
            {mainNavItems.map((item) => (
              <SidebarLink
                key={`${item.label}-${item.to}`}
                item={item}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            ))}
          </ul>

          <br />
          <p className="ml-3" style={{ paddingLeft: '1rem', color: '#999' }}>→ Others</p>

          <ul>
            {secondaryNavItems.map((item) => (
              <SidebarLink
                key={item.label}
                item={item}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>

        <footer className="card-footer mt-5 pt-3 pb-5 px-2">
          <div className="col-12">
            <form action="" method="post" id="lang-form">
              <select className="small" name="language" id="lang-select" defaultValue="en">
                <option value="en">English (en)</option>
                <option value="fr">français (fr)</option>
                <option value="es">español (es)</option>
                <option value="ru">Русский (ru)</option>
              </select>
            </form>

            <p className="small m-0 text-center">
              <strong>C-DAC Bangalore</strong>
              <br />
              Centre for Development of
              <br />
              Advanced Computing
              <br />
              <small className="text-muted">© 2024 C-DAC</small>
            </p>
          </div>
        </footer>
      </aside>
      {open && (
        <div
          className="sidebar-backdrop"
          onClick={onNavigate}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        />
      )}
    </>
  );
}
