const getDictionary = async function(a, b) {
    let response = await fetch('./dictionary.json');

    return response.json();
  }



  $(function(){
      
      function showDictionary(){
         getDictionary().then((data) => {
          var dictionary = data
          var number = Math.floor(Math.random() * dictionary.length)
          var item = dictionary[number];
          $("#title").html(item.title)
          $("#description").html(item.description)
          $("#image").attr('src', item.image)
        });
      }

      showDictionary()

      setInterval(function(){
        $("#title").html()
        $("#description").html()
        $("#image").attr('src', null)
        showDictionary()
      }, 5000);

  })