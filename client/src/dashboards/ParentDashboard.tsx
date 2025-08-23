import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Calendar, MessageSquare, FileText, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function ParentDashboard() {
  const { data: announcements = [] } = useQuery({
    queryKey: ["/api/announcements"],
  });

  // Mock parent-specific data
  const parentStats = {
    totalChildren: 2,
    upcomingEvents: 4,
    unreadMessages: 3,
    paymentsDue: 1
  };

  // Filter announcements for parents
  const parentAnnouncements = announcements.filter((announcement: any) => 
    announcement.audience.includes('all') || announcement.audience.includes('parents')
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="parent-dashboard">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your children's academic progress and stay connected with the school</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My Children</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-children">
                    {parentStats.totalChildren}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-events">
                    {parentStats.upcomingEvents}
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-secondary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-messages">
                    {parentStats.unreadMessages}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-accent-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Payments Due</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-payments">
                    {parentStats.paymentsDue}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-600" />
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
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 btn-primary" data-testid="view-progress-button">
                <TrendingUp className="h-6 w-6" />
                <span>View Progress</span>
              </Button>
              
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 btn-secondary" data-testid="contact-teachers-button">
                <MessageSquare className="h-6 w-6" />
                <span>Contact Teachers</span>
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

        {/* Children's Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Children</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Chioma Nwankwo</h3>
                    <p className="text-sm text-gray-600">Grade 6 • Student ID: STU001</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-secondary-600">Overall Grade: A</p>
                    <p className="text-xs text-gray-500">Attendance: 95%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-primary-50 rounded-lg">
                    <p className="text-sm text-gray-600">Mathematics</p>
                    <p className="text-xl font-bold text-primary-600">85%</p>
                  </div>
                  <div className="text-center p-3 bg-secondary-50 rounded-lg">
                    <p className="text-sm text-gray-600">English</p>
                    <p className="text-xl font-bold text-secondary-600">92%</p>
                  </div>
                  <div className="text-center p-3 bg-accent-50 rounded-lg">
                    <p className="text-sm text-gray-600">Science</p>
                    <p className="text-xl font-bold text-accent-600">88%</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Emmanuel Nwankwo</h3>
                    <p className="text-sm text-gray-600">Grade 3 • Student ID: STU002</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-secondary-600">Overall Grade: B+</p>
                    <p className="text-xs text-gray-500">Attendance: 98%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-primary-50 rounded-lg">
                    <p className="text-sm text-gray-600">Mathematics</p>
                    <p className="text-xl font-bold text-primary-600">78%</p>
                  </div>
                  <div className="text-center p-3 bg-secondary-50 rounded-lg">
                    <p className="text-sm text-gray-600">English</p>
                    <p className="text-xl font-bold text-secondary-600">82%</p>
                  </div>
                  <div className="text-center p-3 bg-accent-50 rounded-lg">
                    <p className="text-sm text-gray-600">Science</p>
                    <p className="text-xl font-bold text-accent-600">85%</p>
                  </div>
                </div>
              </div>
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
            {parentAnnouncements.length > 0 ? (
              <div className="space-y-4">
                {parentAnnouncements.slice(0, 3).map((announcement: any) => (
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
                <p>No announcements for parents</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming School Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Parent-Teacher Conference</h4>
                  <p className="text-sm text-gray-600">Individual meetings with teachers</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">December 20, 2023</p>
                  <p className="text-xs text-gray-500">2:00 PM - 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">End of Term Celebration</h4>
                  <p className="text-sm text-gray-600">Awards and recognition ceremony</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">January 25, 2024</p>
                  <p className="text-xs text-gray-500">10:00 AM - 12:00 PM</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">PTA Meeting</h4>
                  <p className="text-sm text-gray-600">Monthly parents' association meeting</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">February 10, 2024</p>
                  <p className="text-xs text-gray-500">6:00 PM - 8:00 PM</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Science Fair</h4>
                  <p className="text-sm text-gray-600">Students showcase their projects</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">March 15, 2024</p>
                  <p className="text-xs text-gray-500">9:00 AM - 3:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
