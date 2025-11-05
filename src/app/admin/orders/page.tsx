import {
    MoreHorizontal,
  } from 'lucide-react';
  import { Badge } from '@/components/ui/badge';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { Button } from '@/components/ui/button';
  
  const mockOrders = [
    { id: 'ORD001', customer: 'Liam Johnson', date: '2023-11-23', status: 'Fulfilled', total: 250.00 },
    { id: 'ORD002', customer: 'Olivia Smith', date: '2023-11-22', status: 'Fulfilled', total: 150.75 },
    { id: 'ORD003', customer: 'Noah Williams', date: '2023-11-21', status: 'Refunded', total: 350.00 },
    { id: 'ORD004', customer: 'Emma Brown', date: '2023-11-20', status: 'Fulfilled', total: 450.50 },
    { id: 'ORD005', customer: 'Ava Jones', date: '2023-11-19', status: 'Fulfilled', total: 550.00 },
  ];
  
  export default function AdminOrdersPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            A list of all recent orders from your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.customer}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{order.date}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant={order.status === 'Fulfilled' ? 'secondary' : order.status === 'Refunded' ? 'destructive' : 'outline'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  