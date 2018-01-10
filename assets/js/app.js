$( document ).ready(function() {

  $('#recommended').hide();
  $('#slide').hide();
  $('#profileUser').hide();
  $('.userHeader').hide();
  $('footer').hide();


   setTimeout(function() {
      $('#splash').fadeOut(800);
   }, 2500);

    
});

function ingreso(){
  
  $('.joinHeader').hide();
  $('.registry').hide();
  $('.userHeader').show();
  $('#recommended').show();
  $('#slide').show();
  $('#profileUser').show();
  $('#userHeader').show();
  $('footer').show();
   

};
$('.smallLogo').click(function(){
  
  ingreso();
})

function search(input) {

    $.getJSON(input, function(data){

        $.each(data, function(i,v) {
            // console.log(v);
            if ($.isArray(v)){
                console.log(v);
                $.each(v, function(j,value){
                    console.log(value.Title);


                    var movieModal = 'http://www.omdbapi.com/?apikey=3a181f1c&t=' + value.Title ;
                    getModal(movieModal);

                    //Data para obtener el Modal
                    function getModal(movieModal) {
                        $.getJSON(movieModal, function(data){
                          console.log(data);
                          $.each(data, function(i,val) {
                                //console.log(data.Released);
                             $('#titles').append(

                           '<div  id="myModal' + j + '" role="dialog" class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                            '<div class="modal-dialog" role="document">' +
                            '<div class="modal-content">' +
                            '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                            '<h4 class="modal-title text-uppercase ">' + data.Title + '</h4>' +
                            '</div>' +
                            '<div class="modal-body">' +
                            '<p>' + data.Director + '</p>' +
                            '<img class="img-fluid " src=" '+data.Poster +'" alt=""> ' +
                             '<ul class="list-inline">' +
                            ' <li>Año: ' + data.Year + '</li>' +
                            ' <li>Premios: ' + data.Awards + '</li>' +
                            ' <li>Category: ' + data.Genre + '</li>' +
                            ' </ul>' +
                            '<p>' + data.Plot+ '</p>' +
                            '</div>' +
                            '<div class="modal-footer">' +
                           ' <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                            '<button type="button" class="btn btn-primary">Save changes</button>' +
                            '</div>' +
                            '</div><!-- /.modal-content -->' +
                            '</div><!-- /.modal-dialog -->' +
                            '</div><!-- /.modal -->'

                                        )
                           })
                        })
                    };


                    $('#titles').append(

                  ' <div class="col-md-3">' +
                  ' <h4><a type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal' + j + '" >'+ value.Title + '</a></h4> ' +
                  '<div class="bestMovie">' +
                  '<img src="' + value.Poster + '">' +
                  '</div></div>'
                    );

                });
            };
        });

    });
};

$('#search').click(function(){
    var input = $('#userTitle').val();

    var movieSearch = 'http://www.omdbapi.com/?apikey=3a181f1c&s=' + input;
    //console.log(movieSearch);
    search(movieSearch);
    $('#userTitle').val('');
    $('#titles').empty();
    $('#recommended').hide();
    $('#slide').hide();
    $('#profileUser').hide();
    $('#splash').hide();

});

//funcion carrusel
$(function() {
    $('.tooltip-carousel').popover();

    $('#carousel-example-generic').on('slide.bs.carousel', function() {
      $('.tooltip-carousel').popover('hide');
      $(this).find('.caraousel-tooltip-item.active').fadeOut(function() {
        $(this).removeClass('active');
      });
    });

    $('#carousel-example-generic').on('slid.bs.carousel', function() {
      var index = $(this).find('.carousel-inner > .item.active').index();
      $(this).find('.caraousel-tooltip-item').eq(index).fadeIn(function() {
        $(this).addClass('active');
      });
    });

    $('.tooltip-carousel').mouseenter(function() {
      $(this).popover('show');
    }).mouseleave(function() {
      $(this).popover('hide');
    });
  });
//funcion carrusel fin
/*   <section>
         <input type="text" class="form-control" id="userTitle" placeholder="Text input">
         <input class="btn btn-default" type="submit" id="search" value="Submit">


        </section>
        <div id="titles"></div> */
