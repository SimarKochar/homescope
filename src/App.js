// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import ComparisonView from './components/ComparisonView'; // <-- Import ComparisonView (will create)
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ChatbotWidget from './components/Chatbot/ChatbotWidget';
import MortgageCalculator from './components/MortgageCalculator/MortgageCalculator';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import FavoritesPage from './pages/FavoritesPage'; // Make sure this is imported
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

// Key for local storage
const FAVORITES_STORAGE_KEY = 'homeScopeFavorites';
const MAX_COMPARE_ITEMS = 3; // Set max comparison limit

// Sample Property Data (Make sure you have your actual data here)
const sampleProperties = [
    { id: 1, imageUrl: 'https://via.placeholder.com/400x250/ddeeff/555555?text=Modern+House', price: 450000, address: '123 Modern Lane, Anytown, AT 12345', bedrooms: 3, bathrooms: 2, sqft: 1800, description: 'A beautiful modern home...' },
    { id: 2, imageUrl: 'https://via.placeholder.com/400x250/effdde/555555?text=Cozy+Cottage', price: 280000, address: '45 Cozy Path, Countryside, CS 67890', bedrooms: 2, bathrooms: 1, sqft: 1200, description: 'Charming cozy cottage...' },
    { id: 3, imageUrl: 'https://via.placeholder.com/400x250/ffeedd/555555?text=Urban+Apartment', price: 650000, address: '789 High Street, Unit 5B, Metropolis, MP 11223', bedrooms: 4, bathrooms: 3, sqft: 2200, description: 'Luxurious downtown apartment...' },
    { id: 4, imageUrl: 'https://via.placeholder.com/400x250/f0e0d0/555555?text=Suburban+Villa', price: 520000, address: '321 Suburbia Ave, Pleasantville, PV 44556', bedrooms: 4, bathrooms: 2.5, sqft: 2500, description: 'Elegant suburban villa...' },
];

function App() {
  // --- Modal States ---
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCalcModal, setShowCalcModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false); // <-- State for Compare Modal

  // --- Favorites State ---
  const [favorites, setFavorites] = useState(() => { /* ... load favorites ... */
      try {
          const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
          return storedFavorites ? JSON.parse(storedFavorites) : [];
      } catch { return []; }
  });
  useEffect(() => { /* ... save favorites ... */
      try {
          localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch {}
  }, [favorites]);
  const toggleFavorite = (propertyId) => { /* ... toggle favorite logic ... */
       setFavorites(prev => prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]);
  };

  // --- Comparison State ---
  const [comparisonList, setComparisonList] = useState([]); // Array of property IDs

  // --- Toggle Comparison Function ---
  const toggleComparison = (propertyId) => {
      setComparisonList(prevList => {
          if (prevList.includes(propertyId)) {
              // Remove from comparison
              return prevList.filter(id => id !== propertyId);
          } else {
              // Add to comparison (if limit not reached)
              if (prevList.length < MAX_COMPARE_ITEMS) {
                  return [...prevList, propertyId];
              } else {
                  // Optional: Show a message that limit is reached
                  alert(`You can only compare up to ${MAX_COMPARE_ITEMS} properties at a time.`);
                  return prevList; // Return unchanged list if limit reached
              }
          }
      });
  };

  // --- Modal Handlers (Updated) ---
  const handleOpenLogin = () => { setShowSignupModal(false); setShowCalcModal(false); setShowComparisonModal(false); setShowLoginModal(true); };
  const handleOpenSignup = () => { setShowLoginModal(false); setShowCalcModal(false); setShowComparisonModal(false); setShowSignupModal(true); };
  const handleOpenCalc = () => { setShowLoginModal(false); setShowSignupModal(false); setShowComparisonModal(false); setShowCalcModal(true); };
  const handleOpenComparison = () => { setShowLoginModal(false); setShowSignupModal(false); setShowCalcModal(false); setShowComparisonModal(true); }; // <-- Handler for Compare
  const handleCloseModals = () => { // Close all modals
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowCalcModal(false);
    setShowComparisonModal(false); // <-- Close Compare Modal
    // Optional: Clear comparison list when closing comparison modal?
    // setComparisonList([]);
  };
  // ... switch handlers remain the same ...
  const handleSwitchToLogin = () => { setShowSignupModal(false); setShowLoginModal(true); };
  const handleSwitchToSignup = () => { setShowLoginModal(false); setShowSignupModal(true); };

  // --- Prepare data for Comparison View ---
  const comparisonProperties = sampleProperties.filter(p => comparisonList.includes(p.id));

  return (
    <div className="App">
      <Navbar onLoginClick={handleOpenLogin} onSignupClick={handleOpenSignup} />

      <main className="main-content">
        <Routes>
           {/* Pass comparison state/handlers to pages */}
           <Route path="/" element={<HomePage properties={sampleProperties} favorites={favorites} onToggleFavorite={toggleFavorite} comparisonList={comparisonList} onToggleComparison={toggleComparison} />} />
           <Route path="/properties" element={<PropertiesPage properties={sampleProperties} favorites={favorites} onToggleFavorite={toggleFavorite} comparisonList={comparisonList} onToggleComparison={toggleComparison} onOpenCompare={handleOpenComparison} />} />
           <Route path="/about" element={<AboutPage />} />
           <Route path="/contact" element={<ContactPage />} />
           <Route path="/property/:propertyId" element={<PropertyDetailsPage properties={sampleProperties} favorites={favorites} onToggleFavorite={toggleFavorite} /* Comparison not needed here? */ />} />
           <Route path="/favorites" element={<FavoritesPage properties={sampleProperties} favorites={favorites} onToggleFavorite={toggleFavorite} comparisonList={comparisonList} onToggleComparison={toggleComparison} onOpenCompare={handleOpenComparison} />} />
           <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer onCalcClick={handleOpenCalc} />

      {/* --- Modals --- */}
      {/* ... other modals ... */}
       <Modal show={showLoginModal} onClose={handleCloseModals} title="Login"> <LoginForm onSwitchToSignup={handleSwitchToSignup} /> </Modal>
       <Modal show={showSignupModal} onClose={handleCloseModals} title="Sign Up"> <SignupForm onSwitchToLogin={handleSwitchToLogin}/> </Modal>
       <Modal show={showCalcModal} onClose={handleCloseModals} title="Mortgage Calculator"> <MortgageCalculator /> </Modal>

      {/* --- Comparison Modal --- */}
      <Modal show={showComparisonModal} onClose={handleCloseModals} title="Compare Properties">
         <ComparisonView propertiesToCompare={comparisonProperties} />
      </Modal>

      <ChatbotWidget />
    </div>
  );
}

export default App;