/**
 * Configure the intended recipient's real phone number directly in the application source code.
 * International format without '+', spaces, or dashes.
 * Example: '919876543210' or '15551234567'
 */
export const RECIPIENT_PHONE_NUMBER =
  (import.meta.env.VITE_WHATSAPP_RECIPIENT_PHONE as string) || '919876543210';
