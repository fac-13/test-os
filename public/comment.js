const form = document.getElementById('comment-form');

form.addEventListener('click', function (e) {
  const countryFor = form[0].value;
  console.log(e.target.id)
  if (e.target.id === 'country-input') {
    const dataList = e.target.list;
    // if data list is empty get options
    if (dataList.children.length === 0) {
      getOptions('country', function (list) {
        // populate data list with options from list
        list.forEach(function (item) {
          const option = document.createElement('option');
          option.value = item;
          dataList.appendChild(option);
        });
      });

      const cityDataList = form[1].list
      while(cityDataList.firstChild) {
        cityDataList.removeChild(cityDataList.firstChild);
      }
      
    }


  } else if (e.target.id === 'city-input') {
    console.log('get city input options');
    var countryToMatch = form[0].value
    if (countryToMatch === '') {
      console.log('select country first please')
    } else {
      const dataList = e.target.list;
      // create a new city list if the selected country has changed

      
      if (dataList.children.length === 0 ) {
        getOptions('city&' + countryToMatch, function (list) {
          // populate data list with options from list
          list.forEach(function (item) {
            const option = document.createElement('option');
            option.value = item;
            dataList.appendChild(option);
          });
        });
      }
    }
  }

  });

function getOptions(nameOfGroup, cb) {
  const endpoint = 'list?group=' + nameOfGroup;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const options = JSON.parse(this.responseText);
      cb(options);
    }
  }
  xhr.open('GET', endpoint, true);
  xhr.send();
}