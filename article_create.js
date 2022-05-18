function handleArticleCreate() {
    const title = document.getElementById('article_title').value
    const content = document.getElementById('article_content').value


    // 여기서 뽑아온 타이틀과 콘텐트의 값을 api.js에 있는 postArticle 함수에 넘기기 위해 함수 실행
    postArticle(title, content)
}