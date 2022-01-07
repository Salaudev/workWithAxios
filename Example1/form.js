const formAdd = document.querySelector("#formAdd");

formAdd.addEventListener("submit", async (e) => {
  e.preventDefault();

  const obj = {
    title: formAdd.title.value,
    url: formAdd.img.value,
  };

  console.log(obj);

  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/photos",
      obj
    );

    console.log(res);
    alert("qoshildi");
    setPhotos();
  } catch (error) {
    console.log(error);
  }
});
