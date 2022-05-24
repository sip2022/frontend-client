export function setTimeslotList(state, {payload}) {
  state.timeslotList = payload;
}

export function addTimeslot(state, {payload}) {
  state.timeslotList.push(payload);
}

export function updateTimeslot(state, {payload}) {
  const timeslot = state.timeslotList.map(time => {
    if(time.id == payload.id){
      console.log("encontrado");
      return {...payload}
    }
    return time
  })
}