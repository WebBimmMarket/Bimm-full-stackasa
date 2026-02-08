export interface Product {
  id: string;
  name: string;
  price: number;
  category: "robux" | "gamepass" | "bundle";
  image: string;
  description: string;
  popular?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "robux-100",
    name: "100 Robux",
    price: 16000,
    category: "robux",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "100 Robux langsung masuk ke akun kamu",
    popular: true,
  },
  {
    id: "robux-200",
    name: "200 Robux",
    price: 30000,
    category: "robux",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "200 Robux langsung masuk ke akun kamu",
    popular: true,
  },
  {
    id: "robux-400",
    name: "400 Robux",
    price: 55000,
    category: "robux",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "400 Robux langsung masuk ke akun kamu",
    popular: true,
  },
  {
    id: "robux-800",
    name: "800 Robux",
    price: 105000,
    category: "robux",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "800 Robux langsung masuk ke akun kamu",
    popular: true,
  },
  {
    id: "robux-1700",
    name: "1700 Robux",
    price: 200000,
    category: "robux",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "1700 Robux langsung masuk ke akun kamu",
  },
  {
    id: "robux-4500",
    name: "4500 Robux",
    price: 490000,
    category: "robux",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "4500 Robux langsung masuk ke akun kamu",
  },
  {
    id: "robux-10000",
    name: "10000 Robux",
    price: 1050000,
    category: "robux",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "10000 Robux langsung masuk ke akun kamu",
  },
  {
    id: "gamepass-custom",
    name: "Gamepass Custom",
    price: 10000,
    category: "gamepass",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "Top up Gamepass Roblox sesuai permintaan kamu",
    popular: true,
  },
  {
    id: "gamepass-50k",
    name: "Gamepass 50K",
    price: 50000,
    category: "gamepass",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "Gamepass senilai 50.000",
  },
  {
    id: "gamepass-100k",
    name: "Gamepass 100K",
    price: 100000,
    category: "gamepass",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "Gamepass senilai 100.000",
  },
  {
    id: "bundle-starter",
    name: "Bundle Starter",
    price: 75000,
    category: "bundle",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "Paket hemat untuk pemula: 500 Robux + bonus",
    popular: true,
  },
  {
    id: "bundle-pro",
    name: "Bundle Pro",
    price: 250000,
    category: "bundle",
    image: "https://img1.pixhost.to/images/1858/588427955_robux100.png",
    description: "Paket hemat pro: 2000 Robux + bonus eksklusif",
  },
];

export function formatRupiah(num: number): string {
  return "Rp " + num.toLocaleString("id-ID");
}

export const CATEGORIES = [
  { id: "all", name: "Semua", icon: "🎮", count: PRODUCTS.length },
  { id: "robux", name: "Robux", icon: "💎", count: PRODUCTS.filter((p) => p.category === "robux").length },
  { id: "gamepass", name: "Gamepass", icon: "🎫", count: PRODUCTS.filter((p) => p.category === "gamepass").length },
  { id: "bundle", name: "Bundle", icon: "📦", count: PRODUCTS.filter((p) => p.category === "bundle").length },
];

export const PAYMENT_METHODS = [
  { id: "qris", name: "QRIS", icon: "📱" },
  { id: "dana", name: "Dana", icon: "💙" },
  { id: "gopay", name: "GoPay", icon: "💚" },
  { id: "bca", name: "BCA", icon: "🏦" },
  { id: "mandiri", name: "Mandiri", icon: "🏦" },
  { id: "bri", name: "BRI", icon: "🏦" },
];

export const FAQ_DATA = [
  {
    q: "Apakah BIMM Market aman dan terpercaya?",
    a: "Ya, BIMM Market adalah platform top up Robux terpercaya dengan 1000+ transaksi sukses. Semua order diproses manual oleh admin dan data pelanggan dijaga kerahasiaannya.",
  },
  {
    q: "Berapa lama proses top up Robux?",
    a: "Proses top up Robux biasanya 5-30 menit setelah pembayaran dikonfirmasi dalam jam operasional.",
  },
  {
    q: "Metode pembayaran apa saja yang diterima?",
    a: "QRIS, Dana, GoPay, Transfer Bank (BCA, Mandiri, BRI, BNI), dan E-Wallet lainnya.",
  },
  {
    q: "Apakah melayani pelanggan internasional?",
    a: "Ya, BIMM Market melayani pembeli dari seluruh dunia.",
  },
  {
    q: "Bagaimana cara top up Robux?",
    a: "Pilih produk, klik Order, isi data, pilih pembayaran, upload bukti transfer, tunggu admin proses.",
  },
];
