"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getOrders,
  updateOrderStatus,
  type Order,
  type OrderStatus,
} from "@/lib/firestore";
import { formatRupiah } from "@/lib/products";

const ADMIN_PASS = "bimm2025";

const STATUS_OPTIONS: { value: OrderStatus; label: string; cls: string }[] = [
  { value: "pending", label: "Menunggu", cls: "status-pending" },
  { value: "processing", label: "Diproses", cls: "status-processing" },
  { value: "done", label: "Selesai", cls: "status-done" },
  { value: "cancelled", label: "Dibatalkan", cls: "status-cancelled" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [updating, setUpdating] = useState<string | null>(null);

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
    if (authed) loadOrders();
  }, [authed, loadOrders]);

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

  if (!authed) {
    return (
      <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="pixel-card" style={{ width: "100%", maxWidth: 360, textAlign: "center" }}>
          <div className="tile-title" style={{ marginBottom: 16 }}>ADMIN LOGIN</div>
          <input
            className="input"
            type="password"
            placeholder="Password admin"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && pass === ADMIN_PASS) setAuthed(true);
            }}
            style={{ width: "100%", marginBottom: 12 }}
          />
          <button
            className="pixel-btn yellow"
            style={{ width: "100%" }}
            onClick={() => {
              if (pass === ADMIN_PASS) setAuthed(true);
            }}
          >
            MASUK
          </button>
          {pass.length > 0 && pass !== ADMIN_PASS && (
            <div style={{ fontSize: 10, color: "var(--danger)", marginTop: 8 }}>
              Password salah
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
        <button className="pixel-btn secondary" style={{ fontSize: 8, padding: "6px 10px" }} onClick={loadOrders}>
          REFRESH
        </button>
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
