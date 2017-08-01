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
        var contentBody = document.getElementById("contentBody").children;
        var i;
        for (i = 0; i < contentBody.length; i += 1) {
            if (contentBody[i].id === elementID) {
                contentBody[i].className = "dtc w-100";
            } else {
                contentBody[i].className = "dn";
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
        document.getElementById("eventbrite").src = "//eventbrite.co.uk/tickets-external?eid=34905982734&ref=etckt";
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