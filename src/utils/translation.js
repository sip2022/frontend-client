var map = {};
map["MONDAY"] = "Lunes";
map["TUESDAY"] = "Martes";
map["WEDNESDAY"] = "Miercoles";
map["THURSDAY"] = "Jueves";
map["FRIDAY"] = "Viernes";
map["SATURDAY"] = "Sabado";
map["SUNDAY"] = "Domingo";
map["User is not subscribed to any plan"] =
  "Usted no está suscrito a ningún plan";
// map["Bronze"] = "Bronce";
// map["Silver"] = "Plata";
// map["Gold"] = "Oro";
// map["Platinum"] = "Platino";

export function translateDay(dayOfWeek) {
  if (map[dayOfWeek]) return map[dayOfWeek];
  return dayOfWeek;
}
