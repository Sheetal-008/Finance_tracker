import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Users, Target, Award, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      description: "Financial expert with 15+ years in fintech and investment advisory.",
      image: "👨‍💼"
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      description: "Technology leader specializing in AI and financial modeling systems.",
      image: "👩‍💻"
    },
    {
      name: "Amit Patel",
      role: "Head of Product",
      description: "Product strategist focused on user experience and financial wellness.",
      image: "👨‍🎯"
    },
    {
      name: "Sneha Gupta",
      role: "Financial Advisor",
      description: "Certified financial planner helping users achieve their money goals.",
      image: "👩‍💼"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "User-Centric",
      description: "Every feature is designed with our users' financial wellbeing in mind."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest quality in our products and services."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to simplify financial management."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive community for financial growth and learning."
    }
  ];

  const milestones = [
    { year: "2020", event: "Finova founded with a vision to democratize financial planning" },
    { year: "2021", event: "Launched beta version with 1,000+ early adopters" },
    { year: "2022", event: "Reached 10,000 active users and introduced AI insights" },
    { year: "2023", event: "Expanded to 50,000+ users across India" },
    { year: "2024", event: "Launched advanced portfolio management and goal tracking" }
  ];

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Info className="w-4 h-4" />
            <span>About Finova</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Empowering Your 
            <span className="block gradient-hero bg-clip-text text-transparent">Financial Journey</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Finova is more than just a financial app – we're your trusted partner in building a secure, 
            prosperous future through smart money management and intelligent insights.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          <Card className="shadow-card border-0 gradient-card hover-lift">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To make financial planning accessible, understandable, and actionable for everyone. 
                We believe that with the right tools and guidance, anyone can achieve financial freedom 
                and build the life they want.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card hover-lift">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become India's most trusted financial companion, helping millions of families 
                build wealth, achieve their dreams, and secure their future through smart financial 
                decisions powered by technology and expertise.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do at Finova
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="shadow-card border-0 gradient-card hover-lift text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>


        {/* Team */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The passionate people behind Finova's success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="shadow-card border-0 gradient-card hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">{member.image}</div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16 max-w-6xl mx-auto">
          <Card className="shadow-card border-0 gradient-card">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <p className="text-muted-foreground">Active Users</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-success mb-2">₹2.5M</div>
                  <p className="text-muted-foreground">Money Saved</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">125K</div>
                  <p className="text-muted-foreground">Budgets Created</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-warning mb-2">1M+</div>
                  <p className="text-muted-foreground">Expenses Tracked</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <Card className="shadow-card border-0 gradient-card">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Join thousands of users who have already taken control of their financial future with Finova.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/budget">
                  <Button variant="hero" size="lg">
                    Start Planning Today
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;