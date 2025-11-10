'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Package, Users, ShoppingCart, TrendingUp, ArrowUpRight, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Stats {
  users: { total: number; change: number; newThisMonth: number };
  products: { total: number; change: number; newThisMonth: number };
  orders: { total: number; change: number; newThisMonth: number };
  revenue: { total: number; change: number; thisMonth: number };
}

interface Activity {
  user: string;
  action: string;
  time: string;
  amount: string;
  type: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

interface ChartData {
  month: string;
  revenue: number;
  orders: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, activityRes, chartRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/activity'),
        fetch('/api/admin/revenue-chart'),
      ]);

      if (statsRes.ok && activityRes.ok && chartRes.ok) {
        const statsData = await statsRes.json();
        const activityData = await activityRes.json();
        const chartDataRes = await chartRes.json();
        setStats(statsData);
        setActivities(activityData.activities);
        setChartData(chartDataRes.data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const analyticsData = stats ? [
    {
      title: 'Total Revenue',
      value: `Rs ${stats.revenue.total.toFixed(2)}`,
      change: `${stats.revenue.change >= 0 ? '+' : ''}${stats.revenue.change}%`,
      changeText: 'from last month',
      icon: DollarSign,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
    },
    {
      title: 'Products',
      value: stats.products.total.toString(),
      change: `${stats.products.change >= 0 ? '+' : ''}${stats.products.change}%`,
      changeText: 'from last month',
      icon: Package,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
    },
    {
      title: 'Users',
      value: stats.users.total.toString(),
      change: `${stats.users.change >= 0 ? '+' : ''}${stats.users.change}%`,
      changeText: 'from last month',
      icon: Users,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
    },
    {
      title: 'Orders',
      value: stats.orders.total.toString(),
      change: `${stats.orders.change >= 0 ? '+' : ''}${stats.orders.change}%`,
      changeText: 'from last month',
      icon: ShoppingCart,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
    },
  ] : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
          <p className="text-blue-100">Here's what's happening with your store today.</p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Analytics Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {analyticsData.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-50`} />
              
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {item.title}
                </CardTitle>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`p-2 rounded-xl bg-gradient-to-r ${item.gradient}`}
                >
                  <item.icon className="h-5 w-5 text-white" />
                </motion.div>
              </CardHeader>
              
              <CardContent className="relative">
                <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  {item.value}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className={`flex items-center gap-1 text-xs font-medium bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {item.change}
                  </motion.div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.changeText}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts and Activity */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Overview Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-4"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Revenue Overview
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Monthly revenue trends
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                >
                  <Activity className="h-5 w-5 text-blue-600" />
                </motion.div>
              </div>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-80">
                {chartData.length === 0 ? (
                  <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl">
                    <p className="text-slate-400">No revenue data yet</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                      <XAxis 
                        dataKey="month" 
                        stroke="#64748b"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#64748b"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `Rs ${value}`}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ffffff',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                        labelStyle={{
                          color: '#ffffff',
                          fontWeight: 'bold',
                        }}
                        itemStyle={{
                          color: '#ffffff',
                        }}
                        formatter={(value: any, name: string) => {
                          if (name === 'revenue') return [`Rs ${value.toFixed(2)}`, 'Revenue'];
                          return [value, 'Orders'];
                        }}
                      />
                      <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                        {chartData.map((entry, index) => {
                          const colors = [
                            '#3b82f6', // blue
                            '#a855f7', // purple
                            '#f97316', // orange
                            '#10b981', // green
                            '#eab308', // yellow
                            '#6366f1', // indigo
                          ];
                          return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-3"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Recent Activity
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Latest updates
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No recent activity</p>
                ) : (
                  activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mt-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {activity.user}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {activity.action}
                      </p>
                    </div>
                    <div className="text-right">
                      {activity.amount && (
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {activity.amount}
                        </p>
                      )}
                      <p className="text-xs text-slate-400">{activity.time}</p>
                    </div>
                  </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid gap-4 md:grid-cols-3"
      >
        {[
          { title: 'Add Product', icon: Package, gradient: 'from-blue-500 to-cyan-500', path: '/admin/products' },
          { title: 'View Orders', icon: ShoppingCart, gradient: 'from-purple-500 to-pink-500', path: '/admin/orders' },
          { title: 'Manage Users', icon: Users, gradient: 'from-orange-500 to-red-500', path: '/admin/users' },
        ].map((action, index) => (
          <motion.button
            key={index}
            onClick={() => router.push(action.path)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden p-6 rounded-xl bg-gradient-to-r ${action.gradient} text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
          >
            <div className="flex items-center gap-3">
              <action.icon className="h-6 w-6" />
              <span className="font-semibold">{action.title}</span>
              <ArrowUpRight className="h-5 w-5 ml-auto" />
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
