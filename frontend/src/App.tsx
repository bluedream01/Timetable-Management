import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Login } from "./pages/Login";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { AdminDashboard } from "./pages/AdminDashboard";
import { StudentDashboard } from "./pages/StudentDashboard";
import { TeacherDashboard } from "./pages/TeacherDashboard";
import { InputData } from "./pages/InputData";
import { GenerateTimetable } from "./pages/GenerateTimetable";
import { ViewTimetables } from "./pages/ViewTimetables";
import { ChapterManagement } from "./pages/ChapterManagement";
import { Notifications } from "./pages/Notifications";
import { Settings } from "./pages/Settings";
import { ManageUsers } from "./pages/ManageUsers";
import { MyTimetable } from "./pages/MyTimetable";
import { StudyMaterials } from "./pages/StudyMaterials";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              
              <Route element={
                <ProtectedRoute>
                  <ProtectedLayout />
                </ProtectedRoute>
              }>
                <Route path="/dashboard" element={<DashboardRouter />} />
                <Route path="/input-data" element={<InputData />} />
                <Route path="/generate-timetable" element={<GenerateTimetable />} />
                <Route path="/view-timetables" element={<ViewTimetables />} />
                <Route path="/chapter-management" element={<ChapterManagement />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/my-timetable" element={<MyTimetable />} />
                <Route path="/study-materials" element={<StudyMaterials />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;