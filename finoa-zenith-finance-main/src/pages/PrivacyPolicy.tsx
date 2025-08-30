import { Shield, Eye, Lock, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Your Privacy Matters</h1>
          <p className="text-xl text-muted-foreground">
            We are committed to protecting your personal information and financial data.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Information We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We collect information you provide directly to us, such as:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account registration information (name, email, phone)</li>
                <li>Financial data you input (budgets, expenses, savings goals)</li>
                <li>Profile preferences and settings</li>
                <li>Communication records with our support team</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>How We Protect Your Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Your financial security is our top priority:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>End-to-end encryption for all sensitive data</li>
                <li>Secure cloud storage with regular backups</li>
                <li>Two-factor authentication available</li>
                <li>Regular security audits and updates</li>
                <li>No sharing of personal data with third parties</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Data Usage & Rights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You have full control over your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and download your data anytime</li>
                <li>Request corrections to inaccurate information</li>
                <li>Delete your account and all associated data</li>
                <li>Opt-out of non-essential communications</li>
                <li>Data retention limited to active account period</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center pt-8 text-muted-foreground">
            <p>Last updated: December 2024</p>
            <p>For questions about this policy, contact us at privacy@finova.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;