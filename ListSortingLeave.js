 $(document).ready(()=> {
      var loggedInUserId = '{{ user.id }}'
  console.log(loggedInUserId);
   $(".entitylist.entity-grid").on("loaded", ()=> {
         $(".entitylist.entity-grid tbody tr").each(function () {
      var listItem = $(this);
      console.log(listItem);
      var contactId = listItem.attr("data-id"); // Assuming you have a data attribute to store the Contact ID
      console.log(contactId);      

      // Check if the Contact ID in the list item matches the current user's ID
      if (contactId !== loggedInUserId) {
        listItem.hide(); // Hide the list item if it doesn't belong to the current user
      }
    });
   });
 });