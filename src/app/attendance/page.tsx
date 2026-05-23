'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedHeading } from '@/components/animated-heading';
import { ArrowLeft, Users, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AttendancePage() {
  return (
    <div className="container mx-auto py-10 min-h-screen">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="text-center mb-10">
        <AnimatedHeading text="Serverless Attendance" className="font-headline text-4xl font-bold" />
        <p className="mt-4 text-lg text-muted-foreground">
          Lightning-fast attendance tracking powered by serverless infrastructure.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-2">
            <Users className="w-10 h-10 mx-auto text-primary mb-2" />
            <CardTitle>Students Present</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <span className="text-4xl font-bold">1,245</span>
            <p className="text-sm text-muted-foreground mt-2">Today across all branches</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-2">
            <Calendar className="w-10 h-10 mx-auto text-primary mb-2" />
            <CardTitle>Average Attendance</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <span className="text-4xl font-bold">92%</span>
            <p className="text-sm text-muted-foreground mt-2">This semester</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-2">
            <CheckCircle className="w-10 h-10 mx-auto text-primary mb-2" />
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
             <span className="text-2xl font-bold text-green-500">All Systems Operational</span>
             <p className="text-sm text-muted-foreground mt-2">Serverless backend routing optimal</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-4xl mx-auto mt-12 bg-white/5 border border-white/10 rounded-xl p-8 text-center backdrop-blur-md">
         <h3 className="text-2xl font-semibold mb-4">Mark Attendance</h3>
         <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Scan your student ID or use the facial recognition terminal to instantly log your attendance into the serverless database.
         </p>
         <div className="w-64 h-64 mx-auto border-2 border-dashed border-primary/40 rounded-2xl flex items-center justify-center bg-black/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/10 -translate-y-full group-hover:translate-y-full transition-transform duration-1000"></div>
            <span className="text-muted-foreground text-sm font-medium">Waiting for Scanner...</span>
         </div>
      </div>
    </div>
  );
}
