
var banner = document.getElementById("banner");
var bannerInner = utils.getElesByClass("bannerInner", banner)[0];
var imgs = banner.getElementsByTagName("img");
var focusList = utils.getElesByClass("focusList", banner)[0];
var lis = banner.getElementsByTagName("li");
var leftBtn = utils.getElesByClass("left", banner)[0];
var rightBtn = utils.getElesByClass("right", banner)[0];
(function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "data/data1lunbo.txt?_=" + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            window.data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
})();
console.log(data);
(function bindData() {
    var str = '';
    var liStr = '';
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        str += '<div><img src="" realSrc="' + cur.src + '"></div>';
        liStr += i == 0 ? '<li class="current"></li>' : '<li></li>'
    }
    bannerInner.innerHTML = str;
    focusList.innerHTML = liStr;
})();

function allImgLoad() {
    for (var i = 0; i < imgs.length; i++) {
        if (i == 0) {
            utils.css(imgs[i].parentNode, "zIndex", 1);
            animate(imgs[i].parentNode, {opacity: 1}, 500)
        }
        ;
        (function (i) {
            var curImg = imgs[i];
            var oImg = new Image;
            oImg.src = curImg.getAttribute('realSrc');
            oImg.onload = function () {
                curImg.src = oImg.src;
                curImg.style.display = "block";
            }
        })(i);
    }

}
window.setTimeout(allImgLoad, 500);
var step = 0;
var timer = window.setInterval(autoMove, 2000);
function autoMove() {
    if (step == data.length - 1) {
        step = -1;
    }
    step++;
    setBanner();
}
function setBanner() {
    for (var i = 0; i < imgs.length; i++) {
        if (i == step) {
            utils.css(imgs[i].parentNode, "zIndex", 1);
            animate(imgs[i].parentNode, {opacity: 1}, 500, function () {
                var siblings = utils.siblings(this);
                for (var i = 0; i < siblings.length; i++) {
                    utils.css(siblings[i], "opacity", 0);
                }
            })
        } else {
            utils.css(imgs[i].parentNode, "zIndex", 0);
        }
    }
    ;
    for (var i = 0; i < lis.length; i++) {
        if (i == step) {
            lis[i].className = "current";
        } else {
            lis[i].className = "";
        }
        //lis[i].className = i == step ? "current" : "";
    }
}
banner.onmouseover = function () {
    clearInterval(timer);
    leftBtn.style.display = rightBtn.style.display = "block";
};
banner.onmouseout = function () {
    timer = window.setInterval(autoMove, 2000);
    leftBtn.style.display = rightBtn.style.display = "none";
};
rightBtn.onclick = autoMove;
leftBtn.onclick = function () {
    step--;
    if (step == -1) {
        step = data.length - 1;
    }
    setBanner();
}
;
(function bindFocusList() {
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function () {
            step = this.index;
            setBanner();
        }
    }


})();

