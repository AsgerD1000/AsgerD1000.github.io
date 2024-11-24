var option = true;
var elements = document.getElementsByClassName("explain");
var gifler = document.getElementById("gifler");
var topBar = document.getElementsByClassName("top-bar")[0];
var links = document.querySelectorAll('a');

function change() {
    if (option) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.cssText = `
        font-size: 0.77em;
        font-family:"ViaExpert", sans-serif; 
        background-color:#A01727;
        border:none;
        `;

    }
    links.forEach(function(link) {
        link.style.backgroundColor = '#ffffff';
        link.style.textDecoration = 'none';
        link.style.color = 'black';
        link.style.border = '2px solid #590D16';
        link.style.borderRadius = '5px';
        link.style.paddingLeft = '2px';
        link.style.paddingRight = '2px';
        link.style.marginTop = '5px';
    });
    document.body.style.background = "#7D2D36";
    topBar.style.backgroundColor = "#B51730";
    topBar.style.color = "#ffffff";
    topBar.style.fontFamily = "ViaExpert,sans-serif"
    option = false;
    gifler.innerHTML = "<h2 style='white-space:nowrap; font-size: clamp(1.70em, 1.75em, 1.75em);'>G I F F L A R </h2> Hader du Giffler? hvis du gør så tryk her <button onclick='change()' style='background:none; border:none; margin:0; padding:0; cursor:pointer;' class='b'><span id='ab'>👎🏿</span> <span id='bb'>👎</span></button></div>";
    }
    else {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.cssText = `
            font-size: 1em;
            font-family: 'Times New Roman', Times, serif; 
            background-color:#190E4F;
            border:black solid 3px;
            `;
    }
    links.forEach(function(link) {
        link.style.backgroundColor = '#9591ff';
        link.style.textDecoration = 'none';
        link.style.color = 'black';
        link.style.border = '2px solid';
        link.style.borderRadius = '5px';
        link.style.paddingLeft = '2px';
        link.style.paddingRight = '2px';
        link.style.marginTop = '5px';
    });
    document.body.style.background = "#272635";
    topBar.style.backgroundColor = "#A8D0DB";
    topBar.style.color = "#000000";
    topBar.style.fontFamily = "Times New Roman, Times, serif"
    option = true;
    gifler.innerHTML = "<h2 style='white-space:nowrap; font-size: clamp(1.70em, 1.75em, 1.75em);'>G I F F L A R </h2> Kan du godt lige giffler? hvis du kan så tryk lige her <button onclick='change()' style='background:none; border:none; margin:0; padding:0; cursor:pointer' class='a';><span id='aa'>👍🏿</span> <span id='ba'>👍</span></button></div>"
}
}
