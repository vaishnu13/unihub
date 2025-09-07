'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, GraduationCap, Building, FileText, MoreHorizontal, UserPlus } from "lucide-react";

const statCards = [
    { title: "Total Users", value: "3", description: "All registered users", icon: <Users className="h-5 w-5 text-muted-foreground" /> },
    { title: "Students", value: "2", description: "Student accounts", icon: <GraduationCap className="h-5 w-5 text-muted-foreground" /> },
    { title: "Colleges", value: "0", description: "College accounts", icon: <Users className="h-5 w-5 text-muted-foreground" /> },
    { title: "Companies", value: "0", description: "Company accounts", icon: <Building className="h-5 w-5 text-muted-foreground" /> },
];

const users = [
    { name: "vaishnu vindula", email: "vaishnu7070@gmail.com", role: "student" },
    { name: "Manaswini K", email: "manukommanapalli@gmail.com", role: "student" },
    { name: "vaishnu vindula", email: "admin@unihub.com", role: "admin" },
]

export default function AdminDashboardPage() {
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
                    <div className="text-2xl font-bold">{card.value}</div>
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
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" /> Create User
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-2 font-medium text-muted-foreground">
                            <span>User</span>
                            <span>Role</span>
                            <span>Actions</span>
                        </div>
                        {users.map(user => (
                             <div key={user.email} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3 border rounded-lg">
                                <div>
                                    <p className="font-medium capitalize">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="capitalize">{user.role}</Badge>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
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
