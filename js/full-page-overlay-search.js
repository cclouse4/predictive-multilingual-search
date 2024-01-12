var full_page_search = {
  fp_search:{
    full_result: [],
    post_data: [],
    order: 'date',
    orderby: 'DESC',
    query: '',
    post_type: [],
    previous_value: '',
    watch_typing:function() {
      var thisobj = this;
      if(thisobj.query != thisobj.previous_value) {
        if(thisobj.query != '') {
          thisobj.get_live_results();
        } else {
          $('.search-from-site--live-results').html('');
        }
      }
      thisobj.previous_value = thisobj.query;
    },
    get_live_results:function() {
      var thisobj = this;

      $.ajax({
        type: 'POST',
        url: ajaxURL,
        data: {
          'action': 'live_search_from_site',
          's': thisobj.query,
        }, success: function(result) {
          thisobj.full_result = result;
          thisobj.post_data = result.posts;
          thisobj.build_live_results();
        },
        error: function() {
          alert('something went wrong here');
        }
      })
    },
    build_live_results:function() {
      var thisobj = this;
      var return_html = [];

      if(thisobj.post_data.length > 0) {
        for(var i = 0; i < thisobj.post_data.length; i++) {
          return_html.push('<a href="'+thisobj.post_data[i].full_url+'">'+thisobj.post_data[i].title+'</a>');
        }        
      }

      if(return_html.length > 0) {
        $('.search-from-site--live-results').html(return_html.join(''));
      } else {
        $('.search-from-site--live-results').html('Fresh out of posts :(');
      }
    }
  },
}
$(document).ready(function() {
  var typing_timer;
  var typing_duration = 3000;
  var typing_input = $('#search_from_site__input');
  

  typing_input.on('keyup', function() {
    
    clearTimeout(typing_timer);
    setTimeout(() => {
      full_page_search.fp_search.query = typing_input.val();
      full_page_search.fp_search.watch_typing();
    }, typing_duration);
  });

  typing_input.on('keydown', function() {
    clearTimeout(typing_timer);
  });
})
;