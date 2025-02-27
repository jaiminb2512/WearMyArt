const ApiURLS = {
  // User
  Login: "/api/user/login",
  Register: "/api/user/register",
  ActivateUser: "/api/user/activate-user",
  SendingMailForLogin: "/api/user/sending-mail-for-login",
  ForgotPasswordMail: "/api/user/sending-mail-for-forgot-password",
  ForgotPassword: "/api/user/forgot-password",
  GetSingleUser: "/api/user/single-user/:id",
  MakeAdmin: "/api/user/make-admin/:id",
  BlockUsers: "/api/user/block-users",
  UnblockUsers: "/api/user/unblock-users",
  UpdateUser: "/api/user/update-user",
  DeleteUser: "/api/user/delete",
  Logout: "/api/user/logout",
  GetAllOwnOrders: "/api/user/get-all-own-orders",

  // Product
  AddProduct: "/api/product/add-product",
  UpdateProduct: "/api/product/update-product",
  DeleteProduct: "/api/product/delete",
  DiscontinueProducts: "/api/product/discontinue-products",
  RecontinueProducts: "/api/product/recontinue-products",
  GetLowStockProducts: "/api/product/get-low-stock-products",
  GetSingleProduct: "/api/product/single-product/:id",
  GetAllProduct: "/api/product/get-all-products",
  GetAllActiveProducts: "/api/product/get-all-active-products",
  GetAllCustomers: "/api/product/get-all-customers",

  // Order
  InitiateOrder: "/api/order/initiate-order",
  AddToCartOrder: "/api/order/add-to-cart-order",
  GetCartOrder: "/api/order/get-cart-order",
  CartToOrder: "/api/order/cart-to-order",
  AddOrder: "/api/order/add-order",
  UpdateOrderStatus: "/api/order/update-state/:id",
  GetSingleOrder: "/api/order/single-order/:id",
  GetAllOrders: "/api/order/get-all-orders",

  // Customization Options
  AddCustomizationOptions:
    "/api/customization-options/add-customization-options",
  DeleteCustomizationOptions:
    "/api/customization-options/delete/delete-customization-options",
  GetCustomizationOptions:
    "/api/customization-options/get-customization-options",
};

export default ApiURLS;
