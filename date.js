exports.getDate = function(){
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
  var day = today.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"});
  return day;
}
exports.getDay = function(){
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
  var day = today.toLocaleDateString("en-US", {weekday: "long"});
  return day;
}
