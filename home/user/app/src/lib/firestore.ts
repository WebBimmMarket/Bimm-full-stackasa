import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export type OrderStatus = "pending" | "processing" | "done" | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  category: string;
}

export interface Order {
  id?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  username: string;
  payment: string;
  note: string;
  paymentProofUrl?: string;
  createdAt?: Timestamp | null;
}

const ORDERS_COL = "orders";

export async function createOrder(
  data: Omit<Order, "id" | "status" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, ORDERS_COL), {
    ...data,
    status: "pending" as OrderStatus,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getOrders(): Promise<Order[]> {
  const q = query(collection(db, ORDERS_COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function getOrdersByUsername(username: string): Promise<Order[]> {
  const q = query(
    collection(db, ORDERS_COL),
    where("username", "==", username),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function getOrderById(id: string): Promise<Order | null> {
  const snap = await getDoc(doc(db, ORDERS_COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Order;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<void> {
  await updateDoc(doc(db, ORDERS_COL, id), { status });
}

export async function uploadPaymentProof(
  orderId: string,
  file: File
): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const storageRef = ref(storage, `payment-proofs/${orderId}.${ext}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  await updateDoc(doc(db, ORDERS_COL, orderId), { paymentProofUrl: url });
  return url;
}
