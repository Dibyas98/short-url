let urlInput = document.getElementById("urlInput");
let btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  // console.log(urlInput.value);
  let url = urlInput.value;
  if (url.length == 0) {
    alert("you have not given any url");
  } else {
    async function fetchData() {
        console.log('api calla');
      let res = await fetch(
        "http://localhost:5001/short-url",
        {
          method: "POST",
        },
        { body: url }
      );

      let data = res.json();
      console.log(data);
    }

    fetchData()
  }
});
