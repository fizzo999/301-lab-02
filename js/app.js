'use strict';

//TODO: filtering

function UnicornPic(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  UnicornPic.allPics.push(this);
}
UnicornPic.allPics = [];

UnicornPic.prototype.renderUnicornPic = function () {
  // When we render with Jquery, we can use templates
  // we can use pre-existing pieces of the page to build similar pieces.

  //1. copy an existing element
  const $liCopy = $('li:first-child').clone();
  // $liCopy.children()[0].textContent ='Hotdog';
  $liCopy.addClass(this.keyword);
  $liCopy.find('h2').text(this.title);
  $liCopy.find('img').attr('src', this.image_url);
  $liCopy.find('p').text(this.description);
  // console.log(this);
  $('ul').append($liCopy);
};

$('template').remove();

$.ajax('data/page-1.json').then(resurrectDataFunction);
const tempArr = [];
function resurrectDataFunction(resurrectedData) {
  // console.log(resurrectedData);
  resurrectedData.forEach(unicornObject => {
    new UnicornPic(unicornObject.image_url, unicornObject.title, unicornObject.description, unicornObject.keyword, unicornObject.horns);
  });
  // const tempArr = [];
  UnicornPic.allPics.forEach(unicornObject => {
    unicornObject.renderUnicornPic();
    if (!tempArr.includes(`${unicornObject.keyword}`)) {
      tempArr.push(unicornObject.keyword);
    }
    // $(`select:not(:contains('${unicornObject.keyword}')`).append(`<option value="${unicornObject.keyword}">${unicornObject.keyword}</option>`);
  });

  tempArr.forEach(label => {
    $(`select`).append(`<option value="${label}">${label}</option>`);
  });
}

// need event handler that listens for 'change' (behaves like a checkbox behind the scenes) - on('change') listen to some value of keyword .... once you can get that value (console.log) -   $('li').hide(); - hide everything and show only selection keyword objects - loop through all objects in allPics - if it has that value on it
//  write it into a function

$('select').on('change', handleClickingDropDown);

function handleClickingDropDown(event) {
  let eventValue = event.target.value;
  // console.log(eventValue);
  // Hide and show way: hide all and then show some : HTML focused
  $('li').hide();
  for (let i = 0; i < UnicornPic.allPics.length; i++) {
    if (UnicornPic.allPics[i].keyword === eventValue) {
      console.log(eventValue);
      // $('li').hide();
      // UnicornPic.allPics[i].renderUnicornPic();
      // $('li:includes=`${eventValue}`').show();
      // $(`li[class="${eventValue}"]`).css('display', 'block');
      $(`li[class="${eventValue}"]`).show();
    }
  }
  // $('li:first-child').show();
  //find the one that contains 'Odie'
  // $('li:contains(Odie)').show();
}

function handleClickingDropDown2(event) {
  let eventValue = event.target.value;
  console.log(eventValue);
  //  TODO: find the object with keyword that matches the eventValue
  //delete and then rerender
  $('ul').empty();
  UnicornPic.allPics.forEach(UnicornPic => {
    if (UnicornPic.keyword === eventValue) {
      // UnicornPic.renderUnicornPic();
      UnicornPic.renderUnicornPic();
      console.log(UnicornPic);
    }
  });
}
