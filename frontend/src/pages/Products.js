import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../store/productSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const [searchParams, setSearchParams] = useSearchParams();

  const queryCategory = searchParams.get("category") || "";
  const querySort = searchParams.get("sort") || "";
  const queryType = searchParams.get("type") || "";
  const querySearch = searchParams.get("search") || "";

  const [category, setCategory] = useState(queryCategory);
  const [sort, setSort] = useState(querySort);

  // Fetch products
  useEffect(() => {
    dispatch(getProducts({ category, sort }));
  }, [dispatch, category, sort]);

  // Sync local state with URL params
  useEffect(() => {
    setCategory(queryCategory);
    setSort(querySort);
  }, [queryCategory, querySort]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    setSearchParams(params);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    setSearchParams(params);
  };

  // Frontend filtering
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (querySearch) {
      result = result.filter((product) =>
        product.name?.toLowerCase().includes(querySearch.toLowerCase())
      );
    }

    // Navbar tab filters
    if (queryType === "sale") {
      result = result.filter(
        (product) => Number(product.discountPrice) < Number(product.price)
      );
    }

    if (queryType === "new") {
      result = result.filter((product) => product.isNewArrival === true);
    }

    // Brands filter (currently all products)
    if (queryType === "brands") {
      return result;
    }

    return result;
  }, [products, querySearch, queryType]);

  const getHeading = () => {
    if (queryType === "sale") return "ON SALE";
    if (queryType === "new") return "NEW ARRIVALS";
    if (queryType === "brands") return "BRANDS";
    if (querySearch) return `SEARCH RESULTS FOR "${querySearch}"`;
    return "ALL PRODUCTS";
  };

  if (loading) return <Loader />;
  if (error) return <h2 className="container">Error: {error}</h2>;

  return (
    <div className="container products-page">
      <h2 className="section-title">{getHeading()}</h2>

      <div className="filter-bar">
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Party">Party</option>
          <option value="Gym">Gym</option>
        </select>

        <select value={sort} onChange={handleSortChange}>
          <option value="">Default Sort</option>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
          <option value="newest">Newest</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p style={{ fontSize: "20px", marginTop: "20px" }}>
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Products;


