// GA4 lead takibi. WhatsApp / telefon / e-posta tıklamalarında `generate_lead`
// (GA4 önerilen olayı) tetikler; bu olay GA4'te "key event" yapılıp Google Ads'e
// dönüşüm olarak aktarılır. Böylece kampanyalar "tıklayan"a değil, bize ulaşan
// potansiyel (B2B/ihracat) alıcıya göre optimize olur. gtag yüklü değilse no-op.
export function trackLead(method, source = "site") {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "generate_lead", {
    method, // "whatsapp" | "phone" | "email"
    lead_source: source, // "floating_button" | "contact_page"
  });
}
