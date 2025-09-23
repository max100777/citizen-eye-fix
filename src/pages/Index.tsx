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
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-civic rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">CIVIX</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" onClick={() => setActiveView('home')}>Home</Button>
              <Button variant="ghost" onClick={() => setActiveView('map')}>Map View</Button>
              <Button variant="ghost" onClick={() => setActiveView('report')}>Report Issue</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Empower Your Community
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Report local issues, track progress, and help build a better neighborhood together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-civic hover:opacity-90 transition-fast shadow-civic"
                onClick={() => setActiveView('report')}
              >
                <Camera className="w-5 h-5 mr-2" />
                Report an Issue
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setActiveView('map')}
              >
                <MapPin className="w-5 h-5 mr-2" />
                View Neighborhood Map
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card transition-civic hover:shadow-elevated">
              <CardContent className="p-6">
                <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">2,847</h3>
                <p className="text-muted-foreground">Active Community Members</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card transition-civic hover:shadow-elevated">
              <CardContent className="p-6">
                <CheckCircle className="w-12 h-12 mx-auto text-success mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">1,523</h3>
                <p className="text-muted-foreground">Issues Resolved</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card transition-civic hover:shadow-elevated">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 mx-auto text-warning mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">2.3 days</h3>
                <p className="text-muted-foreground">Avg Response Time</p>
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
            className="h-16 rounded-none bg-gradient-civic text-white"
            onClick={() => setActiveView('report')}
          >
            <div className="flex flex-col items-center">
              <Camera className="w-5 h-5 mb-1" />
              <span className="text-xs">Report</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;