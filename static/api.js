async function handleSignin() { // async를 붙여주어 '비동기함수'임을 알려줌

    // email과 password의 값을 가져옴
    const signupData = {
        email: document.getElementById('floatingInput').value,
        password: document.getElementById('floatingPassword').value
    }

    // await을 붙여주어 해당 부분이 '비동기' 부분임을 알려줌
    const response = await fetch('http://127.0.0.1:5000/signup', {
        method: "POST",
        body: json.stringify(signupData)
    })

    console.log(response)
}