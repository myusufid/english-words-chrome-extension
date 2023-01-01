const getDictionary = async function (a, b) {
  let response = await fetch('./dictionary.json');

  return response.json();
}



$(function () {

  function showDictionary() {
    getDictionary().then((data) => {
      var dictionary = data
      var number = Math.floor(Math.random() * 4)
      var item = dictionary[number];
      $("#title").html(item.title)
      $("#word").html(item.word)
      $("#description").html(item.description)
      $("#definitions").html(item.definitions)
      $("#context_programming").html(item.context_programming)


      if (item.examples.length > 0) {
        let container = $("<div>").attr("id", "examples-container");
        $('#main').append(container)
        container = $("#examples-container");
        let textExampleContainer = $("<b>").text("Examples:");
        container.append(textExampleContainer)
        $("#main").append($("<br>"));
        for (var i = 0; i < item.examples.length; i++) {
          var listItem = $("<li>").text(item.examples[i]);
          container.append(listItem);
        }
      }

      if (item.conversations.length > 0) {
        // Add 2 empty text elements
        for (let i = 0; i < 2; i++) {
          $("#main").append($("<br>"));
        }

        let container = $("<div>").attr("id", "examples-container-conversations");
        $('#main').append(container)

        container = $("#examples-container-conversations");
        let textExampleContainer = $("<b>").text("Example conversation:");
        container.append(textExampleContainer)
        $("#main").append($("<br>"));
        for (var i = 0; i < item.conversations.length; i++) {
          var conversation = item.conversations[i];
          for (var j = 0; j < conversation.length; j++) {
            var person = conversation[j].person;
            var statement = conversation[j].statement;
            var element = $("<p>").text(person + ": " + statement);
            container.append(element);
          }
        }
      }


      if (item.synonyms.length > 0) {
        // Add 2 empty text elements
        for (let i = 0; i < 1; i++) {
          $("#main").append($("<br>"));
        }

        let container = $("<div>").attr("id", "synonyms-container");
        $('#main').append(container)

        var synonymsText = "Synonyms: " + item.synonyms.join(", "); // Join the synonyms with commas and a space
        var p = $("<p>").text(synonymsText); // Create a new paragraph element with the synonyms text
        $("#synonyms-container").append(p); // Append the paragraph element to the element with the ID "synonyms-container"
      }

      if (item.antonyms.length > 0) {
        let container = $("<div>").attr("id", "antonyms-container");
        $('#main').append(container)

        var antonymsText = "antonyms: " + item.antonyms.join(", "); // Join the antonyms with commas and a space
        var p = $("<p>").text(antonymsText); // Create a new paragraph element with the antonyms text
        $("#antonyms-container").append(p); // Append the paragraph element to the element with the ID "antonyms-container"
      }



      $("#image").attr('src', item.image)
    });
  }

  showDictionary()

  setInterval(function () {
    $("#title").empty()
    $("#word").empty()
    $("#description").empty()
    $("#definitions").empty()
    $("#context_programming").empty()
    $("#examples-container").empty();
    $("#examples-container-conversations").empty();
    $("#synonyms-container").empty();
    $("#antonyms-container").empty();

    $("#image").attr('src', null)
    showDictionary()
  }, 10000);

})