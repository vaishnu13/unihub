import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, Sparkles, Briefcase, Bot, ArrowRight } from "lucide-react";
import { Progress } from '@/components/ui/progress';

const overviewCards = [
    {
        title: "Hireability Score",
        description: "Your current readiness for the job market.",
        value: "78/100",
        progress: 78,
        icon: Gauge,
        link: "/dashboard/score"
    },
    {
        title: "Learning Path",
        description: "Your personalized skill-building roadmap.",
        value: "3/7 Modules",
        progress: 42,
        icon: Sparkles,
        link: "/dashboard/learning-path"
    },
    {
        title: "Internships",
        description: "Recommended and saved opportunities.",
        value: "5 Recommended",
        progress: null,
        icon: Briefcase,
        link: "/dashboard/internships/recommendations"
    }
]

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Welcome back, Student!</h1>
                <p className="text-muted-foreground">Here's a snapshot of your journey to success.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {overviewCards.map((card) => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className="text-xs text-muted-foreground">{card.description}</p>
                            {card.progress !== null && <Progress value={card.progress} className="mt-4 h-2" />}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-headline">Your Next Step</CardTitle>
                        <CardDescription>Based on your profile, we recommend focusing on this.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="p-4 rounded-md bg-secondary">
                           <h3 className="font-semibold">Master React Hooks</h3>
                           <p className="text-sm text-muted-foreground mt-1">Complete the advanced module in the Web Development course to significantly boost your frontend skills.</p>
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <Button asChild>
                            <Link href="/dashboard/courses/web-development">Go to Course <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-headline">AI Tutor</CardTitle>
                        <CardDescription>Stuck on a problem? Get instant help from your personal AI tutor.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="p-4 rounded-md bg-secondary">
                           <p className="text-sm text-muted-foreground italic">"Can you explain the difference between useEffect and useLayoutEffect in React?"</p>
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <Button asChild>
                            <Link href="/dashboard/tutor">Ask AI Tutor <Bot className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
