
function goBack() {
    let BASE_WORD = "hereket";
    let BASE_SITE_URL = "https://hereket.com"; // TODO: get from conf
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
