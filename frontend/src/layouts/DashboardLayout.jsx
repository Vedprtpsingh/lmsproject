import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Toast from '../components/Toast.jsx';
import LecturerSidebar from '../components/LecturerSidebar.jsx';
import LecturerTopNavbar from '../components/LecturerTopNavbar.jsx';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return <div className="app-shell">
    <LecturerSidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
    <main className="content-area" id="main">
      <LecturerTopNavbar onToggleSidebar={() => setSidebarOpen(open => !open)} />
      <div className="container-fluid" id="main-content"><Outlet /></div>
      <Toast />
    </main>
  </div>;
}
