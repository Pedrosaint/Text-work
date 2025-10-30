import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Layout from "./domains/cart/components/Layout";
import ProductList from "./domains/product/components/ProductList";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Layout>
        <ProductList />
        <Toaster richColors position="top-center" />
      </Layout>
    </Provider>
  </StrictMode>
);
