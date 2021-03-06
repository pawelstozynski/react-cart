export const formatPrice = (num) => {
  const formatter = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  });
  return formatter.format(num);
};