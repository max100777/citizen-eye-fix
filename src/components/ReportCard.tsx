import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";

interface Report {
  id: string;
  title: string;
  category: string;
  status: string;
  location: string;
  date: string;
  priority: string;
  image?: string | null;
}

interface ReportCardProps {
  report: Report;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'resolved':
      return 'bg-success text-success-foreground';
    case 'in progress':
      return 'bg-primary text-primary-foreground';
    case 'pending':
      return 'bg-warning text-warning-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'border-l-destructive';
    case 'medium':
      return 'border-l-warning';
    case 'low':
      return 'border-l-success';
    default:
      return 'border-l-muted';
  }
};

const ReportCard = ({ report }: ReportCardProps) => {
  return (
    <Card className={`transition-civic hover:shadow-elevated border-l-4 ${getPriorityColor(report.priority)} shadow-card`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
            <Badge variant="outline" className="text-xs">
              {report.category}
            </Badge>
          </div>
          <Badge className={`${getStatusColor(report.status)} text-xs`}>
            {report.status}
          </Badge>
        </div>

        {report.image ? (
          <div className="w-12 h-12 bg-muted rounded-lg mb-4 flex items-center justify-center">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
        ) : (
          <div className="w-12 h-12 bg-gradient-civic rounded-lg mb-4 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        )}

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{report.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{new Date(report.date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Priority: {report.priority}</span>
            <div className="flex items-center space-x-1">
              {report.status === 'Resolved' && (
                <div className="w-2 h-2 bg-success rounded-full"></div>
              )}
              {report.status === 'In Progress' && (
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              )}
              {report.status === 'Pending' && (
                <div className="w-2 h-2 bg-warning rounded-full"></div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCard;