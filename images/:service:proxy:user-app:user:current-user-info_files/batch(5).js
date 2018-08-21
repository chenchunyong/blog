try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = 'templates/search-result.soy' */
// This file was automatically generated from search-result.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.Search == 'undefined') { Confluence.Templates.Search = {}; }


Confluence.Templates.Search.searchResults = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<p id="search-results-meta" class="search-results-count" data-totalsize="', soy.$$escapeHtml(opt_data.totalSize), '">', AJS.format("Page {0} of {1}. Showing {2} results ({3} seconds)",opt_data.startIndex / opt_data.pageSize + 1,Math.ceil(opt_data.totalSize / opt_data.pageSize),opt_data.totalSize,opt_data.timeSpent / 1000), '</p><ol class="search-results" data-query="', soy.$$escapeHtml(opt_data.queryString), '">');
  var searchResultList11 = opt_data.searchResults;
  var searchResultListLen11 = searchResultList11.length;
  for (var searchResultIndex11 = 0; searchResultIndex11 < searchResultListLen11; searchResultIndex11++) {
    var searchResultData11 = searchResultList11[searchResultIndex11];
    output.append('<li>');
    Confluence.Templates.Search.searchResult(searchResultData11, output);
    output.append('</li>');
  }
  output.append('</ol>');
  return opt_sb ? '' : output.toString();
};


Confluence.Templates.Search.searchResult = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h3>');
  Confluence.Templates.Search.searchResultIcon(opt_data, output);
  output.append('<a class="search-result-link visitable" href="', soy.$$escapeHtml("/confluence" + opt_data.url), '" data-type="', soy.$$escapeHtml(opt_data.contentType), '">', opt_data.title, '</a></h3><div class="highlights">', opt_data.bodyTextHighlights, '</div><div class="search-result-meta">', (opt_data.searchResultContainer) ? '<a class="container" href="' + soy.$$escapeHtml(opt_data.searchResultContainer.url) + '" title="' + soy.$$escapeHtml("Space") + '">' + soy.$$escapeHtml(opt_data.searchResultContainer.name) + '</a>' + ((opt_data.searchResultContainer.child) ? '<span> / &#8230; / </span><a class="container" href="' + soy.$$escapeHtml(opt_data.searchResultContainer.child.url) + '" title="' + soy.$$escapeHtml("confluence-search.results.page.location") + '">' + soy.$$escapeHtml(opt_data.searchResultContainer.child.name) + '</a>' : '') : '', (opt_data.searchResultContainer && opt_data.friendlyDate) ? ' &bull; ' : '', (opt_data.friendlyDate && opt_data.contentType != 'userinfo') ? '<span class="date" title="' + soy.$$escapeHtml("Last Modified") + '">' + soy.$$escapeHtml(opt_data.friendlyDate) + '</span>' : '', '</div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Templates.Search.noSearchResults = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.queryString == null) {
    output.append(soy.$$escapeHtml("No results found. Please try one of the following suggestions:"));
  } else {
    var sanitizedSearchParam__soy67 = new soy.StringBuilder(soy.$$escapeHtml(opt_data.queryString));
    sanitizedSearchParam__soy67 = sanitizedSearchParam__soy67.toString();
    output.append(AJS.format("No results found for \x3cstrong\x3e{0}\x3c/strong\x3e. Please try one of the following suggestions:",sanitizedSearchParam__soy67));
  }
  output.append('<ul>', (opt_data.archivedResultsCount > 0) ? '<li>' + AJS.format("There were \x3cstrong\x3e{0}\x3c/strong\x3e results found in \x3cem\x3earchived spaces\x3c/em\x3e. Enable the option in advanced search tools to see these results.",opt_data.archivedResultsCount) + '</li>' : '', '<li>', AJS.format("Use more general search terms or \x3ca href\x3d\x22{0}\x22\x3econsult the online documentation\x3c/a\x3e for tips.",'https://confluence.atlassian.com/display/DOC/Confluence+Search+Syntax'), '</li><li>', "If you are filtering by space, content, last modification date or contributor, try removing or adjusting the filter", '</li></ul><ul class="search-results" data-query="', soy.$$escapeHtml(opt_data.queryString), '"></ul>');
  return opt_sb ? '' : output.toString();
};


Confluence.Templates.Search.searchError = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  Confluence.Templates.Search.searchErrorMessage({errorMessage: "Oops, something went wrong. \x3cbutton class\x3d\x22aui-button aui-button-link search-error\x22\x3eTry again\x3c/button\x3e."}, output);
  return opt_sb ? '' : output.toString();
};


Confluence.Templates.Search.searchUnauthorized = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  Confluence.Templates.Search.searchErrorMessage({errorMessage: "Your session has expired. Please reload the page to \x3cbutton class\x3d\x22aui-button aui-button-link search-error\x22\x3etry again\x3c/button\x3e."}, output);
  return opt_sb ? '' : output.toString();
};


Confluence.Templates.Search.searchErrorMessage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  aui.message.warning({titleContent: soy.$$escapeHtml("Error"), content: opt_data.errorMessage}, output);
  return opt_sb ? '' : output.toString();
};


Confluence.Templates.Search.searchResultIcon = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.contentType == 'attachment') ? '<span class="icon ' + soy.$$escapeHtml(opt_data.metadata.cssClass) + '"></span>' : '<span class="icon icon-' + soy.$$escapeHtml(opt_data.contentType) + '"></span>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = 'templates/pagination.soy' */
// This file was automatically generated from pagination.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.Pagination == 'undefined') { Confluence.Templates.Pagination = {}; }


Confluence.Templates.Pagination.pagination = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class="pagination">');
  var currentPage__soy4 = Math.floor(opt_data.startIndex / opt_data.pageSize) + 1;
  var maxPageIndex__soy5 = Math.ceil(opt_data.totalSize / opt_data.pageSize);
  var minRangePageIndex__soy6 = Math.max(currentPage__soy4 - 4, 1);
  var maxRangePageIndex__soy7 = Math.min(currentPage__soy4 + 4, maxPageIndex__soy5);
  output.append((currentPage__soy4 != 1) ? '<li><a class="pagination-prev" href="' + opt_data.url + 'startIndex=' + soy.$$escapeHtml(opt_data.startIndex - opt_data.pageSize) + '">' + soy.$$escapeHtml("Previous") + '</a></li>' : '');
  var pageInit18 = minRangePageIndex__soy6;
  var pageLimit18 = currentPage__soy4;
  for (var page18 = pageInit18; page18 < pageLimit18; page18++) {
    output.append('<li><a href="', opt_data.url, 'startIndex=', soy.$$escapeHtml((page18 - 1) * opt_data.pageSize), '">', soy.$$escapeHtml(page18), '</a></li>');
  }
  output.append('<li data-index="', soy.$$escapeHtml(currentPage__soy4), '"><strong class="pagination-curr">', soy.$$escapeHtml(currentPage__soy4), '</strong></li>');
  var pageInit32 = currentPage__soy4 + 1;
  var pageLimit32 = maxRangePageIndex__soy7 + 1;
  for (var page32 = pageInit32; page32 < pageLimit32; page32++) {
    output.append('<li><a href="', opt_data.url, 'startIndex=', soy.$$escapeHtml((page32 - 1) * opt_data.pageSize), '">', soy.$$escapeHtml(page32), '</a></li>');
  }
  output.append((currentPage__soy4 != maxRangePageIndex__soy7) ? '<li><a class="pagination-next" href="' + opt_data.url + 'startIndex=' + soy.$$escapeHtml(opt_data.startIndex + opt_data.pageSize) + '">' + soy.$$escapeHtml("Next") + '</a></li>' : '', '</ul>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = 'templates/help.soy' */
// This file was automatically generated from help.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.Help == 'undefined') { Confluence.Templates.Help = {}; }


Confluence.Templates.Help.general = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h2>', soy.$$escapeHtml("Exact phrase search"), '</h2><p>', soy.$$escapeHtml("To search for content that contains the exact phrase \x22chalk and cheese\x22:"), '</p><pre>', soy.$$escapeHtml("\x22chalk and cheese\x22"), '</pre><h2>', soy.$$escapeHtml("OR search"), '</h2><p>', soy.$$escapeHtml("To search for content that contains one of the terms, \x22chalk\x22 OR \x22cheese\x22:"), '</p><pre>', soy.$$escapeHtml("\x22chalk OR cheese\x22"), '</pre><h2>', soy.$$escapeHtml("AND search"), '</h2><p>', soy.$$escapeHtml("To search for content that contains both the terms \x22chalk\x22 AND \x22cheese\x22:"), '</p><pre>', soy.$$escapeHtml("\x22chalk AND cheese\x22"), '</pre><h2>', soy.$$escapeHtml("NOT search"), '</h2><p>', soy.$$escapeHtml("To search for content that contains \x22chalk\x22 but NOT \x22cheese\x22:"), '</p><pre>', soy.$$escapeHtml("\x22chalk NOT cheese\x22"), '</pre><h2>', soy.$$escapeHtml("Excluded term search"), '</h2><p>', soy.$$escapeHtml("Similar to the NOT search, to search for content that contains \x22chalk\x22 and \x22butter\x22 but NOT \x22cheese\x22:"), '</p><pre>', soy.$$escapeHtml("chalk butter -cheese"), '</pre><h2>', soy.$$escapeHtml("Grouping search"), '</h2><p>', soy.$$escapeHtml("To search for content that MUST contain \x22chalk\x22 but CAN contain either \x22cheese\x22 or \x22butter\x22 use the search:"), '</p><pre>', soy.$$escapeHtml("(cheese OR butter) AND chalk"), '</pre><h2>', soy.$$escapeHtml("Title search"), '</h2><p>', soy.$$escapeHtml("To search for content with \x22chalk\x22 in its title, where title is the field keyword."), '</p><pre>', soy.$$escapeHtml("title:chalk"), '</pre>');
  return opt_sb ? '' : output.toString();
};


Confluence.Templates.Help.wildcards = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h2>', soy.$$escapeHtml("Single character"), '</h2><p>', soy.$$escapeHtml("To search for \x22butter\x22 or \x22batter\x22 you can use the search:"), '</p><pre>', soy.$$escapeHtml("b?tter"), '</pre><p>', soy.$$escapeHtml("To search for \x22chicken\x22 or \x22chickpea\x22 you can use the search:"), '</p><pre>', soy.$$escapeHtml("chick*"), '</pre><p>', soy.$$escapeHtml("Wildcards can be used anywhere within a word even at the very beginning:"), '</p><pre>', soy.$$escapeHtml("*chick"), '</pre><h2>', soy.$$escapeHtml("Multiple characters"), '</h2><p>', soy.$$escapeHtml("To search for \x22chick\x22 or \x22chickpea\x22:"), '</p><pre>', soy.$$escapeHtml("c*c*"), '</pre><p>', soy.$$escapeHtml("You can also combine search characters to get the exact word. For example the search term below will return \x22chick\x22 yet not \x22chickpea\x22:"), '</p><pre>', soy.$$escapeHtml("c*c?"), '</pre>');
  return opt_sb ? '' : output.toString();
};


Confluence.Templates.Help.macros = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h2>', soy.$$escapeHtml("Searching for macros"), '</h2><p>', soy.$$escapeHtml("You can search Confluence content for anywhere a macro is used. To do this, just add macroName: to your search and append the macro name after the column. For example, search for all excerpt-include macros:"), '</p><pre>', soy.$$escapeHtml("macroName:excerpt-include*"), '</pre>');
  return opt_sb ? '' : output.toString();
};


Confluence.Templates.Help.other = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h2>', soy.$$escapeHtml("Searching for labels"), '</h2><p>', soy.$$escapeHtml("Use the labelText: prefix to search specifically for content that has a specific label."), '</p><pre>', soy.$$escapeHtml("labelText:chocolate"), '</pre><h2>', soy.$$escapeHtml("Proximity searches"), '</h2><p>', soy.$$escapeHtml("This search ensure that the two words specified must be within a certain number of words of each other to be included."), '</p><pre>', soy.$$escapeHtml("\x22octagon post\x22~1"), '</pre><p>', soy.$$escapeHtml("will return \x22Octagon blog post\x22."), '</p><h2>', soy.$$escapeHtml("Fuzzy search"), '</h2><p>', soy.$$escapeHtml("This search looks for words spelled similarly. To search for octagon, if unsure about spelling:"), '</p><pre>', soy.$$escapeHtml("octogan~"), '</pre><p>', soy.$$escapeHtml("will correctly return \x22octagon\x22."), '</p><h2>', soy.$$escapeHtml("Combined search"), '</h2><p>', soy.$$escapeHtml("You can also combine various search terms together:"), '</p><pre>', soy.$$escapeHtml("o?tag* AND past~ AND (\x22blog\x22 AND \x22post\x22)"), '</pre>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = '/js/namespace.js' */
Confluence.Search = {
    Collection: {},
    Model: {},
    View: {}
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = '/js/utils.js' */
(function ($) {
    Confluence.Search.Util = {
        getFormParams: function($form) {
            var params = {};
            $.each($form.serializeArray(), function(key, param) {

                if ( ! param.value.length) {
                    return true;
                }

                params[param.name] = param.value;
            });
            return params;
        },

        getQueryStringParams: function(url) {
            var query = $("<a />", { href: url }).prop("search");
            var regex = /[?&;]*(.*?)=([^&;]*)/g;
            var match;
            var params = {};

            if (query) {
                while (match = regex.exec(query)) {
                    params[match[1]] = decodeURIComponent(match[2]).replace(/\+/g, " ");
                }
            }

            return params;
        },

        getSearchResultsUrl: function(queryString) {
            if (_.isObject(queryString)) {
                queryString = this.serializeParams(queryString);
            }

            // remove leading question mark
            queryString = queryString.replace(/^\?/, "");

            // Remove empty params to not pollute URL.
            queryString = queryString.replace(/(&|\?)[^=]+=(?=&|$)/g, "");

            return AJS.Confluence.getContextPath() + "/dosearchsite.action?" + queryString;
        },

        serializeParams: function(data) {
            var pairs = function(obj) {
                var pairs = [];
                for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
                return pairs;
            };

            return _.map(pairs(data),function (pair) {
                return _.map(pair, encodeURIComponent).join("=");
            }).join("&");
        },

        getRemoteUsername: function() {
            return AJS.Meta.get("remote-user") || "";
        }
    };
}(AJS.$));

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = '/js/model/result.js' */
Confluence.Search.Model.Result = Backbone.Model.extend({});

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = '/js/collection/results.js' */
Confluence.Search.Collection.Results = Backbone.Collection.extend({

    // search meta data
    totalSize: null,
    timeSpent: null,
    startIndex: null,
    pageSize: null,
    uuid: null,

    model: Confluence.Search.Model.Result,

    url: AJS.Confluence.getContextPath() + '/rest/searchv3/1.0/search',

    initialize: function(options) {
        _.extend(this, options);
    },

    parse: function(response) {
        this.totalSize = response.total;
        this.timeSpent = response.timeSpent;
        this.archivedResultsCount = response.archivedResultsCount;
        this.querySuggestion = response.querySuggestion;
        this.uuid = response.uuid;
        return response.results;
    },

    search: function(params) {
        // make sure we always have a startIndex and it's a number
        params.startIndex = +params.startIndex ||  0;

        // add authenticated username to payload
        var fetchData = _.extend({}, params, {
            user: Confluence.Search.Util.getRemoteUsername(),
            sessionUuid: AJS.Meta.get("search-query-session-uuid")
        });

        var searchError = _.bind(this.trigger, this, "searchComplete searchError", this, params);
        var searchUnauthorized = _.bind(this.trigger, this, "searchComplete searchUnauthorized", this, params);

        this.fetch({
            data: fetchData,
            success: _.bind(this.trigger, this, "searchComplete searchSuccess", this, params),
            statusCode: {
                401: searchUnauthorized,
                500: searchError
            }
        });

        this.trigger("search", params);
    }
});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = '/js/view/results.js' */
Confluence.Search.View.Results = Backbone.View.extend({

    el: ".search-results-wrapper",

    events: {
        "click .pagination a": "clickPagination"
    },

    initialize: function () {
        this.searchResults = this.$(".search-results-container");
        this.pagination = this.$(".pagination-container");

        // reload handler for search error
        this.searchResults.on("click", ".search-error", function() {
            window.location.reload();
        });

        // always clean up when search returns
        this.collection.on("searchComplete", function () {
            this.stopLoading();
            this.pagination.empty();
        }, this);

        // render on success
        this.collection.bind("searchSuccess", this.render, this)

        // search error
        this.collection.on("searchError", function () {
            this.searchResults.html(Confluence.Templates.Search.searchError());
        }, this);

        // search error
        this.collection.on("searchUnauthorized", function () {
            this.searchResults.html(Confluence.Templates.Search.searchUnauthorized());
        }, this);

        this.collection.on("search", function () {
            this.startLoading();
            AJS.$("body").scrollTop(0);
        }, this);
    },

    render: function(collection, params) {
        var escapeAndHtmlHighlight = function(obj, fields) {
            var newObj = _.clone(obj); //shallow copy
            _.each(fields, function (field) {
                var orig = newObj[field];
                if (orig) {
                    var upd = AJS.escapeHtml(orig);
                    upd = upd.replace(/@@@hl@@@/g, "<strong>");
                    upd = upd.replace(/@@@endhl@@@/g, "</strong>");
                    newObj[field] = upd;
                }
            });
            return newObj;
        };

        var highlight = function(result) {
            return escapeAndHtmlHighlight(result, ["bodyTextHighlights", "title"]);
        }

        var results = {
            searchResults: _.map(collection.toJSON(), highlight),
            pageSize: collection.pageSize,
            totalSize: collection.totalSize,
            timeSpent: collection.timeSpent,
            startIndex: +params.startIndex,
            queryString: params.queryString || ""
        };

        this.searchResults.html(Confluence.Templates.Search.searchResults(results));

        if (collection.totalSize === 0) {
            this.searchResults.html(Confluence.Templates.Search.noSearchResults({
                queryString: params.queryString || "",
                archivedResultsCount: +collection.archivedResultsCount
            }));
        } else if (collection.totalSize > collection.pageSize) {
            var params = _.omit(params, "startIndex");
            this.pagination.html(Confluence.Templates.Pagination.pagination(_.extend({}, results, {
                url: Confluence.Search.Util.getSearchResultsUrl(params) + "&"
            })));
        }
    },

    startLoading: function() {
        this.$(".search-blanket").show();
        // show loading spinner if search didn't return within 600ms.
        this.loadingTimerId = setTimeout(_.bind(this.showLoadingSpinner, this), 600);
    },

    showLoadingSpinner: function() {
        var $spinnerContainer = this.$("#search-loading-spinner");

        // don't show multiple spinners
        if ($spinnerContainer.children().length > 0) {
            return;
        }

        $spinnerContainer.hide();
        Raphael.spinner("search-loading-spinner", 40, "#707070");
        $spinnerContainer.fadeIn("slow");
    },

    stopLoading: function() {
        clearTimeout(this.loadingTimerId);
        this.$(".search-blanket").fadeOut("fast");
        this.$("#search-loading-spinner").empty();
    },

    clickPagination: function(e) {
        // avoid page reload on push state enabled browsers
        if (Confluence.Search.History.pushStateSupport) {
            e.preventDefault();
            var $a = this.$(e.currentTarget);
            var params = Confluence.Search.Util.getQueryStringParams($a.attr("href"));
            this.options.history.search(params);
        }
    }
});

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = '/js/view/search.js' */
Confluence.Search.View.Search = Backbone.View.extend({
    el: "#search-form",

    events: {
        "submit": "search",
        "click .help-button": "showHelpDialog"
    },

    initialize: function() {
        this.$("#query-string").focus().val(this.$("#query-string").val());
    },

    search: function(e) {
        e.preventDefault();
        this.trigger("search");
    },

    getParams: function() {
        return _.extend(Confluence.Search.Util.getFormParams(this.$el), {startIndex: 0});
    },

    enableInputs: function() {
        this.$("input, button").prop("disabled", false);
    },

    disableInputs: function() {
        this.$("input, button").prop("disabled", true);
    },

    restoreState: function(state) {
        // Populate the form based on data from event.
        this.$("input").val(function(i, value) {
            return state[this.name] ? state[this.name] : "";
        });
    },

    showHelpDialog: function() {
        var dialog = new AJS.Dialog({
            id: "search-help-dialog",
            width: 800,
            height: 600,
            closeOnOutsideClick: true
        });

        dialog.addLink(AJS.I18n.getText("confluence-search.help.close"), function(dialog) {
            dialog.hide();
        });

        dialog.addHeader(AJS.I18n.getText("confluence-search.help.title"));
        dialog.addPanel(AJS.I18n.getText("confluence-search.help.general"), Confluence.Templates.Help.general());
        dialog.get("panel:0");
        dialog.addPanel(AJS.I18n.getText("confluence-search.help.wildcards"), Confluence.Templates.Help.wildcards());
        dialog.addPanel(AJS.I18n.getText("confluence-search.help.macros"), Confluence.Templates.Help.macros());
        dialog.addPanel(AJS.I18n.getText("confluence-search.help.other"), Confluence.Templates.Help.other());

        dialog.gotoPanel(0);
        dialog.show();
    }

});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = '/js/view/filter.js' */
(function ($) {
    Confluence.Search.View.Filter = Backbone.View.extend({
        el: "#filter-form",

        events: {
            "click .aui-nav a": "selectListFilter",
            "submit": "submit",
            "change #search-filter-by-space": "filter",
            "change input[type=checkbox]": "filter",
            "selected.autocomplete-user #autocomplete-user": "filter",
            "paste #autocomplete-user": "filter",
            "click .clear-button": "clearUserAutoComplete",
            "open.autocomplete-user-or-group #autocomplete-user": "selectFirstUser"
        },

        initialize: function() {
            _.bindAll(this, 'initialize', 'render', 'selectListFilter', 'getParams', 'submit', 'filter', 
            	'enableInputs', 'disableInputs', 'restoreState', 'getUserAutoCompleteHidden', 'cleanUpUser', 
            	'toggleUserAutocompleteClearButton', 'clearUserAutoComplete', 'selectFirstUser');
            this.$userAutoComplete = this.$("#autocomplete-user");
            this.$userAutoComplete.on("change keyup paste", this.toggleUserAutocompleteClearButton);
            this.toggleUserAutocompleteClearButton();

            // init space picker
            this.$("#search-filter-by-space").auiSelect2(Confluence.UI.Components.SpacePicker.build({
                suggestCategories: ["conf_all", "conf_favorites"]
            }));
        },

        render: function() {
            return this;
        },

        selectListFilter: function(e) {
            var $a = this.$(e.target);
            $a.parent().addClass("aui-nav-selected").siblings().removeClass("aui-nav-selected");

            this.filter();
        },

        getParams: function() {
            this.cleanUpUser();

            // get params from list filters
            var params = {};
            this.$("ul[data-key]").each(function() {
                var $this = $(this);
                var key = $this.data("key");
                var value = $this.find("li.aui-nav-selected a").data("value");

                if (key && value) {
                    params[key] = value;
                }
            });

            params = _.extend(params, Confluence.Search.Util.getFormParams(this.$el));

            // workaround for IE8 placeholder polyfill. It thinks the fake placeholder value is the actual value.
            if (this.$userAutoComplete.hasClass("placeholded")) {
                delete params[this.$userAutoComplete.attr("name")];
            }

            return params;
        },

        submit: function(e) {
            e.preventDefault();
            this.filter();
        },

        filter: function() {
            this.cleanUpUser();
            this.trigger("search");
        },

        enableInputs: function() {
        },

        disableInputs: function() {
        },

        restoreState: function(state) {
            // where
            if (!state.where) state.where = "conf_all";
            this.$("#search-filter-by-space").select2("val", AJS.escapeHtml(state.where));

            // archived
            this.$("#search-filter-include-archived").val([state.includeArchivedSpaces]);

            // contributor
            if (!state.contributor) state.contributor = "";
            this.$userAutoComplete.val(state.contributor).change();

            if (!state.contributorUsername) state.contributorUsername = "";
            this.getUserAutoCompleteHidden().val(state.contributorUsername);

            // type
            if (!state.type) state.type = "";
            this.$("ul[data-key=type]").children().removeClass("aui-nav-selected");
            this.$("ul[data-key=type]").find("a[data-value=" + state.type + "]").parent().addClass("aui-nav-selected");

            // date
            if (!state.lastModified) state.lastModified = "";
            this.$("ul[data-key=lastModified]").children().removeClass("aui-nav-selected");
            this.$("ul[data-key=lastModified]").find("a[data-value=" + state.lastModified + "]").parent().addClass("aui-nav-selected");

        },

        getUserAutoCompleteHidden: function() {
            return $(this.$userAutoComplete.data("target"));
        },

        // delete contributerUsername value when user-autocomplete is empty
        cleanUpUser: function() {
            var $input = this.$userAutoComplete;
            var $target = this.getUserAutoCompleteHidden();
            if (!$input.val()) {
                $target.val("");
            }
        },


        toggleUserAutocompleteClearButton: function() {
            var $clear = this.$(".clear-button");
            if (this.$userAutoComplete.val().length && !this.$userAutoComplete.hasClass("placeholded")) {
                $clear.removeClass("hidden");
            } else {
                $clear.addClass("hidden");
            }
        },

        clearUserAutoComplete: function() {
            this.$userAutoComplete.val("");
            this.toggleUserAutocompleteClearButton();
            this.filter();
        },

        /**
         * When we get notified that the user dropdown is opened we tell it to select the first item.
         */
        selectFirstUser: function() {
            AJS.dropDown.current.moveDown();
        }
    });
}(AJS.$));

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = '/js/history.js' */
/**
 * HTML5 History Controller. Uses pushstate when available other you get a full page refresh for search.
 *
 * @param collection
 * @constructor
 */
Confluence.Search.History = function(collection) {
    this.collection = collection;
    this.pushedOnce = false;

    AJS.$(window).on("popstate", _.bind(this.restoreState, this));
};

Confluence.Search.History.prototype = {

    search: function(params) {
        if (Confluence.Search.History.pushStateSupport) {
            window.history.pushState(params, document.title, Confluence.Search.Util.getSearchResultsUrl(params));
            this.pushedOnce = true;
            this.collection.search(params);
        } else {
            window.location.href = Confluence.Search.Util.getSearchResultsUrl(params);
        }
    },

    restoreState: function() {
        // ignore initial pop on chrome because it fires on page load.
        if (!this.pushedOnce) {
            return
        }

        var state = history.state;

        // get state after hitting back button after first ajax search (state is in the query params)
        if (_.isEmpty(state)) {
            state = Confluence.Search.Util.getQueryStringParams(window.location.href);
        }

        // fire event for consumers to restore their state according to the history
        this.trigger("restoreState", _.clone(state));
        this.collection.search(state);
    }
};

Confluence.Search.History.pushStateSupport = "pushState" in window.history;
_.extend(Confluence.Search.History.prototype, Backbone.Events);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = '/js/search-controller.js' */
/**
 * Controller that handles the synchronization between multiple search views and the underlying collection.
 *
 * If one view wants to issue a search the controller asks all search views for their search params and then tells
 * the app to search for the sum all of terms.
 *
 * Any view that is to be controlled by this class needs to implement the following "interface":
 * - Object getParams() - Returns the params for this search as key/value pairs
 * - void disableInputs() - Disables the search inputs during search
 * - void enableInputs() - Enables the search inputs after search
 * - void restoreState(Object) - Restores the state of the search controls according to the key/value pairs in Object
 *
 * @param history
 * @param collection
 * @param views
 * @constructor
 */
Confluence.Search.SearchController = function(history, collection, views) {

    /**
     * Get search params from all views and issue search.
     */
    function search() {
        var params = _.reduce(views, function (memo, view) {
            var viewParams = view.getParams();
            return _.extend(memo, viewParams);
        }, {});

        history.search(params);
    }

    // when views trigger a search event, the controller performs the search against the collection
    _.each(views, function (view) {
        view.on("search", search);
    });

    // enable/disable search input on all search views during search
    collection.on("search", function() {
        _.invoke(views, "disableInputs");
    });

    collection.on("searchComplete", function(results) {
        AJS.Meta.set("search-query-uuid", results.uuid);
    });

    collection.on("searchComplete searchError", function() {
        _.invoke(views, "enableInputs");
    });

    // delegate restoreState events to the views
    history.on("restoreState", function (state) {
        _.invoke(views, "restoreState", state);
    });
};
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = '/js/confluence-search.js' */
AJS.$(function ($) {
    AJS.I18n.get("com.atlassian.confluence.plugins.search.confluence-search");

    var collection = new Confluence.Search.Collection.Results({
        startIndex: +AJS.Meta.get("search-start-index"),
        pageSize: +AJS.Meta.get("search-page-size"),
        totalSize: +AJS.Meta.get("search-total-size")
    });

    var history = new Confluence.Search.History(collection);

    var searchView = new Confluence.Search.View.Search({ collection: collection });
    var filterView = new Confluence.Search.View.Filter({ collection: collection });
    var resultsView = new Confluence.Search.View.Results({ collection: collection, history: history });

    var searchController = new Confluence.Search.SearchController(history, collection, [searchView, filterView]);

    collection.on("search", function(params) {
        AJS.trigger("search-start", params);
    });

    collection.on("searchComplete", function() {
        AJS.trigger("search-complete");
    });
});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.search.confluence-search:confluence-search-resources', location = '/js/analytics.js' */
AJS.$(function($) {
    // Handle analytics for links.
    $(".search-results-container").on("click", ".search-result-link", function () {
        var queryParams = Confluence.Search.Util.getQueryStringParams(window.location.href);
        var startIndex = queryParams["startIndex"] || 0;
        var index = $(this).index(".search-result-link") + 1 + startIndex;

        AJS.trigger("analyticsEvent", {
            name: "search-result.v3.click",
            data: {
                position: index,
                query: $(".search-input").val() || "",
                uuid: AJS.Meta.get("search-query-uuid"),
                sessionUuid: AJS.Meta.get("search-query-session-uuid")
            }
        });
    });
});


} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


