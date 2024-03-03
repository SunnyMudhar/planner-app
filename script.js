const container = $('.container');
const currentDay = $('#currentDay');
let today = dayjs();

$(document).ready( () => {
    setUpCanvas();
})

// func to create the dates
function setUpCanvas() {
    for(var i = 9; i <= 17; i++) {

        var row = `
        <div class = "row time-block" id = "${i}">
            <div class = "hour col-lg-1 col-md-1 col-sm-1">${i}:00</div>
            <textarea class = "col-lg-10 col-md-10 col-sm-10 description ${getColor(i)}"></textarea>
            <button type = "button" class = "saveBtn col-lg-1 col-md-1 col-sm-1"><i class="fas fa-save" aria-hidden="true"></i></button>
        </div>
        `

        container.append(row);
    }
}

function getCurrentDate() {
    currentDay.text(today.format('DD MMM YYYY [at] hh:mm:ss a'));
}

function getColor(time) {
    if(time > today.format("HH")) {
        return "future";
    } else if (time < today.format("HH")) {
        return "past";
    } else {
        return "present";
    }
}

// func to retreive local storage
function getLocalStorage() {
    $('.hour').each( () => {
        let hour = $(this).parent().attr('id');
        console.log(hour);
        if($(this).siblings('.description').val() === null) {
            $(this).siblings('.description').val(localStorage.getItem(hour));
        }
    });
}

function btnClick() {
    let hour = $(this).parent().attr('id');
    let description = $(this).siblings('.description').val();
    console.log(description);
    console.log(hour);
    localStorage.setItem(hour, description);
} 

container.on('click', '.saveBtn', btnClick);
container.ready(getLocalStorage);

setInterval(getCurrentDate, 1000);