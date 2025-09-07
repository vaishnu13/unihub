import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function PortfolioPage() {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="text-center w-full max-w-md">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline">Portfolio Builder</CardTitle>
                    <CardDescription>This feature is coming soon! Create a professional portfolio to showcase your skills and projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Impress recruiters with a standout portfolio.</p>
                </CardContent>
            </Card>
        </div>
    )
}
