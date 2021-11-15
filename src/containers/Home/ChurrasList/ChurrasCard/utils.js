export function convertDate(date) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
}
