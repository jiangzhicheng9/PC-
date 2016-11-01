//购物车
//var shopCar = document.getElementById('shopCar');
//var carDetailed = utils.getElesByClass('car-detailed', shopCar)[0];
//shopCar.onmouseover = function () {
//    carDetailed.style.display = 'block';
//}
//shopCar.onmouseout = function () {
//    carDetailed.style.display = 'none';
//}

//搜索框

var navSearch = document.getElementById('navSearch');
var input = utils.getElesByClass('search-l', navSearch)[0];
var searchR = utils.getElesByClass('search-r', navSearch)[0];
var searchWord = utils.getElesByClass('search-hot-words', navSearch)[0];
var keyWordList = utils.getElesByClass('keyword-list', navSearch)[0];

navSearch.onkeyup = navSearch.onclick = function (e) {
    //alert(navSearch);
    e = e || window.event;
    e.target = e.target || e.srcElement;
    if (e.target.getAttribute('isSearch') == "yes") {

        var val = e.target.value;
        var reg = /^\s*$/;
        if (reg.test(val)) {
            console.log(1);
            utils.css(input, 'borderColor', '#ff6700');
            utils.css(searchR, 'borderColor', '#ff6700');
            searchWord.style.display = 'block';
            keyWordList.style.display = 'none';

        }
        searchWord.style.display = 'none';
        keyWordList.style.display = 'block';
    }
}
keyWordList.onclick = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    if (e.target.tagName === 'a' && e.target.parentNode.parentNode.parentNode.className == 'keyWordList') {
        keyWordList.style.display = "none";
        input.value = e.target.innerHTML;
        return;
    }
    keyWordList.style.display = "none";
}


//主导航
var navCenter = document.getElementById('navCenter');
var navItem = utils.getElesByClass('nav-item', navCenter);
var navItemCon = utils.getElesByClass('nav-con-wrap', navCenter);
for (var i = 0; i < navItem.length; i++) {
    navItem[i].index = i;
    navItem[i].onmouseover = function () {
        for (var j = 0; j < navItemCon.length; j++) {
            navItemCon[this.index].style.display = 'block';
        }
    }
    navItem[i].onmouseout = function () {
        for (var i = 0; i < navItemCon.length; i++) {
            navItemCon[this.index].style.display = 'none';
        }
    }

}

//左侧导航
var siteCategory = document.getElementById('siteCategory');
var categoryItem = utils.getElesByClass('category-item', siteCategory);
var itemChildren = utils.getElesByClass('item-children', siteCategory);
for (var i = 0; i < categoryItem.length; i++) {
    categoryItem[i].index = i;
    categoryItem[i].onmouseover = function () {
        for (var j = 0; j < itemChildren.length; j++) {
            itemChildren[this.index].style.display = 'block';
        }
    }
    categoryItem[i].onmouseout = function () {
        for (var i = 0; i < itemChildren.length; i++) {
            itemChildren[this.index].style.display = 'none';
        }
    }

}


//小米单品

var btnLeft = document.getElementById('btnLeft'),
    btnRight = document.getElementById('btnRight'),
    carouselList = document.getElementById('carouselList'),
    boxBd = document.getElementById('boxBd');
window.clearInterval(timer1);
var timer1 = window.setInterval(function () {
    var l = utils.css(carouselList, 'left'),
        curWidth = utils.css(boxBd, 'width');
    animate(carouselList, {left: (l + curWidth) * -1}, 300);
}, 6000);
btnRight.onclick = btnR;
function btnR() {
    //var l = utils.css(carouselList, 'left'),
    //    curWidth = utils.css(boxBd, 'width');
    //carouselList.style.left = (l + curWidth) * -1 + 'px';
    animate(carouselList, {left: -1226}, 200);


};
btnLeft.onclick = btnF;
function btnF() {
    //var l = utils.css(carouselList, 'left'),
    //    curWidth = utils.css(boxBd, 'width');
    //carouselList.style.left = (l + curWidth) * -1 + 'px';
    //l > 0 ? l = 0 : null;
    animate(carouselList, {left: 0}, 200);
};


//选项卡

var tabList = document.getElementById('tabList'),
    tabLis = tabList.getElementsByTagName('li'),
    tabItem = document.getElementById('tabItem'),
    tabItems = tabItem.getElementsByTagName('ul');
for (var i = 0; i < tabLis.length; i++) {
    tabLis[i].onmouseover = function () {
        //每一个li让它自己显示并加上默认样式
        //先得到li的兄弟让其移除类名，再让自己加上特殊类名
        //让第一个items显示加上特殊类名，其他的小伙伴消失
        var siblings = utils.siblings(this);
        for (var i = 0; i < siblings.length; i++) {
            utils.removeClass(siblings[i], 'tab-active');
        }
        utils.addClass(this, 'tab-active');
        var index = utils.index(this); //当前滑过那个li的索引

        for (var i = 0; i < tabItems.length; i++) {
            utils.addClass(tabItems[i], 'hide');
            i === index ? utils.addClass(tabItems[i], 'show') : utils.removeClass(tabItems[i], 'show');
        }

    };
}


//为您推荐
var recommend = document.getElementById('recommend'),
    left = utils.getElesByClass('left', recommend)[0],
    right = utils.getElesByClass('right', recommend)[0],
    recommendList = utils.getElesByClass('xm-carousel-list', recommend)[0];
var recommendListWidth = recommendList.clientWidth;
var boxDd= document.getElementById('boxDd'),
    boxBodWidth=boxDd.clientWidth;
var stop = 0;
right.onclick = function () {
    if (boxBodWidth * stop > recommendListWidth-boxBodWidth*2) {
        return;
    }
    stop++;
    animate(recommendList, {left: -1226 * stop}, 500);

};
left.onclick = function () {
    if (boxBodWidth * stop <1226) {
        return;
    }
    stop--;
    animate(recommendList, {left: -1226 * stop}, 500);
}



