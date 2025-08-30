import { HelpCircle, Search, BookOpen, MessageCircle, Video, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HelpCentre = () => {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      articles: [
        "How to create your first budget",
        "Setting up expense tracking",
        "Understanding your dashboard",
        "Account setup and verification"
      ]
    },
    {
      title: "Budget Management",
      icon: MessageCircle,
      articles: [
        "Creating budget categories",
        "Setting spending limits",
        "Tracking budget progress",
        "Budget vs actual analysis"
      ]
    },
    {
      title: "Goals & Savings",
      icon: Video,
      articles: [
        "Setting savings goals",
        "Investment recommendations",
        "Emergency fund planning",
        "Retirement planning basics"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Help Centre</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions and learn how to make the most of Finova.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for help articles..."
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-card border-0 gradient-card text-center hover-scale">
            <CardContent className="pt-6">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get instant help from our support team
              </p>
              <Button variant="outline" size="sm">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card text-center hover-scale">
            <CardContent className="pt-6">
              <Video className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Watch step-by-step guides
              </p>
              <Button variant="outline" size="sm">Watch Videos</Button>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card text-center hover-scale">
            <CardContent className="pt-6">
              <Download className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">User Guide</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Download our complete manual
              </p>
              <Button variant="outline" size="sm">Download PDF</Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Categories */}
        <div className="grid lg:grid-cols-3 gap-8">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="shadow-card border-0 gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon className="w-5 h-5" />
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <a 
                          href="#" 
                          className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1 story-link"
                        >
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto shadow-card border-0 gradient-card">
            <CardContent className="pt-8">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero">Contact Support</Button>
                <Button variant="outline">Schedule Call</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCentre;