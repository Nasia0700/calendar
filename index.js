//переменные
let date = new Date() //текущая дата
let month = date.getMonth()  //текущая месяц
let year = date.getFullYear() //текущая год

// массив месяцев
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
let array = []
if (localStorage.getItem('array')) {
    let info = localStorage.getItem('array')
    array = JSON.parse(info)
} else {
    array = [
        [
            { name: 'name', value: 'Шашлыки' },
            { name: 'date', value: '05.08.2022' },
            { name: 'people', value: 'Фролова Елена, Мельникова Софья' },
            { name: 'description', value: '' },
        ],
        [
            { name: 'name', value: 'ДР' },
            { name: 'date', value: '23.08.2022' },
            { name: 'people', value: 'Иванов' },
            { name: 'description', value: 'НЕ ЗАБЫТЬ' },
        ],
        [
            { name: 'name', value: 'Cдача отчета' },
            { name: 'date', value: '18.09.2022' },
            { name: 'people', value: '' },
            { name: 'description', value: '' },
        ],
    ]
}



let divCalendar = document.querySelector('.calendar')
let buttonNext = document.getElementById('nextMonth')
let buttonPrev = document.getElementById('prevMonth')


let title
let discription
let classes

window.onload = function () {
    let month = date.getMonth()
    let year = date.getFullYear()

    showData(month, year)
};

// перелистывание месяцев
buttonNext.onclick = function () {
    if (month == 11) {
        month = 0
        year += 1

    } else {
        month += 1
    }
    let cal = document.getElementsByClassName('row')
    remove(cal)
    showData(month, year);

}

buttonPrev.onclick = function () {
    //debugger
    if (month == 0) {
        month = 11
        year -= 1
    } else {
        month -= 1
    }
    //debugger
    let cal = document.getElementsByClassName('row')
    remove(cal)
    //debugger
    showData(month, year);
}


// функции

//календарь
function calendar(month, year) {

    let i = 1
    let row = ''
    let k = 0
    let calc = 1
    let remainder = 1


    let firstDayOfMonth = new Date(year, month, 7).getDay() // Первый день недели в выбранном месяце
    let lastDateOfMonth = new Date(year, month + 1, 0).getDate() // Последний день выбранного месяца
    let lastDayOfLastMonth = month == 0 ? new Date(year - 1, 11, 0).getDate() : new Date(year, month, 0).getDate() // Последний день предыдущего месяца

    while (i <= lastDateOfMonth) {
        for (week = 0; week < 7; week++) {
            //debugger
            if (week == 0) {

                row = document.createElement('div')
                row.className = 'row'
                divCalendar.append(row)
            }

            if (firstDayOfMonth == 0 && week < 7 && i <= lastDateOfMonth) {
                //debugger
                cell2(i, month, year)
                let int = document.querySelectorAll('.row')[k]
                int.insertAdjacentHTML('beforeEnd', cell(i, title, discription, classes))
                i++
            }

            if (firstDayOfMonth != 0 && week < 7 && i <= lastDateOfMonth) {
                if ((lastDayOfLastMonth - firstDayOfMonth + calc) <= lastDayOfLastMonth) {
                    cell2(i, month, year)
                    let int = document.querySelectorAll('.row')[k]
                    int.insertAdjacentHTML('beforeEnd', cell(lastDayOfLastMonth - firstDayOfMonth + calc, title, discription, classes))
                    calc++
                }
                else {
                    cell2(i, month, year)
                    let int = document.querySelectorAll('.row')[k]
                    int.insertAdjacentHTML('beforeEnd', cell(i, title, discription, classes))
                    i++
                }
            }

            if (week < 6 && i > lastDateOfMonth) {
                cell2(i, month, year)
                let int = document.querySelectorAll('.row')[k]
                int.insertAdjacentHTML('beforeEnd', cell(remainder, title, discription, classes))
                remainder++
            }

        }
        k++
    }
}

function string(date, month, year) {
    let data
    let d = date.toString()
    let m = (month + 1).toString()
    let y = year.toString()
    let ar = []

    if (date < 10) {
        d = '0' + d
    }

    if (month < 10) {
        m = '0' + m
    }
    ar.push(d)
    ar.push(m)
    ar.push(y)
    return data = ar.join('.')
}


function cell2(date, month, year) {
    let data = string(date, month, year)
    for (i = 0; i < array.length; i++) {
        if (array[i][1].value == data) {
            title = array[i][0].value
            discription = array[i][2].value
            classes = 'true'
            break
        } else {
            title = ''
            discription = ''
            classes = ''
        }
    }
}

//ячейки для календаря
const cell = (date, title, discription, classes) => `
    <div class="cell ${classes}">
        <p class="heading">${date}</p>
        <p class="title">${title}</p>
        <p class="discription">${discription}</p>
    </div>
    
`
// удаление календаря
function remove(arr) {
    for (i = 4; i >= 0; i--) {
        arr[i].parentNode.removeChild(arr[i])
    }
}

//привязка календаря и месяца
function showData(month, year) {
    document.querySelector('.month-text').innerHTML = months[month] + ' ' + year
    calendar(month, year)
}

//форма

const contain = document.getElementById('container')
const tip = tooltip(contain.querySelector('[ data-el = "tooltip"]'))

// форма
const template = (t, d, dd) => `
<form class="toolp-content" action="#">
    <input class="toolp-input" name="name" type="text" placeholder="Событие" value="${t}">
    <input class="toolp-input" name="date" type="text" placeholder="День, месяц, год" value="${d}">
    <input class="toolp-input" name="people" type="text" placeholder="Имена участников" value="${p}">
    <textarea class="toolp-input" name="description" placeholder="Описание" value=""></textarea>
  <div class="buttom">
      <button type="submit" class="toolp-buttoms">Готово</button>
      <button class="toolp-buttom">Удалить</button>
   </div>

</form>
`

function tooltip(el) {
    const clear = () => el.innerHTML = ''
    return {
        show({ top, left }, t, d, p) {
            clear()
            css(el, {
                display: 'block',
                top: top + 'px',
                left: (left + 143 + 10) + 'px'
            })
            el.insertAdjacentHTML('afterbegin', template(t, d, p))
        },
        hide() {
            css(el, { display: 'none' })
        },
    }

}

function css(el, style = {}) {
    Object.assign(el.style, style)
}


// обработка клика

let selectedDiv
let form
let button = document.querySelector('.toolp-buttoms')
let input

let t = ''
let day = ''
let p = ''
/*let dd = ''*/

divCalendar.onclick = function (event) {
    let target = event.target

    if (target.tagName = 'DIV') {
        let cla = target

        if (cla.children[1].textContent != '') {
            t = cla.children[1].textContent
            day = cla.children[0].textContent
            p = cla.children[2].textContent
            /*dd = cla.children[3].textContent*/
        }
        if (cla.children[1].textContent == '') {
            t = cla.children[1].textContent
            day = cla.children[0].textContent
            p = cla.children[2].textContent

        }

        const { top, left } = target.getBoundingClientRect()
        tip.show({ top, left }, t, day, p)
        active(target)
        //debugger

        console.log(cla.classList.contains('true'));
    };

}

function active(div) {

    if (!selectedDiv) { //добавить

        selectedDiv = div
        div.classList.add('active')

        form = document.querySelector('.toolp-content')
        forms()
    }
    else {
        if (selectedDiv == div) { //убрать
            tip.hide()
            selectedDiv.classList.remove('active')
        }
        if (selectedDiv && selectedDiv != div) { //поменять
            selectedDiv.classList.remove('active')
            selectedDiv = div
            div.classList.add('active')

            input = document.querySelectorAll('.toolp-input')
            form = document.querySelector('.toolp-content')
            forms()
        }
    }

}

function forms() {
    if (form) {

        $(form).submit(function (event) {
            let ar = ($(this).serializeArray());
            array.push(ar)
            event.preventDefault();
            tip.hide()
            let cal = document.getElementsByClassName('row')
            remove(cal)
            showData(month, year)

            localStorage.clear()
            localStorage.setItem('array', JSON.stringify(array))
        });


    }
}

//поле поиска

$(".search").on("keyup", function () {
    var val = $(this).val().toLowerCase();
    for (i = 0; i < array.length; i++) {
        let dbinfo
        for (k = 0; k < 4; k++) {
            //debugger

            let info = (array[i][k].value).toLowerCase();
            if (info.includes(val) && dbinfo != array[i]) {
                dbinfo = array[i]
                console.log(array[i])
                let searchTitle = array[i][0].value
                let searchDate = array[i][1].value
                search(searchTitle, searchDate)
            }
        }
    }
});

function search(searchTitle, searchDate) {
    let search = document.querySelector('.search-list')
    search.insertAdjacentHTML('beforeEnd', searchList(searchTitle, searchDate))
    search.style.display = 'block'

}

const searchList = (searchTitle, searchDate) => `
    <div class="search-div">
        <p class="search-title">${searchTitle}</p>
        <p class="search-date">${searchDate}</p>
    </div>
`

// доп окно
let buttonDop = document.querySelector('.button-dop')
let dop = document.querySelector('.dop')
let dopButtonSubmit = document.querySelector('.dop-button-submit')
let dopInfo = document.querySelector('.dop-info')

buttonDop.onclick = function () {
    dop.style.display = 'flex'
}

dopButtonSubmit.onclick = function () {
    let arInfo = []
    let info = dopInfo.value.split(',')

    for (i = 0; i < 4; i++) {
        //debugger
        if (info[i]) {
            //debugger
            if (i == 0) {
                let obj = new Object
                obj.name = 'name'
                obj.value = info[i]
                arInfo.push(obj)
            }
            if (i == 1) {
                let obj = new Object
                obj.name = 'date'
                obj.value = info[i].trim()
                arInfo.push(obj)
            }
            if (i == 2) {
                let obj = new Object
                obj.name = 'people'
                obj.value = info[i].trim()
                arInfo.push(obj)
            }
            if (i == 3) {
                let obj = new Object
                obj.name = 'description'
                if (info[i] == undefined) {
                    obj.value = ''
                    arInfo.push(obj)
                }
                obj.value = info[i].trim()
                arInfo.push(obj)
            }

        } else {
            if (i == 2 && info[i] == undefined) {
                let obj = new Object
                obj.name = 'people'
                obj.value = ''
                arInfo.push(obj)
            }
            if (i == 3 && info[i] == undefined) {
                let obj = new Object
                obj.name = 'description'
                obj.value = ''
                arInfo.push(obj)
            }
        }
    }
    array.push(arInfo)
    dop.style.display = 'none'

    let cal = document.getElementsByClassName('row')
    remove(cal)
    showData(month, year)

    localStorage.clear()
    localStorage.setItem('array', JSON.stringify(array))
}