import { useState } from "react";
import {
  Check,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Users,
  BadgeIndianRupee,
  HeartHandshake,
  Headphones,
  Home,
  Building2,
  FileText,
  Package,
  Truck,
  ArrowRight,
  HelpCircle,
  Star,
  ChevronUp,
  MapPin,
  Award,
  ThumbsUp,
  Phone,
  Plus,
} from "lucide-react";
import axios from "axios";

const FONT_LINK = `https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap`;

const G   = "#0F9D58";
const GD  = "#0a7a44";
const GL  = "#e8f5ee";
const DARK  = "#111827";
const MID   = "#374151";
const SOFT  = "#6b7280";
const BORDER = "#ddd6c8";
const WHITE  = "#ffffff";
const BG    = "#F5F0E8";
const CARD_BG = "#ffffff";
const HERO_HEADING = "#0C3A1D";

/* ---------------------------------------------
   ALL CSS scoped under .gbp-root so NOTHING
   leaks out and affects Footer or other pages.
   No global * reset. No :root variables.
--------------------------------------------- */
const CSS = `
  /* -- Scoped CSS variables -- */
  .gbp-root {
    --gbp-pad: 56px;
    --gbp-col2: 1fr 1fr;
    --gbp-col4: repeat(4, 1fr);
    --gbp-hero: 36px;
    font-family: 'Poppins', sans-serif;
    background: #ede8df;
    min-height: 100vh;
    box-sizing: border-box;
  }
  .gbp-root *, .gbp-root *::before, .gbp-root *::after {
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .gbp-root { --gbp-pad: 16px; --gbp-col2: 1fr; --gbp-col4: 1fr 1fr; --gbp-hero: 26px; }
  }
  @media (max-width: 480px) {
    .gbp-root { --gbp-col4: 1fr; --gbp-hero: 22px; }
  }

  /* -- Page wrapper -- */
  .gbp-wrap {
    max-width: 1600px;
    margin: 0 auto;
    padding: 20px var(--gbp-pad) 48px;
  }

  /* -- Section spacing -- */
  .gbp-section { margin-bottom: 32px; }
  .gbp-section:last-child { margin-bottom: 0; }

  /* -- Hero -- */
  .gbp-hero-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 700;
    color: #0C3A1D;
    margin: 0 0 12px;
    line-height: 1.2;
    text-align: left;
  }
  .gbp-trust-bar {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 0;
    border-top: none;
    padding-top: 0;
    width: 100%;
  }
  .gbp-trust-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
    padding: 5px 14px;
    border: 1px solid #ddd6c8;
    border-radius: 100px;
    background: #fff;
    white-space: nowrap;
  }

  /* ----------------------------------
     STUDENT PLANS
  ---------------------------------- */
  .gbp-sp-section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    padding: 10px 14px;
    background: #E6F5EC;
    border-left: none;
  }
  .gbp-sp-section-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0D6B3F;
  }
  .gbp-sp-section-title {
    font-size: 11px;
    font-weight: 800;
    color: #1F2937;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-sp-section-subtitle {
    font-size: 11px;
    color: #6B7280;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

  .gbp-sp-tab-bar {
    display: none;
    gap: 8px;
    margin-bottom: 16px;
    background: #EAE6DE;
    border-radius: 0px;
    padding: 4px;
  }
  @media (max-width: 767px) { .gbp-sp-tab-bar { display: flex; } }

  .gbp-sp-tab-btn {
    flex: 1;
    padding: 10px 0;
    border: none;
    background: transparent;
    border-radius: 0px;
    font-size: 14px;
    font-weight: 500;
    color: #6B7280;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-sp-tab-btn.active {
    background: #fff;
    color: #0D6B3F;
    font-weight: 600;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  }

  .gbp-sp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    width: 100%;
    align-items: stretch;
  }
  @media (max-width: 767px) { .gbp-sp-grid { grid-template-columns: 1fr; } }

  .gbp-sp-card {
    display: flex;
    flex-direction: column;
    background: #F7F8FC;
    border-radius: 0px;
    border: 1.5px solid #a8d5ba;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    overflow: hidden;
    position: relative;
  }
  .gbp-sp-card-popular { border: 1.5px solid #a8d5ba; }
  @media (max-width: 767px) {
    .gbp-sp-card { display: none; }
    .gbp-sp-card.active { display: flex; }
  }
  @media (min-width: 768px) { .gbp-sp-card { display: flex !important; } }

  .gbp-sp-badge {
    position: absolute;
    top: 16px;
    left: 20px;
    background: #0D6B3F;
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 4px 12px;
    border-radius: 100px;
    z-index: 10;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-sp-inner {
    padding: 24px 20px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .gbp-sp-inner-popular { padding-top: 44px; }

  .gbp-sp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
  }
  .gbp-sp-plan-label {
    font-size: 10px;
    font-weight: 700;
    color: #0D6B3F;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 6px;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-sp-card-title {
    font-size: 20px;
    font-weight: 700;
    color: #1F2937;
    margin: 0;
    line-height: 1.3;
    font-family: 'Poppins', sans-serif;
  }
  @media (max-width: 900px) { .gbp-sp-card-title { font-size: 18px; } }

  .gbp-sp-icon-box {
    width: 42px;
    height: 42px;
    border-radius: 0px;
    background: #E6F5EC;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .gbp-sp-price-row {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  .gbp-sp-price {
    font-size: 36px;
    font-weight: 700;
    color: #111827;
    line-height: 1;
    font-family: 'Poppins', sans-serif;
  }
  @media (max-width: 900px) { .gbp-sp-price { font-size: 32px; } }
  .gbp-sp-price-suffix {
    font-size: 12px;
    color: #9CA3AF;
    margin-bottom: 4px;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-sp-booking-tag {
    background: #E6F5EC;
    color: #0D6B3F;
    border: 1px solid #BDE3CB;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 3px 8px;
    border-radius: 0px;
    margin-bottom: 4px;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-sp-description {
    font-size: 12px;
    color: #5F6368;
    line-height: 1.6;
    margin: 0 0 16px;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-sp-divider { height: 1px; background: #E5E7EB; margin: 16px 0; }

  .gbp-sp-features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    flex: 1;
  }
  @media (max-width: 520px) { .gbp-sp-features-grid { grid-template-columns: 1fr; } }

  .gbp-sp-feature-heading {
    font-size: 10px;
    font-weight: 700;
    color: #1F2937;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 12px;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-sp-feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .gbp-sp-feature-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #374151;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-sp-not-included-box { background: #EEF2F7; border-radius: 0px; padding: 14px; }
  .gbp-sp-important-box {
    background: #EEF4F1;
    border: 1px solid #D8E6DE;
    border-radius: 0px;
    padding: 14px;
  }
  .gbp-sp-cta-btn {
    width: 100%;
    height: 48px;
    background: #0D6B3F;
    color: #fff;
    border: none;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: background 0.2s;
    font-family: 'Poppins', sans-serif;
    flex-shrink: 0;
  }
  .gbp-sp-cta-btn:hover { background: #095833; }

  /* ----------------------------------
     ADD-ON SERVICES
  ---------------------------------- */
  .gbp-addon-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
  }
  .gbp-addon-icon-box {
    width: 42px;
    height: 42px;
    border-radius: 0px;
    background: #E6F5EC;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .gbp-addon-header-title {
    font-size: 18px;
    font-weight: 800;
    text-transform: uppercase;
    color: #1F2937;
    margin: 0 0 2px;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.04em;
  }
  .gbp-addon-header-sub {
    font-size: 13px;
    color: #6B7280;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-addon-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  @media (max-width: 900px)  { .gbp-addon-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px)  { .gbp-addon-grid { grid-template-columns: 1fr; } }

  .gbp-addon-card {
    background: #F5F6FB;
    border: 1.5px solid #a8d5ba;
    border-radius: 0px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 260px;
  }
  .gbp-addon-card-top { display: flex; flex-direction: column; align-items: center; }
  .gbp-addon-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 0px;
    background: #E6F5EC;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0D6B3F;
    margin-bottom: 12px;
    flex-shrink: 0;
  }
  .gbp-addon-card-title {
    font-size: 13px;
    font-weight: 700;
    color: #1F2937;
    text-align: center;
    line-height: 1.45;
    margin: 0 0 14px;
    font-family: 'Poppins', sans-serif;
    min-height: 38px;
  }
  .gbp-addon-feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  .gbp-addon-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 12px;
    color: #374151;
    font-family: 'Poppins', sans-serif;
    line-height: 1.5;
  }
  .gbp-addon-card-bottom { margin-top: 16px; }
  .gbp-addon-divider {
    border-top: 1px solid #CFCFCF;
    padding-top: 12px;
    margin-bottom: 10px;
    text-align: center;
  }
  .gbp-addon-gst-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #6B7280;
    margin: 0 0 2px;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-addon-gst-value {
    font-size: 18px;
    font-weight: 700;
    color: #0D6B3F;
    line-height: 1;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-addon-btn {
    width: 100%;
    height: 38px;
    border-radius: 0px;
    border: 1.5px solid #0D6B3F;
    background: transparent;
    color: #0D6B3F;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-addon-btn:hover { background: #0D6B3F; color: #fff; }

  /* ----------------------------------
     PROPERTY OWNER PLANS
  ---------------------------------- */
  .gbp-owner-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
  }
  .gbp-owner-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: stretch;
  }
  @media (max-width: 767px) { .gbp-owner-grid { grid-template-columns: 1fr; } }

  .gbp-owner-card {
    display: flex;
    flex-direction: column;
    border-radius: 0px;
    border: 1.5px solid #a8d5ba;
    background: #F7F8FC;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    overflow: hidden;
  }
  .gbp-owner-card-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    flex: 1;
  }
  .gbp-owner-card-top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .gbp-owner-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 0px;
    background: #E8F5EE;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .gbp-owner-plan-label {
    font-size: 11px;
    font-weight: 600;
    color: #0D6B3F;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 4px;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-owner-card-title {
    font-size: 22px;
    font-weight: 800;
    color: #0F6D38;
    margin: 0 0 6px;
    line-height: 1.15;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-owner-card-desc {
    font-size: 13px;
    color: #596560;
    margin: 0;
    line-height: 1.7;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-owner-price-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 8px;
  }
  .gbp-owner-price {
    font-size: 48px;
    font-weight: 800;
    color: #005327;
    line-height: 1;
    font-family: 'Poppins', sans-serif;
  }
  @media (max-width: 900px) { .gbp-owner-price { font-size: 40px; } }
  .gbp-owner-price-suffix {
    font-size: 13px;
    font-weight: 600;
    color: #147638;
    margin-bottom: 4px;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-owner-tag {
    display: inline-flex;
    align-items: center;
    background: #D6E3DC;
    color: #3F4940;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 999px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 4px;
  }
  .gbp-owner-divider { height: 1px; background: #D8E6DE; }

  .gbp-owner-feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 16px;
  }
  @media (max-width: 520px) { .gbp-owner-feature-grid { grid-template-columns: 1fr; } }

  .gbp-owner-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 13px;
    color: #3F4940;
    line-height: 1.6;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-owner-card-footer { padding: 0 24px 24px; display: flex; flex-direction: column; gap: 14px; }
  .gbp-owner-example {
    background: #fff;
    border: 1px solid #D6E3DC;
    border-radius: 0px;
    padding: 14px 16px;
  }
  .gbp-owner-example-label {
    font-size: 11px;
    font-weight: 700;
    color: #3F4940;
    margin: 0 0 6px;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-owner-example-text {
    font-size: 13px;
    color: #3F4940;
    line-height: 1.7;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-owner-cta {
    width: 100%;
    height: 50px;
    background: #005327;
    color: #fff;
    border: none;
    border-radius: 0px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-owner-cta:hover { background: #0F6D38; }

  /* ----------------------------------
     WHY + HOW
  ---------------------------------- */
  .gbp-why-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: stretch;
  }
  @media (max-width: 768px) { .gbp-why-grid { grid-template-columns: 1fr; } }

  .gbp-section-card {
    background: #fff;
    border: 1.5px solid #a8d5ba;
    border-radius: 0px;
    overflow: visible;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 500px;
  }
  .gbp-section-card-header {
    border-bottom: 1px solid #ddd6c8;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    flex-shrink: 0;
  }
  .gbp-section-card-title {
    font-size: 14px;
    font-weight: 700;
    color: #0C3A1D;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-section-card-sub {
    font-size: 12px;
    color: #6b7280;
    margin: 2px 0 0;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-section-card-body {
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .gbp-compare-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    min-width: 240px;
    height: 100%;
  }
  .gbp-compare-table thead {
    background: #f5f5f0;
  }
  .gbp-compare-table th {
    padding: 14px 16px;
    font-weight: 600;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
    color: #6b7280;
    font-size: 13px;
  }
  .gbp-compare-table th:first-child {
    width: 50%;
  }
  .gbp-compare-table th:nth-child(2),
  .gbp-compare-table th:nth-child(3) {
    width: 25%;
  }
  .gbp-compare-table th:last-child {
    color: #0a7a44;
    font-weight: 700;
  }
  .gbp-compare-table td {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    text-align: left;
    color: #374151;
    vertical-align: middle;
  }
  .gbp-compare-table td:first-child {
    font-weight: 500;
  }
  .gbp-compare-table tbody tr:last-child td {
    border-bottom: none;
  }
  .gbp-compare-table tbody tr:nth-child(even) {
    background: #fafafa;
  }

  .gbp-how-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding: 24px;
    height: 100%;
    align-items: start;
  }
  @media (max-width: 520px) { .gbp-how-grid { grid-template-columns: 1fr; } }

  .gbp-how-column {
    display: flex;
    flex-direction: column;
  }
  .gbp-how-column-header {
    font-size: 12px;
    font-weight: 700;
    color: #0a7a44;
    margin: 0 0 18px;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .gbp-how-step {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    color: #374151;
    line-height: 1.6;
    font-weight: 500;
  }
  .gbp-how-step:last-child {
    margin-bottom: 0;
  }
  .gbp-how-step-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
    flex-shrink: 0;
    color: #fff;
  }

  /* ----------------------------------
     FAQ & CTA LAYOUT
  ---------------------------------- */
  .gbp-faq-cta-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 32px;
  }
  @media (max-width: 1024px) {
    .gbp-faq-cta-wrapper {
      grid-template-columns: 1fr;
    }
  }

  /* ----------------------------------
     FAQ
  ---------------------------------- */
  .gbp-faq-section-wrapper {
    background: #fff;
    border: 1.5px solid #a8d5ba;
    border-radius: 0px;
    padding: 24px;
  }
  .gbp-faq-section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .gbp-faq-section-icon {
    width: 20px;
    height: 20px;
    color: #6b7280;
  }
  .gbp-faq-section-title {
    font-size: 13px;
    font-weight: 700;
    color: #1F2937;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  .gbp-faq-grid {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0;
  }

  .gbp-faq-item {
    border-radius: 0px;
    overflow: hidden;
    cursor: pointer;
    margin-bottom: 12px;
    border: 1.5px solid #ddd6c8;
    background: #fff;
  }
  .gbp-faq-item:last-child { margin-bottom: 0; border-bottom: 1.5px solid #ddd6c8; }
  .gbp-faq-item.open { border-color: #ddd6c8; }
  .gbp-faq-q {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    gap: 12px;
    background: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #111827;
    line-height: 1.4;
  }
  .gbp-faq-item.open .gbp-faq-q { background: #fff; }
  .gbp-faq-a {
    padding: 0 16px 14px;
    background: #fff;
    border-top: none;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    color: #6b7280;
    line-height: 1.7;
    margin: 0;
  }

  /* ----------------------------------
     CTA BANNER
  ---------------------------------- */
  .gbp-cta-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: linear-gradient(135deg, #0a7a44, #0F9D58);
    border-radius: 0px;
    padding: 32px 36px;
    min-height: 100%;
  }
  .gbp-cta-content {
    margin-bottom: 24px;
  }
  .gbp-cta-title {
    font-family: 'Poppins', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 12px;
    line-height: 1.3;
  }
  .gbp-cta-subtitle {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: rgba(255,255,255,0.9);
    margin: 0 0 24px;
    line-height: 1.6;
  }
  .gbp-cta-features {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 24px;
  }
  .gbp-cta-feature {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    color: #fff;
    font-weight: 500;
  }
  .gbp-cta-btns {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  @media (max-width: 640px) {
    .gbp-cta-wrap { padding: 24px 20px; }
    .gbp-cta-title { font-size: 22px; }
    .gbp-cta-btns { flex-direction: column; width: 100%; }
    .gbp-cta-btns button { width: 100%; }
  }
  }
  .gbp-cta-btns {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  @media (max-width: 400px) {
    .gbp-cta-btns { flex-direction: column; }
    .gbp-cta-btns button { width: 100%; }
  }

  /* ----------------------------------
     FOOTER STATS
  ---------------------------------- */
  .gbp-footer-stats {
    display: flex;
    justify-content: center;
    gap: 32px;
    padding-top: 20px;
    border-top: 1px solid #ddd6c8;
    flex-wrap: wrap;
    padding-bottom: 4px;
  }
  @media (max-width: 640px) { .gbp-footer-stats { gap: 14px; } }
  .gbp-footer-stat {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
  }
`;

/* -- helpers -- */
const fl = (extra = {}) => ({ display: "flex", ...extra });

/* -- Razorpay -- */
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

const startPayment = async ({ amount, planName }) => {
  try {
    const loaded = await loadRazorpay();
    if (!loaded) { alert("Razorpay SDK failed to load"); return; }
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/create-order`,
      { planName },
      { withCredentials: true }
    );
    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,
      name: "GharBazaar",
      description: planName,
      theme: { color: "#0D6B3F" },
      handler: async (response) => {
        try {
          const v = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true }
          );
          if (v.data.success) alert("Payment Successful");
        } catch { alert("Payment Verification Failed"); }
      },
      modal: { ondismiss: () => {} },
    };
    new window.Razorpay(options).open();
  } catch { alert("Payment Failed"); }
};

/* ----------------------------------
   TRUST BAR
---------------------------------- */
const TrustBar = () => (
  <div className="gbp-trust-bar">
    {[
      { icon: <ShieldCheck size={13} color={SOFT} />, label: "Verified Properties" },
      { icon: <Users size={13} color={SOFT} />, label: "Verified Owners" },
      { icon: <BadgeIndianRupee size={13} color={SOFT} />, label: "Transparent Pricing" },
      { icon: <HeartHandshake size={13} color={SOFT} />, label: "No Hidden Charges" },
      { icon: <Headphones size={13} color={SOFT} />, label: "Dedicated Support" },
    ].map(({ icon, label }) => (
      <span key={label} className="gbp-trust-pill">{icon} {label}</span>
    ))}
  </div>
);

/* ----------------------------------
   STUDENT PLANS
---------------------------------- */
const StudentPlans = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section className="gbp-section">
      {/* Section Header */}
      <div className="gbp-sp-section-header">
        <div className="gbp-sp-section-icon">
          <Home size={18} />
        </div>
        <div>
          <div className="gbp-sp-section-title">STUDENT & TENANT PLANS</div>
          <div className="gbp-sp-section-subtitle">Find safe and verified accommodation</div>
        </div>
      </div>

      <div className="gbp-sp-tab-bar">
        {["Self-Management", "Assisted Plan"].map((label, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`gbp-sp-tab-btn${activeTab === i ? " active" : ""}`}
          >{label}</button>
        ))}
      </div>

      <div className="gbp-sp-grid">
        {/* -- Self-Management -- */}
        <div className={`gbp-sp-card${activeTab === 0 ? " active" : ""}`}>
          <div className="gbp-sp-inner">
            <div className="gbp-sp-header">
              <div>
                <p className="gbp-sp-plan-label">For Students</p>
                <h3 className="gbp-sp-card-title">Self-Management Plan</h3>
              </div>
              <div className="gbp-sp-icon-box"><Home size={22} color="#0D6B3F" /></div>
            </div>
            <div className="gbp-sp-price-row">
              <span className="gbp-sp-price">?599</span>
              <span className="gbp-sp-price-suffix">+ GST / one-time</span>
            </div>
            <p className="gbp-sp-description">
              For students who want direct access to verified properties and prefer managing the process themselves.
            </p>
            <div className="gbp-sp-divider" />
            <div className="gbp-sp-features-grid">
              <div>
                <p className="gbp-sp-feature-heading">What's Included</p>
                <ul className="gbp-sp-feature-list">
                  {["Verified Property Listings", "Verified Owner Details", "Property Photos & Videos", "Direct Owner Contact", "Property Matching Support", "Visit Coordination", "Location Information"].map(item => (
                    <li key={item} className="gbp-sp-feature-item">
                      <CheckCircle2 size={15} color="#0D6B3F" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="gbp-sp-not-included-box">
                <p className="gbp-sp-feature-heading">Not Included</p>
                <ul className="gbp-sp-feature-list">
                  {["Rent Agreement Assistance", "Police Verification", "Documentation Support", "Move-In Assistance"].map(item => (
                    <li key={item} className="gbp-sp-feature-item" style={{ color: "#6B7280" }}>
                      <XCircle size={14} color="#D9534F" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <button className="gbp-sp-cta-btn" onClick={() => startPayment({ amount: 599, planName: "Self Management Plan" })}>
            Get Verified Access
          </button>
        </div>

        {/* -- Assisted Plan -- */}
        <div className={`gbp-sp-card gbp-sp-card-popular${activeTab === 1 ? " active" : ""}`}>
          <div className="gbp-sp-badge">? MOST POPULAR</div>
          <div className="gbp-sp-inner gbp-sp-inner-popular">
            <div className="gbp-sp-header">
              <div>
                <p className="gbp-sp-plan-label">Recommended</p>
                <h3 className="gbp-sp-card-title">Assisted Accommodation Plan</h3>
              </div>
              <div className="gbp-sp-icon-box"><Users size={22} color="#0D6B3F" /></div>
            </div>
            <div className="gbp-sp-price-row">
              <span className="gbp-sp-price">?1499</span>
              <span className="gbp-sp-price-suffix">+ GST</span>
              <span className="gbp-sp-booking-tag">BOOKING FEE ONLY</span>
            </div>
            <p className="gbp-sp-description">
              Our team helps you find and finalize the right accommodation.
            </p>
            <div className="gbp-sp-divider" />
            <div className="gbp-sp-features-grid">
              <div>
                <p className="gbp-sp-feature-heading">Included in ?1499</p>
                <ul className="gbp-sp-feature-list">
                  {["Requirement Assessment", "Property Search & Shortlisting", "Owner Coordination", "Visit Scheduling", "Accommodation Guidance", "Dedicated Support"].map(item => (
                    <li key={item} className="gbp-sp-feature-item">
                      <CheckCircle2 size={15} color="#0D6B3F" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="gbp-sp-important-box">
                <div style={fl({ alignItems: "center", gap: 8, marginBottom: 8 })}>
                  <ShieldCheck size={14} color="#0D6B3F" />
                  <span style={{ fontWeight: 700, fontSize: "11px", color: "#1F2937", fontFamily: "'Poppins',sans-serif" }}>Important</span>
                </div>
                <p style={{ fontSize: "12px", color: "#5F6368", lineHeight: 1.6, margin: 0, fontFamily: "'Poppins',sans-serif" }}>
                  ?1499 is only a booking amount to start the accommodation assistance process.<br /><br />
                  Additional services are charged separately if required.
                </p>
              </div>
            </div>
          </div>
          <button className="gbp-sp-cta-btn" onClick={() => startPayment({ amount: 1499, planName: "Assisted Accommodation Plan" })}>
            Book Assistance
          </button>
        </div>
      </div>
    </section>
  );
};

/* ----------------------------------
   ADD-ON SERVICES
---------------------------------- */
const addons = [
  { icon: <FileText size={20} />, title: "Rent Agreement Assistance", features: ["Rental Agreement Preparation", "Documentation Coordination", "Verification Guidance"] },
  { icon: <ShieldCheck size={20} />, title: "Police Verification Assistance", features: ["Police Verification Support", "Process Guidance", "Documentation Help"] },
  { icon: <Package size={20} />, title: "Documentation Assistance", features: ["Tenant Documentation Support", "Form Guidance", "Verification Assistance"] },
  { icon: <Truck size={20} />, title: "Move-In Coordination", features: ["Move-In Planning", "Owner Coordination", "Final Occupancy Support"] },
];

const AddOnServices = () => (
  <section className="gbp-section">
    <div className="gbp-addon-header">
      <div className="gbp-addon-icon-box">
        <Package size={18} color="#0D6B3F" />
      </div>
      <div>
        <h2 className="gbp-addon-header-title">Optional Add-On Services</h2>
        <p className="gbp-addon-header-sub">Available with Assisted Accommodation Plan (separate charges apply)</p>
      </div>
    </div>
    <div className="gbp-addon-grid">
      {addons.map((addon) => (
        <div key={addon.title} className="gbp-addon-card">
          <div className="gbp-addon-card-top">
            <div className="gbp-addon-card-icon">{addon.icon}</div>
            <p className="gbp-addon-card-title">{addon.title}</p>
            <ul className="gbp-addon-feature-list">
              {addon.features.map((f) => (
                <li key={f} className="gbp-addon-feature-item">
                  <Check size={13} color="#0D6B3F" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="gbp-addon-card-bottom">
            <div className="gbp-addon-divider">
              <p className="gbp-addon-gst-label">Service Fee</p>
              <p className="gbp-addon-gst-value">+ GST</p>
            </div>
            <button className="gbp-addon-btn">Know More</button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ----------------------------------
   PROPERTY OWNER PLANS
---------------------------------- */
const ownerPlans = [
  {
    label: "Tenant Placement Service",
    title: "Tenant Placement Service",
    desc: "Fill vacancies faster and increase occupancy with a dedicated tenant placement solution.",
    icon: <Users size={22} color="#147638" />,
    price: "50%",
    suffix: "of First Month Rent",
    tag: "One-Time Only",
    features: ["Property Listing", "Social Media Promotion", "Lead Generation", "Property Visits", "Property Marketing", "Student Network Reach", "Tenant Matching", "Occupancy Support"],
    exampleRent: "?10,000",
    exampleFee: "GharBazaar Fee: ?5,000",
    cta: "Find Tenants",
    payAmount: 5000,
    payPlan: "Tenant Placement Service",
  },
  {
    label: "Complete Property Management",
    title: "Complete Property Management",
    desc: "End-to-end management for steady rental income and tenant support.",
    icon: <Building2 size={22} color="#147638" />,
    price: "10%",
    suffix: "of Monthly Rental Income",
    tag: "Recurring Monthly",
    features: ["Tenant Acquisition", "Occupancy Management", "Tenant Communication", "Vacancy Management", "New Tenant Placement", "Property Marketing", "Rent Collection Support", "Relisting Support"],
    exampleRent: "?10,000",
    exampleFee: "Management Fee: ?1,000 / month",
    cta: "Manage My Property",
    payAmount: 1000,
    payPlan: "Complete Property Management",
  },
];

const PropertyOwnerPlans = () => (
  <section className="gbp-section">
    <div className="gbp-owner-header">
      <div className="gbp-addon-icon-box">
        <Building2 size={18} color="#0D6B3F" />
      </div>
      <div>
        <h2 className="gbp-addon-header-title">Property Owner Plans</h2>
        <p className="gbp-addon-header-sub">Fill vacancies faster &amp; increase occupancy</p>
      </div>
    </div>
    <div className="gbp-owner-grid">
      {ownerPlans.map((p) => (
        <div key={p.title} className="gbp-owner-card">
          <div className="gbp-owner-card-body">
            <div className="gbp-owner-card-top-row">
              <div>
                <p className="gbp-owner-plan-label">{p.label}</p>
                <h3 className="gbp-owner-card-title">{p.title}</h3>
                <p className="gbp-owner-card-desc">{p.desc}</p>
              </div>
              <div className="gbp-owner-card-icon">{p.icon}</div>
            </div>
            <div className="gbp-owner-price-row">
              <span className="gbp-owner-price">{p.price}</span>
              <span className="gbp-owner-price-suffix">{p.suffix}</span>
              <span className="gbp-owner-tag">{p.tag}</span>
            </div>
            <div className="gbp-owner-divider" />
            <div className="gbp-owner-feature-grid">
              {p.features.map((f) => (
                <div key={f} className="gbp-owner-feature-item">
                  <CheckCircle2 size={14} color="#147638" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="gbp-owner-card-footer">
            <div className="gbp-owner-example">
              <p className="gbp-owner-example-label">Example</p>
              <p className="gbp-owner-example-text">
                Monthly Rent: {p.exampleRent}<br />
                <strong style={{ color: "#005327" }}>{p.exampleFee}</strong>
              </p>
            </div>
            <button className="gbp-owner-cta" onClick={() => startPayment({ amount: p.payAmount, planName: p.payPlan })}>
              {p.cta}
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ----------------------------------
   WHY + HOW
---------------------------------- */
const compareFeatures = [
  { feature: "Property Listings", others: true, us: true },
  { feature: "Verified Owners", others: false, us: true },
  { feature: "Property Matching", others: false, us: true },
  { feature: "Accommodation Assistance", others: false, us: true },
  { feature: "Documentation Support", others: false, us: true },
  { feature: "Police Verification Support", others: false, us: true },
  { feature: "Occupancy Management", others: false, us: true },
  { feature: "Property Management", others: false, us: true },
];
const tenantSteps = ["Register", "Choose Plan", "Get Verified Properties", "Visit Properties", "Finalize Accommodation", "Move In"];
const ownerSteps  = ["Submit Property", "Verification", "Marketing & Promotion", "Tenant Matching", "Occupancy", "Revenue Generation"];

const WhyHow = () => (
  <section className="gbp-section">
    <div className="gbp-why-grid">
      {/* Why */}
      <div className="gbp-section-card">
        <div className="gbp-section-card-header">
          <Award size={18} color="#0a7a44" />
          <div>
            <p className="gbp-section-card-title">Why GharBazaar?</p>
            <p className="gbp-section-card-sub">More than just listings</p>
          </div>
        </div>
        <div className="gbp-section-card-body">
          <table className="gbp-compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th style={{ textAlign: "center" }}>Other Portals</th>
                <th style={{ textAlign: "center" }}>GharBazaar</th>
              </tr>
            </thead>
            <tbody>
              {compareFeatures.map((row, i) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td style={{ textAlign: "center" }}>
                    {row.others ? <CheckCircle2 size={18} color={G} /> : <XCircle size={18} color="#ef4444" />}
                  </td>
                  <td style={{ textAlign: "center" }}><CheckCircle2 size={18} color={G} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How */}
      <div className="gbp-section-card">
        <div className="gbp-section-card-header">
          <ArrowRight size={18} color="#0a7a44" />
          <div>
            <p className="gbp-section-card-title">How It Works</p>
          </div>
        </div>
        <div className="gbp-section-card-body">
          <div className="gbp-how-grid">
            <div className="gbp-how-column">
              <p className="gbp-how-column-header">For Students / Tenants</p>
              {tenantSteps.map((step, i) => (
                <div key={step} className="gbp-how-step">
                  <div className="gbp-how-step-num" style={{ background: G }}>{i + 1}</div>
                  {step}
                </div>
              ))}
            </div>
            <div className="gbp-how-column">
              <p className="gbp-how-column-header">For Property Owners</p>
              {ownerSteps.map((step, i) => (
                <div key={step} className="gbp-how-step">
                  <div className="gbp-how-step-num" style={{ background: "#7c3aed" }}>{i + 1}</div>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ----------------------------------
   FAQ
---------------------------------- */
const faqs = [
  { q: "Why should I pay ?599?", a: "The ?599 Self-Management plan gives you direct verified access to property listings, owner details, photos & videos, and the ability to coordinate visits on your own without needing our team's assistance." },
  { q: "Why is there a ?1499 booking fee?", a: "The ?1499 is a booking fee that initiates our full-service accommodation assistance. Our dedicated team will search, shortlist, and coordinate on your behalf." },
  { q: "Are additional services mandatory?", a: "No. Additional services such as rent agreement assistance, police verification, and move-in coordination are completely optional." },
  { q: "Is the property owner fee recurring?", a: "The Tenant Placement Service (50% of first month rent) is a one-time fee. The Complete Property Management plan (10% monthly) is a recurring charge billed each month." },
  { q: "What is Complete Property Management?", a: "It's an end-to-end service where GharBazaar manages your entire rental cycle � from finding tenants and rent collection to documentation and vacancy management � for just 10% of your monthly rent." },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const Item = ({ f, idx }) => (
    <div
      className={`gbp-faq-item${open === idx ? " open" : ""}`}
      onClick={() => setOpen(open === idx ? null : idx)}
    >
      <div className="gbp-faq-q">
        <span>{f.q}</span>
        <Plus size={16} color={SOFT} style={{ flexShrink: 0 }} />
      </div>
      {open === idx && <p className="gbp-faq-a">{f.a}</p>}
    </div>
  );

  return (
    <div className="gbp-faq-section-wrapper">
      <div className="gbp-faq-section-header">
        <HelpCircle className="gbp-faq-section-icon" size={20} />
        <h3 className="gbp-faq-section-title">Frequently Asked Questions</h3>
      </div>
      <div className="gbp-faq-grid">
        {faqs.map((f, i) => <Item key={i} f={f} idx={i} />)}
      </div>
    </div>
  );
};

/* ----------------------------------
   CTA
---------------------------------- */
const CTA = () => (
  <div className="gbp-cta-wrap">
    <div className="gbp-cta-content">
      <h3 className="gbp-cta-title">
        Ready to Find Your Perfect Accommodation?
      </h3>
      <p className="gbp-cta-subtitle">
        Join students, tenants, landlords, and property owners who trust GharBazaar.
      </p>
      <div className="gbp-cta-features">
        <span className="gbp-cta-feature">
          <ShieldCheck size={16} /> Verified
        </span>
        <span className="gbp-cta-feature">
          <BadgeIndianRupee size={16} /> Transparent
        </span>
        <span className="gbp-cta-feature">
          <ThumbsUp size={16} /> Reliable
        </span>
      </div>
    </div>
    <div className="gbp-cta-btns">
      <button style={{ background: WHITE, color: GD, border: "none", borderRadius: 0, padding: "12px 24px", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
        Get Started Now
      </button>
      <button style={{ background: "transparent", color: WHITE, border: "2px solid rgba(255,255,255,0.5)", borderRadius: 0, padding: "12px 24px", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
        <Phone size={13} /> Talk to Expert
      </button>
    </div>
  </div>
);

/* ----------------------------------
   FOOTER STATS
---------------------------------- */
const FooterStats = () => (
  <div className="gbp-footer-stats">
    {[
      { icon: <Users size={14} color={SOFT} />, label: "10,000+ Students Helped" },
      { icon: <MapPin size={14} color={SOFT} />, label: "50+ Cities Covered" },
      { icon: <ShieldCheck size={14} color={SOFT} />, label: "Verified Properties" },
      { icon: <ThumbsUp size={14} color={SOFT} />, label: "Trusted by Thousands" },
      { icon: <Star size={14} color={SOFT} />, label: "4.8/5 Customer Rating" },
    ].map(({ icon, label }) => (
      <div key={label} className="gbp-footer-stat">{icon} {label}</div>
    ))}
  </div>
);

/* ----------------------------------
   ROOT
---------------------------------- */
export default function GharBazaarPricing() {
  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{CSS}</style>
      <div className="gbp-root">
        <div className="gbp-wrap">

          {/* Hero */}
          <div style={{ marginBottom: 24 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: GL, color: G, fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 100, fontFamily: "'Poppins',sans-serif", marginBottom: 14, border: `1px solid #bbf7d0` }}>
              ?? Transparent Pricing
            </span>
            <h1 className="gbp-hero-title">
              Simple Plans. Verified Properties. Trusted Support.
            </h1>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", color: SOFT, margin: "0 0 20px 0", lineHeight: 1.6, maxWidth: "700px" }}>
              Whether you're a Student, Tenant, Property Owner, PG Operator, or Landlord � choose the plan that fits your needs.
            </p>
            <TrustBar />
          </div>

          <StudentPlans />
          <AddOnServices />
          <PropertyOwnerPlans />
          <WhyHow />
          
          {/* FAQ & CTA Side by Side */}
          <section className="gbp-section">
            <div className="gbp-faq-cta-wrapper">
              <CTA />
              <FAQ />
            </div>
          </section>

          <FooterStats />
        </div>
      </div>
    </>
  );
}
