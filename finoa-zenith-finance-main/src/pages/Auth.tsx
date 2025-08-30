import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [tab, setTab] = useState("login");
  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </div>
          <div className={tab === "login" ? "block" : "hidden"}>
            <Login />
          </div>
          <div className={tab === "signup" ? "block" : "hidden"}>
            <Signup />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;