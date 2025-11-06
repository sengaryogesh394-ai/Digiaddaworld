import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Package, Users, ShoppingCart } from 'lucide-react';

const analyticsData = [
  {
    title: 'Total Revenue',
    value: '₹45,231.89',
    change: '+20.1% from last month',
    icon: DollarSign,
  },
  {
    title: 'Products',
    value: '+2350',
    change: '+180.1% from last month',
    icon: Package,
  },
  {
    title: 'Users',
    value: '+12,234',
    change: '+19% from last month',
    icon: Users,
  },
  {
    title: 'Orders',
    value: '+573',
    change: '+201 since last hour',
    icon: ShoppingCart,
  },
];

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">{/* Chart would go here */}</CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>{/* Recent sales list would go here */}</CardContent>
        </Card>
      </div>
    </>
  );
}
