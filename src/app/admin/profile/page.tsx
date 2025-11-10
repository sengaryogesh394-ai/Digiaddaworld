'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Edit, Save, X, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function AdminProfilePage() {
  const { data: session, update } = useSession();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
      });
    }
  }, [session]);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Name cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name }),
      });

      if (response.ok) {
        await update({ name: formData.name });
        toast({
          title: 'Success',
          description: 'Profile updated successfully!',
        });
        setIsEditing(false);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: session?.user?.name || '',
    });
    setIsEditing(false);
  };

  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your admin account settings
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50"></div>
                <Avatar className="h-24 w-24 relative border-4 border-white dark:border-gray-800">
                  <AvatarImage src={session.user?.image || ''} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-3xl">
                    {session.user?.name?.charAt(0).toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardTitle className="text-2xl">
              {session.user?.name || 'Admin'}
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-2 mt-2">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Shield className="h-3 w-3 mr-1" />
                Administrator
              </Badge>
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Profile Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </div>
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSave} 
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    disabled={loading}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="Enter your name"
                  className="text-base"
                  disabled={loading}
                />
              ) : (
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-base font-medium">
                  {session.user?.name || 'Not set'}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-base">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-base font-medium text-slate-500">
                {session.user?.email}
                <span className="ml-2 text-xs">(Cannot be changed)</span>
              </div>
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4" />
                Account Role
              </Label>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-base">
                  <Shield className="h-3 w-3 mr-1" />
                  Administrator
                </Badge>
              </div>
            </div>

            {/* Member Since */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Member Since
              </Label>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-base font-medium">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Quick Access</CardTitle>
            <CardDescription>Manage your admin panel</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto py-4 justify-start" asChild>
              <a href="/admin/dashboard">
                <div className="text-left">
                  <div className="font-semibold">Dashboard</div>
                  <div className="text-sm text-muted-foreground">View analytics</div>
                </div>
              </a>
            </Button>
            <Button variant="outline" className="h-auto py-4 justify-start" asChild>
              <a href="/admin/products">
                <div className="text-left">
                  <div className="font-semibold">Products</div>
                  <div className="text-sm text-muted-foreground">Manage products</div>
                </div>
              </a>
            </Button>
            <Button variant="outline" className="h-auto py-4 justify-start" asChild>
              <a href="/admin/users">
                <div className="text-left">
                  <div className="font-semibold">Users</div>
                  <div className="text-sm text-muted-foreground">Manage users</div>
                </div>
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
