document.addEventListener("DOMContentLoaded", function () {
  async function main() {
    try {
      let [articleA, articleB] = await Promise.all([
        getArticleWithImage(),
        getArticleWithImage()
      ]);

      document.getElementById('sideAText').innerText = articleA.title;
      document.getElementById('imageA').src = articleA.imageUrl;
      console.log(articleA.title);
      console.log(articleA.directLinks);

      document.getElementById('sideBText').innerText = articleB.title;
      document.getElementById('imageB').src = articleB.imageUrl;
      console.log(articleB.title);
      console.log(articleB.directLinks);

    } catch (error) {
      console.error("Error:", error);
    }
  }

  main();
})

async function buttonsClicked(event) {
  let clickedButton = event.target;
  console.log(clickedButton.id);

  try {
    const articleX = await getArticleWithImage();

    if (clickedButton.id == "buttonA") {
      document.getElementById('sideAText').innerText = articleX.title;
      document.getElementById('imageA').src = articleX.imageUrl;
    } else if (clickedButton.id == "buttonB") {
      document.getElementById('sideBText').innerText = articleX.title;
      document.getElementById('imageB').src = articleX.imageUrl;
    }

    console.log(articleX.title);
    console.log(articleX.directLinks);
  } catch (error) {
    console.error("Error loading article on button click:", error);
  }
}

document.getElementById('buttonA').addEventListener('click', buttonsClicked)
document.getElementById('buttonB').addEventListener('click', buttonsClicked)