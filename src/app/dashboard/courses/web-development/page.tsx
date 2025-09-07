import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const courseModules = [
  {
    title: 'Module 1: Foundations of Web Development',
    lessons: [
      { title: 'Introduction to HTML', type: 'video', duration: '12 min', completed: true },
      { title: 'Styling with CSS', type: 'video', duration: '25 min', completed: true },
      { title: 'CSS Flexbox and Grid', type: 'reading', duration: '15 min', completed: true },
      { title: 'Introduction to JavaScript', type: 'video', duration: '30 min', completed: false },
    ],
  },
  {
    title: 'Module 2: Mastering React',
    lessons: [
      { title: 'Thinking in React & JSX', type: 'video', duration: '18 min', completed: false },
      { title: 'Components, Props, and State', type: 'video', duration: '35 min', completed: false },
      { title: 'React Hooks: useState and useEffect', type: 'reading', duration: '20 min', completed: false },
      { title: 'Project: Build a To-Do App', type: 'project', duration: '2 hours', completed: false },
    ],
  },
    {
    title: 'Module 3: Advanced React Concepts',
    lessons: [
      { title: 'Context API for State Management', type: 'video', duration: '22 min', completed: false },
      { title: 'Custom Hooks', type: 'reading', duration: '15 min', completed: false },
      { title: 'Performance Optimization with useMemo & useCallback', type: 'video', duration: '28 min', completed: false },
    ],
  },
];

export default function WebDevelopmentCoursePage() {
    const totalLessons = courseModules.flatMap(m => m.lessons).length;
    const completedLessons = courseModules.flatMap(m => m.lessons).filter(l => l.completed).length;
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Full-Stack Web Development Path</h1>
            <p className="text-muted-foreground mt-2">From fundamentals to deployment, become a job-ready web developer.</p>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible defaultValue="Module 1: Foundations of Web Development">
                {courseModules.map((module) => (
                    <AccordionItem value={module.title} key={module.title}>
                    <AccordionTrigger className="font-semibold">{module.title}</AccordionTrigger>
                    <AccordionContent>
                        <ul className="space-y-4 p-2">
                        {module.lessons.map((lesson) => (
                            <li key={lesson.title} className="flex items-center gap-4 p-2 rounded-md hover:bg-secondary/50 transition-colors">
                                <Checkbox checked={lesson.completed} aria-label={`Mark ${lesson.title} as completed`} />
                                {lesson.type === 'video' ? <Video className="h-5 w-5 text-muted-foreground" /> : <FileText className="h-5 w-5 text-muted-foreground" />}
                                <div className="flex-1">
                                    <p className="font-medium">{lesson.title}</p>
                                    <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                </div>
                            </li>
                        ))}
                        </ul>
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card>
          <div className="relative h-48 w-full">
            <Image
              src="https://picsum.photos/400/200"
              alt="Web Development"
              data-ai-hint="web development code"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <CardContent className="pt-6">
            <h3 className="font-semibold">Your Progress</h3>
            <Progress value={progressPercentage} className="my-2" />
            <p className="text-sm text-muted-foreground">{progressPercentage}% complete ({completedLessons} of {totalLessons} lessons)</p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Skills You'll Gain</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                <Badge>HTML5</Badge>
                <Badge>CSS3</Badge>
                <Badge>JavaScript (ES6+)</Badge>
                <Badge>React</Badge>
                <Badge>Node.js</Badge>
                <Badge>API Design</Badge>
                <Badge>Git</Badge>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
