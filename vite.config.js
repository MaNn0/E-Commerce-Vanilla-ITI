import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    target: "esnext", // Correct location for the target option
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        profile: resolve(__dirname, "./src/Pages/Profile/Profile.html"),
        payment: resolve(__dirname, "./src/Pages/Payment/Payment.html"),
      },
    },
  },
});
