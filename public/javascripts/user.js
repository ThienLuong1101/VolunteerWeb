function onfb() {
    var fbContent = document.getElementById('FBrlContent');

    fbContent.style.display = 'block';
    // fbContent.innerHTML = `
    //  <div class="fb-page" data-href="https://www.facebook.com/youxclubs.uoa" data-tabs="timeline" data-width="500" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true">
    //         <blockquote cite="https://www.facebook.com/youxclubs.uoa" class="fb-xfbml-parse-ignore">
    //             <a href="https://www.facebook.com/youxclubs.uoa">Wdc</a>
    //         </blockquote>
    //     </div>
    // `;
}
function offfb() {
    var fbContent = document.getElementById('FBrlContent');

    fbContent.style.display = 'none';

}
function showAlert() {
    // Get the alert message element
    var alertMessage = document.getElementById("alertMessage");

    // Display the alert message
    alertMessage.style.display = "block";

    // Hide the alert message after 3 seconds
    setTimeout(function () {
        alertMessage.style.display = "none";
    }, 3000);
}
window.addEventListener("scroll", function () {
    var header = document.getElementById("pageHeader");
    var navLinks = document.querySelector(".nav__links");
    var headerbg = document.querySelector(".headerbg");
    var profile = document.getElementById("appProfile");

    if (window.scrollY > 0) {
        header.style.display = "none"; // Hide the title if scrolled down
        navLinks.classList.add("scrolled");
        headerbg.classList.add('shrink');
        profile.classList.add("Scout");

    } else {
        header.style.display = "block"; // Show the title if at the top of the page
        navLinks.classList.remove("scrolled");
        headerbg.classList.remove('shrink');
        profile.classList.remove("Scout");
    }


});



fetchUrls();


let url1;

function fb(url) {
    var fbContent = document.getElementById('FBrlContent');
    fbContent.innerHTML = `
        <!-- Step 2: Place the Facebook plugin code -->
        <div class="fb-page" data-href="${url}" data-tabs="timeline" data-width="500" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true">
            <blockquote cite="${url}" class="fb-xfbml-parse-ignore">
                <a href="${url}">${url}</a>
            </blockquote>
        </div>
    `;
}

fb('https://www.facebook.com/youxclubs.uoa');
async function fetchUrls() {
    try {
        const response = await fetch('/display-urls');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const url = await response.text(); // Return response as text
        // Update DOM with the fetched URL
        document.getElementById('hello').innerText = url;
        fb(url);
        // Call other functions with the fetched URL if needed

        // otherFunction(url); // Example call to another function
    } catch (error) {
        console.error('Error fetching URL:', error);
        // Handle error gracefully here, if needed
    }
}



// url1 = document.getElementById('hello').innerText;
// document.getElementById('hello').innerText = url1;



// Call the function with the desired URL

