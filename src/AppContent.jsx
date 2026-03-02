import useApp from "./hooks/useApp";
import AdminPanel from "./admin/AdminPanel";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MobileMenu from "./components/layout/MobileMenu";
import Toast from "./components/ui/Toast";
import ShareModal from "./components/ui/ShareModal";
import AuthModal from "./components/ui/AuthModal";
import CartSidebar from "./components/ui/CartSidebar";
import ProductModal from "./components/ui/ProductModal";
import HomePage from "./pages/HomePage";
import PartsPage from "./pages/PartsPage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import AdvicePage from "./pages/AdvicePage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function AppContent() {
  const {
    bg, tx, page,
    adminView, user,
    mobileMenu, showCart, showAuth,
    showProductModal, showShareModal, setShowShareModal,
    showCheckout,
  } = useApp();

  if (adminView && user?.isAdmin) return <AdminPanel />;

  return (
    <div className={`min-h-screen ${bg} ${tx} transition-colors duration-300`}>
      <Toast />
      {showShareModal && (
        <ShareModal
          product={showShareModal}
          onClose={() => setShowShareModal(null)}
        />
      )}

      <Header />
      {mobileMenu && <MobileMenu />}
      {showCart && <CartSidebar />}
      {showAuth && <AuthModal />}
      {showProductModal && <ProductModal />}

      {showCheckout ? (
        <CheckoutPage />
      ) : (
        <>
          {page === "home" && <HomePage />}
          {(page === "parts" || page === "home") && (
            <PartsPage isHome={page === "home"} />
          )}
          {(page === "services" || page === "home") && (
            <ServicesPage isHome={page === "home"} />
          )}
          {page === "gallery" && <GalleryPage />}
          {page === "advice" && <AdvicePage />}
          {page === "contact" && <ContactPage />}

          <Footer />
        </>
      )}
    </div>
  );
}
