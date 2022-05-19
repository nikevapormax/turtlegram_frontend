async function loadArticles() {
    articles = await getArticles();

    const article_list = document.getElementById('articles')
    articles.forEach(article => {
        console.log(article)
        const newArticle = document.createElement('li');
        newArticle.setAttribute('id', article._id)
        newArticle.innerText = article.title;
        // 아티클을 클릭하면 newArticle.setAttribute('id', article._id)에 있는 id 값을 가져와 해당 함수에 넣어준다.
        newArticle.setAttribute('onclick', 'articleDetail(this.id)')
        article_list.appendChild(newArticle)

    });
}

async function checkLogin() {
    const email = await getName();
    console.log(email)

    const useremail = document.getElementById('useremail')
    const loginoutButton = document.getElementById('loginout')
    if (email) {
        useremail.innerText = email
        loginoutButton.innerText = '로그아웃'
        loginoutButton.setAttribute('onclick', "logout()")
    } else {
        useremail.innerText = '로그인해주세요.'
        loginoutButton.innerText = '로그인'
        loginoutButton.setAttribute('onclick', "location.href='/login.html'")
    }
}

checkLogin();
loadArticles();
