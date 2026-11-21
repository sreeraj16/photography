import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function generateReferenceId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `DP-${year}-${randomNum}`;
}

export interface WhatsAppMessagePayload {
  refId: string;
  name: string;
  phone: string;
  category: string;
  preferredDate: string;
  location: string;
  packageName?: string;
  eventDetails: string;
  additionalRequirements?: string;
  whatsappNumber?: string;
}

export function buildWhatsAppBookingUrl(data: WhatsAppMessagePayload): string {
  const number = (data.whatsappNumber || "916281392682").replace(/[^0-9]/g, '');
  
  const text = `Hello DOTPIC PHOTOGRAPHY!

I would like to enquire about booking a photography session.

Reference: ${data.refId}
Name: ${data.name}
Phone: ${data.phone}
Photography Type: ${data.category}
Preferred Date: ${data.preferredDate}
Location: ${data.location}
Package: ${data.packageName || 'Custom / To Be Discussed'}
Event Details: ${data.eventDetails}
Additional Requirements: ${data.additionalRequirements || 'None'}

Please share your availability and pricing details.

Thank you!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
      return Promise.resolve(true);
    } catch {
      textArea.remove();
      return Promise.resolve(false);
    }
  }
}
