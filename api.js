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

    if (response.status == 201) { // 회원가입에 성공하게 되면 로그인 페이지로 넘어가게 됨
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
    console.log(response_json)
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

    response_json = await response.json()
    console.log(response_json)

    const usermail = document.getElementById('usermail')
    usermail.innerText = response_json.email

    return response_json.email
}
