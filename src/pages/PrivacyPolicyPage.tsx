import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-20 bg-dotpic-black text-dotpic-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-5xl font-serif text-white mb-6">
          Privacy Policy & DPDP Compliance
        </h1>
        <p className="text-xs text-dotpic-gold font-mono mb-8">
          Last Updated: November 2026 • Compliant with the Digital Personal Data Protection Act (India)
        </p>

        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-dotpic-muted space-y-6 leading-relaxed">
          <p>
            At DOTPIC PHOTOGRAPHY ("we", "our", or "us"), safeguarding client privacy and personal dignity is paramount. This Privacy Policy outlines our transparent data practices across our website, private client galleries, and campus photography services.
          </p>

          <h3 className="text-lg font-serif text-white">1. Information We Collect</h3>
          <p>
            When you enquire about a photography booking, we collect your name, phone number, shoot dates, and location details solely for the purpose of booking coordination, quotation generation, and delivering your media files.
          </p>

          <h3 className="text-lg font-serif text-white">2. Private Client Galleries</h3>
          <p>
            Wedding and personal milestone galleries are hosted inside private, unindexed cloud containers protected by a secret 4-digit PIN or direct token. They are never crawled by search engines (e.g., Google or Bing) and are only accessible by individuals to whom you furnish credentials.
          </p>

          <h3 className="text-lg font-serif text-white">3. Campus Event Photography & Find My Photos</h3>
          <p>
            For college festivals and university fests, photography is captured at public stages and cultural arenas. In compliance with India's DPDP Act:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Any selfie uploaded to the "Find My Photos" portal is processed purely inside your browser memory and is never saved to our database.</li>
            <li>Any student or attendee has the unconditional right to request removal of any photograph via our takedown form or by contacting our data officer at dotpicphotography@gmail.com.</li>
          </ul>

          <h3 className="text-lg font-serif text-white">4. Contact & Grievance Officer</h3>
          <p>
            For privacy inquiries, please contact our Studio Privacy Lead at Jubilee Hills, Hyderabad, or via WhatsApp at +91 6281392682.
          </p>
        </div>
      </div>
    </div>
  );
}
