<?php

add_action( 'wp_ajax_live_search_from_site', 'live_search_from_site_callback' );
add_action( 'wp_ajax_nopriv_live_search_from_site', 'live_search_from_site_callback' );

function live_search_from_site_callback() {
  // Including TranslatePress translations
  add_filter('trp_force_search', '__return_true');

  if($_POST['s'] != '') {    
    $search  = $_POST['s'];

    $args = array(
      'post_type'   =>    'any',
      'post_status' =>    array('publish'),
      's'           =>    $search,
      'orderby'     =>    'date',
      'order'       =>    'DESC'
    );

    $the_query = new WP_Query($args);

    $returnobject = array();

    foreach($the_query->posts as $post) {
      $thisobj = array();
      $thisobj['full_url'] = get_the_permalink($post->ID);
      $thisobj['title'] = $post->post_title;
      $returnobject[] = $thisobj;
    }

    $response['total'] = $the_query->found_posts;
    $response['error'] = 'false';
    $response['posts'] = $returnobject;
    wp_send_json( $response );
  }
}