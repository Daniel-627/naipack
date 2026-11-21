/** A wa.me link that opens WhatsApp with the message ready. Without a number, the visitor picks the chat. */
export function waLink(number: string | undefined, text: string): string {
  const message = encodeURIComponent(text);
  return number ? `https://wa.me/${number}?text=${message}` : `https://wa.me/?text=${message}`;
}

/** 254712345678 -> +254 712 345 678. Returns "" when no number is set. */
export function formatPhone(number: string | undefined): string {
  if (!number) return "";
  if (number.startsWith("254") && number.length === 12) {
    return `+254 ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9)}`;
  }
  return `+${number}`;
}
