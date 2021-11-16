export function calculateValueDeposited(participants) {
  return participants.reduce((total, participant) => {
    total += participant.confirmedPix ? participant.contributionValue : 0;
    return total;
  }, 0);
}
