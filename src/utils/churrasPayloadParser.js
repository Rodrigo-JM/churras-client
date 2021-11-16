export const churrasPayloadParser = (data, user) => {
  console.log(data);
  const churrasData = { ...data };

  churrasData.pixKey = churrasData.usePixKey ? user.pixKey : '';
  churrasData.user = churrasData.user ? churrasData.user : user._id;
  churrasData.date =
    churrasData.date === undefined
      ? new Date().toISOString()
      : churrasData.date;

  churrasData.participants = churrasData.participants.map((participant) =>
    fixParticipantStatus(participant),
  );

  return churrasData;
};

export const fixParticipantStatus = (participant) => {
  participant.status =
    participant.status === false
      ? 'unknown'
      : participant.status === true
      ? 'confirmed'
      : participant.status;

  console.log(participant);
  return participant;
};
