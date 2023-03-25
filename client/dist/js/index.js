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
      profile = document.querySelector('.profile'),
      profileLink = document.querySelector('#profile'),
      clear = document.querySelector('.clear'),
      profileSuccess = document.querySelector('.profile__success'),
      profileShadow = document.querySelector('.shadow'),
      profileSuccessBtn = document.querySelector('.profile__success-btn'),
      profileName = document.querySelector('.profile-name'),
      profilePass = document.querySelector('#profile-pass'),
      profileBack = document.querySelector('.profile__round'),
      headerImg = document.querySelector('.advantages__header-img'),
      inputFile = document.querySelector('#file'),
    //   div2 = document.querySelector('.div-2'),
    //   b1 = document.querySelector('.b-1'),
    i1 = document.querySelector('.i-1'),
    out1 = document.querySelector('.advantages__tasks-footer-item span'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close'),
    authLogin = document.querySelector('#authLogin'),
    authPass = document.querySelector('#authPassword'),
    authBtn = document.querySelector('#logIn'),
    authForm = document.querySelector('#authForm'),
    regForm = document.querySelector('#regForm'),
    regBtn = document.querySelector('#reg'),
    regLogin = document.querySelector('#login'),
    regPass = document.querySelector('#password'),
    regPass2 = document.querySelector('#password2'),
    uploadFileBtn = document.querySelector('.profile__btn'),
    userFile = document.querySelector('.profile__header-input');

let blocks = '',
    userName = '',
    userId = '',
    userPass = '',
    userImage = '',
    num = 0,
    pimg = 0,
    pname = 0,
    ppass = 0;

if(localStorage.getItem('name')) {
    userName = localStorage.getItem('name');
    regForm.classList.remove('active');
    authForm.classList.remove('active');
    wrapper.classList.add('active');
}

function getData() {
    fetch('http://todo:80/server/server.php?data=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    .then(data => data.json())
    .then(data => {

        fetch('http://todo:80/server/server.php?userName=true', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(arr => arr.json())
        .then(arr => {
            arr.forEach(item => {
                if(userName == item['name']) {
                    userId = item['id'];
                    userImage = item['image'];
                    userPass = item['password'];

                    // console.log(userImage);
                    headerImg.src = userImage;
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
                    div1.classList.add('active');
                }
                
            });
            out1.textContent = count;
            
            blocks = document.querySelectorAll('.advantages__tasks-item');
            
            if(typeof(all) != 'undefined') {
                fetch(`http://todo:80/server/server.php?filter=true`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                })
                .then(data => data.json())
                .then(data => {
                    // console.log(data);
                    data.forEach(item => {
                        if(item['name'] == userName) {
                            all.forEach(item => {
                                item.classList.remove('advantages__tasks-footer-link-active');
                            });
                            if(item['filter'] == 1) {
                                blocks.forEach(key => {
                                    key.style.display = 'none';
                                    if (key.childNodes[3].getAttribute('data-bool') == 'false') {
                                        key.style.display = 'block';
                                    }
                                });
                                all[1].classList.add('advantages__tasks-footer-link-active');
                            } else if(item['filter'] == 2) {
                                blocks.forEach(key => {
                                    key.style.display = 'none';
                                    if (key.childNodes[3].getAttribute('data-bool') == 'true') {
                                        key.style.display = 'block';
                                    }
                                });
                                all[2].classList.add('advantages__tasks-footer-link-active');
                            } else {
                                blocks.forEach(key => {
                                    key.style.display = 'block';
                                });
                                all[0].classList.add('advantages__tasks-footer-link-active');
                            }
                        }
                    })
                })
            } else {
                console.log("undef")
            }


        
            

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
                    fetch(`http://todo:80/server/server.php?deleteId=${del}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        }
                    })
                    .then(() => {
                        
                        item.parentNode.remove();
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

                    fetch(`http://todo:80/server/server.php?updateCheck=true&id=${String(item.parentNode.getAttribute('data-id'))}&bool=${String(item.parentNode.childNodes[3].getAttribute('data-bool'))}`, {
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


            const b4 = document.querySelectorAll('.advantages__tasks-input');

            b4.forEach(item => {
                item.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        let parentDivItem = item.parentNode;
                        let childInput = parentDivItem.childNodes[1];

                        fetch(`http://todo:80/server/server.php?update=true&id=${item.parentNode.getAttribute('data-id')}&text=${childInput.value}&bool=${String(item.parentNode.childNodes[3].getAttribute('data-bool'))}`, {
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

            
        });
    }) 
    .catch(() => {
        console.log('error');
    })
}

getData();

inputFile.addEventListener('change', () => {
    pimg = 1;
    const file = userFile.files[0],
          reader = new FileReader();

    reader.addEventListener("load", () => {
        headerImg.src = reader.result;
    },false);

    if (file) {
        reader.readAsDataURL(file)
    }
});

regBtn.addEventListener('click', () => {
    if(regLogin.value != '' && regPass.value != '' && regPass.value == regPass2.value) {

        fetch('http://todo:80/server/server.php?loginGet=true', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(data => data.json())
        .then(data => {
            let c = 0;
            data.forEach(item => {
                if(item['name'] == regLogin.value) {
                    num = 0;
                    c = 1
                } else {
                    num = 1;
                }
            })

            if(num == 1 & c != 1) {
                fetch('http://todo:80/server/server.php', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    body: JSON.stringify({
                        "login": String(regLogin.value),
                        "password": String(regPass.value),
                        "filter": "0"       
                    })
                })
                .then(() => {
                    userName = regLogin.value;
                    regLogin.value = '';
                    regPass.value = '';
                    regForm.classList.remove('active');
                    wrapper.classList.add('active');
                    localStorage.setItem('name', userName);
                    getData();
                    reg.forEach(item => {
                        item.classList.remove('active-btn');
                    });
                    auth.forEach(item => {
                        item.classList.remove('active-btn');
                    })
                })
            } else {
                document.querySelector('.authorization__message').textContent = 'Пользователь с таким логином уже существует';
            }
        })
    } else {
        if(regLogin.value == '' || regPass.value == '' || regPass2.value == '') {
            document.querySelector('.authorization__message').textContent = 'Не оставляйте поля ввода пустыми';
        } else if(regPass.value != regPass2.value) {
            document.querySelector('.authorization__message').textContent = 'Пароли не совпадают';
        }
    }
    
});

authBtn.addEventListener('click', () => {
    if(authLogin.value != '' && authPass.value != '') {
        fetch('http://todo:80/server/server.php?auth=true', {
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
                    localStorage.setItem('name', userName);
                    getData();
                }
            });
            document.querySelector('.authorization__message').textContent = 'Вы ввели неправильный логин или пароль';
            authPass.value = '';
        })
    }
    
});

profileLink.addEventListener('click', () => {
    profileName.value = userName;
    profilePass.value = userPass;
    wrapper.classList.remove('active');
    profile.classList.add('active');
    menu.classList.remove('active');
});

profileName.addEventListener('keypress', (e) => {
    pname = 1;
    if(e.key == 'Enter') {
        fetch(`http://todo:80/server/server.php?updateName=true&id=${userId}&updateUserName=${String(profileName.value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(() => {
            userName = profileName.value;
            e.target.blur();
            localStorage.setItem('name', `${profileName.value}`)
            getData();
        })
    }
});

profilePass.addEventListener('keypress', (e) => {
    ppass = 1;
    if(e.key == 'Enter') {
        fetch(`http://todo:80/server/server.php?updatePass=true&userId=${userId}&updateUserPass=${String(profilePass.value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(() => {
            userPass = profilePass.value;
            e.target.blur();
            getData();
        })
    }
});

profileBack.addEventListener('click', () => {
    profile.classList.remove('active');
    wrapper.classList.add('active');
});

uploadFileBtn.addEventListener('click', () => {
    if(pimg == 1) {
        fetch('http://todo:80/server/server.php', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: JSON.stringify({
                "userId": String(userId),
                "userImg": String(headerImg.src)
            })
        })
        .then(() => {
            pimg = 0;
            getData();
            profileShadow.classList.add('active');
            profileSuccess.classList.add('active__suc');
        })
    }

    if(pname == 1) {
        fetch(`http://todo:80/server/server.php?updateName=true&id=${userId}&updateUserName=${String(profileName.value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(() => {
            pname = 0;
            userName = profileName.value;
            localStorage.setItem('name', `${userName}`)
            getData();
            profileShadow.classList.add('active');
            profileSuccess.classList.add('active__suc');
        })
    }

    if(ppass == 1) {
        fetch(`http://todo:80/server/server.php?updatePass=true&userId=${userId}&updateUserPass=${String(profilePass.value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(() => {
            ppass = 0;
            userPass = profilePass.value;
            getData();
            profileShadow.classList.add('active');
            profileSuccess.classList.add('active__suc');
        })
    }
});

profileSuccessBtn.addEventListener('click', () => {
    profileShadow.classList.remove('active');
    profileSuccess.classList.remove('active__suc');
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

            fetch(`http://todo:80/server/server.php?updateFilter=true&name=${userName}&filterId=0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(() => {
                // getData();
            });
            
        } else if (item == all[1]) {
            blocks.forEach(key => {
                key.style.display = 'none';
                if (key.childNodes[3].getAttribute('data-bool') == 'false') {
                    key.style.display = 'block';
                }
            });

            fetch(`http://todo:80/server/server.php?updateFilter=true&name=${userName}&filterId=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(() => {
                // getData();
            });
        } else {
            blocks.forEach(key => {
                key.style.display = 'none';
                if (key.childNodes[3].getAttribute('data-bool') == 'true') {
                    key.style.display = 'block';
                }
            });

            fetch(`http://todo:80/server/server.php?updateFilter=true&name=${userName}&filterId=2`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(() => {
                // getData();
            });
        }

        
    });
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
        fetch('http://todo:80/server/server.php', {
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
    fetch('http://todo:80/server/server.php?deleteAll=true', {
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
    headerImg.src = "img/Bitmap.jpg";
    authForm.classList.add('active');
    document.querySelector('.authorization__message').textContent = '';
    wrapper.classList.remove('active');
    menu.classList.remove('active');
    profile.classList.remove('active');
    localStorage.removeItem('name');
    auth.forEach(item => {
        item.classList.add('active-btn');
    })
    div1.classList.remove('active');
    out1.textContent = 0;
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



// window.addEventListener('DOMContentLoaded', () => {
//     const menu = document.querySelector('.menu'),
//           overlay = document.querySelector('.menu__overlay'),
//           elemClose = document.querySelectorAll('.menu__link');
//         //   mc = new Hammer(menu);

//     elemClose.forEach(item => {
//         item.addEventListener('click', () => {
//             hamburger.classList.remove('active');
//             menu.classList.remove('active');
//         });
//     });

//     overlay.addEventListener('click', () => {
//         hamburger.classList.remove('active');
//         menu.classList.remove('active');
//     });
// });