

tabel = 0;
current = 0;
function check(idx, tbl) {
    let tal = document.getElementById('tal')
    let korrekt = document.getElementById('korrekt')
    tal.innerHTML = idx
    if (idx % tbl == 0) {
        korrekt.innerHTML = 'Korrekt svar: BUM!'
    }
    else {
        korrekt.innerHTML = "Korrekt svar: " + idx
    }
}
function start() {
    current = document.getElementById('starttal').value
    tabel = document.getElementById('tabel').value
    let tohide = document.getElementById('start');
    let toshow = document.getElementById('igang');
    tohide.style.visibility = "hidden";
    toshow.style.visibility = "visible";
    if (tabel != '' & current != '') {
    check(current, tabel);
    }
    else {
        alert(' Skriv tal ')
        location.reload()
    }
}

function next(a) {
    if (a == '+') {
        current++
    }
    else {
        current--
    }
    check(current, tabel)
}