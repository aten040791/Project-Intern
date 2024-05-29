$(document).ready(function () {
    $(".read-more-btn").click(function (e) {
        e.preventDefault();
        $(this).prev(".card-text").find(".more-content").toggle();
        if ($(this).text() === "Read More") {
            $(this).text("Read Less");
        } else {
            $(this).text("Read More");
        }
    });
});