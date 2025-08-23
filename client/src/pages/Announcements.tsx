import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import AnnouncementCard from "@/components/AnnouncementCard";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Megaphone, Filter } from "lucide-react";
import type { Announcement } from "@shared/schema";

export default function Announcements() {
  const [audienceFilter, setAudienceFilter] = useState<string>("all");

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["/api/announcements"],
  });

  const filteredAnnouncements = announcements.filter((announcement: Announcement) => {
    if (audienceFilter === "all") return true;
    return announcement.audience.includes(audienceFilter);
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-bg py-20" data-testid="announcements-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              School Announcements
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest news, updates, and important information 
              from Treasure-Home School community.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200" data-testid="announcements-filter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Filter by audience:</span>
            </div>
            <Select value={audienceFilter} onValueChange={setAudienceFilter}>
              <SelectTrigger className="w-full sm:w-48" data-testid="audience-filter">
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Announcements</SelectItem>
                <SelectItem value="students">Students</SelectItem>
                <SelectItem value="parents">Parents</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Announcements Grid */}
      <section className="py-16 bg-gray-50" data-testid="announcements-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : filteredAnnouncements.length > 0 ? (
            <div className="grid gap-8">
              {filteredAnnouncements.map((announcement: Announcement) => (
                <AnnouncementCard 
                  key={announcement.id} 
                  announcement={announcement} 
                  showFullContent={true}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Megaphone className="h-12 w-12 text-gray-400" />}
              title={audienceFilter === "all" ? "No Announcements" : `No Announcements for ${audienceFilter}`}
              description={
                audienceFilter === "all" 
                  ? "No announcements have been posted yet. Check back soon for updates!"
                  : `There are currently no announcements targeted to ${audienceFilter}. Try selecting a different audience filter.`
              }
              action={
                audienceFilter !== "all" ? (
                  <Button onClick={() => setAudienceFilter("all")} variant="outline">
                    View All Announcements
                  </Button>
                ) : null
              }
            />
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary-900 text-white" data-testid="newsletter-signup">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-primary-200 text-lg">
              Never miss important school announcements. Subscribe to our newsletter 
              for regular updates delivered directly to your inbox.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              data-testid="newsletter-email"
            />
            <Button className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3" data-testid="newsletter-subscribe">
              Subscribe
            </Button>
          </div>

          <p className="text-primary-300 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </Layout>
  );
}
