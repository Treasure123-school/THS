import { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ 
  icon = <AlertCircle className="h-12 w-12 text-gray-400" />, 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid="empty-state-title">
            {title}
          </h3>
          <p className="text-gray-600 mb-6" data-testid="empty-state-description">
            {description}
          </p>
          {action && (
            <div data-testid="empty-state-action">
              {action}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
