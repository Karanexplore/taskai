import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/productSlice";

import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import DressStyle from "../components/DressStyle";
import Newsletter from "../components/Newsletter";
import Loader from "../components/Loader";

function Home() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Filter sections
  const newArrivals = products.filter((item) => item.isNewArrival);
  const topSelling = products.filter((item) => item.isTopSelling);

  // 👇 fallback: agar flags nahi lage hon to latest products dikha do
  const latestProducts = [...products].slice(-4).reverse();

  if (loading) return <Loader />;
  if (error) return <h2 className="container">Error: {error}</h2>;

  return (
    <>
      <Hero />

      <ProductSection
        title="NEW ARRIVALS"
        products={newArrivals.length > 0 ? newArrivals : latestProducts}
      />

      <ProductSection
        title="TOP SELLING"
        products={topSelling.length > 0 ? topSelling : latestProducts}
      />

      <DressStyle />
      <Newsletter />
    </>
  );
}

export default Home;

