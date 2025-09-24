import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Camera, Users, CheckCircle, Clock, AlertCircle } from "lucide-react";
import MapView from "@/components/MapView";
import ReportForm from "@/components/ReportForm";
import ReportCard from "@/components/ReportCard";

// Mock data for demonstration
const mockReports = [
  {
    id: "1",
    title: "Pothole on Main St.",
    category: "Road",
    status: "Pending",
    location: "Main Street & Oak Ave",
    date: "2025-09-20",
    priority: "High",
    image: null
  },
  {
    id: "2", 
    title: "Streetlight Outage",
    category: "Electrical",
    status: "Resolved",
    location: "Park Avenue",
    date: "2025-09-18",
    priority: "Medium",
    image: null
  },
  {
    id: "3",
    title: "Overflowing Trash Bin",
    category: "Sanitation", 
    status: "In Progress",
    location: "City Park",
    date: "2025-09-22",
    priority: "Low",
    image: null
  }
];

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'map' | 'report'>('home');

  if (activeView === 'map') {
    return <MapView onBack={() => setActiveView('home')} reports={mockReports} />;
  }

  if (activeView === 'report') {
    return <ReportForm onBack={() => setActiveView('home')} onSubmit={() => setActiveView('home')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header - Logo Only */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-civic-blue rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏛️</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Your Neighborhood</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Help us improve your neighborhood in under 30 seconds.
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button 
                size="lg" 
                className="bg-civic-blue hover:bg-civic-blue/90 text-white transition-fast shadow-civic"
                onClick={() => setActiveView('report')}
              >
                📷 Report an Issue
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setActiveView('map')}
              >
                🗺️ View Map
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center shadow-card transition-civic hover:shadow-elevated">
              <CardContent className="p-4">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="text-xl font-bold text-foreground mb-1">2,847</h3>
                <p className="text-muted-foreground text-sm">Community Members</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card transition-civic hover:shadow-elevated">
              <CardContent className="p-4">
                <div className="text-3xl mb-2">✅</div>
                <h3 className="text-xl font-bold text-foreground mb-1">1,523</h3>
                <p className="text-muted-foreground text-sm">Issues Resolved</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card transition-civic hover:shadow-elevated">
              <CardContent className="p-4">
                <div className="text-3xl mb-2">⏱️</div>
                <h3 className="text-xl font-bold text-foreground mb-1">2.3 days</h3>
                <p className="text-muted-foreground text-sm">Avg Response Time</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card transition-civic hover:shadow-elevated">
              <CardContent className="p-4">
                <div className="text-3xl mb-2">📍</div>
                <h3 className="text-xl font-bold text-foreground mb-1">12</h3>
                <p className="text-muted-foreground text-sm">Active Areas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Reports */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Recent Reports</h2>
            <Button variant="outline" onClick={() => setActiveView('map')}>
              View All on Map
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden">
        <div className="grid grid-cols-3">
          <Button 
            variant="ghost" 
            className="h-16 rounded-none"
            onClick={() => setActiveView('home')}
          >
            <div className="flex flex-col items-center">
              <MapPin className="w-5 h-5 mb-1" />
              <span className="text-xs">Home</span>
            </div>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 rounded-none"
            onClick={() => setActiveView('map')}
          >
            <div className="flex flex-col items-center">
              <MapPin className="w-5 h-5 mb-1" />
              <span className="text-xs">Map</span>
            </div>
          </Button>
          <Button 
            variant="ghost" 
            className="h-16 rounded-none bg-civic-blue text-white"
            onClick={() => setActiveView('report')}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg mb-1">📷</span>
              <span className="text-xs">Report</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;