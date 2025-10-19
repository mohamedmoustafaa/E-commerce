"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Eye, Package, Calendar, CreditCard } from 'lucide-react';
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
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = await MyToken();
        if (!token) {
          throw new Error('Token not available');
        }

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`, {
          headers: {
            token: String(token),
            "Content-Type": "application/json"
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load orders: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        setOrders(data.data || []);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        toast.error('Failed to load orders', { 
          position: 'top-center', 
          duration: 3000 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="space-y-2 text-right">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-10 w-20" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {error && (
        <Card className="p-6 mb-6 border-red-200 bg-red-50">
          <div className="text-center text-red-600">
            <p className="font-semibold mb-2">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              size="sm"
            >
              Try Again
            </Button>
          </div>
        </Card>
      )}

      {!loading && orders.length === 0 && !error && (
        <Card className="p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders</h3>
          <p className="text-gray-600 mb-4">You haven&apos;t placed any orders yet</p>
          <Button onClick={() => router.push('/')}>
            Start Shopping
          </Button>
        </Card>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order._id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Order #{order._id?.slice(-8)?.toUpperCase() || 'N/A'}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className={`font-medium ${getStatusColor(order.isPaid, order.isDelivered)}`}>
                    {getStatusText(order.isPaid, order.isDelivered)}
                  </span>
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4" />
                    {order.paymentMethodType === 'card' ? 'Card' : 'Cash'}
                  </span>
                </div>
              </div>

              {/* Order Price */}
              <div className="text-right mx-8">
                <p className="text-sm text-gray-600 mb-1">Order Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  {order.totalOrderPrice?.toLocaleString('en-US') || 0} EGP
                </p>
              </div>

              {/* View Button */}
              <Button 
                onClick={() => handleViewOrder(order._id)}
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}