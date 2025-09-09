import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';

export default function InternshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline">Internships</h1>
        <p className="text-muted-foreground">Find and manage your internship opportunities.</p>
      </div>
      <Tabs defaultValue="search" className="space-y-4">
        <TabsList>
            <TabsTrigger value="search" asChild>
                <Link href="/dashboard/internships/search">Search</Link>
            </TabsTrigger>
            <TabsTrigger value="recommendations" asChild>
                <Link href="/dashboard/internships/recommendations">AI Recommendations</Link>
            </TabsTrigger>
        </TabsList>
      </Tabs>
      {children}
    </div>
  );
}
