export function setActivityList(state, {payload}) {
  console.log("Lista de actividades (actiSlice actions)");
  console.log(payload);
  state.activityList = payload;
}
