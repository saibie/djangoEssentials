/**
 * Mac 주소 입력 시 해당 칸에 두 글자가 다 입력되면 다음 칸으로 커서 자동 이동하며
 * 0-9a-fA-F가 아닌 글자가 들어오면 필터해서 없앰
 * @param {Event} event 이벤트
 * @param {HTMLElement} currentInput 현재 input 개체
 */
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

/**
 * 비동기함수 내 딜레이 함수
 * @param {number} ms ms
 * @returns {Promise} ms동안 기다리게 하는 Promise
 */
function delay(ms) {return new Promise(resolve => setTimeout(resolve, ms));}

// 취소 버튼(cancel-button) 작동 함수
document.querySelectorAll('.cancel-button').forEach(cB => {cB.addEventListener('click', function(e){
    e.preventDefault();var destination = cB.getAttribute('destination');
    if (destination !== null) {window.location.href = destination;} else {window.location.href = '/';};
})})

/**
 * csrf token 로더
 * @returns {String} 페이지에 존재하는 csrftoken - base.html에서 {% csrf_token %}을 설정해야 함
 */
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

/**
 * 댓글 수정 핸들러
 * @param {HTMLElement} form 
 */
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

/**
 * fetch로 반환받은 json response를 이용해 func를 실행하는 함수
 * @param {String} url fetch할 url
 * @param {Object} data fetch할 body 내용
 * @param {Function} func json을 입력받아 실행할 함수
 * @param {String} method 'get'이나 'post'
 */
function jsonReceiver(url, data, func, method='post') {
    const csrftoken = csrftokenLoader();
    fetch(url, {
        method: method,
        body: data,
        headers: {
            'X-CSRFToken': csrftoken
        }
    })
    .then(response => {
        if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json();
        } else {
            return response.text(); // JSON이 아닌 경우 텍스트로 변환
        }
    })
    .then(func)
    .catch(error => {console.error(error);});
}

/**
 * fetch로 반환 받은 html의 특정 노드를 페이지의 특정 노드에 렌더링하는 함수
 * @param {String} url fetch할 url
 * @param {Object} data fetch할 body 내용
 * @param {String} html_node_query 반환 받은 html에서 찾을 node에 대한 쿼리
 * @param {HTMLElement} target_node 페이지에 있는 node 객체
 * @param {Boolean} replaceBool true면 페이지를 이동한 것처럼 history에 pushState
 */
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

/**
 * js로 form 제출하는 함수 - form제출 비동기화
 * form 바깥의 버튼으로 submit이 필요할 때 등에 사용될 것
 * @param {String} url fetch할 url
 * @param {Object} data fetch할 body 내용
 * @param {String} method 'get'이나 'post'
 */
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

// 계정관리버튼 form제출
document.querySelectorAll('button.account-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = btn.getAttribute('url');
        const method = btn.getAttribute('method');
        jsFormSubmitter(url, {}, method);
    })
})

/**
 * fetch 후 func를 실행하는 함수
 * jsonReceiver보다 범용적
 * @param {String} url fetch할 url
 * @param {Object} data fetch할 body 내용
 * @param {Function} func json을 입력받아 실행할 함수
 * @param {String} method 'get'이나 'post'
 */
function funcAfterFetch(url, data, func, method='post') {
    const csrftoken = csrftokenLoader();
    fetch(url, {method: method, body: data, headers: {'X-CSRFToken': csrftoken}})
    .then(func)
    .catch(error => {console.error(error);});
}

/**
 * Enter키와 shift키로 submit 조절
 * @param {Event} e 
 * @param {Boolean} needShift Defaults to false. false인 경우 엔터키로 submit하고 shift enter는 줄바꿈. true인 경우 shift enter로 submit하고 enter는 줄바꿈.
 */
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

/**
 * submitByEnter 이벤트 리스너
 * keydown 이벤트에 대한 리스너로 needShift로 shift키에 대한 조작을 조절할 수 있는 리스너
 * @param {Boolean} needShift shift key 필요 여부. Default to false.
 * @returns {Function}
 */
function submitByEnterListener(needShift=false) {
    return function(e) {submitByEnterFinal(e, needShift);}};

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

/**
 * 가나다 번호 매기기에 쓰는 숫자 to 가나다 함수
 * @param {Number} counter 
 * @returns {String | Number}
 */
function counterToKorean(counter) {
    if (counter < 15) {
        const koreanNumbers = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하'];
        return koreanNumbers[counter -1];
    } else {return counter;}
};

/**
 * element의 모든 하위 요소를 제거합니다.
 * @param {Element} element 
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
/* =====================================================================================================
========================================================================================================
==================================== ↑ 위로는 모듈 정의 구간 ↑ =========================================
========================================================================================================
===================================================================================================== */
