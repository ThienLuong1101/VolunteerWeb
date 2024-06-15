function gallery() {
    var xhttp = new XMLHttpRequest();
    var div = document.getElementById('ImageHome');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var response = JSON.parse(this.responseText);
                div.innerHTML = `<img src="./images/${response.uri}" alt="${response.description}">
                <p>${response.description}</p>`;
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    };
    xhttp.open('GET', 'images.json');
    xhttp.send();
}

gallery();
setInterval(gallery, 10000);
