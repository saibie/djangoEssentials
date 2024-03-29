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

// 비동기함수 내 딜레이 함수
function delay(ms) {return new Promise(resolve => setTimeout(resolve, ms));}

// 취소 버튼(cancel-button) 작동 함수
document.querySelectorAll('.cancel-button').forEach(cB => {cB.addEventListener('click', function(e){
    e.preventDefault();var destination = cB.getAttribute('destination');
    if (destination !== null) {window.location.href = destination;} else {window.location.href = '/';};
})})

// csrf token 로더
function csrftokenLoader() {return document.querySelector('input[name="csrfmiddlewaretoken"]').value;};
// 페이지 리로더
function postPageReload(url, data) {
    const csrftoken = csrftokenLoader();
    fetch(url, {method: 'post', body: data, headers :{'X-CSRFToken': csrftoken}})
    .then(response => {location.reload(true);})
    .catch(error => console.error('Error: ', error));
}

// 단순 페이지 이동 버튼
document.querySelectorAll('.justHref').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const form = document.createElement('form');
        form.method = 'post'; form.action = btn.getAttribute('url');
        const csrftoken = csrftokenLoader();
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden'; tokenInput.name = 'csrfmiddlewaretoken'; tokenInput.value = csrftoken;
        form.appendChild(tokenInput);

        document.body.appendChild(form);
        form.submit();
    })
})

// 비활성화 버튼(inactivated) 잠금 함수
document.querySelectorAll('[class*="inactivated"]').forEach(iB => {iB.addEventListener('click', function(e){e.preventDefault();})});

// 뒤로 가기 버튼 정의
document.querySelectorAll('.goBackButton').forEach(button => {button.addEventListener('click', e => {e.preventDefault();window.history.back();})});

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

// json response를 이용해 func를 실행하는 함수
function jsonReceiver(url, data, func) {
    const csrftoken = csrftokenLoader();
    fetch(url, {
        method: 'post',
        body: data,
        headers: {
            'X-CSRFToken': csrftoken
        }
    })
    .then(response => response.json())
    .then(func)
    .catch(error => {console.error(error);});
}

// html의 특정 노드를 페이지의 특정 노드에 렌더링하는 함수
function nodeRender(url, data, html_node_query, target_node, replaceBool=false) {
    const csrftoken = csrftokenLoader();
    fetch(url, {method: 'post', body: data, headers: {'X-CSRFToken': csrftoken}})
    .then(response => response.text())
    .then(html => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const htmlNode = tempDiv.querySelector(html_node_query);
        target_node.innerHTML = htmlNode.innerHTML;        
        replaceBool ? history.pushState(null, null, url) : undefined;
    })
    .catch(error => {console.error(error);});
}

// js로 form 제출하는 함수 - form제출 비동기화
function jsFormSubmitter(url, data, method='post') {
    const csrftoken = csrftokenLoader();
    const form = document.createElement('form');
    form.method = method; form.action = url;
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden'; tokenInput.name = 'csrfmiddlewaretoken'; tokenInput.value = csrftoken;
    form.appendChild(tokenInput);

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        }
    }

    document.body.appendChild(form);
    // console.log(form.outerHTML);
    form.submit();
}

// fetch 후 func를 실행하는 함수
function funcAfterFetch(url, data, func) {
    const csrftoken = csrftokenLoader();
    fetch(url, {method: 'post', body: data, headers: {'X-CSRFToken': csrftoken}})
    .then(func)
    .catch(error => {console.error(error);});
}

// Enter키로 submit - shift+Enter는 submit 안 함
function submitByEnterFinal(e, needShift=false) {
    if (needShift) {
        if (e.keyCode == 13 && e.shiftKey) {
            e.preventDefault();
            e.target.closest('form').submit();
        };
    } else {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            e.target.closest('form').submit();
        };
    };
};
// submitByEnter 중간함수
function submitByEnterListener(needShift=false) {return function(e) {submitByEnterFinal(e, needShift);}};

// 가나다 번호 매기기
const olKoChars = document.querySelectorAll('ol.ko-char');
olKoChars.forEach(ol => {
    const lis = ol.querySelectorAll('li');

    let counter = 0;

    lis.forEach(li => {
        if (li.parentNode === ol) {
            counter++;
            // li.textContent = counterToKorean(counter) + '. ' + li.textContent;
            const textNode = document.createTextNode(counterToKorean(counter) + '. ');
            li.insertBefore(textNode, li.firstChild);
        }
    })
});
function counterToKorean(counter) {
    if (counter < 15) {
        const koreanNumbers = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하'];
        return koreanNumbers[counter -1];
    } else {return counter;}
};

/* =====================================================================================================
========================================================================================================
==================================== ↑ 위로는 모듈 정의 구간 ↑ =========================================
========================================================================================================
===================================================================================================== */
