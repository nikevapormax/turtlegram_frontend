const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get('id');
console.log(article_id)

getArticleDetail(article_id);

async function loadArticles(article_id) {
    const article = await getArticleDetail(article_id);
    console.log(article)
    const title = document.getElementById('title')
    const content = document.getElementById('content')
    const email = document.getElementById('user_email')
    const time = document.getElementById('time')
    title.innerText = article.title
    content.innerText = article.content
    email.innerText = article.user_email
    time.innerText = article.time

}

loadArticles(article_id)