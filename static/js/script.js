// Mac 주소 입력 시 자동 이동
function moveToNextField(event, currentInput) {
    const filteredValue = currentInput.value.replace(/[^0-9a-fA-F]/g, "");
    currentInput.value = filteredValue;

    const maxLength = parseInt(currentInput.getAttribute("maxlength"), 10);
    const currentLength = currentInput.value.length;
  
    if (currentLength >= maxLength) {
        const nextInput = currentInput.nextElementSibling;
        if (nextInput && nextInput.tagName === "INPUT") {
          nextInput.focus();
        }
    }
}

// 취소 버튼(cancel-button) 작동 함수
document.querySelectorAll('.cancel-button').forEach(cB => {
    cB.addEventListener('click', function(e){
        e.preventDefault();
        var destination = cB.getAttribute('destination');
        if (destination !== null) {
            window.location.href = destination;
        } else {
            window.location.href = '/';
        }
    })
})

// 비활성화 버튼(inactivated) 잠금 함수
document.querySelectorAll('[class*="inactivated"]').forEach(iB => {
    iB.addEventListener('click', function(e){
        e.preventDefault();
    })
})

// 뒤로 가기 버튼 정의
document.querySelectorAll('.goBackButton').forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        window.history.back();
    })
});

// 댓글 수정 핸들러
function handleFormSubmitForModify(form) {
    form.addEventListener('click', function(e) {
        e.preventDefault();
        var t = form.getAttribute('target');
        document.getElementById(t).style.display = "flex";
    });
}
const revforms = document.querySelectorAll('.comment_rev_buttons');
for (let i = 0; i < revforms.length; i++) {
    handleFormSubmitForModify(revforms[i]);
}

// 댓글 수정 중 취소
document.querySelectorAll('.comment-cancel-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.comment-overlay').forEach(div => {
            div.style.display = "none";
        })
    })
})

// submit을 무시하는 form 내의 버튼
document.querySelectorAll('.hyperref-not-submit').forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        var destination = button.getAttribute('destination');
        if (destination !== null) {
            window.location.href = destination;
        } else {
            window.location.href = '/';
        }
    })
})
