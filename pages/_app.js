import "@/styles/globals.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "@/pages/api/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
