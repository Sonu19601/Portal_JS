$(document).ready(function () {
  $(".entitylist.entity-grid").on("loaded", function () {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    $(this)
      .children(".view-grid")
      .find("tr")
      .each(function (index) {
        const column = $("<td></td>", {}).appendTo($(this));
        const recordId = $(this).attr("data-id");
        if (index > 0) {
          $("<button id='Enbtn' class='btn btn-danger'>Enroll</button>", {
            type: "button",
            onclick: function () {
              triggerFlow(recordId, userId);
            },
          }).appendTo(column);
        }
      });
  });
});
function triggerFlow(recordId, userId) {
  var data = { contactid: userId, recordid: +recordId };
  var req = new XMLHttpRequest();
  var url =
    "https://prod-13.centralindia.logic.azure.com:443/workflows/cf51cf708d3046088f19d4316e8095d7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9I_8PNY92i-H76cafeTl1gEZTpysDpCnIevFdCX31sc";
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
    if (this.readyState === 4) {
      req.onreadystatechange = null;
      if (this.status === 200) {
        let resultJson = JSON.parse(this.response);
      } else {
        console.log(this.statusText);
      }
    }
  };
  req.send(JSON.stringify(data));
}
