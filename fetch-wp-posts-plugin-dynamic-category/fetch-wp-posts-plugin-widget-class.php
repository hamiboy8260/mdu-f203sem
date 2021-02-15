<?php
/**
 * Adds Fetch_WP_Posts_Widget widget.
 */
class Fetch_WP_Posts_Widget extends WP_Widget {
	/**
	 * Register widget with WordPress.
	 * __construct() – constructor function where you can define your widget’s parameters.
	 */
	function __construct() {
		parent::__construct(
			'fetch_wp_posts_widget', // Base ID
			esc_html__( 'Fetch WP Posts Widget', 'fwppw_domain' ), // Name
			array( 'description' => esc_html__( 'Widget to display posts', 'fwppw_domain' ), ) // Args
		);
	}

	/**
	 * Front-end display of widget.
	 * widget() – contains the output of the widget.
	 */
	public function widget( $args, $instance ) {
		echo $args['before_widget'];
		if ( ! empty( $instance['category'] ) ) {
			echo '<input type="hidden" id="wp-posts-category-id" name="categoryId" value="' . $instance['category'] . '">';
		}
		echo '<div id="wp-posts"></div>';
		echo $args['after_widget'];
	}

	/**
	 * Back-end widget form.
	 * form() – determines widget settings in the WordPress dashboard.
	 */
	public function form( $instance ) {
		$category = ! empty( $instance['category'] ) ? $instance['category'] : esc_html__( 'Category ID', 'fwppw_domain' );
		?>
		<p>
		<label for="<?php echo esc_attr( $this->get_field_id( 'category' ) ); ?>"><?php esc_attr_e( 'Category ID:', 'fwppw_domain' ); ?></label> 
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'category' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'category' ) ); ?>" type="text" value="<?php echo esc_attr( $category ); ?>">
		</p>
		<?php 
	}

	/**
	 * Sanitize widget form values as they are saved.
	 * update() – updates widget settings.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['category'] = ( ! empty( $new_instance['category'] ) ) ? sanitize_text_field( $new_instance['category'] ) : '';

		return $instance;
	}
} 