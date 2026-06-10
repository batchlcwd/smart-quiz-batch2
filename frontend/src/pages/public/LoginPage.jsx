import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center py-5"
    >
      <Card className="w-full md:w-1/2 lg:w-1/3 py-10 ">
        <CardHeader className="text-center">
          <LogIn size={40} className="mx-auto" />
          <CardTitle className="text-2xl font-semibold">
            Login to your account{" "}
          </CardTitle>
          <CardDescription>
            Sign in to your account for explore the quizzes..
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex  flex-col gap-3 mt-3">
            {/* email field */}
            <div className="flex gap-2 flex-col">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                required
              />
            </div>

            {/* email field */}
            <div className="flex gap-2 flex-col">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <div className="flex justify-center gap-2">
            <Button size="lg">Sign In</Button>
            <Button size="lg" variant="destructive">
              Clear
            </Button>
          </div>
          <p>
            Don't have an account?{" "}
            <span className="text-primary cursor-pointer">Sign Up</span>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default LoginPage;
