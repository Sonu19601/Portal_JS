$(document).ready(function () {
  //DynamicCSS();
  // Add an asterisk to the label text
  var aadharLabel = document.getElementById("so_aadharnumber_label");
  aadharLabel.innerHTML += '<span style="color: red;"> *</span>';

  (function ($) {
    if (typeof Page_Validators == "undefined") return;
    // Create new validator
    var newValidator = document.createElement("span");
    newValidator.style.display = "none";
    newValidator.id = "Required_so_aadharnumber";
    newValidator.controltovalidate = "so_aadharnumber";
    newValidator.errormessage =
      "<a href='#so_aadharnumber_label'>aadhar field must contain value </a>";
    newValidator.initialvalue = "";
    newValidator.evaluationfunction = function () {
      var country = $("#so_country").val();
      if (
        country == "4b04a5dd-4c37-ee11-bdf4-000d3af06556" &&
        !$("#so_aadharnumber").val()
      ) {
        return false;
      } else {
        return true;
      }
    };

    // Add the new validator to the page validators array:
    Page_Validators.push(newValidator);

    // Wire-up the click event handler of the validation summary link
    $("a[href='#so_aadharnumber_label']").on("click", function () {
      scrollToAndFocus("#so_aadharnumber_label", "#so_aadharnumber");
    });
  })(window.jQuery);

  $(".entity-form").css({
    "border-radius": "10px",
    "background-color": "#FFE5E5",
  });
  const dropDownFields = {
    company: $("#so_company"),
    countryId: $("#so_country"),
  };
  const checkBoxesInputs = {
    food: $("#so_food"),
    accomodation: $("#so_accomodation"),
    cabService: $("#so_cabservice"),
    laptop: $("#so_providelaptop"),
  };

  $.each(dropDownFields, (key, value) => {
    value.change(function () {
      $(".checkbox").removeAttr("title");
      $.each(checkBoxesInputs, (key, value) => {
        value.prop("checked", false);
      });
    });
  });

  //$("#so_aadharnumber").prop("required", false);
  //var aadharValidator = Page_Validators[6];
  console.log(Page_Validators);
  // Page_Validators[6].dispose();
  // Page_Validators[6].isvalid = true;

  //var requiredValidatorAadhar = $("#RequiredFieldValidatorso_aadharnumber");
  // console.log(aadharValidator);
  // ValidatorEnable(aadharValidator, false);
  $("#so_aadharnumber").closest("tr").find("#so_aadharnumber_label").hide();
  $("#so_aadharnumber").closest("tr").find("#so_aadharnumber").hide();
  // requiredValidatorAadhar.remove();
  // $("#so_aadharnumber")
  //   .closest("td")
  //   .find(".info.required")
  //   .removeClass("info required")
  //   .addClass("info");
  $(dropDownFields.countryId).click(function () {
    debugger;
    if ($(this).val() == "4b04a5dd-4c37-ee11-bdf4-000d3af06556") {
      $("#so_aadharnumber").closest("tr").find("#so_aadharnumber_label").show();
      $("#so_aadharnumber").closest("tr").find("#so_aadharnumber").show();
      // ValidatorEnable(aadharValidator, true);
      // Page_Validators.unshift(val);
      // console.log(Page_Validators);
    } else {
      $("#so_aadharnumber").val("");
      $("#so_aadharnumber").closest("tr").find("#so_aadharnumber_label").hide();
      $("#so_aadharnumber").closest("tr").find("#so_aadharnumber").hide();
      // ValidatorEnable(aadharValidator, false);
      // var val2 = Page_Validators[0];
      // if (val === val2) {
      //   val2.dispose();
    }
  });

  var amenityTable = $(this).find("table tbody")[2];
  console.log(amenityTable);
  $(amenityTable)
    .find("tr")
    .each(function () {
      $(this).attr("data-id", $(this).find("input").attr("id"));
      //var tooltipContainer = $("<div class='tooltip-container-sonu'></div>");
      //$(this).addClass("tooltip-container-sonu");
      //var tooltipContent = $("<div class='tooltip-content-sonu'></div>");
      //$(this).find("td").find("label").append(tooltipContent);
      $(this)
        .find("input")
        .change(function () {
          ContentRetrieve(this);
        });
      $(this).hide();
    });

  $("#so_enrollmenttype").change(() => {
    checkboxDisplayCondition();
  });
});

function checkboxDisplayCondition() {
  const enrollmentValues = {
    virtual: "936720000",
    full_Time: "936720001",
    part_Time: "936720002",
  };
  const checkBoxesRows = {
    food: $("tr[data-id=so_food]"),
    accomodation: $("tr[data-id=so_accomodation]"),
    provideLap: $("tr[data-id=so_providelaptop]"),
    cabService: $("tr[data-id=so_cabservice]"),
  };
  const enrollmentValue = $("#so_enrollmenttype").val();
  $.each(checkBoxesRows, (key, value) => {
    value.hide();
    value.find(".checkbox").removeAttr("title");
    value.find("input").prop("checked", false);
  });
  enrollmentValue == enrollmentValues.full_Time
    ? HidingSpecificCheckboxes([
        checkBoxesRows.food,
        checkBoxesRows.accomodation,
        checkBoxesRows.cabService,
        checkBoxesRows.provideLap,
      ])
    : enrollmentValue == enrollmentValues.part_Time
    ? HidingSpecificCheckboxes([checkBoxesRows.cabService, checkBoxesRows.food])
    : HidingSpecificCheckboxes([checkBoxesRows.provideLap]);
}

function HidingSpecificCheckboxes(props) {
  debugger;
  if (props) {
    props.forEach((item) => {
      item.show();
    });
  }
}

async function ContentRetrieve(checkbox) {
  debugger;
  var content;
  const checkboxId = $(checkbox).attr("id");
  const dropDownValues = {
    enrollType: $("#so_enrollmenttype").val(),
    company: $("#so_company").val(),
    countryId: $("#so_country").val(),
    checkbox: $(checkbox).prop("checked"),
  };
  if (dropDownValues.checkbox && !$(checkbox).closest("span").attr("title")) {
    console.log("Calling Api");
    const query =
      "/_api/so_configurationrouters()?$select=_so_contentid_value&$expand=so_ContentID($select=so_htmlcontent)&$filter=(_so_countryid_value eq " +
      dropDownValues.countryId +
      "  and so_enrollmenttype eq " +
      dropDownValues.enrollType +
      " and so_company eq " +
      dropDownValues.company +
      " and " +
      checkboxId +
      " eq " +
      dropDownValues.checkbox +
      ")";
    //console.log(query);
    try {
      const data = await fetchData(query);
      var result = data;
      //console.log(result);
      content = result.value[0].so_ContentID.so_htmlcontent;
      //console.log(tr);
      $(checkbox).closest("span").attr("title", content);
    } catch (error) {
      console.log(error);
    }
  }
}

function fetchData(query) {
  return new Promise((resolve, reject) => {
    webapi.safeAjax({
      type: "GET",
      url: query,
      contentType: "application/json",
      success: function (data, textStatus, xhr) {
        resolve(data);
      },
      error: function (xhr, textStatus, errorThrown) {
        reject(xhr);
      },
    });
  });
}

// function DynamicCSS() {
//   const cssStyleTooltip =
//     ".tooltip-container-sonu {position: relative;display: flex;margin-right:15rem;}" +
//     ".tooltip-content-sonu {position: absolute;background-color: #333;color: #fff;padding: 10px;border-radius: 15px;z-index: 1;opacity: 0;transition: opacity 0.3s;}" +
//     ".tooltip-container-sonu:hover .tooltip-content-sonu {opacity: 1;}";

//   const styleElement = $("<style>")
//     .attr("type", "text/css")
//     .text(cssStyleTooltip);
//   $("head").append(styleElement);
// }
//AbhishekJoel_Connection
