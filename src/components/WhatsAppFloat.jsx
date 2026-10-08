import { trackLead } from "../utils/analytics";

// Mobil WhatsApp hattı (+90 539 737 15 46). İletişim sayfasındaki buton ile aynı.
const WA_NUMBER = "905397371546";

const TEXTS = {
  tr: { aria: "WhatsApp ile iletişime geçin", msg: "Merhaba, Dermalissa ürünleri hakkında bilgi almak istiyorum." },
  en: { aria: "Contact us on WhatsApp", msg: "Hello, I would like information about Dermalissa products." },
  de: { aria: "Kontaktieren Sie uns über WhatsApp", msg: "Hallo, ich hätte gerne Informationen zu Dermalissa-Produkten." },
  fr: { aria: "Contactez-nous sur WhatsApp", msg: "Bonjour, je souhaite des informations sur les produits Dermalissa." },
  es: { aria: "Contáctenos por WhatsApp", msg: "Hola, me gustaría recibir información sobre los productos Dermalissa." },
  it: { aria: "Contattaci su WhatsApp", msg: "Salve, vorrei informazioni sui prodotti Dermalissa." },
  pt: { aria: "Contacte-nos pelo WhatsApp", msg: "Olá, gostaria de informações sobre os produtos Dermalissa." },
  ru: { aria: "Свяжитесь с нами в WhatsApp", msg: "Здравствуйте, хотел(а) бы получить информацию о продукции Dermalissa." },
  ar: { aria: "تواصل معنا عبر واتساب", msg: "مرحبًا، أود الحصول على معلومات حول منتجات Dermalissa." },
};

export default function WhatsAppFloat({ currentLang }) {
  const t = TEXTS[currentLang] || TEXTS.tr;
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.msg)}`;

  return (
    <a
      className="wa-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.aria}
      title={t.aria}
      onClick={() => trackLead("whatsapp", "floating_button")}
    >
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
        <path
          fill="#fff"
          d="M16 .396C7.164.396.016 7.544.016 16.38c0 2.885.755 5.7 2.188 8.18L0 32l7.63-2.164a15.9 15.9 0 0 0 8.37 2.37h.007c8.835 0 15.983-7.148 15.987-15.985a15.88 15.88 0 0 0-4.68-11.31A15.88 15.88 0 0 0 16 .396zm0 29.18h-.006a13.27 13.27 0 0 1-6.766-1.854l-.485-.288-5.03 1.426 1.344-4.906-.316-.503A13.23 13.23 0 0 1 2.67 16.38C2.673 9.06 8.68 3.056 16.006 3.056c3.558 0 6.9 1.387 9.414 3.904a13.19 13.19 0 0 1 3.9 9.42c-.003 7.32-6.01 13.196-13.32 13.196zm7.293-9.9c-.4-.2-2.366-1.168-2.733-1.302-.367-.134-.634-.2-.9.2-.267.4-1.034 1.302-1.268 1.57-.234.267-.467.3-.867.1-.4-.2-1.688-.622-3.216-1.984-1.19-1.06-1.992-2.37-2.226-2.77-.233-.4-.025-.616.176-.815.18-.18.4-.467.6-.7.2-.234.267-.4.4-.667.134-.267.067-.5-.033-.7-.1-.2-.9-2.17-1.234-2.97-.325-.78-.655-.675-.9-.687l-.767-.013c-.267 0-.7.1-1.067.5-.367.4-1.4 1.37-1.4 3.34 0 1.97 1.434 3.874 1.634 4.14.2.267 2.822 4.31 6.84 6.043.955.412 1.7.658 2.282.842.96.305 1.832.262 2.522.159.77-.115 2.366-.967 2.7-1.9.334-.934.334-1.734.234-1.9-.1-.167-.367-.267-.767-.467z"
        />
      </svg>
    </a>
  );
}
