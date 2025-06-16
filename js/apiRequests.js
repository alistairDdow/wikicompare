const wikiLinkapiUrl = 'https://linkcount.toolforge.org/api/?page=';

async function generateRandomArticle() {
  let response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary");
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  let data = await response.json();
  return data.title;
}

async function requestArticleReferenceNumber(apiPageRequest) {
  let response = await fetch(apiPageRequest);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  let data = await response.json();
  return data.wikilinks.direct;
}

async function getMainImage(title) {
  let mainImage = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=1000`;
  let response = await fetch(mainImage);
  let data = await response.json();

  let pages = data.query.pages;
  let page = Object.values(pages)[0];

  if (page && page.thumbnail && page.thumbnail.source) {
    return page.thumbnail.source;
  } else {
    return 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg';
  }
}

async function getArticleWithImage() {
  let title = await generateRandomArticle();
  let directLinks = await requestArticleReferenceNumber(wikiLinkapiUrl + title);
  let imageUrl = await getMainImage(title);

  return { title, directLinks, imageUrl };
}
