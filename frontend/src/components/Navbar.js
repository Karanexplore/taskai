import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/products");
    }

    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div className="top-strip">
        Sign up and get 20% off to your first order. Sign Up Now
      </div>

      <nav className="navbar">
        <div className="container navbar-content">
          {/* LOGO */}
          <div className="logo">
            <Link to="/">SHOP.CO</Link>
          </div>

          {/* HAMBURGER */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </div>

          {/* NAV LINKS */}
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/products" onClick={() => setMenuOpen(false)}>
                Shop
              </Link>
            </li>

            <li>
              <Link to="/products?type=sale" onClick={() => setMenuOpen(false)}>
                On Sale
              </Link>
            </li>

            <li>
              <Link to="/products?type=new" onClick={() => setMenuOpen(false)}>
                New Arrivals
              </Link>
            </li>

            <li>
              <Link to="/products?type=brands" onClick={() => setMenuOpen(false)}>
                Brands
              </Link>
            </li>
          </ul>

          {/* RIGHT SIDE */}
          <div className={`nav-right ${menuOpen ? "active" : ""}`}>
            <form onSubmit={handleSearch}>
              <input
                className="search-box"
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            <Link
              to="/cart"
              className="nav-icon"
              onClick={() => setMenuOpen(false)}
            >
              🛒
            </Link>

            {token ? (
              <div className="user-actions">
                <Link
                  to="/admin/add-product"
                  className="admin-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Add Product
                </Link>

                <span className="user-name">
                  Hi, {user?.name || "User"}
                </span>

                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="nav-icon"
                onClick={() => setMenuOpen(false)}
              >
                👤
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;












// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const [search, setSearch] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate(`/products?search=${search}`);
//     setMenuOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <>
//       <div className="top-strip">
//         Sign up and get 20% off to your first order. Sign Up Now
//       </div>

//       <nav className="navbar">
//         <div className="container navbar-content">

//           {/* LOGO */}
//           <div className="logo">
//             <Link to="/">SHOP.CO</Link>
//           </div>

//           {/* HAMBURGER */}
//           <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//             ☰
//           </div>

//           {/* NAV LINKS */}
//           <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
//             <li><Link to="/products" onClick={() => setMenuOpen(false)}>Shop</Link></li>
//             <li><Link to="/products?sort=low" onClick={() => setMenuOpen(false)}>On Sale</Link></li>
//             <li><Link to="/products?sort=newest" onClick={() => setMenuOpen(false)}>New Arrivals</Link></li>
//             <li><Link to="/products" onClick={() => setMenuOpen(false)}>Brands</Link></li>
//           </ul>

//           {/* RIGHT SIDE */}
//           <div className={`nav-right ${menuOpen ? "active" : ""}`}>
//             <form onSubmit={handleSearch}>
//               <input
//                 className="search-box"
//                 type="text"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </form>

//             <Link to="/cart" className="nav-icon">🛒</Link>

//             {token ? (
//               <div className="user-actions">
//                 <Link to="/admin/add-product" className="admin-link">
//                   Add Product
//                 </Link>

//                 <span className="user-name">
//                   Hi, {user?.name || "User"}
//                 </span>

//                 <button className="logout-btn" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link to="/login" className="nav-icon">👤</Link>
//             )}
//           </div>

//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;