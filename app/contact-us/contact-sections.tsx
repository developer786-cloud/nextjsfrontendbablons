import ContactForm from "./contact-form";
import { FontAwesomeIcon, type FontAwesomeName } from "./fontawesome-icons";
import Image from "next/image";

type IconName = "plane" | "headset" | "award" | "shield" | "globe" | "map" | "phone" | "email" | "clock" | "arrow" | "star" | "whatsapp" | "check" | "users" | "certificate";

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const iconNames: Record<IconName, FontAwesomeName> = {
    plane: "FaPlaneDeparture", headset: "FaHeadset", award: "FaAward", shield: "FaShieldAlt", globe: "FaGlobeAsia", map: "FaMapMarkerAlt", phone: "FaPhoneAlt", email: "FaEnvelope", clock: "FaClock", arrow: "FaArrowRight", star: "FaStar", whatsapp: "FaWhatsapp", check: "FaCheck", users: "FaUsers", certificate: "FaCertificate",
  };
  return <FontAwesomeIcon name={iconNames[name]} className={className} />;
}

const contactDetails = {
  company: "Bablons Tours & Entertainments",
  phone: "+91 98102 12399",
  phoneHref: "tel:+919810212399",
  email: "info.bablonstravel@gmail.com",
  emailHref: "mailto:info.bablonstravel@gmail.com",
  address: "28.6292858, 77.0755844",
  whatsappUrl: "https://wa.me/919810212399",
  hours: "Mon - Sat : 10 AM - 7 PM",
};

const heroHighlights = [
  { icon: "headset" as const, title: "Quick Response", text: "Under 2 Hours" },
  { icon: "award" as const, title: "Expert Travel", text: "Consultation" },
  { icon: "shield" as const, title: "100% Safe &", text: "Secure" },
];

export function ContactHero() {
  return (
    <section className="relative min-h-[360px] overflow-hidden bg-dark-900 text-white md:min-h-[430px]">
      <Image src="/images/contact-hero.jpg" alt="" aria-hidden="true" fill priority sizes="100vw" className="absolute inset-0 h-full w-full object-cover opacity-75" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,40,35,0.9)_0%,rgba(7,55,49,0.74)_48%,rgba(9,35,31,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(231,188,96,0.16),transparent_30%),linear-gradient(180deg,rgba(7,28,25,0.06),rgba(2,27,24,0.55))]" />
      <div className="grain-overlay" />
      <div className="section-container relative flex min-h-[360px] items-center py-16 md:min-h-[430px]">
        <div className="max-w-3xl">
          <p className="section-eyebrow text-accent-300"><Icon name="plane" className="text-accent-400" />Let&apos;s Connect</p>
          <h1 className="mt-5 font-display text-[clamp(2.55rem,11vw,4rem)] font-bold leading-[1.04] text-white md:text-6xl lg:text-7xl">We Are Here To Plan<span className="block text-accent-400">Your Perfect Journey</span></h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/86">Have questions or ready to start your next adventure? Our travel experts are just a message away.</p>
          <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3 sm:gap-5">
            {heroHighlights.map((item) => <div key={item.title} className="flex items-center gap-3 sm:gap-4 sm:border-r sm:border-white/16 sm:pr-5 sm:last:border-r-0">
              <Icon name={item.icon} className="h-9 w-9 text-3xl text-accent-400" />
              <div><h2 className="text-sm font-extrabold text-white">{item.title}</h2><p className="mt-1 text-sm font-semibold text-white/82">{item.text}</p></div>
            </div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function OfficeInfo() {
  const contactCards = [
    { icon: "map" as const, title: "Our Office", lines: [contactDetails.company, contactDetails.address], href: "#contact-map" },
    { icon: "phone" as const, title: "Call Us", lines: [contactDetails.phone], href: contactDetails.phoneHref },
    { icon: "email" as const, title: "Email Us", lines: [contactDetails.email], href: contactDetails.emailHref },
    { icon: "clock" as const, title: "Working Hours", lines: [contactDetails.hours, "Sunday : By Appointment"], href: "#contact-form" },
  ];
  return <div>
    <p className="section-eyebrow text-secondary-600"><Icon name="globe" className="h-4 w-4" />Contact information</p>
    <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-dark-900 md:text-5xl">Get In Touch</h2>
    <span className="mt-4 block h-0.5 w-14 rounded-full bg-accent-400" />
    <div className="mt-7 grid gap-4">{contactCards.map((item) => <a key={item.title} href={item.href} className="group flex items-center gap-5 rounded-2xl border border-sand-200 bg-white p-5 shadow-[0_14px_40px_rgba(16,39,36,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(16,39,36,0.14)]">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-dark-900 text-2xl text-accent-400 shadow-[0_10px_25px_rgba(16,39,36,0.22)]"><Icon name={item.icon} /></span>
      <span className="min-w-0 flex-1"><span className="block text-lg font-extrabold leading-tight text-dark-900">{item.title}</span>{item.lines.map((line) => <span key={line} className="block text-sm font-medium leading-6 text-dark-600">{line}</span>)}</span>
      <Icon name="arrow" className="h-4 w-4 text-xl text-dark-900 transition group-hover:translate-x-1 group-hover:text-secondary-600" />
    </a>)}</div>
  </div>;
}

export function ContactMap() {
  const query = encodeURIComponent(`${contactDetails.company} ${contactDetails.address}`);
  return <div id="contact-map" className="relative mt-10 overflow-hidden rounded-[1.35rem] border border-sand-200 bg-white shadow-[0_24px_70px_rgba(16,39,36,0.12)]">
    <iframe title={`Map of ${contactDetails.company}`} src={`https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`} className="h-[320px] w-full border-0 grayscale-[0.12] md:h-[380px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    <div className="pointer-events-none absolute left-5 top-5 max-w-xs rounded-xl border border-sand-200 bg-white p-5 shadow-[0_18px_45px_rgba(16,39,36,0.16)]">
      <h3 className="text-sm font-extrabold text-dark-900">{contactDetails.company}</h3><p className="mt-3 text-sm leading-6 text-dark-600">{contactDetails.address}</p>
      <p className="mt-3 flex items-center gap-2 text-sm font-bold text-dark-800">4.9<span className="flex gap-0.5 text-accent-500" aria-label="4.9 star rating">{[1, 2, 3, 4, 5].map((star) => <Icon key={star} name="star" className="h-3.5 w-3.5" />)}</span><span className="font-medium text-dark-400">(Traveler Reviews)</span></p>
      <p className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-secondary-600"><Icon name="map" className="h-4 w-4" />View larger map</p>
    </div>
  </div>;
}

export function ContactFollowUp() {
  const whyChoose = ["15+ Years of Experience", "10,000+ Happy Travelers", "Customized & Hassle-free Travel", "Best Price Guarantee"];
  const socials = [
    { name: "Facebook", icon: "FaFacebookF" as const, href: "https://www.facebook.com/people/Bablons-Travel-Entertainment/61590942031216/", color: "bg-blue-600" },
    { name: "Instagram", icon: "FaInstagram" as const, href: "https://www.instagram.com/travelwithbablons/", color: "bg-pink-600" },
    { name: "X", icon: "FaTwitter" as const, href: "https://x.com/TravelWithBablo", color: "bg-slate-950" },
    { name: "Pinterest", icon: "FaPinterestP" as const, href: "https://in.pinterest.com/bablonstravelandentertainment/", color: "bg-red-700" },
    { name: "YouTube", icon: "FaYoutube" as const, href: "https://www.youtube.com/@travelwithbablons", color: "bg-red-600" },
    { name: "WhatsApp", icon: "FaWhatsapp" as const, href: contactDetails.whatsappUrl, color: "bg-emerald-600" },
  ];
  return <section className="bg-dark-900 py-10 text-white">
    <div className="section-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="grid gap-6 md:grid-cols-[0.92fr_1fr] md:items-center">
        <div className="rounded-2xl border border-white/14 bg-white/[0.05] p-6 backdrop-blur"><div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent-300/35 bg-accent-300/10 text-3xl text-accent-300"><Icon name="headset" /></span>
          <div><h2 className="text-lg font-extrabold text-white">Need Immediate Assistance?</h2><p className="mt-2 text-sm leading-6 text-white/72">Talk to our travel expert now.</p>
            <a href={contactDetails.whatsappUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/16 bg-white/[0.06] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-accent-300/60 hover:bg-white/12"><Icon name="whatsapp" className="text-xl text-green-400" />Chat on WhatsApp</a>
          </div>
        </div></div>
        <div className="border-white/12 md:border-l md:pl-8"><h2 className="text-lg font-extrabold text-white">Why Choose Bablons?</h2><ul className="mt-4 grid gap-2">{whyChoose.map((item, index) => <li key={`${item}-${index}`} className="flex items-center gap-3 text-sm font-semibold text-white/82"><Icon name="check" className="text-accent-400" />{item}</li>)}</ul></div>
      </div>
      <div className="grid gap-7 sm:grid-cols-3">
        <div className="border-white/12 sm:border-l sm:pl-7"><div className="flex justify-center text-accent-400"><Icon name="users" className="h-14 w-14 text-5xl" /></div><div className="mt-2 flex justify-center gap-1 text-accent-400" aria-label="5 star rating">{[1, 2, 3].map((star) => <Icon key={star} name="star" className="h-4 w-4" />)}</div></div>
        <div className="border-white/12 sm:border-l sm:pl-7"><h2 className="text-lg font-extrabold text-white">Follow Us</h2><div className="mt-6 flex flex-wrap gap-3">{socials.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition hover:-translate-y-0.5 ${social.color}`}><FontAwesomeIcon name={social.icon} className="h-4 w-4" /></a>)}</div></div>
        <div className="border-white/12 sm:border-l sm:pl-7"><h2 className="text-lg font-extrabold text-white">Trusted &amp; Certified</h2><div className="mt-6 grid grid-cols-2 gap-4 text-center">{["IATA", "ISO"].map((label) => <div key={label}><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/18 bg-white/[0.06] text-2xl text-accent-300"><Icon name="certificate" /></span><p className="mt-2 text-sm font-extrabold text-white">{label}</p><p className="mt-1 text-xs text-white/62">{label === "IATA" ? "Accredited Agent" : "Certified Company"}</p></div>)}</div></div>
      </div>
    </div>
  </section>;
}

export function ContactPageSections() {
  return <div className="bg-[#FFFCF7] text-dark-900">
    <ContactHero />
    <section className="relative overflow-hidden py-14 md:py-16 lg:py-20">
      <div className="absolute left-0 top-12 hidden h-72 w-72 rounded-full bg-secondary-500/10 blur-3xl lg:block" />
      <div className="absolute right-0 top-0 hidden h-[28rem] w-[38rem] bg-[radial-gradient(circle_at_center,rgba(16,39,36,0.08),transparent_65%)] lg:block" />
      <div className="section-container relative"><div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-start"><OfficeInfo /><ContactForm /></div><ContactMap /></div>
    </section>
    <ContactFollowUp />
  </div>;
}
