import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const CONTACT_TEXTS = {
  tr: {
    title: "İletişim",
    description: [
      "Dermalissa'ya ulaşmak her zaman kolaydır.",
      "Merak ettiğiniz, iletmek istediğiniz ya da aklınıza gelen en küçük detayı bile bizimle paylaşabilirsiniz.",
      "Gönderdiğiniz her mesaj özenle ve samimi bir ilgiyle değerlendirilir.",
      "Talepleriniz ilgili uzman ekibimize yönlendirilir ve titizlikle yanıtlanır.",
    ],
    thankYou: "Dermalissa ile iletişime geçtiğiniz için teşekkür ederiz.",
    subtitle: "Bize buradan ulaşabilirsiniz.",
    imageAlt: "Dermalissa cilt bakım ürünü - İletişim sayfası",
  },
  en: {
    title: "Contact us",
    description: [
      "Reaching Dermalissa is always easy.",
      "You are welcome to share anything you are curious about, would like to express, or even the smallest detail on your mind.",
      "Every message you send is treated with care and genuine attention.",
      "Your requests are directed to the relevant expert team and responded to thoughtfully.",
    ],
    thankYou: "Thank you for getting in touch with Dermalissa.",
    subtitle: "You can contact us here.",
    imageAlt: "Dermalissa skincare product - Contact page",
  },
  de: {
    title: "Kontakt",
    description: [
      "Dermalissa zu erreichen ist immer einfach.",
      "Sie können gerne alles teilen, was Sie neugierig macht, ausdrücken möchten oder auch das kleinste Detail, das Ihnen in den Sinn kommt.",
      "Jede Nachricht, die Sie senden, wird mit Sorgfalt und aufrichtiger Aufmerksamkeit behandelt.",
      "Ihre Anfragen werden an das zuständige Expertenteam weitergeleitet und sorgfältig beantwortet.",
    ],
    thankYou: "Vielen Dank, dass Sie Dermalissa kontaktiert haben.",
    subtitle: "Sie können uns hier erreichen.",
    imageAlt: "Dermalissa Hautpflegeprodukt - Kontaktseite",
  },
  fr: {
    title: "Contact",
    description: [
      "Contacter Dermalissa est toujours facile.",
      "N'hésitez pas à partager tout ce qui vous intrigue, que vous souhaitez exprimer, ou même le plus petit détail qui vous vient à l'esprit.",
      "Chaque message que vous envoyez est traité avec soin et une attention sincère.",
      "Vos demandes sont dirigées vers l'équipe d'experts concernée et traitées avec attention.",
    ],
    thankYou: "Merci d'avoir contacté Dermalissa.",
    subtitle: "Vous pouvez nous contacter ici.",
    imageAlt: "Produit de soin Dermalissa - Page de contact",
  },
  es: {
    title: "Contacto",
    description: [
      "Contactar con Dermalissa es siempre fácil.",
      "Le invitamos a compartir cualquier cosa que le genere curiosidad, desee expresar, o incluso el más mínimo detalle que tenga en mente.",
      "Cada mensaje que envía es tratado con cuidado y atención genuina.",
      "Sus solicitudes son dirigidas al equipo de expertos correspondiente y respondidas con dedicación.",
    ],
    thankYou: "Gracias por ponerse en contacto con Dermalissa.",
    subtitle: "Puede contactarnos aquí.",
    imageAlt: "Producto de cuidado de la piel Dermalissa - Página de contacto",
  },
  it: {
    title: "Contatti",
    description: [
      "Raggiungere Dermalissa è sempre facile.",
      "Siete invitati a condividere qualsiasi cosa vi incuriosisca, desideriate esprimere, o anche il più piccolo dettaglio che avete in mente.",
      "Ogni messaggio che inviate viene trattato con cura e genuina attenzione.",
      "Le vostre richieste vengono indirizzate al team di esperti competente e risposte con attenzione.",
    ],
    thankYou: "Grazie per aver contattato Dermalissa.",
    subtitle: "Potete contattarci qui.",
    imageAlt: "Prodotto per la cura della pelle Dermalissa - Pagina contatti",
  },
  pt: {
    title: "Contacto",
    description: [
      "Contactar a Dermalissa é sempre fácil.",
      "Sinta-se à vontade para partilhar qualquer coisa que lhe desperte curiosidade, que deseje expressar, ou mesmo o mais pequeno detalhe que tenha em mente.",
      "Cada mensagem que envia é tratada com cuidado e atenção genuína.",
      "Os seus pedidos são direcionados para a equipa de especialistas relevante e respondidos com dedicação.",
    ],
    thankYou: "Obrigado por contactar a Dermalissa.",
    subtitle: "Pode contactar-nos aqui.",
    imageAlt: "Produto de cuidados com a pele Dermalissa - Página de contacto",
  },
  ru: {
    title: "Контакты",
    description: [
      "Связаться с Dermalissa всегда легко.",
      "Вы можете поделиться с нами любым вопросом, пожеланием или даже самой маленькой деталью, которая вас интересует.",
      "Каждое отправленное вами сообщение рассматривается с заботой и искренним вниманием.",
      "Ваши запросы направляются соответствующей команде экспертов и тщательно обрабатываются.",
    ],
    thankYou: "Спасибо, что обратились в Dermalissa.",
    subtitle: "Связаться с нами можно здесь.",
    imageAlt: "Средство по уходу за кожей Dermalissa - Страница контактов",
  },
  ar: {
    title: "اتصل بنا",
    description: [
      "التواصل مع Dermalissa سهل دائمًا.",
      "نرحب بمشاركتكم أي شيء تتساءلون عنه أو ترغبون في التعبير عنه أو حتى أصغر التفاصيل التي تدور في أذهانكم.",
      "كل رسالة ترسلونها تُعامل بعناية واهتمام صادق.",
      "يتم توجيه طلباتكم إلى فريق الخبراء المعني والرد عليها بعناية.",
    ],
    thankYou: "شكرًا لتواصلكم مع Dermalissa.",
    subtitle: "يمكنكم التواصل معنا من هنا.",
    imageAlt: "منتج العناية بالبشرة من Dermalissa - صفحة الاتصال",
  },
};

function renderBrandBold(text) {
  const parts = text.split("Dermalissa");
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && <strong>Dermalissa</strong>}
    </span>
  ));
}

export default function Contact() {
  const { lang } = useParams();
  const safeLang = lang || "tr";
  const texts = CONTACT_TEXTS[safeLang] || CONTACT_TEXTS.tr;
  const jsonLdRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Dermalissa - " + texts.title,
      url: `https://dermalissa.com/${safeLang}/contact`,
      mainEntity: {
        "@type": "Organization",
        name: "Dermalissa",
        url: "https://dermalissa.com",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+90-542-222-22-22",
            contactType: "customer service",
            availableLanguage: ["Turkish", "English", "German", "French", "Spanish", "Italian", "Portuguese", "Russian", "Arabic"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+90-212-333-33-33",
            contactType: "customer service",
          },
        ],
        email: "info@dermalissa.com",
      },
    });
    document.head.appendChild(script);
    jsonLdRef.current = script;

    return () => {
      if (jsonLdRef.current) {
        document.head.removeChild(jsonLdRef.current);
      }
    };
  }, [safeLang, texts.title]);

  return (
    <section className="contact-page" itemScope itemType="https://schema.org/ContactPage">
      <div className="contact-page__container">
        <div className="contact-page__image">
          <img
            src="/contact-hero.jpg"
            alt={texts.imageAlt}
            className="contact-page__img"
            loading="lazy"
          />
        </div>

        <div className="contact-page__content">
          <h1 className="contact-page__title">{texts.title}</h1>

          <div className="contact-page__description">
            {texts.description.map((line, i) => (
              <p key={i}>{renderBrandBold(line)}</p>
            ))}
          </div>

          <p className="contact-page__thankyou">
            {renderBrandBold(texts.thankYou)}
          </p>

          <h2 className="contact-page__subtitle">{texts.subtitle}</h2>

          <address className="contact-page__cards" itemScope itemType="https://schema.org/Organization">
            <meta itemProp="name" content="Dermalissa" />
            <a
              href="https://wa.me/905422222222"
              className="contact-page__card"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp: 0542 222 22 22"
              itemProp="contactPoint"
              itemScope
              itemType="https://schema.org/ContactPoint"
            >
              <img src="/whatsapp.svg" alt="WhatsApp" className="contact-page__card-icon" width="24" height="24" />
              <span itemProp="telephone">0542 222 22 22</span>
            </a>

            <a
              href="tel:+902123333333"
              className="contact-page__card"
              aria-label="Telefon: 0 (212) 333 33 33"
              itemProp="contactPoint"
              itemScope
              itemType="https://schema.org/ContactPoint"
            >
              <img src="/telephone.svg" alt="Telephone" className="contact-page__card-icon" width="24" height="24" />
              <span itemProp="telephone">0 (212) 333 33 33</span>
            </a>

            <a
              href="mailto:info@dermalissa.com"
              className="contact-page__card"
              aria-label="E-mail: info@dermalissa.com"
              itemProp="contactPoint"
              itemScope
              itemType="https://schema.org/ContactPoint"
            >
              <img src="/mailbox.svg" alt="E-mail" className="contact-page__card-icon" width="24" height="24" />
              <span itemProp="email">info@dermalissa.com</span>
            </a>
          </address>
        </div>
      </div>
    </section>
  );
}
