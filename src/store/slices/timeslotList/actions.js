export function setTimeslotList(state, {payload}) {
  state.timeslotList = payload;
}

export function addTimeslot(state, {payload}) {
  state.timeslotList.push(payload);
}