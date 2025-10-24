"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ArrowLeft, Package, MapPin, User, CreditCard } from 'lucide-react';
import MyToken from '@/Utilities/MyToken';
import Image from 'next/image';

interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
    brand?: {
      _id: string;
      name: string;
    };
    category?: {
      _id: string;
      name: string;
    };
    ratingsAverage?: number;
  };
}

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

interface Order {
  _id: string;
  user: UserInfo;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress: ShippingAddress;
  createdAt: string;
  cartItems: CartItem[]; // التغيير الأساسي هنا
}

interface ApiResponse {
  data?: Order;
  results?: number;
}

export default function OrderDetailsPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const token = await MyToken();
        
        
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${orderId}`, {
          headers: {
            token: String(token),
            "Content-Type": "application/json"
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load order: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        
        setOrder(data.data || null);
        
      } catch  {
        toast.error('Failed to load order details', { 
          position: 'top-center', 
          duration: 3000 
        });
        router.push('/allOrders');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, router]);

  // Safe data access functions
  const getOrderId = () => {
    return order?._id ? `#${order._id.slice(-6).toUpperCase()}` : '#N/A';
  };

  const getTotalPrice = () => {
    return order?.totalOrderPrice?.toLocaleString('en-US') || '0';
  };

  const getPaymentMethod = () => {
    return order?.paymentMethodType || 'N/A';
  };

  const getUserName = () => {
    return order?.user?.name || 'N/A';
  };

  const getUserEmail = () => {
    return order?.user?.email || 'N/A';
  };

  const getUserPhone = () => {
    return order?.user?.phone || order?.shippingAddress?.phone || 'N/A';
  };

  const getAddressDetails = () => {
    return order?.shippingAddress?.details || 'N/A';
  };

  const getCity = () => {
    return order?.shippingAddress?.city || 'N/A';
  };

  const getShippingPhone = () => {
    return order?.shippingAddress?.phone || 'N/A';
  };

  const getProducts = () => {
    return order?.cartItems || []; // التغيير هنا
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Button onClick={() => router.push('/allOrders')}>
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button 
        variant="ghost" 
        onClick={() => router.push('/allOrders')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 ml-2" />
        Back to Orders
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Order Info */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Info
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600">Order ID: </span>
              <span className="font-medium">{getOrderId()}</span>
            </div>
            <div>
              <span className="text-gray-600">Total Payment Price: </span>
              <span className="font-medium">{getTotalPrice()} EGP</span>
            </div>
            <div>
              <span className="text-gray-600">Payment Method: </span>
              <span className="font-medium">{getPaymentMethod()}</span>
            </div>
            <div>
              <span className="text-gray-600">Status: </span>
              <Badge className={order.isPaid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                {order.isPaid ? 'Paid' : 'Pending'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Address Info */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Address Info
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600">Address Details: </span>
              <span className="font-medium">{getAddressDetails()}</span>
            </div>
            <div>
              <span className="text-gray-600">City: </span>
              <span className="font-medium">{getCity()}</span>
            </div>
            <div>
              <span className="text-gray-600">Phone: </span>
              <span className="font-medium">{getShippingPhone()}</span>
            </div>
          </div>
        </Card>

        {/* Customer Info */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Customer Info
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600">Name: </span>
              <span className="font-medium">{getUserName()}</span>
            </div>
            <div>
              <span className="text-gray-600">Email: </span>
              <span className="font-medium">{getUserEmail()}</span>
            </div>
            <div>
              <span className="text-gray-600">Phone: </span>
              <span className="font-medium">{getUserPhone()}</span>
            </div>
          </div>
        </Card>

        {/* Payment Info */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Info
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600">Payment Status: </span>
              <Badge className={order.isPaid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                {order.isPaid ? 'Paid' : 'Pending Payment'}
              </Badge>
            </div>
            <div>
              <span className="text-gray-600">Delivery Status: </span>
              <Badge className={order.isDelivered ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                {order.isDelivered ? 'Delivered' : 'In Delivery'}
              </Badge>
            </div>
            <div>
              <span className="text-gray-600">Order Date: </span>
              <span className="font-medium">
                {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US') : 'N/A'}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Products Table */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">PRODUCTS</h2>
        
        {getProducts().length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right pb-3 font-semibold">PRODUCT</th>
                    <th className="text-center pb-3 font-semibold">PRICE</th>
                    <th className="text-center pb-3 font-semibold">QUANTITY</th>
                    <th className="text-left pb-3 font-semibold">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {getProducts().map((cartItem) => (
                    <tr key={cartItem._id} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {cartItem.product?.imageCover ? (
                              <Image
                                src={cartItem.product.imageCover}
                                alt={cartItem.product?.title || 'Product image'}
                                width={64}
                                height={64}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            ) : (
                              <Package className="w-6 h-6 text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-medium block">
                              {cartItem.product?.title || 'Unknown Product'}
                            </span>
                            {cartItem.product?.brand?.name && (
                              <span className="text-sm text-gray-500 block">
                                Brand: {cartItem.product.brand.name}
                              </span>
                            )}
                            {cartItem.product?.ratingsAverage && (
                              <span className="text-sm text-yellow-500 block">
                                ⭐ {cartItem.product.ratingsAverage}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        {cartItem.price?.toLocaleString('en-US') || 0} EGP
                      </td>
                      <td className="py-4 text-center">
                        {cartItem.count || 0}
                      </td>
                      <td className="py-4 text-left font-semibold">
                        {((cartItem.price || 0) * (cartItem.count || 0)).toLocaleString('en-US')} EGP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t">
              <div className="text-lg font-semibold">Order Total:</div>
              <div className="text-2xl font-bold text-gray-900">
                {getTotalPrice()} EGP
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No products found in this order
          </div>
        )}
      </Card>
    </div>
  );
}