export function setTimeslotList(state, {payload}) {
  console.log(payload);
  state.timeslotList = payload;
}