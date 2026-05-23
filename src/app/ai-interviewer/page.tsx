'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Mic, MicOff, Video, VideoOff, ArrowLeft } from 'lucide-react';
import { AnimatedHeading } from '@/components/animated-heading';
import Link from 'next/link';

export default function AIInterviewerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup stream when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startInterview = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch (err: any) {
      setError('Could not access camera and microphone. Please grant permissions in your browser.');
      console.error(err);
    }
  };

  const toggleMic = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicMuted(!trackEnabled(audioTracks));
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!trackEnabled(videoTracks));
    }
  };

  const trackEnabled = (tracks: MediaStreamTrack[]) => {
    return tracks.length > 0 && tracks[0].enabled;
  };

  return (
    <div className="container mx-auto py-10 min-h-screen">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="text-center mb-10">
        <AnimatedHeading text="AI Interviewer" className="font-headline text-4xl font-bold" />
        <p className="mt-4 text-lg text-muted-foreground">
          Practice your interview skills with real-time AI feedback.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 shadow-xl">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-primary" />
              AI Recruiter
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[400px] bg-gradient-to-b from-transparent to-primary/5">
             <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center animate-pulse shadow-[0_0_40px_rgba(var(--primary),0.2)]">
                <Bot className="w-16 h-16 text-primary" />
             </div>
             <p className="mt-8 font-medium text-center px-6 text-lg">
               {stream ? "Hello! I'm your AI interviewer. I'm analyzing your responses and expressions. Let's begin when you are ready." : "Waiting for you to join..."}
             </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 shadow-xl">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle>Your Camera</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative bg-zinc-950 h-[400px] flex flex-col items-center justify-center">
              {!stream ? (
                <div className="p-6 text-center max-w-sm">
                  <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Video className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Camera & Mic Check</h3>
                  <p className="text-zinc-400 mb-8 text-sm">We need access to your camera and microphone to conduct the AI interview.</p>
                  <Button size="lg" onClick={startInterview} className="w-full text-md h-12">
                    Grant Access & Join
                  </Button>
                  {error && <p className="text-red-400 mt-4 text-sm bg-red-400/10 p-3 rounded-md border border-red-400/20">{error}</p>}
                </div>
              ) : (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`}
                  />
                  {isVideoOff && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
                       <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                         <VideoOff className="w-10 h-10 text-zinc-500" />
                       </div>
                       <span className="text-zinc-500 font-medium">Camera is disabled</span>
                    </div>
                  )}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-zinc-950/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
                    <Button variant={isMicMuted ? "destructive" : "secondary"} size="icon" onClick={toggleMic} className="rounded-full w-12 h-12">
                      {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </Button>
                    <Button variant={isVideoOff ? "destructive" : "secondary"} size="icon" onClick={toggleVideo} className="rounded-full w-12 h-12">
                      {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
