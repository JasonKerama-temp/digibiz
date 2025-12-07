

// var appScroll = {
//     scrollBar: function (element) {
//         return $(element).overlayScrollbars({
//             className: "os-theme-dark",
//             // resize          : "both",
//             sizeAutoCapable: true,
//             // paddingAbsolute : true,
//             autoUpdate: true,
//             scrollbars: {
//                 clickScrolling: true,
//                 visibility: "auto",
//                 autoHide: "leave",
//                 dragScrolling: true,
//                 touchSupport: true
//             },

//             callbacks: {
//                 onScroll: function (e) {
//                     var target = e.target;
//                     const targetElem = target.querySelector('.os-content');
//                     const targetParents = targetElem.parentElement.parentElement.parentElement;
//                     // //console.log(targetParents);
//                     targetParents.dispatchEvent(new CustomEvent('el_scroll', { detail: { scrollTop: target.scrollTop, scrollHeight: target.scrollHeight, offsetHeight: target.offsetHeight } }));
//                     // target.dispatchEvent(new CustomEvent('el_scroll'));
//                 },
//             }

//         }).overlayScrollbars();
//     }
// };


var lastScrollTop = 0;
var appScroll = {
    scrollBar: function (element) {
        return $(element).overlayScrollbars({
            className: "os-theme-dark",
            // resize          : "both",
            sizeAutoCapable: true,
            // paddingAbsolute : true,
            autoUpdate: true,
            scrollbars: {
                clickScrolling: true,
                visibility: "auto",
                dragScrolling: true,
                touchSupport: true
            },

            callbacks: {
                onScroll: function (e) {
                    var target = e.target;
                    // var scrollSection = target.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
                    const targetElem = target.querySelector('.os-content');
                    const targetParents = targetElem.parentElement.parentElement.parentElement;
                    if($('.activity-log-content-wrapper').is('.active')) {
                        var scrollSection = target.parentElement.parentElement.nextElementSibling;
                        // console.log('appscroll1', scrollSection);
                    } else if($('.scrollinit').is('.os-host')) {
                        var scrollSection = target.parentElement.parentElement.nextElementSibling;
                        // console.log('appscroll12', scrollSection);
                    } 
                    //  else {
                    //     var scrollSection = target.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
                    //     console.log('appscroll2',scrollSection);
                    // } 
                    // console.log(targetParents);
                    targetParents.dispatchEvent(new CustomEvent('el_scroll', { detail: { scrollTop: target.scrollTop, scrollHeight: target.scrollHeight, offsetHeight: target.offsetHeight } }));
                    // target.dispatchEvent(new CustomEvent('el_scroll'));

                    st = target.scrollTop;
                    // console.log(st);
                    if (st < lastScrollTop) {
                        // console.log('up');
                        //up
                        if(scrollSection.classList.contains('fixed-action-btn')) {
                            if ($(scrollSection).length > 0 && $(scrollSection).hasClass('hide')) {
                                $(scrollSection).addClass('slide-top').removeClass('hide');
                                setTimeout(function () {
                                    $(scrollSection).removeClass('slide-top');
                                }, 200);
                            }
                        }
                    } else {
                        //down
                        // console.log('down');
                        if(scrollSection.classList.contains('fixed-action-btn')) {
                            if ($(scrollSection).length > 0 && !$(scrollSection).hasClass('hide')) {
                                $(scrollSection).addClass('slide-bottom');
                                setTimeout(function () {
                                    // if(!$('.custom-modal-popup'))
                                    $(scrollSection).removeClass('slide-bottom');
                                    $(scrollSection).addClass('hide');
                                }, 200);
                            }
                        }

                    }
                    lastScrollTop = st;    
                },
            }

        }).overlayScrollbars();
    }
};



async function onloadEve() {
    if (document.readyState === 'complete') {
        if ($('body').attr('app') == 'feedApp') {
            if ($('.fixed-action-btn.contact-btn-group').length == 1) {
                $brodcastBtn = $('.contact-btn-group').find('ul > li[class^=brodcast-]').detach();
                $feedBtn = $('.contact-btn-group').find('ul > li[class^=feed-]').detach();
                $frwBtn = $('.contact-btn-group').find('ul > li[class^=frw-]').detach();
            }
        }

        if ($('body').attr('app') == 'conversationApp') {
            if ($('.fixed-action-btn.contact-btn-group').length == 1) {
                $brodcastBtn = $('.contact-btn-group').find('ul > li[class^=brodcast-]').detach();
                $feedBtn = $('.contact-btn-group').find('ul > li[class^=feed-]').detach();
                $frwBtn = $('.contact-btn-group').find('ul > li[class^=frw-]').detach();
            }
        }

    }
}
onloadEve();


/*************************************************
     * Long press Event Dispatch
     */
if (crossplat.device.platform == 'Android' || crossplat.device.platform == 'iOS') {
    var timestamp = null;
    var delay = 800;  // wait time for longpress
    var touchmove = false;
    document.addEventListener("touchstart", handleTouchStart, true);
    document.addEventListener("touchend", handleTouchEnd, true);
    document.addEventListener("touchmove", handleTouchMove, true);

    function handleTouchStart(evt) {
        if (!touchmove) {
            //console.log("touch start");
            var event = evt;
            timestamp = setTimeout(function () {
                event.target.dispatchEvent(new CustomEvent('longpress', { bubbles: true }));
            }, delay);
        }
    }

    function handleTouchEnd() {
        //console.log('touch end');
        //clear timeout for single click or touch
        touchmove = false;
        window.isScrolling = false;
        clearTimeout(timestamp);
    }

    function handleTouchMove() {
        touchmove = true;
    }
}

