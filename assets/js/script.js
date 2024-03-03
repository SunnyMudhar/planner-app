let container = $('.container');
let currentDay = $('#currentDay');
let today = dayjs();

$(document).ready( () => {
    setUpCanvas();
    getLocalStorage();
})

function getCurrentDate() {
    currentDay.text(dayjs().format('DD MMM YYYY [at] hh:mm:ss a'));
}

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
    createClearButton();
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

function createClearButton() {
    var btn = `
        <button type = "button" class = "btn btn-dark clear-btn">Clear All Tasks</button>
        `
    container.append(btn);
}

// func to retreive local storage
function getLocalStorage() {
    $('.hour').each( function() {
        let hour = $(this).parent().attr('id');
        if($(this).siblings('.description').val() !== null) {
            $(this).siblings('.description').val(localStorage.getItem(hour));
        }
    });
}

function btnSave() {
    let hour = $(this).parent().attr('id');
    let description = $(this).siblings('.description').val();
    localStorage.setItem(hour, description);
}

function btnClear() {
    localStorage.clear();
    location.reload();
} 

container.on('click', '.saveBtn', btnSave);
container.on('click', '.clear-btn', btnClear);

setInterval(getCurrentDate, 1000);