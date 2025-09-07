'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Pencil, User, BrainCircuit, Briefcase, GraduationCap, Award, FolderKanban, Plus } from "lucide-react";

const sections = [
    { 
        title: "About Me", 
        icon: <User className="h-6 w-6 text-primary" />,
        content: "Tell us a little bit about yourself.",
        button: null
    },
    { 
        title: "Skills", 
        icon: <BrainCircuit className="h-6 w-6 text-primary" />,
        content: "Add your skills to show them here.",
        button: null
    },
    { 
        title: "Experience", 
        icon: <Briefcase className="h-6 w-6 text-primary" />,
        content: "Add your work experience here.",
        button: null
    },
];

export default function PortfolioPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src="https://picsum.photos/200" data-ai-hint="person face" />
                    <AvatarFallback>VV</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h1 className="text-3xl font-bold font-headline">vaishnu vindula</h1>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800">
                           <CheckCircle className="h-4 w-4 mr-1" />
                           Verified Profile
                        </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1">Your Headline (e.g., Aspiring Developer)</p>
                </div>
                <Button variant="outline">
                    <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sections.map(section => (
                     <Card key={section.title}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            {section.icon}
                            <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{section.content}</p>
                        </CardContent>
                    </Card>
                ))}

                {/* Education Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                       <GraduationCap className="h-6 w-6 text-primary" />
                       <CardTitle className="font-headline text-xl">Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="font-semibold">Anil Neerukonda Institute of Technology and Sciences (ANITS)</h3>
                        <p className="text-sm text-muted-foreground">Bachelor of Technology (B.Tech) in Computer Science Engineering (CSE)</p>
                        <p className="text-sm text-muted-foreground">Graduating 3rd Year</p>
                    </CardContent>
                </Card>

                 {/* Honors & Awards Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Award className="h-6 w-6 text-primary" />
                            <CardTitle className="font-headline text-xl">Honors & Awards</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4 mr-2" /> Manage
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Add your honors and awards here.</p>
                    </CardContent>
                </Card>
            </div>
            
            {/* Projects Section */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <FolderKanban className="h-6 w-6 text-primary" />
                        <CardTitle className="font-headline text-xl">Projects</CardTitle>
                    </div>
                     <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Manage Projects
                    </Button>
                </CardHeader>
                <CardContent>
                    {/* Projects list will go here */}
                </CardContent>
            </Card>

        </div>
    )
}
