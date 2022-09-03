"use strict";

const banner = document.querySelector('.banner');
const wrap = document.querySelector('.wrap');
const circles = document.querySelectorAll('.circle span');
const imgWidth = banner.offsetWidth;

wrap.innerHTML += wrap.innerHTML;
let len = wrap.children.length;
wrap.style.width = len * 100 + "vw";
wrap.style.transform = 'translateX(0px)'

let startPointX = 0;
let startLeft = 0;
let movePointX = 0;
let cn = 0;
let ln = 0;
let timer = null;

banner.addEventListener('touchstart', function (event) {
    clearInterval(timer);

    wrap.style.transition = null;
    if (cn === 0) {
        cn = len / 2;
    }

    if (cn === len - 1) {
        cn = len / 2 - 1;
    }
    wrap.style.transform = 'translateX(' + -cn * imgWidth + 'px)';

    startPointX = event.changedTouches[0].pageX;
    startLeft = parseFloat(wrap.style.transform.split('(')[1]);
});

banner.addEventListener('touchmove', function (event) {
    movePointX = event.changedTouches[0].pageX - startPointX;
    wrap.style.transform = 'translateX(' + (movePointX + startLeft) + 'px)';
});

banner.addEventListener('touchend', function (event) {
    movePointX = event.changedTouches[0].pageX - startPointX;
    let backWidth = imgWidth / 8;

    if (Math.abs(movePointX) > backWidth) {

        cn -= movePointX / Math.abs(movePointX);
    }

    wrap.style.transition = '.3s';
    wrap.style.transform = 'translateX(' + (-cn * imgWidth) + 'px)';

    let hn = cn % (len / 2);
    circles[ln].className = '';
    circles[hn].className = 'active';
    ln = hn;

    timer = setInterval(move, 3000);
});

function move() {
    cn += 1;

    wrap.style.transition = '.3s';
    wrap.style.transform = 'translateX(' + (-cn * imgWidth) + 'px)';

    wrap.addEventListener('transitionend', function (_) {
        if (cn >= len - 1) {
            cn = len / 2 - 1;
        }
        wrap.style.transition = null;
        wrap.style.transform = 'translateX(' + -cn * imgWidth + 'px)';
    });

    let hn = cn % (len / 2);
    circles[ln].className = '';
    circles[hn].className = 'active';
    ln = hn;
}

timer = setInterval(move, 3000);
