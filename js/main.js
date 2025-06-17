const activeArticles = ["null", "null"];

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
      activeArticles[0] = articleA;

      document.getElementById('sideBText').innerText = articleB.title;
      document.getElementById('imageB').src = articleB.imageUrl;
      console.log(articleB.title);
      console.log(articleB.directLinks);
      activeArticles[1] = articleB;

    } catch (error) {
      console.error("Error:", error);
    }
  }

  main();
})

async function displayNextArticle(event) {
  let clickedButton = event.target;
  console.log(clickedButton.id);

  try {
    const articleX = await getArticleWithImage();

    if (clickedButton.id == "buttonA") {

      if (activeArticles[0].directLinks >= activeArticles[1].directLinks) {
        console.log("correct");
        document.getElementById('score').innerHTML = parseInt(document.getElementById('score').innerHTML) + 1;
      } else {
        console.log("wrong");
      }

      document.getElementById('sideAText').innerText = articleX.title;
      document.getElementById('imageA').src = articleX.imageUrl;
      activeArticles[0] = articleX

    } else if (clickedButton.id == "buttonB") {

      if (activeArticles[1].directLinks > activeArticles[0].directLinks) {
        console.log("correct");
        document.getElementById('score').innerHTML = parseInt(document.getElementById('score').innerHTML) + 1;
      } else {
        console.log("wrong")
      }
      document.getElementById('sideBText').innerText = articleX.title;
      document.getElementById('imageB').src = articleX.imageUrl;
      console.log(articleX.directLinks);
      activeArticles[1] = articleX
    }

    console.log(articleX.title);
    console.log(articleX.directLinks);
    console.log(activeArticles);
  } catch (error) {
    console.error("Error loading article on button click:", error);
  }
}




document.getElementById('buttonA').addEventListener('click', displayNextArticle)
document.getElementById('buttonB').addEventListener('click', displayNextArticle)

