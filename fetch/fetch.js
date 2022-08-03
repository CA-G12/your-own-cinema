const fetch = (url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        cb(data);
      } else {
        console.log('something went wrong');
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
};
