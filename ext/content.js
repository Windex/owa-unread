// owa-unread
// Shows the unread message count in your inbox for Outlook Web App
// Copyright 2015 Glen Greer

/*!
 * Tinycon - A small library for manipulating the Favicon
 * Tom Moor, http://tommoor.com
 * Copyright (c) 2015 Tom Moor
 * @license MIT Licensed
 * @version 0.6.4
 */
!function(){var a={},b=null,c=null,d=null,e=null,f={},g=window.devicePixelRatio||1,h=16*g,i={width:7,height:9,font:10*g+"px arial",colour:"#ffffff",background:"#F03D25",fallback:!0,crossOrigin:!0,abbreviate:!0},j=function(){var a=navigator.userAgent.toLowerCase();return function(b){return-1!==a.indexOf(b)}}(),k={ie:j("msie"),chrome:j("chrome"),webkit:j("chrome")||j("safari"),safari:j("safari")&&!j("chrome"),mozilla:j("mozilla")&&!j("chrome")&&!j("safari")},l=function(){for(var a=document.getElementsByTagName("link"),b=0,c=a.length;c>b;b++)if((a[b].getAttribute("rel")||"").match(/\bicon\b/))return a[b];return!1},m=function(){for(var a=document.getElementsByTagName("link"),b=document.getElementsByTagName("head")[0],c=0,d=a.length;d>c;c++){var e="undefined"!=typeof a[c];e&&(a[c].getAttribute("rel")||"").match(/\bicon\b/)&&b.removeChild(a[c])}},n=function(){if(!c||!b){var a=l();c=b=a?a.getAttribute("href"):"/favicon.ico"}return b},o=function(){return e||(e=document.createElement("canvas"),e.width=h,e.height=h),e},p=function(a){if(a){m();var b=document.createElement("link");b.type="image/x-icon",b.rel="icon",b.href=a,document.getElementsByTagName("head")[0].appendChild(b)}},q=function(a,b){if(!o().getContext||k.ie||k.safari||"force"===f.fallback)return r(a);var c=o().getContext("2d"),b=b||"#000000",e=n();d=document.createElement("img"),d.onload=function(){c.clearRect(0,0,h,h),c.drawImage(d,0,0,d.width,d.height,0,0,h,h),(a+"").length>0&&s(c,a,b),t()},!e.match(/^data/)&&f.crossOrigin&&(d.crossOrigin="anonymous"),d.src=e},r=function(a){if(f.fallback){var b=document.title;"("===b[0]&&(b=b.slice(b.indexOf(" "))),(a+"").length>0?document.title="("+a+") "+b:document.title=b}},s=function(a,b,c){"number"==typeof b&&b>99&&f.abbreviate&&(b=u(b));var d=(b+"").length-1,e=f.width*g+6*g*d,i=f.height*g,j=h-i,l=h-e-g,m=16*g,n=16*g,o=2*g;a.font=(k.webkit?"bold ":"")+f.font,a.fillStyle=f.background,a.strokeStyle=f.background,a.lineWidth=g,a.beginPath(),a.moveTo(l+o,j),a.quadraticCurveTo(l,j,l,j+o),a.lineTo(l,m-o),a.quadraticCurveTo(l,m,l+o,m),a.lineTo(n-o,m),a.quadraticCurveTo(n,m,n,m-o),a.lineTo(n,j+o),a.quadraticCurveTo(n,j,n-o,j),a.closePath(),a.fill(),a.beginPath(),a.strokeStyle="rgba(0,0,0,0.3)",a.moveTo(l+o/2,m),a.lineTo(n-o/2,m),a.stroke(),a.fillStyle=f.colour,a.textAlign="right",a.textBaseline="top",a.fillText(b,2===g?29:15,k.mozilla?7*g:6*g)},t=function(){o().getContext&&p(o().toDataURL())},u=function(a){for(var b=[["G",1e9],["M",1e6],["k",1e3]],c=0;c<b.length;++c)if(a>=b[c][1]){a=v(a/b[c][1])+b[c][0];break}return a},v=function(a,b){var c=new Number(a);return c.toFixed(b)};a.setOptions=function(a){f={};for(var b in i)f[b]=a.hasOwnProperty(b)?a[b]:i[b];return this},a.setImage=function(a){return b=a,t(),this},a.setBubble=function(a,b){return a=a||"",q(a,b),this},a.reset=function(){p(c)},a.setOptions(i),"function"==typeof define&&define.amd?define(a):"undefined"!=typeof module?module.exports=a:window.Tinycon=a}();

function poll() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1.0/me/messages/$count?$filter=IsRead%20eq%20false");
    xhr.onload = function() {
        if (this.status == 200) {
            var count = this.response;
            if (count <= 99) {
                Tinycon.setBubble(count);
            } else {
                Tinycon.setBubble("99+");                
            }
        } else {
            Tinycon.setBubble("x");
        }
    };
    xhr.send();
}

if (document.location.hash.indexOf("#path=/mail") > -1) {
    Tinycon.setBubble();
    var ico = chrome.extension.getURL("favicon.ico");
    Tinycon.setImage(ico);
    poll();
    window.setInterval(poll, 15000);
    console.log("OWA Unread Mail Count extension loaded for " + document.location.hash);
}
