const getPhotos = async () => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_limit=10"
    );

    return res.data;
  } catch (error) {
    return [];
  }
};

const photos = document.querySelector("#photos");
const setPhotos = async () => {
  const data = await getPhotos();
  console.log(data);

  data.map((item) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-xl-3 mb-3";
    photos.append(col);

    const card = document.createElement("div");
    card.className = "shadow rounded overflow-hidden h-100";

    col.append(card);

    const img = document.createElement("img");
    img.className = "w-100";
    img.src = item.thumbnailUrl;
    img.alt = item.title;
    card.append(img);

    const title = document.createElement("p");
    title.className = "fw-bold p-2";
    title.innerHTML = item.title;
    card.append(title);
  });
};

setPhotos();
