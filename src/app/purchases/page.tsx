'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Calendar, 
  CreditCard, 
  Package, 
  ExternalLink, 
  Filter,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import Link from 'next/link';

interface Purchase {
  _id: string;
  productId: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  downloadLink?: string;
  paymentStatus: 'pending' | 'success' | 'failed' | 'cancelled';
  orderStatus: string;
  createdAt: string;
  paymentCompletedAt?: string;
  razorpayPaymentId?: string;
  amount: number;
  receiptId: string;
}

interface PurchaseData {
  purchases: Purchase[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  summary: {
    totalPurchases: number;
    successfulPurchases: number;
    totalSpent: number;
  };
}

export default function PurchasesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [purchases, setPurchases] = useState<PurchaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchPurchases();
    }
  }, [session, currentPage, statusFilter]);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      });

      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      const response = await fetch(`/api/user/purchases?${params}`);
      const result = await response.json();

      if (result.success) {
        setPurchases(result.data);
      } else {
        setError(result.error || 'Failed to fetch purchases');
      }
    } catch (err) {
      setError('Failed to fetch purchases');
      console.error('Error fetching purchases:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.pending}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (status === 'loading' || loading) {
    return (
      <CartProvider>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your purchases...</p>
          </div>
        </div>
        <Footer />
      </CartProvider>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <CartProvider>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Profile
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  My Purchases
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  View and manage your digital product purchases
                </p>
              </div>
            </div>

            {/* Summary Cards */}
            {purchases && (
              <div className="grid gap-6 md:grid-cols-3 mb-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Purchases</p>
                        <p className="text-3xl font-bold">{purchases.summary.totalPurchases}</p>
                      </div>
                      <Package className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Successful</p>
                        <p className="text-3xl font-bold text-green-600">{purchases.summary.successfulPurchases}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</p>
                        <p className="text-3xl font-bold text-purple-600">{formatCurrency(purchases.summary.totalSpent)}</p>
                      </div>
                      <CreditCard className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Filters */}
            <Card className="mb-6 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search purchases..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="success">Successful</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Purchases List */}
            {error ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Error Loading Purchases</h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <Button onClick={fetchPurchases}>Try Again</Button>
                </CardContent>
              </Card>
            ) : purchases?.purchases.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Purchases Found</h3>
                  <p className="text-gray-600 mb-4">You haven't made any purchases yet.</p>
                  <Button asChild>
                    <Link href="/shop">Browse Products</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {purchases?.purchases.map((purchase) => (
                  <Card key={purchase._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold">{purchase.productName}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{purchase.productCategory}</p>
                            </div>
                            {getStatusBadge(purchase.paymentStatus)}
                          </div>
                          
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(purchase.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              <span>{formatCurrency(purchase.amount)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4" />
                              <span>#{purchase.receiptId}</span>
                            </div>
                            {purchase.razorpayPaymentId && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Payment ID: {purchase.razorpayPaymentId.slice(-8)}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          {purchase.downloadLink && purchase.paymentStatus === 'success' && (
                            <Button asChild size="sm">
                              <a href={purchase.downloadLink} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </Button>
                          )}
                          
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/purchases/${purchase._id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination */}
                {purchases && purchases.pagination.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={!purchases.pagination.hasPrevPage}
                    >
                      Previous
                    </Button>
                    <span className="flex items-center px-4 py-2 text-sm">
                      Page {purchases.pagination.currentPage} of {purchases.pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={!purchases.pagination.hasNextPage}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </CartProvider>
  );
}
