$(document).ready(function () {
  $(".entity-form").css({
    "border-radius": "10px",
  });
  $("#so_corporateid").hide();
  $("#so_corporateid_label").hide();
  var corporate = document.getElementById("so_corporateid_label");
  corporate.innerHTML += '<span style="color: red;"> *</span>';
  $("#so_internalid").hide();
  $("#so_internalid_label").hide();
  var internal = document.getElementById("so_internalid_label");
  internal.innerHTML += '<span style="color: red;"> *</span>';

  //Onclick event for opportunity type .
  $("#so_opportunitytype").change(function () {
    debugger;
    if ($(this).val() == "936720001") {
      $("#so_corporateid").show();
      $("#so_corporateid_label").show();
      $("#so_internalid").hide();
      $("#so_internalid_label").hide();
    } else if ($(this).val() == "936720000") {
      $("#so_internalid").show();
      $("#so_internalid_label").show();
      $("#so_corporateid").hide();
      $("#so_corporateid_label").hide();
    } else {
      $("#so_corporateid").hide();
      $("#so_corporateid_label").hide();
      $("#so_internalid").hide();
      $("#so_internalid_label").hide();
    }
  });
  //validation based on corporate type
  (function ($) {
    if (typeof Page_Validators == "undefined") return;
    // Create new validator
    var newValidator = document.createElement("span");
    newValidator.style.display = "none";
    newValidator.id = "Required_so_corporateid";
    newValidator.controltovalidate = "so_corporateid";
    newValidator.errormessage =
      "<a href='#so_opportunitytype_label'>Corporate Id is required </a>";
    newValidator.initialvalue = "";
    newValidator.evaluationfunction = function () {
      var value = $("#so_opportunitytype").val();
      if (value == "936720001" && !$("#so_corporateid").val()) {
        return false;
      } else {
        return true;
      }
    };

    // Add the new validator to the page validators array:
    Page_Validators.push(newValidator);

    // Wire-up the click event handler of the validation summary link
    $("a[href='#so_corporateid_label']").on("click", function () {
      scrollToAndFocus("#so_corporateid_label", "#so_corporateid");
    });
  })(window.jQuery);

  //validator for internalid
  (function ($) {
    if (typeof Page_Validators == "undefined") return;
    // Create new validator
    var newValidator = document.createElement("span");
    newValidator.style.display = "none";
    newValidator.id = "Required_so_internalid";
    newValidator.controltovalidate = "so_internalid";
    newValidator.errormessage =
      "<a href='#so_opportunitytype_label'>internal Id is required </a>";
    newValidator.initialvalue = "";
    newValidator.evaluationfunction = function () {
      var value = $("#so_opportunitytype").val();
      if (value == "936720000" && !$("#so_internalid").val()) {
        return false;
      } else {
        return true;
      }
    };

    // Add the new validator to the page validators array:
    Page_Validators.push(newValidator);

    // Wire-up the click event handler of the validation summary link
    $("a[href='#so_internalid_label']").on("click", function () {
      scrollToAndFocus("#so_internalid_label", "#so_internalid");
    });
  })(window.jQuery);
});
