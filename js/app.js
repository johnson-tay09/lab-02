"use strict";
//use ajax to read json file
//create constructor function
//run data into constructor
//copy template and set duplicated items
//append dom
$().ready(() => {
  const animalArray = [];
  // get data with ajax
  $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(
    (hornyAnimals) => {
      hornyAnimals.forEach((horned) => {
        new Animal(horned).render();
      });
      //run gather function after animals data was GOT with ajax
      gatherKeywords();
    }
  );
  //constructor function
  function Animal(object) {
    this.title = object.title;
    this.image_url = object.image_url;
    this.description = object.description;
    this.keyword = object.keyword;
    this.horns = object.horns;
    animalArray.push(this);
  }
  //method for rendering new section to DOM
  Animal.prototype.render = function () {
    //select all the html inside the template
    const template = $("#photo-template").html();
    //create new section
    const $newSection = $(
      `<section class="${this.keyword}">${template}</section>`
    );
    //new section based on tags from html
    $newSection.find("h2").text(this.title);
    $newSection.find("p").text(this.description);
    $newSection.find("img").attr("src", this.image_url);
    //append to DOM
    $("main").append($newSection);
  };

  const gatherKeywords = () => {
    const keywordArray = [];
    animalArray.forEach((animal) => {
      //if keyword is not in keyword array for each animal.
      if (keywordArray.includes(animal.keyword) === false) {
        keywordArray.push(animal.keyword);
      }
    });
    //create option elements inside the select parent
    keywordArray.forEach((keyword) => {
      const $selector = $(`<option></option>`);
      $selector.text(keyword);
      $selector.attr("value", keyword);
      $("select").append($selector);
    });
  };
  // event handler on option click
  $("#menu").on("change", eventHandler);
  function eventHandler(event) {
    $("section").hide();
    animalArray.forEach((object) => {
      if (event.target.value === object.keyword) {
        // console.log(object);
        $(`section[class = ${object.keyword}]`).show();
      }
    });
  }
});
/* <option value="default">Filter by Keyword</option> */
//gather unique keywords
//render them to the dropdown

//listen for filter select and re-render just those objects.
