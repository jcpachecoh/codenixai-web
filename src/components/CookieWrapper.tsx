"use client";
import { useState, useEffect } from "react";
import CookieConsentModal from "./CookieConsentModal";

export default function CookieWrapper() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Delay showing the modal slightly for better UX
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    try {
      // Store the consent with timestamp
      const consentData = {
        timestamp: new Date().toISOString(),
        accepted: true,
        version: "1.0",
      };

      localStorage.setItem("cookieConsent", JSON.stringify(consentData));

      // Initialize analytics and other services here
      console.log("Cookies accepted");

      setShow(false);
    } catch (error) {
      console.error("Error saving cookie consent:", error);
      // Fallback: just hide the modal
      setShow(false);
    }
  };

  return show ? <CookieConsentModal onAccept={handleAccept} /> : null;
}
