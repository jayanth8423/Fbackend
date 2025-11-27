const config = {
  apiUrl: "http://localhost:30083", // ✅ Backend base URL

  endpoints: {
    // 🔹 Customer APIs
    login: "/backend/customers/login",
    signup: "/backend/customers/signup",
    forgotPassword: "/backend/customers/forgot-password",
    resetPassword: "/backend/customers/reset-password",

    // 🔹 Admin APIs
    allUsers: "/backend/api/admin/all-users",
    updateRole: (email) => `/backend/customers/update-role/${email}`,

    // 🔹 Item APIs
    addItem: "/backend/items", 
    items: "/backend/items",
    deleteItem: (pid) => `/backend/items/${pid}`,
    images: (imgName) => `/images/${imgName}`,

    // 🔹 Cart APIs
    getCart: (email) => `/backend/cart/${email}`,
    addCart: "/backend/cart/add",
  },
};

export default config;
