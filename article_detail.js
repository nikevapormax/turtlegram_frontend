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

    const user = await getName()
    if (user.id != article.user) {
        const update_button = document.getElementById('update_button')
        const delete_button = document.getElementById('delete_button')
        update_button.style.visibility = "hidden";
        delete_button.style.visibility = "hidden";
    }

}

// 해당 함수는 UI만 변경할 것이므로 async를 사용하지 않음
function updateMode() {
    const title = document.getElementById('title')
    const content = document.getElementById('content')
    // 수정하기 버튼을 누르면 title과 content가 숨겨짐
    title.style.visibility = "hidden";
    content.style.visibility = "hidden";

    const input_title = document.createElement("textarea")
    // id 값으로 input_title을 부여함
    input_title.setAttribute("id", "input_title")
    // 이 부분을 넣어줌으로써 body에 이 값을 집어 넣었을 때 textarea 안에 본래의 값이 들어가 있게 됨
    input_title.innerText = title.innerHTML

    const input_content = document.createElement("textarea")
    input_content.setAttribute("id", "input_content")
    input_content.innerText = content.innerHTML
    input_content.rows = 10

    // 위의 js에서 수정한 부분을 진짜로 html 안에다가 넣어주자
    const body = document.body
    body.insertBefore(input_title, title)
    body.insertBefore(input_content, content)

    const update_button = document.getElementById("update_button")
    update_button.setAttribute("onclick", "updateArticle()")
}

async function updateArticle() {
    var input_title = document.getElementById('input_title')
    var input_content = document.getElementById('input_content')
    console.log(input_title.value, input_content.value)

    // article_id는 전역변수로 맨 위에서 선언되어 사용 가능
    const article = await patchArticle(article_id, input_title.value, input_content.value)

    // 수정할 값을 넣은 후 '수정하기' 버튼을 누르면 값이 사라짐
    input_title.remove()
    input_content.remove()

    // 값이 사라지기만 하면은 안되니까 수정된 값을 다시 화면에 보여주기 위해 작업
    const title = document.getElementById('title')
    const content = document.getElementById('content')
    title.style.visibility = "visible";
    content.style.visibility = "visible";
    // 위에까지 하면은 '수정하기' 버튼을 누른 후 값이 화면에 다시 들어오기는 하지만 값은 변하지 않음
    // 그래서 변한 값을 보여주기 위해서 아래와 같이 작업
    // '수정하기' 버튼의 온클릭 함수를 다시 넣어준다. 위에 있는 updateMode()가 버튼을 누르면 다시 실행됨.
    update_button.setAttribute("onclick", "updateMode()")

    // 모든 작업이 끝난 뒤에 위에 있는 loadArticles() 함수를 실행해서 다시 db에서 값을 가지고 오도록 함
    loadArticles(article_id)
}


async function removeArticle() {
    await deleteArticle(article_id)
}

loadArticles(article_id)

