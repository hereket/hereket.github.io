
function goBack() {
    let BASE_WORD = "hereket";
    let BASE_SITE_URL = "https://hereket.github.io"; // TODO: get from hugo or from current page
    var referrer = document.referrer;

    if(referrer === "") {
        window.location.href = BASE_SITE_URL;
    } else {
        let url = new URL(referrer)
        if(url.origin.includes(BASE_WORD)) {
            history.back();
        } else {
            history.back();
            window.location.href = BASE_SITE_URL;
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
});
