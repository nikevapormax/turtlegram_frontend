const backend_base_url = 'http://127.0.0.1:5000'
const frontend_base_url = 'http://127.0.0.1:5500/frontend'

async function handleSignup() { // async를 붙여주어 '비동기함수'임을 알려줌

    // email과 password의 값을 가져옴
    const signupData = {
        email: document.getElementById('floatingInput').value,
        password: document.getElementById('floatingPassword').value
    }
    // await을 붙여주어 해당 부분이 '비동기' 부분임을 알려줌
    const response = await fetch(`${backend_base_url}/signup`, {
        method: "POST",
        body: JSON.stringify(signupData)
    })

    console.log(response)

    // if (signupData['email'].includes('@')) {
    //     if (signupData['email'].split('@')[1] in ['naver.com', 'gmail.com', 'daum.net']) {
    //         signupData['email'] = signupData['email']
    //     } else {
    //         alert('@도메인을 확인해주세요.')
    //     }
    // } else if (signupData['email'] == '') {
    //     alert('이메일을 입력해주세요.')
    // } else {
    //     alert('이메일 형식을 지켜주세요.')
    // }

    // if (signupData['password'] == '') {
    //     alert('비밀번호를 입력해주세요.')
    // } else {
    //     signupData['password'] = signupData['password']
    // }

    if (response.status == 200) { // 회원가입에 성공하게 되면 로그인 페이지로 넘어가게 됨
        alert('회원가입에 성공하였습니다!');
        window.location.replace(`${frontend_base_url}/login.html`);
    } else { // 회원가입에 실패하게 되면 경고문 
        alert('회원가입에 실패하였습니다. 다시 시도해주세요!');
        window.location.reload();
    }
}

async function handleSignin() { // async를 붙여주어 '비동기함수'임을 알려줌

    // email과 password의 값을 가져옴
    const signinData = {
        email: document.getElementById('floatingInput').value,
        password: document.getElementById('floatingPassword').value
    }
    // await을 붙여주어 해당 부분이 '비동기' 부분임을 알려줌
    const response = await fetch(`${backend_base_url}/signin`, {
        method: "POST",
        body: JSON.stringify(signinData)
    })

    console.log(response)
    response_json = await response.json()
    console.log(response_json.token)
    localStorage.setItem("token", response_json.token)

    if (response.status == 201) {
        alert('로그인에 성공하였습니다!');
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert('로그인에 실패했습니다. 재시도해주세요!');
        window.location.reload();
    }
}

async function getName() {
    const response = await fetch(`${backend_base_url}/getuserinfo`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    console.log(response)

    // response_json = await response.json()

    if (response.status == 200) { // authorize로 인해서 통과 못하면 401이 나옴!
        response_json = await response.json()
        console.log(response_json)
        return response_json
    } else {
        return null
    }
    // 아래 부분은 필요가 없어짐. 그래서 삭제!
    // const usermail = document.getElementById('useremail')
    // usermail.innerText = response_json.email
}

async function postArticle(title, content) {
    const articleData = {
        title: title,
        content: content
    }
    console.log(articleData)

    const response = await fetch(`${backend_base_url}/article`, {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(articleData)
    })

    response_json = await response.json()
    console.log(response_json)

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/`)
    }
}

async function getArticles() {
    const response = await fetch(`${backend_base_url}/article`, {
        method: 'GET'
    })

    response_json = await response.json()

    return response_json.articles
}

// 로그아웃 기능. 로그아웃 시 로컬 스토리지에 저장되어 있던 유저의 token 값을 삭제하고 해당 페이지에서 새로고침만 진행한다. 
async function logout() {
    localStorage.removeItem('token')
    window.location.replace(`${frontend_base_url}/`)
}

async function articleDetail(article_id) {
    console.log(article_id)
    const url = `${frontend_base_url}/article_detail.html?id=${article_id}`
    location.href = url
}

async function getArticleDetail(article_id) {
    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        method: "GET"
    })

    response_json = await response.json()
    console.log(response_json)

    return response_json.article
}

async function patchArticle(article_id, title, content) {
    const articleData = {
        "title": title,
        "content": content
    }

    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        method: 'PATCH',
        body: JSON.stringify(articleData)
    })


    // 여기서 현재 로그인 하지 않은 아이디로 수정을 시도할 수 있다. 이러면 오류 뜨니까 꼭 로그인한 사용자로 하기!
    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}

async function deleteArticle() {
    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: { 'Authorization': localStorage.getItem('token') },
        method: 'DELETE'
    })

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/`)
    } else {
        alert(response.status)
    }
}

// 변수명은 전혀 상관이 없지만, 입력되는 순서는 정말 중요함!
async function postComment(article_id, comment_content) {
    const commentData = {
        'content': comment_content
    }
    const response = await fetch(`${backend_base_url}/article/${article_id}/comment`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        method: 'POST',
        body: JSON.stringify(commentData)
    }
    )

    if (response.status == 200) {
        return response
    } else {
        alert(response.status)
    }
}