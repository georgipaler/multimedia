//pentru desenare cu ajutorul mouseului folosim variabila boolean 
var mousePressed = false;
//coordonate 
var lastX, lastY;
var ctx;

$(document).ready(function () {

    ctx = document.getElementById('selectedImage').getContext("2d");
    //apelam functia de desenare la apasarea mouseului 
    $('#selectedImage').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#selectedImage').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#selectedImage').mouseup(function (e) {
        mousePressed = false;
    });
    $('#selectedImage').mouseleave(function (e) {
        mousePressed = false;
    });
});

//functia de desenare in functie de cooedonate, culoare si dimensiunea creionului 
function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function clearArea() {
    //folosesc identity matrix la stergerea canvas 
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}


//crop image

 function initCrop(){
    $('.js-crop').on('click', crop);
  
};



crop = function(){
    var crop_canvas,
        left = $('#selectedImage').offset().left - $container.offset().left,
        top =  $('#selectedImage').offset().top - $container.offset().top,
        width = $('#selectedImage').width(),
        height = $('#selectedImage').height();
        
    crop_canvas = document.createElement('canvas');
    crop_canvas.width = width;
    crop_canvas.height = height;
    
    crop_canvas.getContext('2d').drawImage(image_target, left, top, width, height, 0, 0, width, height);
    window.open(crop_canvas.toDataURL("image/png"));
}

//move image
startMoving = function(e){
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    $(document).on('mousemove', moving);
    $(document).on('mouseup', endMoving);
};

endMoving = function(e){
    e.preventDefault();
    $(document).off('mouseup', endMoving);
    $(document).off('mousemove', moving);
};
