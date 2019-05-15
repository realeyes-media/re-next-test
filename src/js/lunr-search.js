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
                    boost: 10
                });
                this.field("tags", {
                    boost: 5
                });
                this.field("categories", {
                    boost: 3
                });
                this.field("content");

                this.ref("href");

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

function search(query) {
    return lunrIndex.search(query).map(function(result) {
      return pagesIndex.filter(function(page) {
        try {
          console.log(page)
          return page.href === result.ref;
        } catch (e) {
          console.log('whoops')
        }
      })[0];
    });
  }
  
  function renderResults(results) {
    if (!results.length) {
      return;
    }
  
    // show first ten results
    results.slice(0, 10).forEach(function (result) {
        var $result = $('<li>', {
            class: 'list-group-item',
            text: result.title,
            onclick: `location.href='${result.href}';`
        });
        $results.append($result);
    });
  }
  
  function initUI() {
    $results = $("#results");
  
    $("#search").keyup(function(){
      // empty previous results
      $results.empty();
  
      // trigger search when at least two chars provided.
      var query = $(this).val();
      if (query.length < 2) {
        return;
      }
  
      var results = search(query);
  
      renderResults(results);
    });
  }
  
  initLunr();
  
  $(document).ready(function(){
    initUI();
  });