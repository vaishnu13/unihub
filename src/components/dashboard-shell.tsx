'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import {
  LayoutGrid,
  Gauge,
  Sparkles,
  Bot,
  Briefcase,
  BookOpen,
  Search,
  Users,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Lightbulb,
  BookCopy,
  Sun,
  Moon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/dashboard/courses', label: 'Courses', icon: BookCopy },
  { href: '/dashboard/tutor', label: 'AI Tutor', icon: Bot },
  { href: '/dashboard/practice', label: 'Practice', icon: Lightbulb },
  { href: '/dashboard/interview-ready', label: 'Interview Ready', icon: ClipboardList },
  { href: '/dashboard/internships/search', label: 'Internships', icon: Briefcase, badge: '5' },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: GraduationCap },
];


export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    document.documentElement.classList.toggle('dark', newIsDarkMode);
  };


  const isSubMenuActive = (basePath: string) => pathname.startsWith(basePath);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/">
            <Logo />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://picsum.photos/100" alt="User avatar" data-ai-hint="person face" />
              <AvatarFallback>VV</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="font-semibold truncate">Vaishnu Vindula</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1">
                <h1 className="text-lg font-semibold font-headline">
                    Hello, vaishnu vindula
                </h1>
            </div>
             <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {isDarkMode ? <Sun /> : <Moon />}
                </Button>
                 <Button variant="ghost" size="icon">
                    <div className="relative">
                        <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                        <Briefcase className="h-5 w-5" />
                    </div>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://picsum.photos/100" alt="@shadcn" data-ai-hint="person face" />
                                <AvatarFallback>VV</AvatarFallback>
                            </Avatar>
                         </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
