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
  Sparkles,
  Bot,
  Briefcase,
  BookOpen,
  Users,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  Bell,
  Mic,
  BrainCircuit,
  User,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/dashboard/learning-path', label: 'Learning Path', icon: Sparkles },
  { href: '/dashboard/courses', label: 'Courses', icon: BookOpen },
  { href: '/dashboard/tutor', label: 'AI Tutor', icon: Bot },
  { href: '/dashboard/interview-ready', label: 'Interview Ready', icon: Mic },
  { 
    href: '/dashboard/internships', 
    label: 'Internships', 
    icon: Briefcase,
    subItems: [
      { href: '/dashboard/internships/search', label: 'Search' },
      { href: '/dashboard/internships/recommendations', label: 'AI Recommendations' },
    ]
  },
  { href: '/dashboard/portfolio', label: 'Profile', icon: User },
];


export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = { firstName: 'Demo', lastName: 'User', email: 'demo@unihub.com' };
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if(newIsDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  };


  const isSubMenuActive = (basePath: string) => pathname.startsWith(basePath);
  
  const studentName = user ? `${user.firstName} ${user.lastName}` : 'Student';
  const avatarFallback = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'S';

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Logo className="text-2xl" iconClassName="h-8 w-8" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              item.subItems ? (
                <Collapsible key={item.href} defaultOpen={isSubMenuActive(item.href)}>
                  <SidebarMenuItem className="px-2">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton size="lg" className="text-base font-medium justify-between">
                          <div className="flex items-center gap-2">
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </div>
                          <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                         <SidebarMenuSubItem key={subItem.href}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                               <Link href={subItem.href}>
                                  <span>{subItem.label}</span>
                               </Link>
                           </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.href} className="px-2">
                  <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} size="lg" className="text-base font-medium">
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <div className="flex items-center gap-3 p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start items-center gap-3 h-auto p-2">
                  <Avatar className="h-9 w-9">
                      <AvatarImage src="" alt={studentName} data-ai-hint="person face" />
                      <AvatarFallback>{avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="font-semibold truncate">{studentName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/dashboard/portfolio">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/">Logout</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1" />
            <div className="flex-1 text-center">
              <h1 className="text-xl font-semibold">Hello, {studentName}</h1>
            </div>
             <div className="flex flex-1 justify-end items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {isDarkMode ? <Sun /> : <Moon />}
                </Button>
                 <Button variant="ghost" size="icon">
                    <div className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                    </div>
                </Button>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" asChild>
                  <Link href="/dashboard/portfolio">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt={studentName} data-ai-hint="person face" />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                  </Link>
                </Button>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
