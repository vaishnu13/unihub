import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Bot } from "lucide-react";

export default function PracticePage() {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="text-center w-full max-w-md">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Code className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline">Practice Zone</CardTitle>
                    <CardDescription>This feature is coming soon! Sharpen your skills with coding challenges and quizzes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Get ready to tackle real-world problems.</p>
                </CardContent>
            </Card>
        </div>
    )
}
