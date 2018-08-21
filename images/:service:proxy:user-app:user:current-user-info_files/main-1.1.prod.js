var CONTEXT_PATH ="http://lujs.cn/home/data-collector";

AJS.$(window).on("beforeunload", function() {
    var pageViewTime = TimeMe.getTimeOnCurrentPageInSeconds();
    var username = AJS.$('#user-menu-link').attr("data-username");
    var pageTitle = AJS.$('#title-text > a').text();
    var pageUrl = AJS.$('#title-text > a').attr("href");
    var data = {"pageUrl":pageUrl,"pageTitle":pageTitle,"username":username,"pageViewTime":pageViewTime};
    AJS.$.ajax({
        url: CONTEXT_PATH + '/user-data/pageViewTime',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function(r) {
            console.log(r);
        }
    });
});

AJS.$(document).ready(function() {
    // add score event
    AJS.$('.pageScoreBtn').click(function () {
        var btn = AJS.$(this).attr("id");
        var username = AJS.$('#user-menu-link').attr("data-username");
        var pageTitle = AJS.$('#title-text > a').text();
        var pageUrl = AJS.$('#title-text > a').attr("href");
        var usefulScore = null;
        var uselessScore = null;
        if (btn == "usefulBtn") {
            usefulScore = 1;
        } else {
            uselessScore = 1;
        }

        var data = {
            "pageUrl": pageUrl,
            "pageTitle": pageTitle,
            "username": username,
            "usefulScore": usefulScore,
            "uselessScore": uselessScore
        };
        AJS.$.ajax({
            type: "PUT",
            async: true,
            url: CONTEXT_PATH + "/user-data/pageScore",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (btn == "usefulBtn") {
                    AJS.$('#uselessBtn').removeAttr("style");
                } else {
                    AJS.$('#usefulBtn').removeAttr("style");
                }

                AJS.$('#' + btn).css("border", "1px solid");
                AJS.$('#' + btn).css("border-color", "#ff0000");
                getPageScoreCount(pageUrl);

            },
            error: function (erromsg) {
                console.error(erromsg);
            }
        });
    });

    // 2. get current user page score
    var username = AJS.$('#user-menu-link').attr("data-username");
    var pageUrl = AJS.$('#title-text > a').attr("href");
    AJS.$.ajax({
        type: "GET",
        async: true,
        url: CONTEXT_PATH + "/user-data/pageScore?username=" + username + "&pageUrl=" + pageUrl,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (r) {
            // render
            var btn = null;
            if (null != r.usefulScore) {
                btn = "usefulBtn";
            }
            if (null != r.uselessScore) {
                btn = "uselessBtn";
            }
            if (btn != null) {
                AJS.$('#' + btn).css("border", "1px solid");
                AJS.$('#' + btn).css("border-color", "#ff0000");
            }
        },
        error: function (erromsg) {
            console.error(erromsg);
        }
    });

    // 3. get current page count score
    getPageScoreCount(pageUrl);
});

TimeMe.initialize({
    currentPageName: "index-page", // page name
    idleTimeoutInSeconds: 100 // time before user considered idle
});


function getPageScoreCount(pageUrl) {
    AJS.$.ajax({
        type:"GET",
        async:true,
        url:CONTEXT_PATH + "/user-data/countPageScore?pageUrl=" + pageUrl,
        dataType:"json",
        contentType:"application/json; charset=utf-8",
        success:function (r) {
            // render
            AJS.$('#usefulCount').text(r.usefulScore);
            AJS.$('#uselessCount').text(r.uselessScore);
        },
        error:function (erromsg) {
            console.error(erromsg);
        }
    });
}