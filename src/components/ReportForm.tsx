import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ReportFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

const categories = [
  "Road Issues",
  "Streetlights",
  "Sanitation",
  "Public Safety",
  "Parks & Recreation",
  "Water & Utilities",
  "Noise Complaints",
  "Other"
];

const ReportForm = ({ onBack, onSubmit }: ReportFormProps) => {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    name: "",
    phone: "",
    location: ""
  });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const { toast } = useToast();

  const detectLocation = () => {
    setIsDetectingLocation(true);
    // Mock location detection
    setTimeout(() => {
      setFormData(prev => ({ 
        ...prev, 
        location: "123 Main Street, City Center" 
      }));
      setIsDetectingLocation(false);
      toast({
        title: "Location detected",
        description: "Your current location has been automatically filled in.",
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in the category and description fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Report Submitted",
      description: "Your civic issue report has been submitted successfully. You'll receive updates on its progress.",
    });
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Report an Issue</h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-primary" />
                <span>Help us improve your neighborhood</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Report issues in under 30 seconds and help make your community better.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Selection */}
                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="bg-accent/50">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Upload Images</Label>
                  <Card className="border-2 border-dashed border-accent hover:border-primary transition-fast cursor-pointer">
                    <CardContent className="p-8 text-center">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm font-medium mb-1">Tap or Upload an image</p>
                      <p className="text-xs text-muted-foreground">
                        Photos help us understand the issue better
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* Example Images */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <div className="w-full h-24 bg-muted rounded-lg mb-2 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">Example: Pothole</p>
                    </div>
                    <div className="text-center">
                      <div className="w-full h-24 bg-muted rounded-lg mb-2 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">Example: Broken light</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Issue Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Explain your issue (in 50 words)"
                    className="bg-accent/50 min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Your Location</Label>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start bg-secondary/50"
                    onClick={detectLocation}
                    disabled={isDetectingLocation}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {isDetectingLocation ? "Detecting your Location..." : "Detecting your Location"}
                  </Button>
                  {formData.location && (
                    <div className="p-3 bg-accent rounded-lg">
                      <p className="text-sm text-foreground">{formData.location}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Latitude</Label>
                      <div className="p-2 bg-muted rounded text-sm text-muted-foreground">
                        Waiting for your Location...
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Longitude</Label>
                      <div className="p-2 bg-muted rounded text-sm text-muted-foreground">
                        Waiting for your Location...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                      id="name"
                      placeholder="Enter your Name"
                      className="bg-muted/50"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      className="bg-muted/50"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-civic hover:opacity-90 transition-fast shadow-civic"
                  size="lg"
                >
                  Register Complaint
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Empowering Communities for Better Civic
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;