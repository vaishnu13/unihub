import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockInternships = [
  {
    title: "Frontend Developer Intern",
    company: "Innovate Inc.",
    location: "Remote",
    tags: ["React", "TypeScript", "UI/UX"],
    description: "Work on our next-generation user interface, contributing to a design system used by millions.",
  },
  {
    title: "Software Engineer Intern, Backend",
    company: "DataStream Solutions",
    location: "New York, NY",
    tags: ["Python", "Django", "SQL"],
    description: "Help build and scale our data processing pipelines. An exciting opportunity to work with big data.",
  },
  {
    title: "Product Management Intern",
    company: "Creative Co.",
    location: "San Francisco, CA",
    tags: ["Agile", "Product", "Strategy"],
    description: "Collaborate with engineering and design teams to define and ship new features.",
  },
  {
    title: "AI/ML Research Intern",
    company: "Future AI",
    location: "Remote",
    tags: ["PyTorch", "NLP", "Research"],
    description: "Join our research team to work on cutting-edge natural language processing models.",
  },
];


export default function InternshipSearchPage() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline">Find Your Next Opportunity</h1>
        <p className="text-muted-foreground">Search thousands of internship listings to find the perfect fit.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by title, company, or keyword" className="pl-10" />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="City, state, or 'remote'" className="pl-10" />
        </div>
        <Button className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <div className="grid gap-6 mt-8">
        {mockInternships.map((internship, index) => (
          <Card key={index}>
            <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <CardTitle>{internship.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-2"><Briefcase className="h-4 w-4"/> {internship.company}</span>
                        <span className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {internship.location}</span>
                    </CardDescription>
                </div>
                 <Button>Apply Now</Button>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{internship.description}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
                {internship.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
