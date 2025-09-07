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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye } from 'lucide-react';


export default function SignupPage() {
  return (
    <Card className="mx-auto max-w-md w-full">
       <CardHeader className="space-y-2">
        <div className="flex justify-center mb-4">
            <Logo />
        </div>
        <CardTitle className="text-2xl font-headline text-center">Start your journey as a student with AI - UniHub.</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="college">Select your College</Label>
             <Select>
              <SelectTrigger id="college">
                <SelectValue placeholder="Select your college" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diet">DIET</SelectItem>
                <SelectItem value="avanthi">Avanthi Institute</SelectItem>
                <SelectItem value="bullayya">Dr. Lankapalli Bullayya College</SelectItem>
                <SelectItem value="nsrit">NSRIT</SelectItem>
                <SelectItem value="aditya">Aditya Engineering College</SelectItem>
                <SelectItem value="vignan">Vignan Institute</SelectItem>
                <SelectItem value="gmrit">GMR Institute of Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Education</Label>
            <RadioGroup defaultValue="btech" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="btech" id="btech" />
                <Label htmlFor="btech">B.Tech</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="general" id="general" />
                <Label htmlFor="general">General Degree (B.Sc, B.A, etc.)</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
            <Eye className="absolute right-3 top-9 h-5 w-5 text-muted-foreground" />
          </div>
          <Button type="submit" className="w-full" asChild>
            <Link href="/dashboard">Create an account</Link>
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
