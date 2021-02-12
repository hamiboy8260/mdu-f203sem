<?php
/*
Plugin Name: Fetch WP Posts Plugin
Plugin URI: https://cederdorff.com
Description: Display WP Posts
Version: 1.0.0
Author: Rasmus Cederdorff
Author URI: https://cederdorff.com
*/

// Load Class
require_once(plugin_dir_path(__FILE__).'/fetch-wp-posts-plugin-widget-class.php');

// Register Widget Plugin
function register_fetch_wp_posts(){
    wp_enqueue_script('wp-plugin-script', plugin_dir_url( __FILE__ ). '/script.js');
    wp_enqueue_style( 'wp-plugin-css',  plugin_dir_url( __FILE__ ) . '/style.css');  
    register_widget('Fetch_WP_Posts_Widget');
}

// Hook in function
add_action('widgets_init', 'register_fetch_wp_posts');