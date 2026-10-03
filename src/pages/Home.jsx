import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="home-page">

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            YOUR HEALTH, OUR PRIORITY
          </span>

          <h1>
            Welcome to
            <br />
            <span>MediCare Pharmacy</span>
          </h1>

          <p>
            Your simple and reliable pharmacy
            management system for browsing
            medicines and managing orders.
          </p>

          <div className="hero-buttons">

            <Link
              to="/medicines"
              className="btn btn-primary hero-btn"
            >
              💊 Browse Medicines
            </Link>

            {!user && (
              <>
                <Link
                  to="/login"
                  className="btn btn-info hero-btn"
                >
                  🔐 Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-secondary hero-btn"
                >
                  📝 Register
                </Link>
              </>
            )}

          </div>

        </div>

        <div className="hero-image">
          💊
        </div>

      </section>


      {/* Features Section */}

      <section className="features">

        <h2>
          Our Features
        </h2>

        <p className="features-subtitle">
          Everything you need to manage and
          order medicines easily.
        </p>


        <div className="feature-grid">

          {/* Medicine Management */}

          <div className="feature-card">

            <div className="feature-icon">
              💊
            </div>

            <h3>
              Medicine Management
            </h3>

            <p>
              Browse and view detailed information
              about available medicines.
            </p>

          </div>


          {/* Shopping Cart */}

          <div className="feature-card">

            <div className="feature-icon cart-icon">
              🛒
            </div>

            <h3>
              Shopping Cart
            </h3>

            <p>
              Add your required medicines to the
              cart and manage quantities easily.
            </p>

          </div>


          {/* Payment */}

          <div className="feature-card">

            <div className="feature-icon payment-icon">
              💳
            </div>

            <h3>
              Multiple Payment Options
            </h3>

            <p>
              Choose UPI, Card, Net Banking or
              Cash on Delivery.
            </p>

          </div>


          {/* Orders */}

          <div className="feature-card">

            <div className="feature-icon order-icon">
              📦
            </div>

            <h3>
              Order Management
            </h3>

            <p>
              Place medicine orders and store
              order information securely.
            </p>

          </div>


          {/* Security */}

          <div className="feature-card">

            <div className="feature-icon secure-icon">
              🔐
            </div>

            <h3>
              Secure Access
            </h3>

            <p>
              Login is required before adding
              medicines to your cart.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;