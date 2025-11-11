'use client';

import { useEffect, useState } from 'react';
import { signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminLogoutPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'restoring' | 'done'>('checking');
  const [message, setMessage] = useState('Logging out from admin...');

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Check if there's a saved user session
        const savedSession = localStorage.getItem('savedUserSession');
        const isAdminSession = localStorage.getItem('isAdminSession');

        if (savedSession && isAdminSession === 'true') {
          const userData = JSON.parse(savedSession);
          
          setMessage('Admin logged out. Restoring your previous session...');
          setStatus('restoring');

          // Sign out admin
          await signOut({ redirect: false });
          
          // Wait for sign out
          await new Promise(resolve => setTimeout(resolve, 800));

          // Clear admin markers
          localStorage.removeItem('isAdminSession');
          localStorage.removeItem('savedUserSession');

          setMessage(`Welcome back, ${userData.name}!`);
          setStatus('done');

          // Redirect to home after a moment
          setTimeout(() => {
            window.location.href = `/auth/login?restore=true&email=${encodeURIComponent(userData.email)}&name=${encodeURIComponent(userData.name)}`;
          }, 1500);
        } else {
          // No saved session, just sign out
          setMessage('Logging out...');
          await signOut({ redirect: false });
          
          await new Promise(resolve => setTimeout(resolve, 500));
          
          setMessage('Logged out successfully');
          setStatus('done');
          
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        }
      } catch (error) {
        console.error('Logout error:', error);
        await signOut({ callbackUrl: '/' });
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white/10 backdrop-blur-xl">
        <CardContent className="pt-12 pb-12">
          <div className="flex flex-col items-center space-y-6">
            {status === 'done' ? (
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
            ) : (
              <Loader2 className="w-16 h-16 animate-spin text-white" />
            )}
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">
                {status === 'checking' && 'Logging Out...'}
                {status === 'restoring' && 'Restoring Session...'}
                {status === 'done' && 'Complete!'}
              </h2>
              <p className="text-gray-300 text-sm">
                {message}
              </p>
            </div>

            {status === 'restoring' && (
              <div className="w-full max-w-xs bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" style={{ width: '100%' }} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
