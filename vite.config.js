import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  build: {
    target: "esnext", // Correct location for the target option
    rollupOptions: {
      input: {
        main: resolve(__dirname, "/"),
        profile: resolve(__dirname, "/src/Pages/Profile/Profile.html"),
        cart: resolve(__dirname, "/src/Pages/Cart/cart.html"),
        payment: resolve(__dirname, "/src/Pages/Payment/Payment.html"),
        register: resolve(__dirname, "/src/Pages/Register/register.html"),
        product: resolve(__dirname, "/src/Pages/products/products.html"),
        productdetails: resolve(
          __dirname,
          "/src/Pages/products/productdetails/productdetails.html"
        ),
        fail: resolve(__dirname, "/src/Pages/Payment/fail.html"),
        success: resolve(__dirname, "/src/Pages/Payment/success.html"),
        myOrder: resolve(__dirname, "/src/Pages/Payment/myOrder.html"),
        outDir: "dist",
      },
    },
  },
});
