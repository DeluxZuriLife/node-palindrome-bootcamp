document.getElementbyID('submit').addeventListener('click', function letsGetIt)

function letsGetIt(){
    
    const string = document.getElementById('theWords').value

    fetch(`/api?string=${theWords}`)
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        document.getElementById('msg').textContent = data.msg
    })

}
