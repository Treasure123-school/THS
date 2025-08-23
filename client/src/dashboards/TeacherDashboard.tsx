import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, FileText, Clock, PlusCircle } from "lucide-react";
import { Link } from "wouter";

export default function TeacherDashboard() {
  const { data: announcements = [] } = useQuery({
    queryKey: ["/api/announcements"],
  });

  const { data: exams = [] } = useQuery({
    queryKey: ["/api/exams"],
  });

  // Mock teacher-specific data
  const teacherStats = {
    myClasses: 5,
    myStudents: 150,
    pendingGrades: 8,
    upcomingExams: exams.length
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="teacher-dashboard">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your classes, create exams, and track student progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My Classes</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-classes">
                    {teacherStats.myClasses}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My Students</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-students">
                    {teacherStats.myStudents}
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Grades</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-pending">
                    {teacherStats.pendingGrades}
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
                  <p className="text-sm font-medium text-gray-600">Upcoming Exams</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-exams">
                    {teacherStats.upcomingExams}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
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
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 btn-primary" data-testid="create-exam-button">
                <PlusCircle className="h-6 w-6" />
                <span>Create Exam</span>
              </Button>
              
              <Link href="/announcements">
                <Button className="h-20 w-full flex flex-col items-center justify-center space-y-2 btn-secondary" data-testid="post-announcement-button">
                  <FileText className="h-6 w-6" />
                  <span>Post Announcement</span>
                </Button>
              </Link>

              <Button className="h-20 flex flex-col items-center justify-center space-y-2 btn-accent" data-testid="question-bank-button">
                <BookOpen className="h-6 w-6" />
                <span>Question Bank</span>
              </Button>
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
            {announcements.length > 0 ? (
              <div className="space-y-4">
                {announcements.slice(0, 3).map((announcement: any) => (
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
                <p>No announcements yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exam System Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Exam System (Coming Soon)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Exam Builder</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Create comprehensive exams with multiple question types, automatic grading, 
                and detailed analytics. This feature will be available soon.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>✓</span>
                  <span>Multiple choice questions</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>✓</span>
                  <span>Short answer questions</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>✓</span>
                  <span>Automatic grading</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>✓</span>
                  <span>Question bank management</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
