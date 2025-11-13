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
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  Hash,
  Receipt
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import Link from 'next/link';

interface PurchaseDetails {
  _id: string;
  productId: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  downloadLink?: string;
  customerEmail: string;
  customerPhone?: string;
  customerName?: string;
  paymentStatus: 'pending' | 'success' | 'failed' | 'cancelled';
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  paymentCompletedAt?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  paymentMethod?: string;
  receiptId: string;
  notes?: Record<string, any>;
  failureReason?: string;
  userAgent?: string;
  ipAddress?: string;
  source?: string;
}

interface PageProps {
  params: { id: string };
}

export default function PurchaseDetailsPage({ params }: PageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [purchase, setPurchase] = useState<PurchaseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user && params.id) {
      fetchPurchaseDetails();
    }
  }, [session, params.id]);

  const fetchPurchaseDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/purchases/${params.id}`);
      const result = await response.json();

      if (result.success) {
        setPurchase(result.data);
      } else {
        setError(result.error || 'Purchase not found');
      }
    } catch (err) {
      setError('Failed to fetch purchase details');
      console.error('Error fetching purchase details:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
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
      <Badge className={`${variants[status as keyof typeof variants] || variants.pending} text-sm px-3 py-1`}>
        {getStatusIcon(status)}
        <span className="ml-2 capitalize font-medium">{status}</span>
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
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
            <p className="text-gray-600">Loading purchase details...</p>
          </div>
        </div>
        <Footer />
      </CartProvider>
    );
  }

  if (!session) {
    return null;
  }

  if (error) {
    return (
      <CartProvider>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
          <div className="container max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Purchase Not Found</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button asChild>
                  <Link href="/purchases">Back to Purchases</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Link href="/purchases">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Purchases
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Purchase Details
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Complete information about your purchase
                </p>
              </div>
            </div>

            {purchase && (
              <div className="space-y-6">
                {/* Purchase Overview */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{purchase.productName}</CardTitle>
                        <CardDescription className="text-lg">{purchase.productCategory}</CardDescription>
                      </div>
                      {getStatusBadge(purchase.paymentStatus)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{formatCurrency(purchase.amount)}</span>
                      {purchase.downloadLink && purchase.paymentStatus === 'success' && (
                        <Button asChild size="lg">
                          <a href={purchase.downloadLink} target="_blank" rel="noopener noreferrer">
                            <Download className="h-5 w-5 mr-2" />
                            Download Product
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Purchase Information */}
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Order Details */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Order Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            Order ID
                          </span>
                          <span className="font-mono text-sm">{purchase.receiptId}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Order Date
                          </span>
                          <span className="text-sm">{formatDate(purchase.createdAt)}</span>
                        </div>

                        {purchase.paymentCompletedAt && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Completed At
                            </span>
                            <span className="text-sm">{formatDate(purchase.paymentCompletedAt)}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Order Status</span>
                          <Badge variant="outline" className="capitalize">{purchase.orderStatus}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Details */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
                          <span className="font-semibold">{formatCurrency(purchase.amount)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Currency</span>
                          <span className="text-sm">{purchase.currency}</span>
                        </div>

                        {purchase.paymentMethod && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Payment Method</span>
                            <span className="text-sm capitalize">{purchase.paymentMethod}</span>
                          </div>
                        )}

                        {purchase.razorpayPaymentId && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Payment ID</span>
                            <span className="font-mono text-sm">{purchase.razorpayPaymentId}</span>
                          </div>
                        )}

                        {purchase.razorpayOrderId && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Razorpay Order ID</span>
                            <span className="font-mono text-sm">{purchase.razorpayOrderId}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Customer Information */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                            <p className="font-medium">{purchase.customerEmail}</p>
                          </div>
                        </div>

                        {purchase.customerPhone && (
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                              <p className="font-medium">{purchase.customerPhone}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        {purchase.customerName && (
                          <div className="flex items-center gap-3">
                            <User className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                              <p className="font-medium">{purchase.customerName}</p>
                            </div>
                          </div>
                        )}

                        {purchase.source && (
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Source</p>
                              <p className="font-medium capitalize">{purchase.source}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Failure Reason (if failed) */}
                {purchase.paymentStatus === 'failed' && purchase.failureReason && (
                  <Card className="border-0 shadow-lg border-red-200 dark:border-red-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <XCircle className="h-5 w-5" />
                        Payment Failure Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-red-600 dark:text-red-400">{purchase.failureReason}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Additional Notes */}
                {purchase.notes && Object.keys(purchase.notes).length > 0 && (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Additional Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(purchase.notes).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="text-sm font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  {purchase.downloadLink && purchase.paymentStatus === 'success' && (
                    <Button asChild size="lg" className="flex-1">
                      <a href={purchase.downloadLink} target="_blank" rel="noopener noreferrer">
                        <Download className="h-5 w-5 mr-2" />
                        Download Product
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  )}
                  
                  <Button variant="outline" size="lg" asChild className="flex-1">
                    <Link href="/purchases">
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Back to All Purchases
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </CartProvider>
  );
}
