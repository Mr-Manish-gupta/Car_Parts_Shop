const BASE_URL = "";

export const api = {
  LOGIN: () => `${BASE_URL}/auth/login`,
  REGISTER: () => `${BASE_URL}/auth/register`,

  PRODUCT_ALL: () => `${BASE_URL}/products`,
  PRODUCT_BY_ID: (id: string | number) => `${BASE_URL}/products/${id}`,
  PRODUCT_BY_CATEGORY: (categoryId: string | number) => `${BASE_URL}/products/category/${categoryId}`,
  CATEGORIES: () => `${BASE_URL}/categories`,
  CARS_ALL: () => `${BASE_URL}/cars`,

  // 🛒 Cart Endpoints (PostgreSQL)
  CART_GET: () => `${BASE_URL}/cart`,
  CART_ADD: () => `${BASE_URL}/cart`,
  CART_ITEM_DELETE: (itemId: string | number) => `${BASE_URL}/cart/items/${itemId}`,

  // 📍 Addresses Endpoints (PostgreSQL)
  ADDRESS_ALL: () => `${BASE_URL}/addresses`,
  ADDRESS_ADD: () => `${BASE_URL}/addresses`,
  ADDRESS_DELETE: (id: string | number) => `${BASE_URL}/addresses/${id}`,

  // 🧾 Orders & Checkout Endpoints (PostgreSQL)
  ORDER_PLACE: (addressId?: string | number) =>
    addressId ? `${BASE_URL}/orders?addressId=${addressId}` : `${BASE_URL}/orders`,
  MY_ORDERS: () => `${BASE_URL}/orders/my`,
  ORDER_BY_ID: (id: string | number) => `${BASE_URL}/orders/${id}`,
  ORDER_UPDATE_STATUS: (id: string | number, status: string) => `${BASE_URL}/orders/${id}/status?status=${status}`,

  // 🏷️ Coupon Endpoints
  COUPON_APPLY: () => `${BASE_URL}/coupons/apply`,
  COUPON_ACTIVE: () => `${BASE_URL}/coupons/active`,

  // 🏪 Seller Endpoints
  SELLER_APPLY: () => `${BASE_URL}/seller/request`,
  SELLER_ORDERS: () => `${BASE_URL}/seller/orders`,
  SELLER_PRODUCT_CREATE: () => `${BASE_URL}/products/seller/product`,
  SELLER_PRODUCTS_MY: () => `${BASE_URL}/products/seller/product/my`,

  REVIEWS_BY_PRODUCT: (productId: string | number) => `${BASE_URL}/reviews/product/${productId}`,
  REVIEW_ADD: () => `${BASE_URL}/reviews`,

  PAYMENT_CREATE_ORDER: (orderId: string | number) => `${BASE_URL}/payment/create-order?orderId=${orderId}`,
  PAYMENT_VERIFY: () => `${BASE_URL}/payment/verify`,
  PAYMENT_COD: (orderId: string | number) => `${BASE_URL}/payment/cod?orderId=${orderId}`,
};
