"use client";

import { useState, useEffect, useCallback } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  getOrders,
  updateOrderStatus,
  type Order,
  type OrderStatus,
} from "@/lib/firestore";
import { formatRupiah } from "@/lib/products";

const ADMIN_UID = "L43qu9Z8mgeVdueY8lrHXdMpHg72";

const STATUS_OPTIONS: { value: OrderStatus; label: string; cls: string }[] = [
  { value: "pending", label: "Menunggu", cls: "status-pending" },
  { value: "processing", label: "Diproses", cls: "status-processing" },
  { value: "done", label: "Selesai", cls: "status-done" },
  { value: "cancelled", label: "Dibatalkan", cls: "status-cancelled" },
];

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const isAdmin = user?.uid === ADMIN_UID;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const handleGoogleLogin = async () => {
    setAuthError("");
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      if (result.user.uid !== ADMIN_UID) {
        setAuthError("Akun ini tidak memiliki akses admin.");
        await signOut(auth);
      }
    } catch {
      setAuthError("Gagal login. Coba lagi.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) loadOrders();
  }, [isAdmin, loadOrders]);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    setUpdating(id);
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch {
      /* ignore */
    } finally {
      setUpdating(null);
    }
  };

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    done: orders.filter((o) => o.status === "done").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  // Auth loading
  if (authLoading) {
    return (
      <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--muted)", fontSize: 12 }}>Memuat...</div>
      </div>
    );
  }

  // Not logged in or not admin
  if (!user || !isAdmin) {
    return (
      <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="pixel-card" style={{ width: "100%", maxWidth: 360, textAlign: "center" }}>
          <div className="tile-title" style={{ marginBottom: 8 }}>ADMIN LOGIN</div>
          <div className="hint" style={{ marginBottom: 16 }}>Login dengan akun Google admin</div>
          <button
            className="pixel-btn yellow"
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            onClick={handleGoogleLogin}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            LOGIN DENGAN GOOGLE
          </button>
          {authError && (
            <div style={{ fontSize: 10, color: "var(--danger)", marginTop: 10 }}>
              {authError}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "14px 14px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div className="tile-title">ADMIN DASHBOARD</div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="pixel-btn secondary" style={{ fontSize: 8, padding: "6px 10px" }} onClick={loadOrders}>
            REFRESH
          </button>
          <button className="pixel-btn secondary" style={{ fontSize: 8, padding: "6px 10px" }} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>

      {/* Logged in info */}
      <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 14 }}>
        Login sebagai: {user.email}
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 16 }}>
        <div className="stat-card">
          <span className="stat-number">{counts.all}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-number" style={{ color: "var(--yellow)" }}>{counts.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-number" style={{ color: "var(--neon2)" }}>{counts.processing}</span>
          <span className="stat-label">Proses</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{counts.done}</span>
          <span className="stat-label">Selesai</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {(["all", "pending", "processing", "done", "cancelled"] as const).map((f) => (
          <button
            key={f}
            className={`pixel-btn ${filter === f ? "yellow" : "secondary"}`}
            style={{ fontSize: 7, padding: "5px 8px" }}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "Semua" : STATUS_OPTIONS.find((s) => s.value === f)?.label} ({counts[f]})
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--muted)", fontSize: 12 }}>
          Memuat order...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--muted)", fontSize: 12 }}>
          Tidak ada order
        </div>
      ) : (
        filtered.map((o) => (
          <div key={o.id} className="tx-item" style={{ cursor: "default" }}>
            <div className="tx-header">
              <span className="tx-id">#{o.id?.slice(0, 8).toUpperCase()}</span>
              <span className={`status-badge ${STATUS_OPTIONS.find((s) => s.value === o.status)?.cls}`}>
                {STATUS_OPTIONS.find((s) => s.value === o.status)?.label}
              </span>
            </div>
            <div className="tx-date">
              {o.createdAt?.toDate ? o.createdAt.toDate().toLocaleString("id-ID") : "-"}
            </div>
            <div style={{ fontSize: 11, margin: "6px 0" }}>
              <strong>User:</strong> {o.username}
            </div>
            <div className="tx-products">
              {o.items.map((i) => `${i.name} x${i.qty}`).join(", ")}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <span className="tx-total">{formatRupiah(o.total)}</span>
              <span style={{ fontSize: 10, color: "var(--muted)" }}>
                {o.payment?.toUpperCase()}
              </span>
            </div>
            {o.note && (
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 6, fontStyle: "italic" }}>
                Catatan: {o.note}
              </div>
            )}

            {/* Payment proof */}
            {o.paymentProofUrl && (
              <div style={{ marginTop: 8 }}>
                <div className="hint" style={{ marginBottom: 4 }}>Bukti Pembayaran:</div>
                <img
                  src={o.paymentProofUrl}
                  alt="Bukti"
                  style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 10, border: "1px solid var(--border)" }}
                />
              </div>
            )}

            {/* Status change */}
            <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  className={`pixel-btn ${o.status === s.value ? "yellow" : "secondary"}`}
                  style={{ fontSize: 7, padding: "4px 8px" }}
                  disabled={o.status === s.value || updating === o.id}
                  onClick={() => o.id && handleStatusChange(o.id, s.value)}
                >
                  {updating === o.id ? "..." : s.label}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
