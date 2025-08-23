import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Award, Calendar, FileText } from "lucide-react";
import { Link } from "wouter";

export default function StudentDashboard() {
  const { data: announcements = [] } = useQuery({
    queryKey: ["/api/announcements"],
  });

  const { data: exams = [] } = useQuery({
    queryKey: ["/api/exams"],
  });

  // Mock student-specific data
  const studentStats = {
    upcomingExams: 3,
    currentGPA: 3.85,
    completedAssignments: 92,
    attendanceRate: 95
  };

  // Filter announcements for students
  const studentAnnouncements = announcements.filter((announcement: any) => 
    announcement.audience.includes('all') || announcement.audience.includes('students')
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="student-dashboard">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your academic progress and stay updated with school activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Exams</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-exams">
                    {studentStats.upcomingExams}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current GPA</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-gpa">
                    {studentStats.currentGPA}
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-secondary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Assignments Done</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-assignments">
                    {studentStats.completedAssignments}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-accent-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-attendance">
                    {studentStats.attendanceRate}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 btn-primary" data-testid="view-exams-button">
                <BookOpen className="h-6 w-6" />
                <span>View Exams</span>
              </Button>
              
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 btn-secondary" data-testid="my-grades-button">
                <Award className="h-6 w-6" />
                <span>My Grades</span>
              </Button>

              <Link href="/announcements">
                <Button className="h-20 w-full flex flex-col items-center justify-center space-y-2 btn-accent" data-testid="announcements-button">
                  <FileText className="h-6 w-6" />
                  <span>Announcements</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Announcements</CardTitle>
              <Link href="/announcements">
                <Button variant="outline" size="sm" data-testid="view-all-announcements">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {studentAnnouncements.length > 0 ? (
              <div className="space-y-4">
                {studentAnnouncements.slice(0, 3).map((announcement: any) => (
                  <div key={announcement.id} className="border-l-4 border-l-primary-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {announcement.content.length > 100 
                        ? `${announcement.content.substring(0, 100)}...` 
                        : announcement.content
                      }
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No announcements for students</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Online Exams System</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Take your exams online with our comprehensive exam platform. 
                This feature will be available soon with automatic grading and instant results.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>✓</span>
                  <span>Secure online examination</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>✓</span>
                  <span>Instant results and feedback</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>✓</span>
                  <span>Progress tracking</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>✓</span>
                  <span>Performance analytics</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Mid-term Examinations</h4>
                  <p className="text-sm text-gray-600">Mathematics, English, Science</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">March 15-20, 2024</p>
                  <p className="text-xs text-gray-500">In 2 weeks</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Science Fair</h4>
                  <p className="text-sm text-gray-600">Annual science exhibition</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">April 5, 2024</p>
                  <p className="text-xs text-gray-500">In 1 month</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">End of Term</h4>
                  <p className="text-sm text-gray-600">Final examinations begin</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">June 10, 2024</p>
                  <p className="text-xs text-gray-500">In 3 months</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
