const query = document.getElementById('search') //아이디값 가져오기
        const submitBtn = document.getElementById('submit')
        const BASE_URL = 'http://localhost:5000/api/words'
        //서버 데이터 가져오기
        function checkIfStringHasSpecialCharacter(str) {
            const re = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
            return re.test(str);
        }
        //검색어에 숫자가 들어간 경우 검색이 안되도록
        function checkIfStringHasNumbers(str) {
            return /\d/.test(str);
        }
        //영어 문자가 들어간 경우
        // function checkIfStringHasLetters(str){
        //     return /[a-zA-Z]/.test(str);
        // }
        function enableSubmitBtn(state){
            submitBtn.disabled = state
        }
        function getData(baseUrl, query){
             //버튼 비활성화
            enableSubmitBtn(true) //비활성화
            console.log('서버 접속중......')
           // 서버 index.js 파일에 반드시 cors 옵션에 localhost:5500 주소를 허용한다고 설정해야 함
           //사용자 입력 유효성 검사
           if(checkIfStringHasSpecialCharacter(query)){
                enableSubmitBtn(false) //활성화
                container.innerHTML = "Your search keyword Retype only hangle!!"
                return;
           }
           if(checkIfStringHasNumbers(query)){
                enableSubmitBtn(false) //활성화
                container.innerHTML = "Your search keyword Retype only hangle!!"
                return;
           }
        //    if(checkIfStringHasLetters(query)){
        //         enableSubmitBtn(false) //활성화
        //         container.innerHTML = "한글 단어만 입력해주세요."
        //         return;
        //    }
           
           fetch(`${baseUrl}/${query}`, {
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "*" // 이 코드 때문에 CORS 에러가 발생한것임. 이 코드 주석처리하면 프론트엔드에서 곧바로 외부 API 접근가능하다. (프록시나 서버가 필요없음)
                }
           })
           .then( res => res.json())
           .then( data => {
                // 버튼 활성화
                enableSubmitBtn(false) //활성화
                console.log(data)
                const {words} = data;
                //데이터 유효성 검증
                if(words.length === 0){
                    container.innerHTML = "No words Found !"
                    return;
                }

                const template = words.map(word => {
                    return (
                        `
                            <div class="item">
                                <div class="word"><a href=${word.r_link} target="_blank">${word.r_word} ${word.r_chi} </a> - ${word.r_pos}</div>
                                <p class="description">${word.r_des}</div>
                            </div>
                        `
                    )
                })
                container.innerHTML = template.join("")
            })
        }

       submitBtn.addEventListener('click', function(){
        //    console.log(this)
            console.log(query.value)
            console.log(this)
            getData(BASE_URL, query.value)
          
       })
       query.addEventListener('keypress', function(e){
           console.log('key pressed')
           if(e.keycode === 13){
               getData(BASE_URL, query.value)
           }
       })
       window.addEventListener('DOMContentLoaded', function() { 
            setTimeout(getData(BASE_URL), 5000)
       });
       
