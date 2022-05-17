async function handleSignup() { // async를 붙여주어 '비동기함수'임을 알려줌

    // email과 password의 값을 가져옴
    const signupData = {
        email: document.getElementById('floatingInput').value,
        password: document.getElementById('floatingPassword').value
    }
    // await을 붙여주어 해당 부분이 '비동기' 부분임을 알려줌
    const response = await fetch('http://127.0.0.1:5000/signup', {
        method: "POST",
        body: JSON.stringify(signupData)
    })

    console.log(response)


    if (response.status == 200) { // 회원가입에 성공하게 되면 로그인 페이지로 넘어가게 됨
        alert('회원가입에 성공하였습니다!');
        window.location.replace('http://127.0.0.1:5500/frontend/login.html');
    } else { // 회원가입에 실패하게 되면 경고문 
        alert(response.status);
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
    const response = await fetch('http://127.0.0.1:5000/signin', {
        method: "POST",
        body: JSON.stringify(signinData)
    })

    console.log(response)
}