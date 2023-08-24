if (window.jQuery) {
  (function ($) {
    $(document).ready(function () {
      if (typeof Page_Validators == "undefined") return;

      // Create new validator for the start and end date fields
      var dateRangeValidator = document.createElement("span");
      dateRangeValidator.style.display = "none";
      dateRangeValidator.id = "dateRangeValidator";
      dateRangeValidator.initialvalue = "";
      dateRangeValidator.evaluationfunction = function () {
        var startDate = new Date($("#so_startdate").val());
        var endDate = new Date($("#so_enddate").val());

        if (endDate >= startDate) {
          return true;
        } else {
          return false;
        }
      };
      dateRangeValidator.errormessage =
        "<a href='#so_enddate_label'>End date cannot be earlier than start date</a>";

      // Add the new validator to the page validators array:
      Page_Validators.push(dateRangeValidator);

      // Wire-up the click event handler of the validation summary link
      $("a[href='#so_enddate_label']").on("click", function () {
        scrollToAndFocus("so_enddate_label", "so_enddate");
      });
    });
  })(window.jQuery);
}
