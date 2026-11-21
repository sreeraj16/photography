import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, AlertCircle } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { generateReferenceId, buildWhatsAppBookingUrl } from '../../lib/utils';
import { SERVICE_CATEGORIES, BRAND } from '../../lib/constants';
import { Enquiry } from '../../types/database.types';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { BookingSuccessModal } from './BookingSuccessModal';

export function BookingForm() {
  const [searchParams] = useSearchParams();
  const prefilledCategory = searchParams.get('category') || 'Wedding';
  const prefilledPackage = searchParams.get('package') || '';

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [category, setCategory] = useState(prefilledCategory);
  const [preferredDate, setPreferredDate] = useState('');
  const [location, setLocation] = useState('');
  const [packageName, setPackageName] = useState(prefilledPackage);
  const [eventDetails, setEventDetails] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [durationHours, setDurationHours] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Spam honeypot

  const [dateWarning, setDateWarning] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success modal state
  const [successData, setSuccessData] = useState<{
    refId: string;
    whatsappUrl: string;
    rawMessage: string;
    customerName: string;
  } | null>(null);

  // Availability check
  const handleDateChange = (val: string) => {
    setPreferredDate(val);
    if (!val) {
      setDateWarning(null);
      return;
    }

    const availability = dataStore.getAvailability();
    const match = availability.find(a => a.date === val);
    if (match) {
      if (match.status === 'blocked') {
        setDateWarning(`Note: ${val} is currently heavily booked for another major shoot. Our team will review if a secondary crew is available.`);
      } else if (match.status === 'busy') {
        setDateWarning(`Note: ${val} has limited slot availability. Enquiring early is strongly advised.`);
      }
    } else {
      setDateWarning(null);
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    // Honeypot check
    if (honeypot) {
      errs.name = "Spam detected.";
      setErrors(errs);
      return false;
    }

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name.";
    }

    // Phone number validation (Indian 10-digit or with +91)
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phoneNumber = "Please provide a valid 10-digit mobile number.";
    }

    if (!category) {
      errs.category = "Please choose a photography category.";
    }

    if (!preferredDate) {
      errs.preferredDate = "Please choose your preferred shoot date.";
    } else {
      const selected = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errs.preferredDate = "Shoot date must be in the future.";
      }
    }

    if (!location.trim()) {
      errs.location = "Please enter your event city or venue location.";
    }

    if (!eventDetails.trim() || eventDetails.trim().length < 10) {
      errs.eventDetails = "Please share a few details about your ceremony, fest, or schedule (min 10 characters).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const refId = generateReferenceId();
    const settings = dataStore.getSettings();

    const rawMessage = `Hello DOTPIC PHOTOGRAPHY!

I would like to enquire about booking a photography session.

Reference: ${refId}
Name: ${fullName}
Phone: ${phoneNumber}
Photography Type: ${category}
Preferred Date: ${preferredDate}
Location: ${location}
Package: ${packageName || 'Custom / To Be Discussed'}
Event Details: ${eventDetails}
Additional Requirements: ${additionalRequirements || 'None'}

Please share your availability and pricing details.

Thank you!`;

    const whatsappUrl = buildWhatsAppBookingUrl({
      refId,
      name: fullName,
      phone: phoneNumber,
      category,
      preferredDate,
      location,
      packageName,
      eventDetails,
      additionalRequirements,
      whatsappNumber: settings.contact_whatsapp || BRAND.phoneRaw
    });

    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      reference_id: refId,
      full_name: fullName,
      phone_number: phoneNumber,
      category,
      preferred_date: preferredDate,
      location,
      package_id: packageName,
      event_details: eventDetails,
      additional_requirements: additionalRequirements,
      guest_count: guestCount,
      duration_hours: durationHours,
      budget_range: budgetRange,
      referral_code: referralCode,
      source: 'website_booking_page',
      status: 'New',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    dataStore.saveEnquiry(newEnquiry);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessData({
        refId,
        whatsappUrl,
        rawMessage,
        customerName: fullName
      });

      // Try opening WhatsApp automatically
      window.open(whatsappUrl, '_blank');
    }, 500);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Spam Honeypot Field (Hidden from real users) */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="honeypot_field"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Row 1: Name and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs uppercase tracking-wider text-dotpic-white font-medium block mb-2">
              Full Name *
            </label>
            <Input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Vikramaditya Reddy"
              className={errors.fullName ? 'border-red-500' : ''}
            />
            {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-dotpic-white font-medium block mb-2">
              Phone / WhatsApp Number *
            </label>
            <Input
              required
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className={errors.phoneNumber ? 'border-red-500' : ''}
            />
            {errors.phoneNumber && <p className="text-[11px] text-red-400 mt-1">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Row 2: Category and Package */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs uppercase tracking-wider text-dotpic-white font-medium block mb-2">
              Photography Category *
            </label>
            <Select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={errors.category ? 'border-red-500' : ''}
            >
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name} className="bg-dotpic-black text-white">
                  {cat.name} Photography
                </option>
              ))}
              <option value="Custom Shoot" className="bg-dotpic-black text-white">Other Custom Shoot</option>
            </Select>
            {errors.category && <p className="text-[11px] text-red-400 mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-dotpic-white font-medium block mb-2">
              Interested Package (Optional)
            </label>
            <Select
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
            >
              <option value="" className="bg-dotpic-black text-white">Custom / Let's Discuss</option>
              <option value="Classic Storyteller (₹45,000)" className="bg-dotpic-black text-white">Classic Storyteller (₹45,000)</option>
              <option value="Cinematic Grandeur (₹95,000)" className="bg-dotpic-black text-white">Cinematic Grandeur (₹95,000 - Popular)</option>
              <option value="Heritage Royal (₹1,65,000)" className="bg-dotpic-black text-white">Heritage Royal (₹1,65,000)</option>
              <option value="Campus Fest Anthem (₹35,000)" className="bg-dotpic-black text-white">Campus Fest Anthem (₹35,000)</option>
              <option value="Editorial Portrait (₹12,000)" className="bg-dotpic-black text-white">Editorial Portrait (₹12,000)</option>
            </Select>
          </div>
        </div>

        {/* Row 3: Preferred Date and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs uppercase tracking-wider text-dotpic-white font-medium block mb-2">
              Preferred Date *
            </label>
            <Input
              required
              type="date"
              value={preferredDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className={errors.preferredDate ? 'border-red-500' : ''}
            />
            {errors.preferredDate && <p className="text-[11px] text-red-400 mt-1">{errors.preferredDate}</p>}
            {dateWarning && (
              <div className="mt-2 p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>{dateWarning}</span>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-dotpic-white font-medium block mb-2">
              Location / City / Venue *
            </label>
            <Input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Hyderabad / Taj Falaknuma / IIT Campus"
              className={errors.location ? 'border-red-500' : ''}
            />
            {errors.location && <p className="text-[11px] text-red-400 mt-1">{errors.location}</p>}
          </div>
        </div>

        {/* Row 4: Event Details */}
        <div>
          <label className="text-xs uppercase tracking-wider text-dotpic-white font-medium block mb-2">
            Event & Schedule Details *
          </label>
          <Textarea
            required
            rows={4}
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
            placeholder="Tell us about the ceremonies, timelines, festival events, moodboard concepts, or special requests..."
            className={errors.eventDetails ? 'border-red-500' : ''}
          />
          {errors.eventDetails && <p className="text-[11px] text-red-400 mt-1">{errors.eventDetails}</p>}
        </div>

        {/* Optional Add-ons Row: Guests, Duration, Budget, Referral */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-dotpic-border/60">
          <div>
            <label className="text-[11px] text-dotpic-muted block mb-1">Guest Count</label>
            <Input
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              placeholder="e.g. 300"
            />
          </div>
          <div>
            <label className="text-[11px] text-dotpic-muted block mb-1">Duration (Hours)</label>
            <Input
              value={durationHours}
              onChange={(e) => setDurationHours(e.target.value)}
              placeholder="e.g. 8 Hours"
            />
          </div>
          <div>
            <label className="text-[11px] text-dotpic-muted block mb-1">Budget Range (₹)</label>
            <Input
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              placeholder="e.g. ₹50k - 1L"
            />
          </div>
          <div>
            <label className="text-[11px] text-dotpic-muted block mb-1">Referral Code</label>
            <Input
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="e.g. CAMPUS26"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] text-dotpic-muted block mb-1">Additional Requirements (Optional)</label>
          <Input
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            placeholder="e.g. Need drone pilot, instant reel editor, live stream..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            size="xl"
            variant="gold"
            className="w-full"
            isLoading={isSubmitting}
            withShutterSound
            icon={<Calendar className="w-5 h-5 text-dotpic-black" />}
          >
            GENERATE REFERENCE ID & SEND ON WHATSAPP
          </Button>

          <p className="text-center text-[11px] text-dotpic-muted mt-3 font-mono">
            Directly connected to WhatsApp Business (+91 6281392682) • No spam guaranteed
          </p>
        </div>
      </form>

      {/* Booking Success Modal */}
      {successData && (
        <BookingSuccessModal
          isOpen={true}
          onClose={() => setSuccessData(null)}
          refId={successData.refId}
          whatsappUrl={successData.whatsappUrl}
          rawMessage={successData.rawMessage}
          customerName={successData.customerName}
        />
      )}
    </>
  );
}
