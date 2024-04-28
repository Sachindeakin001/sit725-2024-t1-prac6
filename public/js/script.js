
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.path + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.subTitle + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + "Hello from " + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="grey-text text-darken-4">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const submitForm = () => {
    let formData = {
        title: $('#title').val(),
        subTitle: $('#subTitle').val(),
        path: $('#path').val(),
        description: $('#description').val()
    };

    console.log(formData);

    $.ajax({
        url: '/api/card',
        type: 'POST',
        data: formData,
        success: (result) => {
            if (result.statusCode === 201) {
                alert('card post successful');
                getAllCards();
            }
        }
    });
};

function postCard(cat){
    $.ajax({
        url:'/api/card',
        type:'POST',
        data:cat,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('card added');
            }
        }
    });
}
function getAllCards(){
    $.get('/api/cards', (result) => {
        if (result.statusCode === 200) {
            addCards(result.data);
        }
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        console.error(jqXHR.responseText);
    });
}
$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    })
    // console.log("inside ready"+formData)
    // addCards(cardList);
    $('.modal').modal();
    getAllCards();
});