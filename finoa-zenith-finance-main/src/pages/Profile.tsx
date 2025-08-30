import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Camera, 
  Save, 
  LogOut,
  TrendingUp,
  Target,
  DollarSign,
  Calendar,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [hasProfile, setHasProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    age: "",
    occupation: "",
    monthlyIncome: ""
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    budgetAlerts: true,
    monthlyReports: true,
    darkMode: false,
    currency: "INR"
  });

  const { toast } = useToast();

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileData.fullName || !profileData.email || !profileData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setHasProfile(true);
    toast({
      title: "Profile Created",
      description: "Your profile has been set up successfully!",
    });
  };

  const handleProfileSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handlePreferencesSave = () => {
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  // If no profile exists, show profile creation form
  if (!hasProfile) {
    return (
      <div className="min-h-screen py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <User className="w-4 h-4" />
                <span>Complete Your Profile</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Welcome to Finova!</h1>
              <p className="text-xl text-muted-foreground">
                Let's set up your profile to personalize your financial journey
              </p>
            </div>

            {/* Profile Setup Form */}
            <Card className="shadow-card border-0 gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Create Your Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateProfile} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={profileData.age}
                        onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Mumbai, Maharashtra"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        placeholder="Software Engineer"
                        value={profileData.occupation}
                        onChange={(e) => setProfileData({...profileData, occupation: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      placeholder="50000"
                      value={profileData.monthlyIncome}
                      onChange={(e) => setProfileData({...profileData, monthlyIncome: e.target.value})}
                    />
                    <p className="text-sm text-muted-foreground">
                      This helps us provide better financial recommendations
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full" variant="hero" size="lg">
                    <Save className="w-4 h-4 mr-2" />
                    Create Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Profile data for display
  const userStats = [
    { label: "Budgets Created", value: "3", icon: Target, color: "text-primary" },
    { label: "Goals Set", value: "2", icon: DollarSign, color: "text-success" },
    { label: "Monthly Income", value: `₹${profileData.monthlyIncome ? parseInt(profileData.monthlyIncome).toLocaleString() : '0'}`, icon: TrendingUp, color: "text-accent" },
    { label: "Days Active", value: "1", icon: Calendar, color: "text-warning" }
  ];

  const recentActivity = [
    { action: "Profile created", description: "Welcome to Finova!", amount: "", time: "Just now" },
    { action: "Ready to start", description: "Set up your first budget", amount: "", time: "Now" }
  ];

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <User className="w-4 h-4" />
            <span>Profile & Settings</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
          <p className="text-xl text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="shadow-card border-0 gradient-card">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-2xl font-bold">
                      {profileData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-2xl font-bold mb-2">{profileData.fullName}</h2>
                  <p className="text-muted-foreground mb-2">{profileData.email}</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="secondary">Premium User</Badge>
                    <Badge variant="outline">Verified Account</Badge>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">
                    ₹{profileData.monthlyIncome ? Math.floor(parseInt(profileData.monthlyIncome) * 0.2).toLocaleString() : '0'}
                  </div>
                  <p className="text-sm text-muted-foreground">Potential Monthly Savings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="shadow-card border-0 gradient-card hover-lift">
                  <CardContent className="p-6 text-center">
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="shadow-card border-0 gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        value={profileData.occupation || ''}
                        onChange={(e) => setProfileData({...profileData, occupation: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      value={profileData.monthlyIncome || ''}
                      onChange={(e) => setProfileData({...profileData, monthlyIncome: e.target.value})}
                    />
                  </div>
                  
                  <Button onClick={handleProfileSave} variant="hero">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card className="shadow-card border-0 gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch 
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, emailNotifications: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified on your device</p>
                      </div>
                      <Switch 
                        checked={preferences.pushNotifications}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, pushNotifications: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Budget Alerts</Label>
                        <p className="text-sm text-muted-foreground">Alert when approaching budget limits</p>
                      </div>
                      <Switch 
                        checked={preferences.budgetAlerts}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, budgetAlerts: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Monthly Reports</Label>
                        <p className="text-sm text-muted-foreground">Receive monthly financial summaries</p>
                      </div>
                      <Switch 
                        checked={preferences.monthlyReports}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, monthlyReports: checked})
                        }
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handlePreferencesSave} variant="hero">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card className="shadow-card border-0 gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                        <div>
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">{activity.description}</div>
                        </div>
                        <div className="text-right">
                          {activity.amount && (
                            <div className="font-semibold">{activity.amount}</div>
                          )}
                          <div className="text-sm text-muted-foreground">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="shadow-card border-0 gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      Enable Two-Factor Authentication
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      Download Your Data
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      Delete Account
                    </Button>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <Button variant="destructive" className="w-full">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;