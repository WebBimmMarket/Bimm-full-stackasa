"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import {
  PRODUCTS,
  CATEGORIES,
  PAYMENT_METHODS,
  FAQ_DATA,
  formatRupiah,
  type Product,
} from "@/lib/products";

type Tab = "home" | "shop" | "orders" | "info";
type OrderStatus = "pending" | "processing" | "done" | "cancelled";

interface CartItem {
  product: Product;
  qty: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  username: string;
  payment: string;
  note: string;
}

// ─── HEADER ───
function Header({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  return (
    <header className="header">
      <div className="header-row">
        <div className="brand">
          <img
            src="https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg"
            alt="BIMM Market Logo"
            className="brand-logo"
            width={40}
            height={40}
          />
          <div>
            <div className="brand-title">BIMM MARKET</div>
            <div className="brand-subtitle">Top Up Robux & Gamepass</div>
          </div>
        </div>
        <button className="icon-btn" onClick={onCartClick} aria-label="Cart">
          🛒
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

// ─── BOTTOM NAV ───
function BottomNav({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "shop", icon: "🛍️", label: "Shop" },
    { id: "orders", icon: "📋", label: "Orders" },
    { id: "info", icon: "ℹ️", label: "Info" },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={tab === t.id ? "active" : ""}
          onClick={() => setTab(t.id)}
        >
          <span className="ic">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  );
}

// ─── HOME SECTION ───
function HomeSection({
  onShop,
  onProductClick,
}: {
  onShop: () => void;
  onProductClick: (p: Product) => void;
}) {
  const popular = useMemo(() => PRODUCTS.filter((p) => p.popular), []);

  return (
    <div>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">1K+</span>
          <span className="stat-label">Transaksi</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">4.9</span>
          <span className="stat-label">Rating</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">5-30</span>
          <span className="stat-label">Menit</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="action-card" onClick={onShop}>
          <span className="action-icon">💎</span>
          <div>
            <div className="action-title">Top Up Robux</div>
            <div className="action-desc">Mulai Rp 16.000</div>
          </div>
        </div>
        <div className="action-card" onClick={onShop}>
          <span className="action-icon">🎫</span>
          <div>
            <div className="action-title">Gamepass</div>
            <div className="action-desc">Custom & Paket</div>
          </div>
        </div>
        <div className="action-card" onClick={onShop}>
          <span className="action-icon">📦</span>
          <div>
            <div className="action-title">Bundle Hemat</div>
            <div className="action-desc">Bonus Eksklusif</div>
          </div>
        </div>
        <a
          className="action-card"
          href="https://wa.me/6289540228397"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span className="action-icon">💬</span>
          <div>
            <div className="action-title">Hubungi Admin</div>
            <div className="action-desc">WhatsApp 24/7</div>
          </div>
        </a>
      </div>

      {/* Popular Products */}
      <div className="section-header">
        <span className="section-title">PRODUK POPULER</span>
        <button className="view-all-btn" onClick={onShop}>
          Lihat Semua &rarr;
        </button>
      </div>
      <div className="popular-products-grid">
        {popular.map((p) => (
          <div
            key={p.id}
            className="mini-product-card"
            onClick={() => onProductClick(p)}
          >
            <div
              className="product-img"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
              }}
            >
              {p.category === "robux" ? "💎" : p.category === "gamepass" ? "🎫" : "📦"}
            </div>
            <div className="product-name">{p.name}</div>
            <div className="product-price">{formatRupiah(p.price)}</div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="section-header">
        <span className="section-title">KATEGORI</span>
      </div>
      <div className="popular-categories-grid">
        {CATEGORIES.map((c) => (
          <div key={c.id} className="mini-cat-card" onClick={onShop}>
            <div className="cat-icon">{c.icon}</div>
            <div className="cat-name">{c.name}</div>
            <div className="cat-count">{c.count} produk</div>
          </div>
        ))}
      </div>

      <div className="footer-text">
        &copy; 2025 BIMM Market. All rights reserved.
      </div>
    </div>
  );
}

// ─── SHOP SECTION ───
function ShopSection({
  onAddToCart,
}: {
  onAddToCart: (p: Product) => void;
}) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let items = PRODUCTS;
    if (filter !== "all") items = items.filter((p) => p.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }
    return items;
  }, [filter, search]);

  return (
    <div>
      <div className="tile">
        <div className="tile-title">SHOP</div>
      </div>

      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="popular-products-grid">
        {filtered.map((p) => (
          <div key={p.id} className="mini-product-card" onClick={() => onAddToCart(p)}>
            <div
              className="product-img"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
              }}
            >
              {p.category === "robux" ? "💎" : p.category === "gamepass" ? "🎫" : "📦"}
            </div>
            <div className="product-name">{p.name}</div>
            <div style={{ fontSize: "10px", color: "var(--muted)" }}>{p.description}</div>
            <div className="product-price">{formatRupiah(p.price)}</div>
            <button
              className="pixel-btn"
              style={{ fontSize: "8px", padding: "6px 10px", marginTop: "4px" }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(p);
              }}
            >
              + Keranjang
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
          Produk tidak ditemukan
        </div>
      )}
    </div>
  );
}

// ─── ORDERS SECTION ───
function OrdersSection({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div>
        <div className="tile">
          <div className="tile-title">RIWAYAT ORDER</div>
        </div>
        <div
          className="pixel-card"
          style={{ textAlign: "center", padding: "40px 16px" }}
        >
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📋</div>
          <div style={{ fontSize: "12px", color: "var(--muted)" }}>
            Belum ada order. Mulai belanja sekarang!
          </div>
        </div>
      </div>
    );
  }

  const statusClass: Record<OrderStatus, string> = {
    pending: "status-pending",
    processing: "status-processing",
    done: "status-done",
    cancelled: "status-cancelled",
  };
  const statusLabel: Record<OrderStatus, string> = {
    pending: "Menunggu",
    processing: "Diproses",
    done: "Selesai",
    cancelled: "Dibatalkan",
  };

  return (
    <div>
      <div className="tile">
        <div className="tile-title">RIWAYAT ORDER</div>
      </div>
      {orders.map((o) => (
        <div key={o.id} className="tx-item">
          <div className="tx-header">
            <span className="tx-id">#{o.id}</span>
            <span className={`status-badge ${statusClass[o.status]}`}>
              {statusLabel[o.status]}
            </span>
          </div>
          <div className="tx-date">{o.date}</div>
          <div className="tx-products">
            {o.items.map((i) => `${i.product.name} x${i.qty}`).join(", ")}
          </div>
          <div className="tx-total">{formatRupiah(o.total)}</div>
        </div>
      ))}
    </div>
  );
}

// ─── INFO SECTION ───
function InfoSection() {
  return (
    <div>
      <div className="tile">
        <div className="tile-title">INFORMASI</div>
      </div>

      {/* About */}
      <div className="info-section">
        <div className="info-header">Tentang BIMM Market</div>
        <div className="info-content">
          <p className="small">
            BIMM Market adalah platform top up Robux dan Gamepass Roblox
            terpercaya. Melayani Indonesia & internasional dengan harga
            termurah, proses cepat 5-30 menit.
          </p>
          <div className="info-stats">
            <div className="stat-mini">
              <span className="stat-num">1K+</span>
              <span className="hint">Transaksi</span>
            </div>
            <div className="stat-mini">
              <span className="stat-num">4.9</span>
              <span className="hint">Rating</span>
            </div>
            <div className="stat-mini">
              <span className="stat-num">24/7</span>
              <span className="hint">Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="info-section">
        <div className="info-header">Jam Operasional</div>
        <div className="info-content">
          <div className="schedule-item">
            <span className="day">Senin - Jumat</span>
            <span className="time">08:00 - 22:00 WIB</span>
          </div>
          <div className="schedule-item">
            <span className="day">Sabtu - Minggu</span>
            <span className="time">09:00 - 21:00 WIB</span>
          </div>
        </div>
      </div>

      {/* How to Order */}
      <div className="info-section">
        <div className="info-header">Cara Order</div>
        <div className="info-content">
          <div className="step-list">
            {[
              { t: "Pilih Produk", d: "Pilih Robux atau Gamepass yang kamu mau" },
              { t: "Isi Data", d: "Masukkan username Roblox kamu" },
              { t: "Bayar", d: "Pilih metode pembayaran & upload bukti" },
              { t: "Selesai!", d: "Tunggu 5-30 menit, Robux masuk ke akun" },
            ].map((s, i) => (
              <div key={i} className="step-item">
                <div className="step-num">{i + 1}</div>
                <div>
                  <div className="step-title">{s.t}</div>
                  <div className="step-desc">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="info-section">
        <div className="info-header">Metode Pembayaran</div>
        <div className="info-content">
          <div className="payment-grid">
            {PAYMENT_METHODS.map((pm) => (
              <div key={pm.id} className="payment-item">
                <span className="payment-icon">{pm.icon}</span>
                <span className="payment-name">{pm.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="info-section">
        <div className="info-header">FAQ</div>
        <div className="info-content">
          {FAQ_DATA.map((f, i) => (
            <div key={i} className="faq-item">
              <div className="faq-q">{f.q}</div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="info-section">
        <div className="info-header">Kontak</div>
        <div className="info-content">
          <div className="contact-grid">
            <a
              className="contact-btn"
              href="https://wa.me/6289540228397"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp
            </a>
            <a
              className="contact-btn"
              href="https://www.instagram.com/bimmmarket"
              target="_blank"
              rel="noopener noreferrer"
            >
              📷 Instagram
            </a>
            <a
              className="contact-btn"
              href="https://www.tiktok.com/@bimmmarket"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎵 TikTok
            </a>
            <a className="contact-btn" href="mailto:bimmmarket@gmail.com">
              ✉️ Email
            </a>
          </div>
        </div>
      </div>

      <div className="footer-text">
        &copy; 2025 BIMM Market. All rights reserved.
      </div>
    </div>
  );
}

// ─── CART MODAL ───
function CartModal({
  open,
  cart,
  onClose,
  onUpdateQty,
  onRemove,
  onCheckout,
}: {
  open: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) {
  const total = useMemo(
    () => cart.reduce((s, i) => s + i.product.price * i.qty, 0),
    [cart]
  );

  if (!open) return null;

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="modal pixel-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
          <span className="tile-title">KERANJANG</span>
          <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32, fontSize: 14 }}>
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: "var(--muted)", fontSize: "12px" }}>
            Keranjang kosong
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.product.id} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px", background: "var(--surface)", borderRadius: "10px",
                border: "1px solid var(--border)", marginBottom: "8px",
              }}>
                <div style={{ fontSize: "24px" }}>
                  {item.product.category === "robux" ? "💎" : item.product.category === "gamepass" ? "🎫" : "📦"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "12px", fontWeight: 600 }}>{item.product.name}</div>
                  <div className="price">{formatRupiah(item.product.price)}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <button
                    className="icon-btn"
                    style={{ width: 28, height: 28, fontSize: 14 }}
                    onClick={() => onUpdateQty(item.product.id, item.qty - 1)}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "12px", fontWeight: 600, minWidth: "16px", textAlign: "center" }}>
                    {item.qty}
                  </span>
                  <button
                    className="icon-btn"
                    style={{ width: 28, height: 28, fontSize: 14 }}
                    onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                  >
                    +
                  </button>
                  <button
                    className="icon-btn"
                    style={{ width: 28, height: 28, fontSize: 14, color: "var(--danger)" }}
                    onClick={() => onRemove(item.product.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
            <hr className="sep" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", fontWeight: 600 }}>Total</span>
              <span className="price" style={{ fontSize: "13px" }}>{formatRupiah(total)}</span>
            </div>
            <button
              className="pixel-btn yellow"
              style={{ width: "100%", textAlign: "center" }}
              onClick={onCheckout}
            >
              CHECKOUT
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── CHECKOUT MODAL ───
function CheckoutModal({
  open,
  cart,
  onClose,
  onSubmit,
}: {
  open: boolean;
  cart: CartItem[];
  onClose: () => void;
  onSubmit: (data: { username: string; payment: string; note: string }) => void;
}) {
  const [username, setUsername] = useState("");
  const [payment, setPayment] = useState("qris");
  const [note, setNote] = useState("");
  const total = useMemo(
    () => cart.reduce((s, i) => s + i.product.price * i.qty, 0),
    [cart]
  );

  if (!open) return null;

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="modal pixel-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
          <span className="tile-title">CHECKOUT</span>
          <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32, fontSize: 14 }}>
            ✕
          </button>
        </div>

        {/* Order Summary */}
        <div style={{ marginBottom: "12px" }}>
          <div className="hint" style={{ marginBottom: "6px" }}>Ringkasan Order:</div>
          {cart.map((item) => (
            <div key={item.product.id} style={{
              display: "flex", justifyContent: "space-between",
              fontSize: "11px", padding: "4px 0",
            }}>
              <span>{item.product.name} x{item.qty}</span>
              <span className="price">{formatRupiah(item.product.price * item.qty)}</span>
            </div>
          ))}
          <hr className="sep" />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12px", fontWeight: 700 }}>Total</span>
            <span className="price">{formatRupiah(total)}</span>
          </div>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <label className="hint" style={{ display: "block", marginBottom: "4px" }}>
              Username Roblox *
            </label>
            <input
              className="input"
              placeholder="Masukkan username Roblox"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label className="hint" style={{ display: "block", marginBottom: "4px" }}>
              Metode Pembayaran *
            </label>
            <select
              className="select"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              style={{ width: "100%" }}
            >
              {PAYMENT_METHODS.map((pm) => (
                <option key={pm.id} value={pm.id}>
                  {pm.icon} {pm.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="hint" style={{ display: "block", marginBottom: "4px" }}>
              Catatan (opsional)
            </label>
            <textarea
              className="input"
              placeholder="Catatan untuk admin..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          <button
            className="pixel-btn yellow"
            style={{ width: "100%", textAlign: "center", marginTop: "6px" }}
            disabled={!username.trim()}
            onClick={() => {
              if (!username.trim()) return;
              onSubmit({ username: username.trim(), payment, note: note.trim() });
              setUsername("");
              setNote("");
            }}
          >
            KIRIM ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TOAST ───
function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div className={`toast pixel-card ${show ? "show" : ""}`} style={{ background: "var(--card)", border: "1px solid var(--neon)" }}>
      {message}
    </div>
  );
}

// ─── MAIN APP ───
export default function Home() {
  const [tab, setTab] = useState<Tab>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", show: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message: msg, show: true });
    toastTimer.current = setTimeout(() => setToast({ message: "", show: false }), 2500);
  }, []);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const addToCart = useCallback(
    (p: Product) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.product.id === p.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [...prev, { product: p, qty: 1 }];
      });
      showToast(`${p.name} ditambahkan ke keranjang`);
    },
    [showToast]
  );

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((i) => i.product.id !== id));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.product.id === id ? { ...i, qty } : i))
      );
    }
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const handleCheckout = useCallback(
    (data: { username: string; payment: string; note: string }) => {
      const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
      const order: Order = {
        id: Date.now().toString(36).toUpperCase(),
        items: [...cart],
        total,
        status: "pending",
        date: new Date().toLocaleString("id-ID"),
        username: data.username,
        payment: data.payment,
        note: data.note,
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      setCheckoutOpen(false);
      setCartOpen(false);
      showToast("Order berhasil! Silakan hubungi admin untuk konfirmasi.");
      setTab("orders");
    },
    [cart, showToast]
  );

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <div className="section active">
        {tab === "home" && (
          <HomeSection
            onShop={() => setTab("shop")}
            onProductClick={addToCart}
          />
        )}
        {tab === "shop" && <ShopSection onAddToCart={addToCart} />}
        {tab === "orders" && <OrdersSection orders={orders} />}
        {tab === "info" && <InfoSection />}
      </div>

      <BottomNav tab={tab} setTab={setTab} />

      <CartModal
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        cart={cart}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handleCheckout}
      />

      <Toast message={toast.message} show={toast.show} />
    </>
  );
}
