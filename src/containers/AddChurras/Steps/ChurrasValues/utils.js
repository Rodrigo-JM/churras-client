import { format } from 'date-fns';

export function getTotalValue(churras) {
  let valueForTotal = 0;

  valueForTotal += churras.valueForFood * churras.totalFoodParticipants;
  valueForTotal += churras.valueForDrink * churras.totalDrinkParticipants;
  valueForTotal += churras.valueForVegan * churras.totalVeganParticipants;

  return valueForTotal;
}

export function formatCurrency(value) {
  const formatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(value);
}
