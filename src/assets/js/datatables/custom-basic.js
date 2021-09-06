$(document).ready(function () {
  $('product-list').DataTable();
  // Basic table example
  setTimeout(()=>{
    $('#basic-1').DataTable({
      language: {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      }
    });

  },100)


});
