'use client'

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, GraduationCap, Building, FileText, MoreHorizontal, UserPlus, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { UserRecord } from "firebase-admin/auth";


const statCards = [
    { title: "Total Users", value: "3", description: "All registered users", icon: <Users className="h-5 w-5 text-muted-foreground" /> },
    { title: "Students", value: "2", description: "Student accounts", icon: <GraduationCap className="h-5 w-5 text-muted-foreground" /> },
    { title: "Colleges", value: "0", description: "College accounts", icon: <Users className="h-5 w-5 text-muted-foreground" /> },
    { title: "Companies", value: "0", description: "Company accounts", icon: <Building className="h-5 w-5 text-muted-foreground" /> },
];

type User = {
    name: string;
    email: string;
    role: "student" | "admin" | "college" | "company";
}

export default function AdminDashboardPage() {
    const [users, setUsers] = useState<UserRecord[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchUsers() {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);


    const deleteUser = async (uid: string) => {
        try {
            await fetch(`/api/users/${uid}`, { method: 'DELETE' });
            setUsers(users.filter(user => user.uid !== uid));
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-headline">Hello, Admin</h1>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map(card => (
            <Card key={card.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    {card.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{card.title === 'Total Users' ? users.length : card.value}</div>
                    <p className="text-xs text-muted-foreground">{card.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
             <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View and manage all users on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end mb-4">
                        <Button disabled>
                            <UserPlus className="mr-2 h-4 w-4" /> Create User
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-2 font-medium text-muted-foreground">
                            <span>User</span>
                            <span>Role</span>
                            <span>Actions</span>
                        </div>
                        {loading ? <p>Loading users...</p> : users.map(user => (
                             <div key={user.uid} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3 border rounded-lg">
                                <div>
                                    <p className="font-medium capitalize">{user.displayName || user.email}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                                <Badge variant={user.email === 'admin@unihub.com' ? 'default' : 'secondary'} className="capitalize">
                                    {user.email === 'admin@unihub.com' ? 'admin' : 'student'}
                                </Badge>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" disabled={user.email === 'admin@unihub.com'}>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete User
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the user account.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => deleteUser(user.uid)}
                                                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ))}
                         {users.length === 0 && !loading && (
                            <div className="text-center text-muted-foreground py-8">
                                No users found.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Invoice Generator</CardTitle>
                    <CardDescription>Manually enter student counts and rate to generate invoice totals.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Invoice Rate (per student)</label>
                            <Input defaultValue="500" />
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Total College Students</label>
                            <Input defaultValue="0" />
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center text-muted-foreground">
                            <span>Description</span>
                            <span>Student Count</span>
                            <span>Total Amount</span>
                        </div>
                        <div className="flex justify-between items-center font-medium py-2 border-t">
                            <span>Total Students Invoice</span>
                            <span>0</span>
                            <span>₹0</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-base py-2 border-t bg-secondary/50 -mx-6 px-6">
                            <span>Grand Total</span>
                             <span>0</span>
                            <span>₹0</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
