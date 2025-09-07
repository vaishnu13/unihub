'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
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

const colleges = [
    { value: "anits", label: "Anil Neerukonda Institute of Technology and Sciences (ANITS)" },
    { value: "viit", label: "Vignan's Institute of Information Technology (VIIT)" },
    { value: "view", label: "Vignan's Institute of Engineering for Women" },
    { value: "raghu", label: "Raghu Engineering College (Autonomous)" },
    { value: "diet", label: "Dadi Institute of Engineering and Technology (DIET)" },
    { value: "viet", label: "Visakha Institute of Engineering & Technology (VIET)" },
    { value: "chaitanya", label: "Chaitanya Engineering College" },
    { value: "avanthi", label: "Avanthi Institute of Engineering and Technology" },
    { value: "bits", label: "BABA Institute of Technology and Sciences (BITS)" },
    { value: "bullayya", label: "Dr. Lankapalli Bullayya College" },
    { value: "saiganapathi", label: "Sai Ganapathi Engineering College" },
    { value: "sanketika", label: "Sanketika Vidya Parishad Engineering College" },
    { value: "giits", label: "Gonna Institute of Information Technology & Sciences (GIITS)" },
    { value: "nsrit", label: "Nadimpalli Satyanarayana Raju Institute of Technology (NSRIT)" },
    { value: "alameer", label: "Al Ameer College of Engineering and Information Technology" },
    { value: "behara", label: "Behara College of Engineering and Technology" },
];

export default function SignupPage() {
    const router = useRouter();
    const { setUser } = useUser();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        college: '',
        education: 'btech',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    
    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, college: value }));
    };

    const handleRadioChange = (value: string) => {
        setFormData(prev => ({ ...prev, education: value }));
    };

    const handleCreateAccount = () => {
        const collegeLabel = colleges.find(c => c.value === formData.college)?.label || formData.college;
        setUser({ ...formData, college: collegeLabel });
        router.push('/dashboard');
    }

  return (
    <Card className="mx-auto max-w-md w-full">
       <CardHeader className="space-y-2">
        <div className="flex justify-center mb-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <CardTitle className="text-2xl font-headline text-center">Start your journey as a student with AI - UniHub.</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Max" required onChange={handleInputChange} value={formData.firstName} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Robinson" required onChange={handleInputChange} value={formData.lastName} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="college">Select your College</Label>
             <Select onValueChange={handleSelectChange} value={formData.college}>
              <SelectTrigger id="college">
                <SelectValue placeholder="Select your college" />
              </SelectTrigger>
              <SelectContent>
                {colleges.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Education</Label>
            <RadioGroup defaultValue={formData.education} onValueChange={handleRadioChange} className="flex gap-4">
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
            <Input id="password" type="password" onChange={handleInputChange} value={formData.password} />
            <Eye className="absolute right-3 top-9 h-5 w-5 text-muted-foreground" />
          </div>
          <Button type="submit" className="w-full" onClick={handleCreateAccount}>
            Create an account
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
