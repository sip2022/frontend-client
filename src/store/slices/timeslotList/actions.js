export function setTimeslotList(state, {payload}) {
  console.log("Lista de timeslot (actions)");
  console.log(payload);
  state.timeslotList = payload;
}