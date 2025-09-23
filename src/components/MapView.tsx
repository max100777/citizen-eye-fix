import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReportCard from "./ReportCard";

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

interface MapViewProps {
  onBack: () => void;
  reports: Report[];
}

const MapView = ({ onBack, reports }: MapViewProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-xl font-bold text-foreground">Neighborhood Map</h1>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </header>

      {/* Map Container */}
      <div className="relative">
        <div className="h-96 bg-muted border-b relative overflow-hidden">
          {/* Placeholder map - in real app this would be an interactive map */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-civic rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-muted-foreground mb-2">Interactive Map Coming Soon</p>
              <p className="text-sm text-muted-foreground">
                This will show all reported issues with interactive markers and clustering
              </p>
            </div>
          </div>

          {/* Mock map markers */}
          <div className="absolute top-16 left-20 w-4 h-4 bg-destructive rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <div className="absolute top-32 right-24 w-4 h-4 bg-warning rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute bottom-20 left-32 w-4 h-4 bg-success rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute top-24 center w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
        </div>

        {/* Legend */}
        <Card className="absolute top-4 right-4 shadow-elevated">
          <CardContent className="p-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span>Medium Priority</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span>Resolved</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>In Progress</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">All Reports</h2>
            <div className="text-sm text-muted-foreground">
              {reports.length} total issues
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapView;