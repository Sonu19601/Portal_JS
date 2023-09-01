$(document).ready(function () {
  $(".entitylist").css({
    "border-radius": "20px",
  });
  debugger;

  $(".entitylist.entity-grid").on("loaded", function () {
    $(this)
      .children(".view-grid")

      .find("tr")

      .each(function () {
        if (
          $(this)
            .find('[data-attribute = "so_opportunitytype"]')
            .attr("data-value")
        ) {
          let opportunityId = $(this).attr("data-id");

          let opportunityType = $(this).find(
            '[data-attribute = "so_opportunitytype"]'
          )[0].innerHTML;

          if (opportunityType == "Internal") {
            let internalFormURL = `/OpportunityInternalPage/?id=${opportunityId}`;

            $(this).find("[title=Edit]").attr("href", internalFormURL);
          } else if (opportunityType == "Corporate") {
            let corporateFormURL = `/OpportunityCorporateedit/?id=${opportunityId}`;

            $(this).find("[title=Edit]").attr("href", corporateFormURL);
          } else {
            debugger;
            let defaultUrl = `/opportunityeditformdefault/?id=${opportunityId}`;
            $(this).find("[title=Edit]").attr("href", defaultUrl);
            console.log("href set for deafult opp");
          }
        }
      });
  });
});
