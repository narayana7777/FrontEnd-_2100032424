document.addEventListener("DOMContentLoaded", function() {
    var paragraph = document.getElementById("paragraph");
    var text = paragraph.textContent;
    var words = text.split(" ");

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word.length > 8) {
            words[i] = '<span class="highlight">' + word + '</span>';
        }
    }

    paragraph.innerHTML = words.join(" ");
});
