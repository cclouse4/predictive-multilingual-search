<?php
 /** Template Name: Full Page Overlay Search*/
get_header();
?>

<script>
  var ajaxURL = "<?php echo admin_url('admin-ajax.php'); ?>";
</script>

<section class="full-page-overlay-search">
  <form class="search-from-site">
    <input class="search-from-site--input" type="text" id="search_from_site__input" placeholder="Try searching here" value="">
    <input class="search-from-site--submit"type="submit" value="Search" aria-label="Submit search">
  </form>
  <div class="search-from-site--live-results"></div>
</section>

<?php get_footer(); ?>