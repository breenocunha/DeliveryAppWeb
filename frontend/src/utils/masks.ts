export const maskCreditCard = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  return digits
    .replace(/(\d{4})/g, '$1 ')
    .trim()
    .slice(0, 19);
};

export const maskExpiryDate = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
};

export const maskCVV = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 3);
}; 