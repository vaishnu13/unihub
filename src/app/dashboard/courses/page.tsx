'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const courses = [
  {
    title: "Full-Stack Web Development Path",
    description: "From fundamentals to deployment, become a job-ready web developer.",
    tags: ["React", "Node.js", "SQL", "Web"],
    image: "https://picsum.photos/400/200",
    imageHint: "web development code",
    href: "/dashboard/courses/web-development",
  },
  {
    title: "AI & Machine Learning Foundations",
    description: "Dive into the world of AI, learning key concepts and popular frameworks.",
    tags: ["Python", "PyTorch", "NLP"],
    image: "https://picsum.photos/400/200",
    imageHint: "artificial intelligence brain",
    href: "#",
  },
  {
    title: "Data Structures & Algorithms",
    description: "Master essential algorithms and data structures for technical interviews.",
    tags: ["Algorithms", "Data Structures", "Problem Solving"],
    image: "https://picsum.photos/400/200",
    imageHint: "data structures algorithm",
    href: "#",
  },
   {
    title: "UI/UX Design Principles",
    description: "Learn the fundamentals of creating beautiful and user-friendly interfaces.",
    tags: ["Figma", "Design Thinking", "UI/UX"],
    image: "https://picsum.photos/400/200",
    imageHint: "user interface design",
    href: "#",
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-8">
       <div>
            <h1 className="text-3xl font-bold font-headline">Explore Courses</h1>
            <p className="text-muted-foreground mt-2">Expand your skills with our expert-led courses.</p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.title} className="flex flex-col">
            <CardHeader>
               <div className="relative h-40 w-full mb-4">
                    <Image
                        src={course.image}
                        alt={course.title}
                        data-ai-hint={course.imageHint}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                </div>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                    {course.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={course.href}>
                  Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
