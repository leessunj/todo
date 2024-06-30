//login확인
/**
 * 로컬스토리지에 유저를 확인하고, 없으면 로그인 폼을 띄운다
 * 아니면 메인화면을 띄운다
 */

/**
 * 로그인하면 로컬스토리지에 유저로 저장한다
 */
const loginBtn=document.querySelector("#login-form")
const loginInput=document.querySelector("#username")
const userText=document.querySelector("#user")
const mainContent=document.querySelector("#main-content")
let username=localStorage.getItem("user")

loginBtn.addEventListener("submit",(e)=>{
    e.preventDefault()
    localStorage.setItem("user",loginInput.value)
    username=loginInput.value
    console.log(username,"등록완")
    completeLogin()
})

if(username){
    completeLogin()
}

function completeLogin(){
    loginBtn.classList.add("hidden")
    mainContent.classList.remove("hidden")
    userText.innerHTML=addParticleToName(username)
}

function getKoreanParticle(name) {
    if (!name || typeof name !== 'string') {
        return '';
    }

    const lastChar = name[name.length - 1];
    const lastCharCode = lastChar.charCodeAt(0);

    // 한글 유니코드 범위: 가(0xAC00) ~ 힣(0xD7A3)
    if (lastCharCode >= 0xAC00 && lastCharCode <= 0xD7A3) {
        const jongseongIndex = (lastCharCode - 0xAC00) % 28;
        // 종성이 0이면 받침이 없는 경우
        return jongseongIndex === 0 ? '는' : '은';
    }

    // 한글이 아닌 경우 기본적으로 받침이 없는 것으로 처리
    return '는';
}

function addParticleToName(name) {
    const particle = getKoreanParticle(name);
    return `${name}${particle}`;
}


/**
 * 시계와 날짜
 */
const date=document.querySelector("#date")
const time=document.querySelector("#time")
const DAY=["SUN","MON","TUE","WED","THU","FRI","SAT"]
function clock() {
  const today = new Date();
  date.innerHTML=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}-${DAY[today.getDay()]}`
  time.innerHTML=`${String(today.getHours()).padStart(2,"0")}:${String(today.getMinutes()).padStart(2,"0")}${today.getHours()<12?"AM":"PM"}`
  if(time.innerHTML=='00:00AM'){
    localStorage.removeItem("dones")
  }
}

setInterval(clock, 1000);


/**
 * 랜덤 배경색
 */

const colors=["#ADD8E6","#f1aed7","#ffe7c2","#c5fffa","#c8aef1"]

function setBackGroundColor(){
    document.body.style.backgroundColor=colors[Math.floor(Math.random()*colors.length)]
}
setBackGroundColor()