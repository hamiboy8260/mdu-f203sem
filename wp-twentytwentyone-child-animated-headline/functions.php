<?php

function enqueue_twentytwentyone_child(){
    wp_enqueue_style('twentytwentyone-child-css', get_stylesheet_directory_uri() . '/style.css', array( 'twenty-twenty-one-style' ), time());
    wp_register_script('typed-js', 'https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.5/typed.min.js');
    wp_enqueue_script('twentytwentyone-child-js', get_stylesheet_directory_uri() . '/script.js', array('typed-js'), time());
}
add_action('wp_enqueue_scripts', 'enqueue_twentytwentyone_child');