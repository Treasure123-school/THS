import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Announcement } from "@shared/schema";

interface AnnouncementCardProps {
  announcement: Announcement;
  showFullContent?: boolean;
}

export default function AnnouncementCard({ announcement, showFullContent = false }: AnnouncementCardProps) {
  const getAudienceColor = (audience: string[]) => {
    if (audience.includes("all")) return "bg-blue-100 text-blue-700";
    if (audience.includes("students")) return "bg-green-100 text-green-700";
    if (audience.includes("parents")) return "bg-purple-100 text-purple-700";
    if (audience.includes("staff")) return "bg-orange-100 text-orange-700";
    return "bg-gray-100 text-gray-700";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(new Date(date));
  };

  const getDisplayContent = (content: string) => {
    if (showFullContent) return content;
    return content.length > 150 ? content.substring(0, 150) + "..." : content;
  };

  return (
    <Card className="announcement-card" data-testid={`announcement-${announcement.id}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`announcement-tag ${getAudienceColor(announcement.audience)}`} data-testid="announcement-audience">
            {announcement.audience.includes("all") ? "All Students" : 
             announcement.audience.includes("parents") ? "Parents" :
             announcement.audience.includes("staff") ? "Staff" : "Students"}
          </span>
          <div className="flex items-center text-sm text-gray-500" data-testid="announcement-date">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(announcement.createdAt || new Date())}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid="announcement-title">
          {announcement.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed" data-testid="announcement-content">
          {getDisplayContent(announcement.content)}
        </p>
        
        {!showFullContent && announcement.content.length > 150 && (
          <div className="mt-4">
            <button className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors" data-testid="announcement-read-more">
              Read more →
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
