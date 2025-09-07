import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic } from "lucide-react";

export default function InterviewReadyPage() {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="text-center w-full max-w-md">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Mic className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline">Interview Ready</CardTitle>
                    <CardDescription>This feature is coming soon! Prepare for your interviews with mock sessions and expert tips.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Ace your next technical interview.</p>
                </CardContent>
            </Card>
        </div>
    )
}
