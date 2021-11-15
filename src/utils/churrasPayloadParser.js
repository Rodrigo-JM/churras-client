export const churrasPayloadParser = (data, user) => {
  const churrasData = { ...data };

  churrasData.pixKey = churrasData.usePixKey ? user.pixKey : '';
  churrasData.user = user._id;
  churrasData.date =
    churrasData.date === undefined
      ? new Date().toISOString()
      : churrasData.date;
  // participants: [],
  // hasVeganOption: false,
  // drink: true,
  // date: undefined,
  // valueForTotal: 0,
  // valueForDrink: 0,
  // valueForFood: 0,
  // valueForVegan: 0,
  // title: '',
  // description: '',
  // pixKey: '',
  // defineValueForParticipants: true,
  // usePixKey: true,
  // address: '',
  // totalFoodParticipants: 0,
  // totalDrinkParticipants: 0,
  // totalVeganParticipants: 0,
  // totalParticipants: 0,

  churrasData.participants = churrasData.participants.map((participant) => {
    participant.status = !participant.status ? 'unknown' : 'confirmed';

    return participant;
  });
  //   name: '',
  //   contact: '',
  //   status: false,
  //   confirmedPix: false,
  //   drink: false,
  //   vegan: false,
  //   partner: false,
  //   partnerVegan: false,
  //   partnerDrink: false,
  //   contributionValue: 0,

  return churrasData;
};
