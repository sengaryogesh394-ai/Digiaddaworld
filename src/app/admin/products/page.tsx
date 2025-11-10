'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  media: { id: string; url: string; hint: string; type: string }[];
  category: string;
  status: string;
  isFeatured: boolean;
  stock: number;
  sales: number;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, statusFilter]);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      // For admin, fetch all products or filter by specific status
      if (statusFilter === 'all') {
        params.append('status', 'all'); // Fetch all statuses
      } else {
        params.append('status', statusFilter);
      }
      
      console.log('Fetching products with filter:', statusFilter);
      console.log('API URL:', `/api/products?${params.toString()}`);
      
      const response = await fetch(`/api/products?${params.toString()}`);
      const result = await response.json();
      
      console.log('Fetched products:', result.data?.length, 'products');
      console.log('Products by status:', result.data?.reduce((acc: any, p: any) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      }, {}));
      
      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    
    setDeleting(id);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Product deleted successfully"
        });
        fetchProducts();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive"
      });
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (slug: string) => {
    router.push(`/admin/products/${slug}/edit`);
  };

  const handleView = (slug: string) => {
    window.open(`/shop/${slug}`, '_blank');
  };

  const handleStatusToggle = async (id: string, currentStatus: string, name: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success",
          description: `"${name}" is now ${newStatus}`
        });
        fetchProducts();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update product status",
        variant: "destructive"
      });
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Products
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your products and view their sales performance
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/admin/products/new">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <Tabs defaultValue="all" value={statusFilter} onValueChange={setStatusFilter}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <TabsList className="bg-white dark:bg-slate-800 shadow-md">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Active
            </TabsTrigger>
            <TabsTrigger value="inactive" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Inactive
            </TabsTrigger>
            <TabsTrigger value="out_of_stock" className="hidden sm:flex data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Out of Stock
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 sm:ml-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" variant="outline" className="h-10 gap-1">
                <File className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <TabsContent value={statusFilter}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">
                  {statusFilter === 'all' ? 'All Products' : 
                   statusFilter === 'active' ? 'Active Products' :
                   statusFilter === 'inactive' ? 'Inactive Products' :
                   'Out of Stock Products'}
                </CardTitle>
                <CardDescription>
                  {statusFilter === 'all' ? 'A complete list of all your products' :
                   statusFilter === 'active' ? 'Products currently visible on your website' :
                   statusFilter === 'inactive' ? 'Products hidden from customers' :
                   'Products that need restocking'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-700">
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Price</TableHead>
                      <TableHead className="hidden md:table-cell font-semibold">
                        Category
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          Loading products...
                        </TableCell>
                      </TableRow>
                    ) : products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No products found. <Link href="/admin/products/new" className="text-blue-600 hover:underline">Add your first product</Link>
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product: Product, index: number) => (
                      <motion.tr
                        key={product._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                        className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                      >
                        <TableCell className="hidden sm:table-cell">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="relative overflow-hidden rounded-lg"
                          >
                            <Image
                              alt={product.name}
                              className="aspect-square rounded-lg object-cover ring-2 ring-slate-200 dark:ring-slate-700"
                              height="64"
                              src={product.media[0].url}
                              width="64"
                              data-ai-hint={product.media[0].hint}
                            />
                          </motion.div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`font-semibold ${
                            product.status === 'active'
                              ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                              : product.status === 'inactive'
                              ? 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800'
                              : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                          }`}>
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              product.status === 'active' ? 'bg-green-500' : product.status === 'inactive' ? 'bg-gray-500' : 'bg-red-500'
                            }`}></span>
                            {product.status === 'active' ? 'Active' : product.status === 'inactive' ? 'Inactive' : 'Out of Stock'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">Rs {product.price.toFixed(2)}</TableCell>
                        <TableCell className="hidden md:table-cell text-slate-600 dark:text-slate-400">
                          {product.category}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </motion.div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleView(product.slug)}>
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(product.slug)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {product.status === 'active' ? (
                                <DropdownMenuItem 
                                  className="text-orange-600"
                                  onClick={() => handleStatusToggle(product._id, product.status, product.name)}
                                >
                                  Mark as Inactive
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem 
                                  className="text-green-600"
                                  onClick={() => handleStatusToggle(product._id, product.status, product.name)}
                                >
                                  Mark as Active
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDelete(product._id, product.name)}
                                disabled={deleting === product._id}
                              >
                                {deleting === product._id ? 'Deleting...' : 'Delete'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Showing <strong className="text-slate-900 dark:text-white">{products.length}</strong> product{products.length !== 1 ? 's' : ''}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
