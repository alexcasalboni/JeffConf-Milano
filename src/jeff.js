(function (window) {

    'use strict';

    function changePage(elementID) {
        if (!document.getElementById(elementID)) {
            return;
        }
        document.title = "JeffConf Milano 2017 - " + elementID;
        window.history.pushState(null, null, "/" + elementID);
        changeArticle(elementID);
    }

    function changeArticle(elementID) {
        var sections = document.getElementById("contentBody").children;
        var i;
        for (i = 0; i < sections.length; i += 1) {
            if (sections[i].id === elementID) {
                sections[i].className = "dtc w-100";
            } else {
                sections[i].className = "dn";
            }
        }
        var links = document.getElementsByClassName("nav-link");

        for (i = 0; i < links.length; i += 1) {
            if (links[i].dataset && links[i].dataset.page === elementID) {
                links[i].style.textDecoration = 'underline';
            } else {
                links[i].style.textDecoration = null;
            }
        }
        
    }

    function pageLoad() {
        var siteMap = {
            home: true,
            agenda: true,
            speakers: true,
            venue: true,
            partners: true,
            coc: true,
            tickets: true
        };

        if (location.pathname !== "") {

            var sitePath = location.pathname.replace(/\//g, '');

            if (sitePath.length > 0 && sitePath in siteMap) {
                return changeArticle(sitePath);
            }

        }

        changeArticle('home');

    }

    function loadEventbrite() {
        var iframe = document.getElementById("eventbrite");
        if (iframe) {
            iframe.src = "//eventbrite.co.uk/tickets-external?eid=34905982734&ref=etckt";
        }
    }

    window.onpopstate = function (event) {
        if (event) {
            pageLoad();
        }
    };

    window.onload = function () {
        pageLoad();
        loadEventbrite();
    };

    window.changePage = changePage;

})(window);