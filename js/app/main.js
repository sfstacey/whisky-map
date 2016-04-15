var $coffees = [];
var $teas = [];
var $otherdrinks = [];
var $size_data = [];
var $coffeeshop_data = [];
var $coffee_data = [];

$(document).ready(function(){

preloadDropdowns();

console.log('START:main.js');

loadSvg('.logo','logo_optim');

$('.logo').addClass('fadeInDownBig' + ' animated').one('animationend', function(){
  $(this).removeClass('fadeInDownBig' + ' animated');
});

$('button.nextsection').click(function(){
  var $activesection = $('section.active');
  var $nextsection = $activesection.next('section');
  var $sectionID = $('section.active').attr('id');
  switch($sectionID){
    case 'coffees':
            if( $('section#'+$sectionID+' .no-drink-check input').prop('checked') == false){
            getCoffees($sectionID);
            if ($coffees.length == 0){
            alert('Please add some coffees!');
            }else {moveForward($activesection, $nextsection);}
            }else {moveForward($activesection, $nextsection);}
            break;

    case 'teas':
            if( $('section#'+$sectionID+' .no-drink-check input').prop('checked') == false){
            getTeas($sectionID);
            if ($teas.length == 0){
            alert('Please add some tea!');
            }else {moveForward($activesection, $nextsection);}
            }else {moveForward($activesection, $nextsection);}
            break;

    case 'other-drinks':
          if( $('section#'+$sectionID+' .no-drink-check input').prop('checked') == false){
          getOtherDrinks($sectionID);
          if ($otherdrinks.length == 0){
          alert('Please add some other drinks!');
          }else {moveForward($activesection, $nextsection);}
          }else {moveForward($activesection, $nextsection);}
          break;

      case 'result':
          loadDrinks();

    default:
    moveForward($activesection, $nextsection);
  }
  return false;
});

$('.selectgender').change(function(){
if ($('input#female_option').is(':checked')){
  var $pregaside =   $(this).parents('section').find('.expecting');
  var $showmovement = 'fadeIn' + ' animated';
  $pregaside.addClass($showmovement + ' showquestion').one('animationend', function(){
  $pregaside.removeClass($showmovement);
  });
} else {
  var $pregaside =   $(this).parents('section').find('.expecting');

  /*if the expecting form is checked 'yes', remove this and check 'no'*/
  if($('input#yes_but').is(':checked')){
    $(this).prop('checked', false);
    $('input#no_but').prop('checked',true)
  }
  if ($pregaside.is(':visible')){
  var $hidemovement = 'fadeOut' + ' animated';
  $pregaside.addClass($hidemovement).one('animationend', function(){
  $pregaside.removeClass($hidemovement + ' showquestion');
  });
  };
};
});

$('button.add-drink').click(function(){
/*get section id*/
var $activesection = $(this).parents('form').parent().attr('id');
$('section#'+$activesection).find('ul.list-of-drinks').find('li').removeClass('active_drink');
addDrink($activesection);
return false;
});

$('button.delete-drink').click(function(){
var $activesection = $(this).parents('form').parent().attr('id');
var $unwanteddrink = $(this).parents('li');
deleteDrink($activesection, $unwanteddrink);
return false;
});

$('ul.list-of-drinks.coffees li .drink-location').click(function(){
/*get value of selected coffee shop*/
var $thisdrink = $(this).parents('li');
$thisdrink.addClass('active_drink');
var $coffeeshop = $(this).find('li.selected').attr('data-value');

/*switch the available sizes and options based on the coffee shop*/
if ($coffeeshop){
coffeeFormSwitcher($coffeeshop, $thisdrink);
};
});
});

function preloadDropdowns(){
}

function loadSvg(selector, url) {
  var target = document.querySelector(selector);

  // If SVG is supported
  if (typeof SVGRect != "undefined") {
    // Request the SVG file
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "img/svg/" + url + ".svg", true);
    ajax.send();

    // Append the SVG to the target
    ajax.onload = function(e) {
      target.innerHTML = ajax.responseText;
    }
  } else {
    // Fallback to png
    target.innerHTML = "<img src='img" + url + ".png' />";
  }
}

function moveForward($activesection, $nextsection){
  var $moveleft = 'fadeOutLeft' + ' animated';
  var $moveright = 'fadeInRight' + ' animated';
  $activesection.addClass($moveleft).one('animationend', function(){
  $activesection.removeClass($moveleft + ' active');
  $nextsection.addClass($moveright + ' active').one('animationend', function(){
  $nextsection.removeClass($moveright + ' animated');
});
});

if (!$('.indicator').is(':visible')){
var $indicatorslide = 'fadeInDown' + ' animated';
$('.indicator').addClass($indicatorslide + ' showindicator').one('animationend', function(){
$('.indicator').removeClass($indicatorslide);
});
};
indicateSection($nextsection);
};

function addDrink($activesection){
var $addDrinkMovement = 'fadeIn' + ' animated';
var $ul = $('section#'+$activesection).find('ul.list-of-drinks.'+$activesection);
var $clonedrink = $ul.find('li:first').clone(true);

/*get selectbox divs*/
var $selectdiv = $clonedrink.find('div.selectbox');

/*for each div.selectbox*/
$selectdiv.each(function(){

  /*get the select input element*/
  var $selectbox = $(this).find('select');

  /*move input element to the parent div*/
  $selectbox.appendTo($(this).parent());

});

/*for the clone option, hide the size and coffee type options again*/
$clonedrink.find('.drink-size').removeClass('show-col')
$clonedrink.find('.drink-type').removeClass('show-col');


/*make the copy and apply animation*/
($ul).append($clonedrink).addClass($addDrinkMovement).one('animationend',function(){
$(this).removeClass($addDrinkMovement);
});

/*remove unecessary boxes*/
$clonedrink.find('div.selectbox').remove();

/*reactivate SelectFx on new drink*/
refreshDropdowns($clonedrink);

};

function refreshDropdowns($clonedrink){
  var $dropdown = $clonedrink.find('select.selectbox');
  for (var i=0; i<$dropdown.length; i++){
    new SelectFx($dropdown[i]);
  }
};

function deleteDrink($activesection, $unwanteddrink){
var $drinkcount = $('ul.list-of-drinks.'+$activesection).find('li.drink').length;
var $deleteMovement = 'fadeOut' + ' animated';
if ($drinkcount !== 1){
$unwanteddrink.addClass($deleteMovement).one('animationend', function(){
$unwanteddrink.removeClass($deleteMovement).remove();
});
};
};


function indicateSection($nextsection){
  var $indicatorbutton = $('.indicator').find('li');
  $indicatorbutton.removeClass('indicate');
  var $nextsectionID = $nextsection.attr('id');
  $indicatorbutton.each(function(){
  if($(this).attr('class') == $nextsectionID){
    $(this).addClass('indicate');
    }
  });
};


function coffeeFormSwitcher($coffeeshop, $thisdrink){

switch($coffeeshop){
    /*get the unavailable coffees*/
    case 'starbucks':
          var $removeCoffees = ["cortado", "cappuccino_iced", "instant_coffee", "instant_coffee_decaf", "macchiato"];
          break;

    case 'costa':
          var $removeCoffees = ["instant_coffee", "instant_coffee_decaf", "coffee_brewed_decaf"];
          break;

      case 'caffe_nero':
          var $removeCoffees = ["flat_white", "macchiato", "cortado","instant_coffee", "instant_coffee_decaf", "coffee_brewed_decaf", "americano_iced", "cappuccino_iced"];
          break;

      default:
          var $removeCoffees = [];

          /*Americano
          Brewed Coffee
          Brewed Coffee (Decaf)
          Cortado
          Cappuccino
          Cappuccino (Iced)
          Espresso
          Flat White
          Latte
          Latte (Iced)
          Macchiato
          Mocha*/

        }


        /*hide the other shop sizes*/
        $($thisdrink).find('.drink-size .sizes').each(function(){
          $(this).removeClass('show-sizes');
          var $sizeID = $(this).attr('id');
          if($sizeID == $coffeeshop){
            $(this).parents('.drink-size').addClass('show-col');
            $(this).addClass('show-sizes');
            $('.active_drink').find('.drink-type').addClass('show-col');
          }
        });

        /*for each of the coffee types, check it with each entry in the removeCoffees array*/
        $($thisdrink).find('.drink-type .options ul li').each(function(){
          $(this).removeClass('hide_option');
          for (var i =0; i<$removeCoffees.length; i++){
            var $optionValue = $(this).attr('data-value');
            /*if the data-value matches, hide the option*/
            if($optionValue == $removeCoffees[i]) {
              $(this).addClass('hide_option');
            }
          };
        });
      }

      function getCoffees($sectionID){
        $('section#'+$sectionID).find('ul.coffees').find('li.coffee').each(function(){
          var $location = $(this).find('.drink-location').find('li.selected').attr('data-value');
          var $size = $(this).find('.drink-size').find('li.selected').attr('data-value');
          var $type = $(this).find('.drink-type').find('li.selected').attr('data-value');
          if ($location,$size,$type){
          var $coffee = {location: $location, size:$size, type:$type};
          $coffees.push($coffee);
          }
      });
      console.log($coffees);
      }

      function getTeas($sectionID){
        $('section#'+$sectionID).find('ul.teas').find('li.tea').each(function(){
          var $type = $(this).find('.drink-type').find('li.selected').attr('data-value');
          var $brewtime = $(this).find('.drink-brew-time').find('li.selected').attr('data-value');
          if ($type, $brewtime){
          var $tea = {type: $type, brewtime:$brewtime};
          $teas.push($tea);
          }
      });
      console.log($teas);
      }

      function getOtherDrinks($sectionID){
        $('section#'+$sectionID).find('ul.other-drinks').find('li.other-drink').each(function(){
          var $type = $(this).find('.drink-type').find('li.selected').attr('data-value');
          if ($type){
          var $otherdrink = {type: $type};
          $otherdrinks.push($otherdrink);
          }
      });
      console.log($otherdrinks);
      }

      function loadDrinks(searchterm){
        require(['downloadXML'], function(downloadXML){
      	//load in all the country details in one big chunk
          downloadUrl("xml/data.xml", function(doc) {
              var xml = xmlParse(doc);
              var $coffeedata = xml.documentElement.getElementsByTagName("coffee");
              var $teadata = xml.documentElement.getElementsByTagName("tea");
              var $otherdrinkdata = xml.documentElement.getElementsByTagName("other-drink");

              /*parse the coffees first*/
              for (var i = 0; i < $coffeedata.length; i++){
                var $coffee_type = $coffees[i].getElementsByTagName("coffee")[0].getAttribute('type');
                var $coffee_shops = $coffees[i].getElementsByTagName("coffeeshop");

                  /*parse the details of each coffee shop*/
              for (var c = 0; c < $coffeeshops.length; c++){

                var $coffeeshop_name = $coffeeshops[c].getElementsByTagName("coffeeshop")[0].getAttribute('name');
                var $coffeeshop_sizes =  $coffeeshops[c].getElementsByTagName("size");

                    /* ...then parse the caffeine levels for each size */
                for (var s = 0; s < $coffeeshop_sizes.length; s++){

                  var $size_type = $coffeeshop_sizes[s].getElementsByTagName("size")[0].getAttribute('type');
                  var $caffeine_lvl = parseInt($coffeeshops_sizes[s].getElementsByTagName("size"));
                  var $single_size = {type:$size_type, lvl:$caffeine_lvl}
                  $size_data.push($single_size);
              }
              var $single_coffeeshop = {name:$coffeeshop_name, sizes:$size_data}
              $coffeeshop_data.push($single_coffeeshop);
            }
            var $single_coffee = {name:$coffee_type, shops:$coffeeshop_data}
            $coffee_data.push($single_coffee);
          }// end for each coffee

                  }); //end XML parsing
                  });
                  console.log($coffee_data);
                  //load up the calculations
                  };
