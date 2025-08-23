import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Admissions from "@/pages/Admissions";
import Gallery from "@/pages/Gallery";
import Announcements from "@/pages/Announcements";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import NotFound from "@/pages/not-found";

// Dashboards
import AdminDashboard from "@/dashboards/AdminDashboard";
import TeacherDashboard from "@/dashboards/TeacherDashboard";
import StudentDashboard from "@/dashboards/StudentDashboard";
import ParentDashboard from "@/dashboards/ParentDashboard";

// Components
import ProtectedRoute from "@/components/ProtectedRoute";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/admissions" component={Admissions} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/announcements" component={Announcements} />
      <Route path="/contact" component={Contact} />
      
      {/* Auth routes */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      
      {/* Protected dashboard routes */}
      <Route path="/dashboard/admin">
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/dashboard/teacher">
        <ProtectedRoute allowedRoles={["teacher"]}>
          <TeacherDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/dashboard/student">
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/dashboard/parent">
        <ProtectedRoute allowedRoles={["parent"]}>
          <ParentDashboard />
        </ProtectedRoute>
      </Route>
      
      {/* 404 fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
