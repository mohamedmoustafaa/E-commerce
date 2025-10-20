"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Eye, Package, Calendar, CreditCard, MapPin } from 'lucide-react';
import MyToken from '@/Utilities/MyToken';

interface Product {
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  count: number;
  price: number;
}

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

interface Order {
  _id: string;
  user: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress: ShippingAddress;
  createdAt: string;
  products: Product[];
}

interface ApiResponse {
  results?: number;
  data?: Order[];
}

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const tokenData = await MyToken();
        if (!tokenData) throw new Error('Please login to view your orders');

        console.log("Token Data:", tokenData);

        let userId: string | null = null;
        if (typeof tokenData === 'object' && tokenData !== null) {
          userId = (tokenData as any).id || (tokenData as any).userId || (tokenData as any).sub;
        } else if (typeof tokenData === 'string') {
          try {
            const payload = JSON.parse(atob(tokenData.split('.')[1]));
            userId = payload.id || payload.userId || payload.sub;
          } catch (e) {
            console.error("Error parsing JWT:", e);
          }
        }

        console.log("User ID from token:", userId);
        if (!userId) throw new Error('User ID not found in token');

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
          headers: {
            "token": String(tokenData),
            "Content-Type": "application/json",
          },
        });

        console.log("API Response status:", response.status);

        if (!response.ok) {
          console.log("User-specific endpoint failed, trying general endpoint...");
          const generalResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`, {
            headers: {
              "token": String(tokenData),
              "Content-Type": "application/json",
            },
          });

          if (!generalResponse.ok) {
            throw new Error(`Failed to load orders: ${generalResponse.status}`);
          }

          const generalData: ApiResponse = await generalResponse.json();
          const myOrders = (generalData.data || []).filter(order => order.user === userId);
          setOrders(myOrders);
          return;
        }

        // ✅ هنا التعديل المهم
        const data = await response.json();
        console.log("User-specific orders:", data);

        // بعض الـ API بيرجع Array مباشرة، وبعضها جوه data
        const ordersData = Array.isArray(data) ? data : data.data || [];
        setOrders(ordersData);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        console.error("Error:", err);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown date';
    }
  };

  const getStatusText = (isPaid: boolean, isDelivered: boolean) => {
    if (isDelivered) return 'Delivered';
    if (isPaid) return 'Paid';
    return 'Processing';
  };

  const getStatusColor = (isPaid: boolean, isDelivered: boolean) => {
    if (isDelivered) return 'text-green-600';
    if (isPaid) return 'text-blue-600';
    return 'text-yellow-600';
  };

  const handleViewOrder = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-4 w-20 ml-auto" />
                  <Skeleton className="h-6 w-24 ml-auto" />
                </div>
                <Skeleton className="h-10 w-24 ml-6" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Package className="w-8 h-8 text-emerald-500" />
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </span>
      </div>

      {error && (
        <Card className="p-6 mb-6 border-red-200 bg-red-50">
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-3">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              size="sm"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              Try Again
            </Button>
          </div>
        </Card>
      )}

      {!loading && orders.length === 0 && !error && (
        <Card className="p-12 text-center border-dashed border-2 border-gray-300">
          <Package className="w-20 h-20 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Orders Yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You haven't placed any orders yet. Start shopping and your orders will appear here!
          </p>
          <Button 
            onClick={() => router.push('/')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Start Shopping
          </Button>
        </Card>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order._id} className="p-6 hover:shadow-lg transition-all duration-300 border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <Package className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      Order #{order._id?.slice(-8)?.toUpperCase() || 'N/A'}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-3">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.isPaid, order.isDelivered)} bg-opacity-10`}>
                    {getStatusText(order.isPaid, order.isDelivered)}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 border text-sm font-medium">
                    <CreditCard className="w-4 h-4" />
                    {order.paymentMethodType === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {order.shippingAddress?.city}, {order.shippingAddress?.details}
                  </span>
                </div>
              </div>

              <div className="text-right ml-6">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  {order.totalOrderPrice?.toLocaleString('en-US') || 0} EGP
                </p>
                <Button 
                  onClick={() => handleViewOrder(order._id)}
                  variant="outline" 
                  className="flex items-center gap-2 border-emerald-500 text-black-700 hover:bg-emerald-600 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Products ({order.products?.length || 0})
              </p>
              <div className="flex gap-2 flex-wrap">
                {order.products?.slice(0, 3).map((product, index) => (
                  <span 
                    key={product._id || index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {product.product?.title} × {product.count}
                  </span>
                ))}
                {order.products && order.products.length > 3 && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    +{order.products.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
