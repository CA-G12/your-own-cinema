const fetch = (url, cb) => {
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        cb(data);
      } else {
        alert('something went wrong');
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
};
