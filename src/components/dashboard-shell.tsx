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
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/dashboard/score', label: 'Hireability Score', icon: Gauge },
  { href: '/dashboard/learning-path', label: 'Learning Path', icon: Sparkles },
  { href: '/dashboard/tutor', label: 'AI Tutor', icon: Bot },
];

const subMenus = {
  internships: {
    label: 'Internships',
    icon: Briefcase,
    items: [
      { href: '/dashboard/internships/search', label: 'Search' },
      { href: '/dashboard/internships/recommendations', label: 'Recommendations' },
    ],
  },
  courses: {
    label: 'Courses',
    icon: BookOpen,
    items: [
      { href: '/dashboard/courses/web-development', label: 'Web Development' },
    ],
  },
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <Collapsible defaultOpen={isSubMenuActive('/dashboard/internships')}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <subMenus.internships.icon />
                    <span>{subMenus.internships.label}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              <CollapsibleContent asChild>
                <SidebarMenuSub>
                  {subMenus.internships.items.map((item) => (
                    <SidebarMenuSubItem key={item.href}>
                      <SidebarMenuSubButton asChild isActive={pathname === item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible defaultOpen={isSubMenuActive('/dashboard/courses')}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <subMenus.courses.icon />
                    <span>{subMenus.courses.label}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              <CollapsibleContent asChild>
                <SidebarMenuSub>
                  {subMenus.courses.items.map((item) => (
                    <SidebarMenuSubItem key={item.href}>
                      <SidebarMenuSubButton asChild isActive={pathname === item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://picsum.photos/100" alt="User avatar" data-ai-hint="person face" />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="font-semibold truncate">Student Robinson</p>
              <p className="text-xs text-muted-foreground truncate">student.r@uni.edu</p>
            </div>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/"><ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1">
                <h1 className="text-lg font-semibold font-headline">
                    {
                        [...menuItems, ...Object.values(subMenus).flatMap(m => m.items.map(i => ({...i, label: `${m.label} / ${i.label}` })))].find(item => item.href === pathname)?.label || 'Dashboard'
                    }
                </h1>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
