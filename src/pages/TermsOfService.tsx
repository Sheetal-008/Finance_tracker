import { FileText, Users, AlertTriangle, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using Finova services.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Service Agreement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>By using Finova, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Use the service for personal financial management only</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not attempt to breach or circumvent security measures</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Limitations & Disclaimers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Please understand that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Finova provides tools for financial planning, not financial advice</li>
                <li>All investment suggestions are for informational purposes only</li>
                <li>We are not responsible for financial decisions made using our platform</li>
                <li>Service availability may be subject to maintenance and updates</li>
                <li>Data accuracy depends on information you provide</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scale className="w-5 h-5" />
                <span>Account & Termination</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Account management terms:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accounts may be suspended for violation of terms</li>
                <li>You may close your account at any time</li>
                <li>Data will be retained for 30 days after account closure</li>
                <li>We reserve the right to modify or discontinue services</li>
                <li>Changes to terms will be communicated via email</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center pt-8 text-muted-foreground">
            <p>Last updated: December 2024</p>
            <p>For questions about these terms, contact us at legal@finova.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;