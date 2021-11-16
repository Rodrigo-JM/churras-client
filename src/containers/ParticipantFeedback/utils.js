export function adjustContributions({
  valueForDrink,
  valueForVegan,
  valueForFood,
  drink,
  vegan,
  partnerDrink,
  partnerVegan,
  partner,
}) {
  let contributionValue = 0;

  contributionValue += drink ? valueForDrink : 0;
  contributionValue += vegan ? valueForVegan : valueForFood;

  if (partner) {
    contributionValue += partnerDrink ? valueForDrink : 0;
    contributionValue += partnerVegan ? valueForVegan : valueForFood;
  }
  return contributionValue;
}
