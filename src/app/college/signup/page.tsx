import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { Eye } from 'lucide-react';

export default function CollegeSignupPage() {
  return (
    <Card className="mx-auto max-w-md w-full">
       <CardHeader className="space-y-2">
        <div className="flex justify-center mb-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <CardTitle className="text-2xl font-headline text-center">College Registration</CardTitle>
        <CardDescription className="text-center">Join UniHub to connect with top student talent.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
              <Label htmlFor="college-name">College Name</Label>
              <Input id="college-name" placeholder="Your College Name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Official Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="placement-cell@yourcollege.edu"
              required
            />
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Create Password</Label>
            <Input id="password" type="password" />
            <Eye className="absolute right-3 top-9 h-5 w-5 text-muted-foreground" />
          </div>
          <Button type="submit" className="w-full" asChild>
            <Link href="/college/login">Create Account</Link>
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/college/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
