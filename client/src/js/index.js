// Получить json с помощью get запроса и вывести на страницу ?data=true


/*

    1. На кнопку сделать получение данных из GET запроса
    2. Добавить POST запрос(тоже кнопка с инпутом) в котором надо 
    будет ввести текст и отправить на основной адрес сервера

*/


/*

    Сделать кнопку удаления у каждого элемента
    удаление будет при помощи отправки GET запроса с параметром ?deleteId=айди

*/

/*  

    Сделать кнопку с получением общего числа элементов(объектов в массиве data),
    выводить число элементов над списком элементов

*/


/*

    Весь выводимый текст поместить в input value
    Создать кнопку у каждого элемента с надписью "Изменить", 
    отправлять её после изменения input.value(там где текст)

    Посылать POST запрос на изменение на сервак

    отправлять изменённые данные надо в JSON, в json должен быть
    id : айди
    text : текст
    update : true(просто нужно чтобы бекенд понял что обновляем данные)

*/

const div1 = document.querySelector('.advantages__tasks-header'),
      exit = document.querySelector('#exit'),
      auth = document.querySelectorAll('.authorization-btn'),
      reg = document.querySelectorAll('.registration-btn'),
      outUserName = document.querySelector('.advantages__name'),
      wrapper = document.querySelector('.advantages__wrapper'),
      regForm = document.querySelector('#regForm'),
      regBtn = document.querySelector('#reg'),
      regLogin = document.querySelector('#login'),
      regPass = document.querySelector('#password'),
      authLogin = document.querySelector('#authLogin'),
      authPass = document.querySelector('#authPassword'),
      authBtn = document.querySelector('#logIn'),
      authForm = document.querySelector('#authForm'),
      clear = document.querySelector('.clear'),
    //   div2 = document.querySelector('.div-2'),
    //   b1 = document.querySelector('.b-1'),
    i1 = document.querySelector('.i-1'),
    out1 = document.querySelector('.advantages__tasks-footer-item span'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');
let blocks = '',
    userName = '',
    userId = '';


function getData() {
    fetch('http://testajax:80/server.php?data=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    .then(data => data.json())
    .then(data => {

        fetch('http://testajax:80/server.php?userName=true', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(arr => arr.json())
        .then(arr => {
            outUserName.textContent = userName;
            arr.forEach(item => {
                if(userName == item['name']) {
                    userId = item['id'];
                }
            });

            let count = 0;
            div1.innerHTML = '';
            data.forEach(item => {

                if(item['idUser'] == userId) {
                    count += 1;
                    div1.innerHTML += `
                        <div class="advantages__tasks-item" data-id=${item['id']}>
                            <input value='${item['text']}' type="text" class="advantages__input advantages__tasks-input ${item['bool'] == 'true' ? 'advantages__tasks-input-active' : ''}">
                            <div class="advantages__round round ${item['bool'] == 'true' ? 'advantages__round-active' : ''}" data-bool="${item['bool']}"><img src="icons/Path.png" alt="path" class="advantages__tasks-img ${item['bool'] == 'true' ? 'advantages__tasks-img-active' : ''}"></div>
                            <div class="advantages__delete"><img src="icons/trash.png"></div> 
                            <br/>
                        </div>
                    `; 
                }
                
            });
            out1.textContent = count;


        
            

            /* <button class="b-4" style="width: 110px; height: 22px;">Редактировать</button>
                <button class="b-3" style="width: 70px; height: 22px;">Удалить</button> 
            */
            // if(item['bool'] == 'true') {
            //     item.classList.add('advantages__round-active');
            //     item.childNodes[0].classList.add('advantages__tasks-img-active');
            // }

            const b3 = document.querySelectorAll('.advantages__delete');
            b3.forEach(item => {
                item.addEventListener('click', () => {
                    const del = item.parentNode.getAttribute('data-id');
                    fetch(`http://testajax:80/server.php?deleteId=${del}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        }
                    })
                    .then(() => {
                        
                        item.parentNode.remove();
                        out1.textContent = blocks.length;
                        getData();
                    });
                });
            });

            const round = document.querySelectorAll('.round');
            round.forEach(item => {
                item.addEventListener('click', () => {

                    if (item.classList.contains('advantages__round-active')) {
                        item.setAttribute('data-bool', 'false');
                    } else {
                        item.setAttribute('data-bool', 'true');
                    }

                    item.classList.toggle('advantages__round-active');
                    item.childNodes[0].classList.toggle('advantages__tasks-img-active');

                    // if (item.getAttribute('data-bool') == true) {
                    //     item.setAttribute('data-bool', false);
                    // } else {
                    //     item.setAttribute('data-bool', true);
                    //     item.classList.toggle('advantages__round-active');
                    //     item.childNodes[0].classList.toggle('advantages__tasks-img-active');
                    // }

                    fetch(`http://testajax:80/server.php?updateCheck=true&id=${String(item.parentNode.getAttribute('data-id'))}&bool=${String(item.parentNode.childNodes[3].getAttribute('data-bool'))}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        }
                    })
                        .then(() => {
                            getData();
                        });
                });
            });

            blocks = document.querySelectorAll('.advantages__tasks-item');

            const b4 = document.querySelectorAll('.advantages__tasks-input');

            b4.forEach(item => {
                item.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        let parentDivItem = item.parentNode;
                        let childInput = parentDivItem.childNodes[1];

                        fetch(`http://testajax:80/server.php?update=true&id=${item.parentNode.getAttribute('data-id')}&text=${childInput.value}&bool=${String(item.parentNode.childNodes[3].getAttribute('data-bool'))}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                            }
                        })
                        .then(() => {
                            getData();
                        })
                    }
                });
            });
            const all = document.querySelectorAll('.advantages__tasks-footer-link');

            all.forEach(item => {
                item.addEventListener('click', () => {
                    all.forEach(item => {
                        item.classList.remove('advantages__tasks-footer-link-active');
                    });
                    item.classList.add('advantages__tasks-footer-link-active');
                    if (item == all[0]) {
                        blocks.forEach(key => {
                            key.style.display = 'block';
                        });
                    } else if (item == all[1]) {
                        blocks.forEach(key => {
                            key.style.display = 'none';
                            if (key.childNodes[3].getAttribute('data-bool') == 'false') {
                                key.style.display = 'block';
                            }
                        });
                    } else {
                        blocks.forEach(key => {
                            key.style.display = 'none';
                            if (key.childNodes[3].getAttribute('data-bool') == 'true') {
                                key.style.display = 'block';
                            }
                        });
                    }
                });
            });
        });
    }) 
    .catch(() => {
        console.log('error');
    })
}

getData();

regBtn.addEventListener('click', () => {
    if(regLogin.value != '' && regPass != '') {
        fetch('http://testajax:80/server.php', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: JSON.stringify({
                "login": regLogin.value,
                "password": regPass.value
            })
        }) 
        .then(() => {
            userName = regLogin.value;
            regLogin.value = '';
            regPass.value = '';
            regForm.classList.remove('active');
            wrapper.classList.add('active');
            getData();
        })
    }
    
});

authBtn.addEventListener('click', () => {
    if(authLogin.value != '' && authPass.value != '') {

        fetch('http://testajax:80/server.php?auth=true', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(data => data.json())
        .then(data => {
            data.forEach(item => {
                if(authLogin.value == item['name'] && authPass.value == item['password']) {
                    userId = item['id'];
                    userName = authLogin.value;
                    authLogin.value = '';
                    authPass.value = '';
                    authForm.classList.remove('active');
                    wrapper.classList.add('active');
                    getData();
                } else {
                    document.querySelector('.authorization__message').textContent = 'Вы ввели неправильный логин или пароль';
                }
            });
            authPass.value = '';
        })
    }
    
});

auth.forEach(item => {
    item.addEventListener('click', () => {
        reg.forEach(item => {
            item.classList.remove('active-btn');
        });
        regForm.classList.remove('active');
        auth.forEach(item => {
            item.classList.add('active-btn');
        })
        authForm.classList.add('active');
    });
});

reg.forEach(item => {
    item.addEventListener('click', () => {
        auth.forEach(item => {
            item.classList.remove('active-btn');
        });
        authForm.classList.remove('active');
        reg.forEach(item => {
            item.classList.add('active-btn');
        })
        regForm.classList.add('active');
    });
});

i1.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetch('http://testajax:80/server.php', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: JSON.stringify({
                "userId": String(userId),
                "text": String(i1.value),
                "bool": 'false'
            })
        })
            .then(() => {
                getData();
                i1.value = '';
            })
            .catch(e => console.error(e));
    }

});

clear.addEventListener('click', () => {
    fetch('http://testajax:80/server.php?deleteAll=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    .then(() => {
        getData();
    })
});

exit.addEventListener('click', () => {
    authForm.classList.add('active');
    document.querySelector('.authorization__message').textContent = '';
    wrapper.classList.remove('active');
    menu.classList.remove('active');
    auth.forEach(item => {
        item.classList.add('active-btn');
    });
});

outUserName.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.skills__ratings-counter'),
        lines = document.querySelectorAll('.skills__ratings-line span');
        
counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
          overlay = document.querySelector('.menu__overlay'),
          elemClose = document.querySelectorAll('.menu__link');
        //   mc = new Hammer(menu);

    elemClose.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    });
});