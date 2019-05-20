var lunrIndex,
    $results,
    pagesIndex;

// Initialize lunrjs using our generated index file
function initLunr() {
    $.getJSON("/js/lunr/PagesIndex.json")
        .done(function (index) {
            pagesIndex = index;

            // Set up lunrjs by declaring the fields we use
            // Also provide their boost level for the ranking
            lunrIndex = lunr(function () {
                this.field("title", {
                    boost: 100
                });
                this.field("tags", {
                    boost: 50
                });
                this.field("categories", {
                    boost: 30
                });

                this.ref("href");

                this.pipeline.remove(lunr.stemmer);
                this.pipeline.remove(lunr.stopWordFilter);

                pagesIndex.forEach(function (page) {
                    this.add(page)
                }, this)
            });
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting Hugo index flie:", err);
        });
}

function initUI() {
    $results = $("#results");
    $("#search").keyup(function () {
        $results.empty();

        // Only trigger a search when 2 chars. at least have been provided
        var query = $(this).val();
        if (query.length < 2) {
            return;
        }

        var results = search(query);

        renderResults(results);
    });
}

/**
 * Trigger a search in lunr and transform the result
 *
 * @param  {String} query
 * @return {Array}  results
 */

function search(query) {
    var lower = query.toLowerCase();
    return lunrIndex.query(function (q) {
        // exact matches should have the highest boost
        q.term(lower, {usePipeline: true, boost: 150, wildcard: lunr.Query.wildcard.TRAILING})

        // prefix matches should be boosted slightly
        q.term(lower, { boost: 10, usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING })

        // finally, try a fuzzy search, without any boost
        q.term(lower, { boost: 1, usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING, editDistance: 2 })
    }).map((result) => {
        return pagesIndex.filter(function (page) {
            return page.href === result.ref;
        })[0];
    })
}

/**
 * Display the 10 first results
 *
 * @param  {Array} results to display
 */
function renderResults(results) {
    if (!results.length) {
        return;
    }

    results.slice(0, 10).forEach(function (result) {
        var $result = $('<li>', {
            class: 'list-group-item',
            text: result.title,
            onclick: `location.href='${result.href}';`
        });
        $results.append($result);
    });
}

initLunr();

$(document).ready(function () {
    initUI();
});