import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

// Course Allocation Module
const CourseAllocation = lazy(() => import('../pages/CourseAllocation.jsx'));
const CourseAllocate = lazy(() => import('../pages/CourseAllocate.jsx'));

// Programs & Courses Module
const ProgramsList = lazy(() => import('../pages/ProgramsList.jsx'));
const AddProgram = lazy(() => import('../pages/AddProgram.jsx'));
const ProgramCourses = lazy(() => import('../pages/ProgramCourses.jsx'));
const AddCourse = lazy(() => import('../pages/AddCourse.jsx'));

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* Redirect root to Course Allocation */}
        <Route index element={<Navigate to="/courses/allocate" replace />} />

        {/* Course Allocation Module - ACTIVE */}
        <Route path="courses/allocate" element={<CourseAllocation />} />
        <Route path="courses/allocate/assign" element={<CourseAllocate />} />

        {/* Programs & Courses Module - ACTIVE */}
        <Route path="programs" element={<ProgramsList />} />
        <Route path="programs/add" element={<AddProgram />} />
        <Route path="programs/edit/:id" element={<AddProgram />} />
        <Route path="programs/:programId/courses" element={<ProgramCourses />} />
        <Route path="programs/:programId/courses/add" element={<AddCourse />} />

        {/* All other routes redirect to Course Allocation */}
        <Route path="*" element={<Navigate to="/courses/allocate" replace />} />
      </Route>
    </Routes>
  );
}
