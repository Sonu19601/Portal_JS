$(document).ready(async function () {
  $("input").css({
    "border-radius": "10px",
  });
  const query =
    "/_api/adx_contentsnippets(18ed9c7c-044b-ee11-be6f-6045bda569ef)";

  const data = await fetchData(query);
  console.log(data);

  $(".entity-form")
    .find("tr")
    .each(function () {
      debugger;
      $(this)
        .find("label")
        .append(
          '<a  onclick="showyourmessage();"style="margin-left: 5px;"><img  src="/facultycourse/helpIcon.png" width="15" height="15";></a>'
        );
    });
});
function DynamicCSS() {
  const cssStyleTooltip =
    ".tooltip-container-sonu {position: relative;display: flex;margin-right:15rem;}" +
    ".tooltip-content-sonu {position: absolute;background-color: #333;color: #fff;padding: 10px;border-radius: 15px;z-index: 1;opacity: 0;transition: opacity 0.3s;}" +
    ".tooltip-container-sonu:hover .tooltip-content-sonu {opacity: 1;}";

  const styleElement = $("<style>")
    .attr("type", "text/css")
    .text(cssStyleTooltip);
  $("head").append(styleElement);
}
function fetchData(query) {
  (function (webapi, $) {
    function safeAjax(ajaxOptions) {
      var deferredAjax = $.Deferred();

      shell
        .getTokenDeferred()
        .done(function (token) {
          // add headers for AJAX
          if (!ajaxOptions.headers) {
            $.extend(ajaxOptions, {
              headers: {
                __RequestVerificationToken: token,
              },
            });
          } else {
            ajaxOptions.headers["__RequestVerificationToken"] = token;
          }
          $.ajax(ajaxOptions)
            .done(function (data, textStatus, jqXHR) {
              validateLoginSession(
                data,
                textStatus,
                jqXHR,
                deferredAjax.resolve
              );
            })
            .fail(deferredAjax.reject); //AJAX
        })
        .fail(function () {
          deferredAjax.rejectWith(this, arguments); // on token failure pass the token AJAX and args
        });

      return deferredAjax.promise();
    }
    webapi.safeAjax = safeAjax;
  })((window.webapi = window.webapi || {}), jQuery);

  //calling the functiion

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
