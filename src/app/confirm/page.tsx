"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Force la page à être dynamique
export const dynamic = "force-dynamic";

function ConfirmPageInner() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Confirmation en cours...");
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    // Initialisation du client Supabase côté client uniquement
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const client = createClient(supabaseUrl, supabaseAnonKey);
      setSupabase(client);
    } else {
      console.error("Variables d'environnement Supabase manquantes");
      setStatus("error");
      setMessage("Configuration manquante");
    }
  }, []);

  useEffect(() => {
    const handleConfirmation = async () => {
      if (!supabase) return;

      const token = searchParams.get("token");
      const type = searchParams.get("type");
      const email = searchParams.get("email");

      // Attendre que les paramètres soient disponibles
      if (!token || !type || !email) {
        return;
      }

      try {
        // Vérifier le token OTP avec Supabase
        const { data, error } = await supabase.auth.verifyOtp({
          token: token,
          type: "email",
          email: email,
        });

        if (error) {
          console.error("Erreur de vérification:", error);
          setStatus("error");
          setMessage("Lien invalide ou expiré");
        } else {
          console.log("Confirmation réussie:", data);
          setStatus("success");
          setMessage("Confirmation réussie ! Redirection...");

          // Redirection vers l'app mobile
          setTimeout(() => {
            window.location.href = "myapp://onboarding?confirmed=true";
          }, 2000);
        }
      } catch (error) {
        console.error("Erreur inattendue:", error);
        setStatus("error");
        setMessage("Lien invalide ou expiré");
      }
    };

    handleConfirmation();
  }, [searchParams, supabase]);

  return (
    <div className="flex justify-center items-center min-h-screen font-sans text-lg text-center p-5">
      <div>
        <h1 className="text-2xl font-bold mb-4">Confirmation d&apos;inscription</h1>
        <p
          className={`$ {
            status === "error"
              ? "text-red-500"
              : status === "success"
              ? "text-green-500"
              : "text-blue-500"
          }`}
        >
          {message}
        </p>
        {status === "loading" && (
          <div className="mt-5">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConfirmPageWrapper() {
  return (
    <Suspense fallback={<div>Confirmation en cours...</div>}>
      <ConfirmPageInner />
    </Suspense>
  );
} 