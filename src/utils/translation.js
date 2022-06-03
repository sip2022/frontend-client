var map = {}
map["MONDAY"] = "Lunes";
map["TUESDAY"] = "Martes";
map["WEDNESDAY"] = "Miercoles";
map["THURSDAY"] = "Jueves";
map["FRIDAY"] = "Viernes";
map["SATURDAY"] = "Sabado";
map["SUNDAY"] = "Domingo";
// map["Bronze"] = "Bronce";
// map["Silver"] = "Plata";
// map["Gold"] = "Oro";
// map["Platinum"] = "Platino";

export function translateDay(dayOfWeek) {
  return map[dayOfWeek];
}