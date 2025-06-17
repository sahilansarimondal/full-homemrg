console.log("--- APP.JSX LOADED ---");
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import DashboardLayout from "./components/Sidebar";

import Header from "./components/Header";
import Footer from "./components/Footer";
import TestimonialCarousel from "./components/TestimonialCarousel";
import WhyChooseUs from "./components/WhyChooseUs";
import servicesData from "./data/serviceCatalog.json";

// Pages (all common pages imported from ./pages/common)
import AboutUs from "./pages/common/AboutUs";
import ContactUs from "./pages/common/ContactUs";
import FAQ from "./pages/common/FAQ";
import GetStarted from "./pages/common/GetStarted";
import HowItWorks from "./pages/common/HowItWorks";
import MeetOurManagers from "./pages/common/MeetOurManagers";
import BlogCategory from "./pages/common/BlogCategory";
import OurServices from "./pages/common/OurServices";
import TipsBlog from "./pages/common/TipsBlog";
import CareersPage from "./pages/common/Careers";
import LogInPage from "./pages/common/LogInPage";
import MockLoginPage from "./pages/common/MockLoginPage";
import SignUpPage from "./pages/common/SignUpPage";

// Auth/other pages
import ManagerProfile from "./pages/auth/common/ManagerProfile";
import HomeManagerCareers from "./pages/common/Careers";
import HomeJobProfile from "./pages/auth/common/JobProfile";
import JobProfile from "./pages/auth/common/JobProfile";
import ManagerDashboard from "./pages/auth/manager/ManagerDashboard";
import ContractorDashboard from "./pages/auth/contractor/ContractorDashboard";
import HomeownerDashboard from "./pages/auth/homeowner/HomeownerDashboard";
import InboxPage from "./pages/auth/common/InboxPage";
import InvoicesPage from "./pages/auth/common/InvoicesPage";
import SchedulesPage from "./pages/auth/common/SchedulesPage";
import NotificationsPage from "./pages/auth/common/NotificationsPage";
import SettingsPage from "./pages/auth/common/SettingsPage";
import TasksPage from "./pages/common/TasksPage";
import IssuesPage from "./pages/common/IssuesPage";
import ClockPage from "./pages/auth/contractor/ClockPage";
import UsersPage from "./pages/auth/manager/UsersPage";
import ManagerTasksPage from "./pages/auth/manager/ManagerTasksPage";
import ManagerInbox from "./pages/auth/manager/ManagerInbox";
import ManagerInvoicesPage from "./pages/auth/manager/ManagerInvoices";
import ManagerReports from "./pages/auth/manager/ManagerReports";
import ManagerSchedulePage from "./pages/auth/manager/ManagerSchedulePage";
import ManagerTimeLogsPage from "./pages/auth/manager/ManagerTimeLogsPage";
import ManageMyServices from "./pages/auth/homeowner/ManageMyServices";
import HomeownerInbox from "./pages/auth/homeowner/HomeownerInbox";
import ContractorInbox from "./pages/auth/contractor/ContractorInbox";
import ContractorTasks from "./pages/auth/contractor/ContractorTasks";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/auth/common/Profile";
import VerifyEmail from "./pages/common/VerifyEmail";
import ResetPassword from "./pages/auth/common/ResetPassword";
import ForgotPassword from "./pages/auth/common/ForgotPassword";

const AUTO_SCROLL_DELAY = 5000;
const allServices = Array.isArray(servicesData) ? servicesData : [];
const featuredServices = allServices.filter((service) => service.featured);
const FALLBACK_IMAGE = "/images/Resources/default-service.jpg"; // Make sure this exists or use a generic placeholder

function Home() {
  // ServiceCarousel logic
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timeoutRef = useRef(null);

  const next = () => {
    setIndex((prev) => (prev + 1) % featuredServices.length);
    resetTimeout();
  };
  const prev = () => {
    setIndex(
      (prev) => (prev - 1 + featuredServices.length) % featuredServices.length
    );
    resetTimeout();
  };
  const resetTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % featuredServices.length);
    }, AUTO_SCROLL_DELAY);
  };
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) next();
    else if (isRightSwipe) prev();
    setTouchStart(null);
    setTouchEnd(null);
  };
  useEffect(() => {
    resetTimeout();
    return () => clearTimeout(timeoutRef.current);
  }, [index]);
  const service = featuredServices[index];

  return (
    <>
      {/* Hero Section */}
      <div
        className="section-card home-card hero-container"
        style={{
          maxWidth: 900,
          margin: "2rem auto 2.5rem auto",
          background: "#fff",
          borderRadius: "1.5rem",
          boxShadow: "0 4px 24px rgba(30,58,138,0.10)",
          border: "2px solid #e0e7ef",
        }}
      >
        <div
          className="hero-content"
          style={{
            textAlign: "center",
            padding: "2.2rem 1.2rem 1.2rem 1.2rem",
          }}
        >
          <h1
            className="hero-title"
            style={{
              fontSize: "2.5rem",
              fontWeight: 900,
              color: "#1e3a8a",
              marginBottom: "1.1rem",
              letterSpacing: "-1.5px",
            }}
          >
            Transform Your Home Management Experience
          </h1>
          <p
            className="hero-subtitle"
            style={{
              fontSize: "1.18rem",
              color: "#334155",
              marginBottom: "1.7rem",
              fontWeight: 500,
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Experience the perfect blend of professional expertise and
            personalized care.
            <br />
            From daily maintenance to complete home organization, we're here to
            make your life easier.
          </p>
          <div
            className="hero-buttons"
            style={{
              display: "flex",
              gap: "1.2rem",
              justifyContent: "center",
              marginTop: "1.2rem",
            }}
          >
            <Link
              to="/our-services"
              className="hero-btn primary"
              style={{
                background: "#2563eb",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.13rem",
                borderRadius: "999px",
                padding: "0.95rem 2.1rem",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(30, 58, 138, 0.10)",
                transition: "background 0.18s",
                border: "none",
                display: "inline-block",
              }}
            >
              Explore Services
            </Link>
            <Link
              to="/contact"
              className="hero-btn secondary"
              style={{
                background: "#fff",
                color: "#2563eb",
                fontWeight: 700,
                fontSize: "1.13rem",
                borderRadius: "999px",
                padding: "0.95rem 2.1rem",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(30, 58, 138, 0.10)",
                border: "2px solid #2563eb",
                display: "inline-block",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      {/* Main Content Section */}
      <div style={{ maxWidth: 900, margin: "0 auto 2.5rem auto" }}>
        {/* Main content area now intentionally left empty; no services or featured carousel rendered here. */}
      </div>
      <style>{`
        .hero-features-list {
          list-style: none;
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 2rem 0 1.5rem 0;
          padding: 0;
          flex-wrap: wrap;
        }
        .feature-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e3a8a;
          background: #ffffff;
          border-radius: 1rem;
          padding: 1.8rem;
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.08);
          width: 200px;
          text-align: center;
          border: 2px solid #e2e8f0;
          transition: all 0.2s ease;
        }
        .feature-tile:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(30, 58, 138, 0.12);
          border-color: #2563eb;
        }
        .feature-icon {
          font-size: 2.5em;
          margin-bottom: 1rem;
          display: block;
          color: #2563eb;
        }
        .hero-buttons {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          margin-top: 1.2rem;
        }
        @media (max-width: 700px) {
          .hero-features-list {
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
          }
          .feature-tile {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>

      {/* Service Carousel Section */}
      <div
        className="section-card"
        style={{ maxWidth: 900, margin: "2rem auto", position: "relative" }}
      >
        <section className="service-carousel">
          <h2
            className="service-carousel-title"
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#1e3a8a",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Explore Our Services
          </h2>
          {featuredServices.length ? (
            <div
              className="carousel-container"
              style={{
                position: "relative",
                padding: "0 3rem",
              }}
            >
              <button
                className="carousel-arrow left"
                onClick={prev}
                aria-label="Previous service"
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#ffffff",
                  border: "2px solid #e2e8f0",
                  borderRadius: "50%",
                  width: "3rem",
                  height: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: "#1e3a8a",
                  boxShadow: "0 2px 8px rgba(30, 58, 138, 0.1)",
                  transition: "all 0.2s ease",
                  zIndex: 2,
                }}
              >
                &lt;
              </button>
              <div
                className="service-slide modern-service-card"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  background: "#ffffff",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(30, 58, 138, 0.08)",
                  border: "2px solid #e2e8f0",
                }}
              >
                <div
                  className="service-image-container"
                  style={{ position: "relative" }}
                >
                  <img
                    src={service.image || FALLBACK_IMAGE}
                    alt={service.service}
                    className="service-image"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                  <span
                    className="service-featured-badge"
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: "#2563eb",
                      color: "#ffffff",
                      padding: "0.5rem 1rem",
                      borderRadius: "999px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
                    }}
                  >
                    Featured
                  </span>
                </div>
                <div className="service-content" style={{ padding: "1.5rem" }}>
                  <h3
                    className="service-title"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "#1e3a8a",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {service.service}
                  </h3>
                  <p
                    className="service-description"
                    style={{
                      fontSize: "1rem",
                      color: "#475569",
                      lineHeight: 1.6,
                    }}
                  >
                    {service.description || "No description available."}
                  </p>
                </div>
              </div>
              <button
                className="carousel-arrow right"
                onClick={next}
                aria-label="Next service"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#ffffff",
                  border: "2px solid #e2e8f0",
                  borderRadius: "50%",
                  width: "3rem",
                  height: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: "#1e3a8a",
                  boxShadow: "0 2px 8px rgba(30, 58, 138, 0.1)",
                  transition: "all 0.2s ease",
                  zIndex: 2,
                }}
              >
                &gt;
              </button>
            </div>
          ) : (
            <div className="service-carousel">
              <h2>No featured services available.</h2>
            </div>
          )}
          {/* Centered button container */}
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Link
              to="/our-services"
              className="explore-all-link"
              style={{
                display: "inline-block",
                textAlign: "center",
                margin: "2rem auto 0 auto",
                color: "#fff",
                background: "linear-gradient(90deg, #2563eb 60%, #1e3a8a 100%)",
                fontWeight: 800,
                textDecoration: "none",
                fontSize: "1.25rem",
                padding: "1rem 2.5rem",
                borderRadius: "999px",
                boxShadow: "0 4px 16px rgba(30,58,138,0.18)",
                letterSpacing: "0.5px",
                transition: "background 0.18s, color 0.18s, transform 0.18s",
                cursor: "pointer",
                border: "none",
                outline: "none",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#1e3a8a";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #2563eb 60%, #1e3a8a 100%)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Explore all Services
            </Link>
          </div>
        </section>
        <style>{`
          .carousel-arrow:hover {
            background: #2563eb;
            color: #ffffff;
            border-color: #2563eb;
            transform: translateY(-50%) scale(1.1);
          }
          .carousel-arrow:active {
            transform: translateY(-50%) scale(0.95);
          }
          .service-slide {
            transition: transform 0.3s ease;
          }
          .service-slide:hover {
            transform: translateY(-4px);
          }
          @media (max-width: 768px) {
            .carousel-container {
              padding: 0 2.5rem;
            }
            .carousel-arrow {
              width: 2.5rem;
              height: 2.5rem;
              font-size: 1.25rem;
            }
          }
        `}</style>
      </div>

      {/* Who Should Hire Section */}
      <section
        className="who-should-hire feminine-who-should-hire section-card"
        style={{ maxWidth: 900, margin: "2rem auto" }}
      >
        <style>{`
          .feminine-who-should-hire {
            background: var(--primary-bg);
            padding: 2.2rem 1.2rem 1.2rem 1.2rem;
            border-radius: 2.2rem;
            margin: 1.2rem auto 0.7rem auto;
            max-width: 1100px;
            box-shadow: var(--card-shadow);
            border: none;
            text-align: center;
          }
          .who-container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
          }
          .feminine-who-should-hire h2 {
            color: var(--primary-color);
            font-size: 2.1rem;
            margin-bottom: 1.5rem;
            font-weight: 800;
          }
          .who-subtitle {
            font-size: 1.13rem;
            color: var(--primary-text);
            margin-bottom: 1rem;
            line-height: 1.6;
          }
          .who-highlight {
            font-size: 1.08rem;
            color: var(--primary-color);
            font-style: italic;
            margin-bottom: 1.2rem;
            line-height: 1.5;
          }
          .cta-buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.2rem;
            margin-bottom: 0.2rem;
            width: 100%;
            max-width: 350px;
            margin: 0 auto;
          }
          .cta-button {
            display: inline-block;
            text-decoration: none;
            padding: 0.95rem 2.1rem;
            font-weight: 700;
            border-radius: 999px;
            border: none;
            font-size: 1.08rem;
            background: #fff;
            color: var(--primary-color);
            box-shadow: 0 2px 8px var(--card-shadow);
            transition: background 0.2s, color 0.2s, box-shadow 0.2s;
            cursor: pointer;
          }
          .cta-button.primary {
            background: var(--primary-color);
            color: #fff;
          }
          .cta-button.primary:hover {
            background: var(--secondary-color);
            color: #fff;
          }
          .cta-button:hover {
            background: var(--accent-color);
            color: var(--primary-color);
          }
          @media (max-width: 900px) {
            .feminine-who-should-hire {
              padding: 1.2rem 0.5rem 0.7rem 0.5rem;
              border-radius: 1.2rem;
            }
            .cta-buttons {
              gap: 0.7rem;
              max-width: 100%;
            }
          }
          @media (max-width: 600px) {
            .feminine-who-should-hire {
              padding: 0.7rem 0.1rem 0.2rem 0.1rem;
              border-radius: 0.7rem;
            }
            .cta-buttons {
              flex-direction: column;
              gap: 0.7rem;
              max-width: 100%;
            }
            .cta-button {
              width: 100%;
              font-size: 1.08rem;
              padding: 1rem 0.5rem;
              border-radius: 1.2rem;
            }
          }
        `}</style>
        <div className="who-container">
          <h2>Who Should Hire a Home Manager?</h2>
          <p className="who-subtitle">
            Whether you're a busy parent, a career-driven professional, or
            simply overwhelmed with the pace of life — a home manager is your
            partner in creating calm, structure, and flow.
          </p>
          <p className="who-highlight">
            If you've ever thought{" "}
            <em>"I wish someone could just handle this,"</em> you're in the
            right place.
          </p>
          <div className="cta-buttons">
            <Link
              to="/get-started"
              className="cta-button primary"
              style={{
                border: "3px solid #2563eb",
                boxSizing: "border-box",
              }}
            >
              Get Started
            </Link>
            <Link
              to="/managers"
              className="cta-button"
              style={{
                border: "3px solid #2563eb",
                boxSizing: "border-box",
              }}
            >
              Meet Our Managers
            </Link>
            <Link
              to="/how-it-works"
              className="cta-button"
              style={{
                border: "3px solid #2563eb",
                boxSizing: "border-box",
              }}
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us and Testimonials */}
      <WhyChooseUs />
      <TestimonialCarousel />
    </>
  );
}

function App() {
  const { user } = useAuth();

  const location = useLocation();
  // Only hide header on /dashboard/settings
  const hideHeader = location.pathname === "/dashboard/settings";
  // Hide footer only on dashboard routes
  const hideFooter = location.pathname.startsWith("/dashboard");
  console.log(
    "App render. Current user:",
    user,
    "Current path:",
    location.pathname
  );
  React.useEffect(() => {
    console.log("User changed:", user);
  }, [user]);
  return (
    <div className="app">
      <ScrollToTop />
      {!hideHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tips-blog" element={<TipsBlog />} />
          <Route path="/our-services" element={<OurServices />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/mock-login" element={<MockLoginPage />} />
          <Route path="/careers/:jobId" element={<JobProfile />} />
          <Route path="/home-careers" element={<HomeManagerCareers />} />
          <Route path="/home-careers/:jobId" element={<HomeJobProfile />} />
          <Route path="/tips-blog/:slug" element={<BlogCategory />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/managers" element={<MeetOurManagers />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/managers/:id" element={<ManagerProfile />} />
          <Route path="/meet-our-managers" element={<MeetOurManagers />} />
          {/* Special case: settings page gets full-width header, no sidebar */}
          {/* <Route
            path="/dashboard/settings"
            element={
              <>
                <Header />
                <SettingsPage />
              </>
            }
          /> */}
          {/* All other dashboard routes use the sidebar layout */}
          <Route
            path="/dashboard/*"
            element={user ? <DashboardLayout /> : <LogInPage />}
          >
            <Route
              index
              element={
                user?.role === "manager" ? (
                  <ManagerDashboard />
                ) : user?.role === "contractor" ? (
                  <ContractorDashboard />
                ) : (
                  <HomeownerDashboard />
                )
              }
            />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="manager" element={<ManagerDashboard />} />
            <Route path="contractor" element={<ContractorDashboard />} />
            <Route path="homeowner" element={<HomeownerDashboard />} />
            <Route
              path="tasks"
              element={
                user?.role === "manager" ? (
                  <ManagerTasksPage />
                ) : user?.role === "homeowner" ? (
                  <ManageMyServices />
                ) : user?.role === "contractor" ? (
                  <ContractorTasks />
                ) : (
                  <TasksPage />
                )
              }
            />
            <Route path="tasks/manage" element={<ManagerTasksPage />} />
            <Route
              path="inbox"
              element={
                user?.role === "manager" ? (
                  <ManagerInbox />
                ) : user?.role === "homeowner" ? (
                  <HomeownerInbox />
                ) : user?.role === "contractor" ? (
                  <ContractorInbox />
                ) : (
                  <InboxPage />
                )
              }
            />
            <Route path="issues" element={<IssuesPage />} />
            <Route
              path="invoices"
              element={
                user?.role === "manager" ? (
                  <ManagerInvoicesPage />
                ) : (
                  <InvoicesPage />
                )
              }
            />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route
              path="schedules"
              element={
                user?.role === "manager" ? (
                  <ManagerSchedulePage />
                ) : (
                  <SchedulesPage />
                )
              }
            />
            <Route
              path="clock"
              element={
                user?.role === "manager" ? (
                  <ManagerTimeLogsPage />
                ) : (
                  <ClockPage />
                )
              }
            />
            <Route path="users" element={<UsersPage />} />
            <Route
              path="reports"
              element={
                user?.role === "manager" ? (
                  <ManagerReports />
                ) : (
                  <div>Not authorized</div>
                )
              }
            />
          </Route>
          {/* Protected routes */}
          {user && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/invoices" element={<InvoicesPage />} />
              <Route path="/schedules" element={<SchedulesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/issues" element={<IssuesPage />} />

              {/* Role-specific routes */}
              {user.role === "manager" && (
                <>
                  <Route path="/dashboard" element={<ManagerDashboard />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/manager-tasks" element={<ManagerTasksPage />} />
                  <Route path="/manager-inbox" element={<ManagerInbox />} />
                  <Route
                    path="/manager-invoices"
                    element={<ManagerInvoicesPage />}
                  />
                  <Route path="/manager-reports" element={<ManagerReports />} />
                  <Route
                    path="/manager-schedule"
                    element={<ManagerSchedulePage />}
                  />
                  <Route
                    path="/manager-time-logs"
                    element={<ManagerTimeLogsPage />}
                  />
                </>
              )}

              {user.role === "contractor" && (
                <>
                  <Route path="/dashboard" element={<ContractorDashboard />} />
                  <Route
                    path="/contractor-tasks"
                    element={<ContractorTasks />}
                  />
                  <Route
                    path="/contractor-inbox"
                    element={<ContractorInbox />}
                  />
                  <Route path="/clock" element={<ClockPage />} />
                </>
              )}

              {user.role === "homeowner" && (
                <>
                  <Route path="/dashboard" element={<HomeownerDashboard />} />
                  <Route
                    path="/manage-services"
                    element={<ManageMyServices />}
                  />
                  <Route path="/homeowner-inbox" element={<HomeownerInbox />} />
                </>
              )}
            </>
          )}
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
