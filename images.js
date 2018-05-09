var fetchurl = '';
function generateMyContainer(){
    var mycontainer = document.createElement('div');
    mycontainer.style.display = 'block';
    mycontainer.style.position = 'absolute';
    mycontainer.style.background = '#fff';
    mycontainer.style.width = '99%';
    mycontainer.style.height = '250px';
    mycontainer.style.left = '5px';
    mycontainer.style.top = '5px';
    mycontainer.style.zIndex = '99999';
    mycontainer.style.overflow = 'scroll';
    mycontainer.id = 'mycontainer';
    var close = document.createElement('span');
    close.innerText = 'X close';
    close.style.cursor = 'pointer';
    close.style.display = 'block';
    close.style.marginBottom = '30px';
    close.addEventListener('click', function(){
        document.getElementById('mycontainer').remove();
    });
    mycontainer.appendChild(close);
    document.getElementsByTagName('body')[0].appendChild(mycontainer);
}
function buildPics(pics){
    var container = document.getElementById('mycontainer');
    pics.forEach(function(picture) {
        var s = document.createElement('div');
        var im  = document.createElement('img');
        var a = document.createElement('a');
        s.style.display = 'inline-block';
        s.style.padding = '10px';
        im.src = picture;
        a.href = 'javascript:void(0);';
        a.addEventListener('click', function(){return fetch(fetchurl+im.src);});
        im.style.height = '150px';
        a.appendChild(im);
        s.appendChild(a);
        container.appendChild(s);
    })
}
function fetch(url) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "blob";
    oReq.onload = function(oEvent) {
        var blob = oReq.response;
        var name = 'image.' + extension(blob.type);
        save(blob, name);
    };
    oReq.send();
}
function save(blob, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}
function extension(type) {
    var ext = '';
    switch (type) {
        case 'image/jpeg':
            ext = 'jpg';
        break;

        case 'image/jpg':
            ext = 'jpg';
        break;

        case 'image/png':
            ext = 'png';
        break;
    }
    return ext;
}
function getPictures(website) {
    var images = [];

    switch (website) {
        case 'www.dresslily.com':
            var ims = document.querySelectorAll('.swiper-wrapper picture img');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].dataset.bigimg);
            }
        break;

        case 'www.dresslink.com':
            var ims = document.querySelectorAll('.img-list-s li');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].getAttribute('jqimg'));
            }
        break;

        case 'www.amiclubwear.com':
            var ims = document.querySelectorAll('.swiper-wrapper img');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].src);
            }
        break;

        case 'www.fashionmia.com':
            var ims = document.querySelectorAll('.preview img');
            var re = /\/\/.*jpg?/i;
            for (var i = 0 ; i < ims.length; i++ ) {
                var found = ims[i].src.match(re);
                if (found) {
                    images.push(found[0]);
                }
            }
        break;

        case 'www.chicnico.com':
            var ims = document.querySelectorAll('#product-photos img');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].src);
            }
        break;

        case 'www.cosme-de.com':
            var ims = document.querySelectorAll('.imageWrap img');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].src);
            }
        break;

        case 'www.authenticwatches.com':
            var ims = document.querySelectorAll('.magic-zoom-gallery a');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].href);
            }
        break;

        case 'www.gearbest.com':
            var ims = document.querySelectorAll('.js-goodsThumbnailItem');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].dataset.originSrc);
            }
        break;

        case 'www.zaful.com':
            var ims = document.querySelectorAll('#js-goodsGalleryThumb li');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].dataset.bigImg);
            }
        break;

        case 'www.modlily.com':
            var ims = document.querySelectorAll('.n_thumbImg_item img');
            for (var i = 0 ; i < ims.length; i++ ) {
                var l = ims[i].getAttribute('imgb');
                if (l !== null) {
                    images.push(l);
                }
            }
        break;

        case 'www.rosegal.com':
            var ims = document.querySelectorAll('#goods_thumb_content li');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].dataset.zoomimg);
            }
        break;

        case 'www.ashleystewart.com':
            var ims = document.querySelectorAll('.productthumbnail');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].dataset.zoomImage);
            }
        break;

        case 'www.shein.com':
            var ims = shein_goodsd_vue._data.goodsData.goods_imgs.detail_image;
            images = [shein_goodsd_vue._data.goodsData.goods_imgs.main_image.origin_image];
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].origin_image);
            }
        break;

        case 'www.primamoda.com.pl':
            var ims = document.querySelectorAll('.ig_lightbox2');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].href);
            }
        break;

        case 'www.kontri.pl':
            var ims = document.querySelectorAll('#productPhotos li a');
            var big_url = '';
            for (var i = 0 ; i < ims.length; i++ ) {
                big_url = ims[i].href.replace('/250/', '/big/').replace('prdcard_', '');
                images.push(big_url);
            }
        break;

        case 'www.rosewe.com':
            var ims = document.querySelectorAll('.otheImg_li img');
            var big_url = '';
            for (var i = 0 ; i < ims.length; i++ ) {
                big_url = ims[i].getAttribute('bigimg');
                if (big_url) {
                    images.push(big_url);
                }
            }
        break;

        case 'naked-zebra.com':
            var ims = document.querySelectorAll('.slide a');
            for (var i = 0 ; i < ims.length; i++ ) {
                images.push(ims[i].dataset.zoomImage);
            }
        break;

        case 'www.swarovski.com':
            var ims = document.querySelectorAll('.prod-altviews img');
            var big_url = '';
            for (var i = 0 ; i < ims.length; i++ ) {
                big_url = ims[i].dataset.elevatezoomlargeimg;
                if(big_url) {images.push(big_url);}
            }
        break;
    }

    return images;
}

var website = document.location.hostname;
var pcs  = getPictures(website);
if (pcs.length > 0) {
    if (document.getElementById('mycontainer') == null) {
        generateMyContainer();
    } else {
        document.getElementById('mycontainer').remove();
        generateMyContainer();
    }
    buildPics(pcs);
}
