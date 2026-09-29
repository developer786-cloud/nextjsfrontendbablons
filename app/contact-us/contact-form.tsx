"use client";

import { FormEvent, useState } from "react";
import { apiEndpoint } from "@/lib/packages";
import { FontAwesomeIcon } from "./fontawesome-icons";

const subjects = [
  "International Holiday",
  "Visa Assistance",
  "Flight & Hotel Package",
  "Group Tour",
  "Custom Itinerary,Honeymoon Trip",
  "Other",
];

const destinations = [
  "Dubai", "Georgia", "Thailand", "Uzbekistan", "Burj Khalifa", "Deira Dubai", "Dubai City", "Dubai Desert", "Dubai Mall", "Dubai Marina", "Global Village", "Jumeirah Beach", "Jumeirah Beach Residence", "Palm Jumeirah", "Bakuriani", "Batumi", "Gudauri", "Kazbegi", "Kutaisi", "Mestia", "Sighnaghi", "Tbilisi", "Ayutthaya", "Bangkok", "Chiang Mai", "Hua Hin", "Krabi", "Pattaya", "Phuket", "Andijan", "Bukhara", "Khiva", "Margilan", "Nukus", "Samarkand", "Shahrisabz", "Tashkent", "Termez",
];

const initialForm = { name: "", email: "", phone: "", subject: "", destination: "", travelDate: "", message: "" };

const inputClass = "h-12 w-full rounded-lg border border-white/22 bg-transparent px-4 text-sm text-white outline-none transition placeholder:text-white/52 focus:border-accent-300 focus:bg-white/5";
const labelClass = "mb-2 block text-sm font-semibold text-white";

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.currentTarget;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
    setError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(apiEndpoint("/api/v1/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          destination: form.destination,
          travelDate: form.travelDate || null,
          message: form.message,
        }),
      });
      const result = await response.json().catch(() => null) as { message?: string } | null;
      if (!response.ok) throw new Error(result?.message || "Unable to send your message right now. Please call or WhatsApp us.");
      setSubmitted(true);
      setForm(initialForm);
    } catch (caught) {
      setSubmitted(false);
      setError(caught instanceof TypeError
        ? "We could not reach the contact service. Please try again or call or WhatsApp us."
        : caught instanceof Error
          ? caught.message
          : "Unable to send your message right now. Please call or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id="contact-form" onSubmit={submit} className="rounded-[1.35rem] border border-white/12 bg-[#062f29] p-5 text-white shadow-[0_28px_80px_rgba(16,39,36,0.24)] sm:p-6 md:p-8">
      <h2 className="font-display text-[clamp(2rem,8vw,2.5rem)] font-bold leading-tight text-white">Send Us a Message</h2>
      <span className="mt-4 block h-0.5 w-16 rounded-full bg-accent-400" />
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label><span className={labelClass}>Your Name <span className="text-accent-300">*</span></span><input name="name" value={form.name} onChange={update} type="text" required placeholder="Enter your name" className={inputClass} /></label>
        <label><span className={labelClass}>Your Email <span className="text-accent-300">*</span></span><input name="email" value={form.email} onChange={update} type="email" required placeholder="Enter your email" className={inputClass} /></label>
        <label><span className={labelClass}>Phone Number <span className="text-accent-300">*</span></span><input name="phone" value={form.phone} onChange={update} type="tel" required placeholder="Enter your phone number" className={inputClass} /></label>
        <label className="relative"><span className={labelClass}>Subject <span className="text-accent-300">*</span></span><select name="subject" value={form.subject} onChange={update} required className={`${inputClass} appearance-none pr-11`}><option value="" className="bg-dark-900 text-white">Select a subject</option>{subjects.map((subject) => <option key={subject} value={subject} className="bg-dark-900 text-white">{subject}</option>)}</select><FontAwesomeIcon name="FaChevronDown" className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 text-accent-300" /></label>
        <label className="relative"><span className={labelClass}>Destination of Interest</span><select name="destination" value={form.destination} onChange={update} className={`${inputClass} appearance-none pr-11`}><option value="" className="bg-dark-900 text-white">Where do you want to go?</option>{destinations.map((destination, index) => <option key={`${destination}-${index}`} value={destination} className="bg-dark-900 text-white">{destination}</option>)}</select><FontAwesomeIcon name="FaChevronDown" className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 text-accent-300" /></label>
        <label className="relative"><span className={labelClass}>Travel Date</span><input name="travelDate" value={form.travelDate} onChange={update} type="date" className={`${inputClass} pr-11`} /><FontAwesomeIcon name="FaCalendarAlt" className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 text-accent-300" /></label>
      </div>
      <label className="mt-5 block"><span className={labelClass}>Message <span className="text-accent-300">*</span></span><textarea name="message" value={form.message} onChange={update} required rows={5} placeholder="Tell us more about your travel plans..." className="w-full rounded-lg border border-white/22 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/52 focus:border-accent-300 focus:bg-white/5" /></label>
      <button type="submit" disabled={submitting} className="mt-5 inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-accent-500 to-secondary-500 px-6 text-base font-extrabold text-white shadow-[0_18px_45px_rgba(187,132,44,0.24)] transition hover:-translate-y-0.5 hover:from-accent-400 hover:to-secondary-400 disabled:cursor-wait disabled:opacity-70">{submitting ? "Sending..." : "Send Message"}<FontAwesomeIcon name="FaPaperPlane" className="h-4 w-4" /></button>
      {submitted ? <p role="status" className="mt-4 rounded-lg border border-accent-300/25 bg-accent-300/10 px-4 py-3 text-center text-sm text-accent-100">Thank you. Our travel expert will get back to you shortly.</p> : null}
      {error ? <p role="alert" className="mt-4 rounded-lg border border-red-300/25 bg-red-500/10 px-4 py-3 text-center text-sm text-red-100">{error}</p> : null}
      <p className="mt-5 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-white/72"><FontAwesomeIcon name="FaLock" className="h-4 w-4 text-accent-300" />We respect your privacy. Your information is safe with us.<FontAwesomeIcon name="FaArrowRight" className="hidden h-3 w-3 text-accent-300 sm:inline" /></p>
    </form>
  );
}
