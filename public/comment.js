const form = document.getElementById('comment-form');

form.addEventListener('click', function(e) {
  console.log(e.target.id)
  if (e.target.id === 'country-input') {
    const dataList = e.target.list;
    // if data list is empty get options
    if (dataList.children.length === 0) {
      getOptions('country', function(list) {
        // populate data list with options from list
        list.forEach(function(item) {
          const option = document.createElement('option');
          option.value = item;
          dataList.appendChild(option);
        });
      });
    }


  } else if(e.target.id === 'city-input') {
    console.log('get city input options');
    getOptions('city', function() {
      // do something with result
      console.log('now have options');
    })

  }
  
});

function getOptions(nameOfGroup, cb) {
  const endpoint = 'list?group=' + nameOfGroup;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const options = JSON.parse(this.responseText);
      cb(options);
    }
  }
  xhr.open('GET', endpoint , true);
  xhr.send();
}