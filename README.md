# turtlegram_frontend
# <0515>
1. javascript만을 사용해 사용자가 입력한 데이터 백앤드로 가져오기
  - javascript의 내장 라이브러리인 `Fetch API`를 사용 <-> 다른 사람이 만든 외부 라이브러리 `Axios`
    - 외부 라이브러리도 장점이 많지만, 코드가 변경될 가능성이 있기 때문에 안정성을 위해 내장 라이브러리 사용
    - https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch 참고
    - `async`와 `await`를 사용하여 어떤 함수가 비동기함수이고, 어떤 부분에서 비동기에 대한 동작이 일어나는지 표시해줄 수 있음
