'use client';

import React, { useState, useEffect } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasExistingSession, setHasExistingSession] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        
        if (session?.user) {
          // User is logged in but trying to access admin login
          setHasExistingSession(true);
          
          // If already admin, redirect to dashboard
          if (session.user.role === 'admin') {
            router.push('/admin/dashboard');
          } else {
            // Regular user trying to access admin area
            // Save the regular user session for later restoration
            localStorage.setItem('savedUserSession', JSON.stringify({
              email: session.user.email,
              name: session.user.name,
              savedAt: Date.now()
            }));
            
            toast({
              title: 'User Session Saved',
              description: 'Your user session will be restored when admin logs out.',
            });
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      }
    };
    
    checkSession();
  }, [router, toast]);

  // Check for error in URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    
    if (error === 'unauthorized') {
      toast({
        title: 'Access Denied',
        description: 'You need admin privileges to access this area.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Only render animations on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If there's an existing session, sign out first
      if (hasExistingSession) {
        await signOut({ redirect: false });
        // Wait for sign out to complete
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Sign in with admin credentials
      const result = await signIn('credentials', {
        email: formData.username,
        password: formData.password,
        redirect: false,
        callbackUrl: '/admin/dashboard',
      });

      if (result?.error) {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password. Please check your credentials.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Wait a moment for session to establish
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Check if user has admin role
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      
      if (session?.user?.role === 'admin') {
        // Mark that we're in admin mode
        localStorage.setItem('isAdminSession', 'true');
        
        toast({
          title: 'Success',
          description: 'Welcome back, Admin!',
        });
        
        // Use window.location for full page reload to ensure clean session
        window.location.href = '/admin/dashboard';
      } else {
        // Not an admin, sign them out
        await signOut({ redirect: false });
        toast({
          title: 'Access Denied',
          description: 'Only admin users can access this panel.',
          variant: 'destructive',
        });
        setLoading(false);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Animated background */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 bg-white rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-white">
              Admin Access
            </CardTitle>
            <CardDescription className="text-gray-300">
              Restricted area - Admin credentials required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Admin Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    type="email"
                    placeholder="digiadda@gmail.com"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Admin Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Access Admin Panel
                  </>
                )}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                ⚠️ Unauthorized access is prohibited
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
