(function (){

  document.addEventListener("DOMContentLoaded", function () {
      if(document.querySelector("#wp-posts")){
          fetchWPPosts();
        }
    });

  // ---------- fetch wp posts ---------- //

  function fetchWPPosts(){
    const categoryID = document.querySelector("#wp-posts-category-id").value;
    console.log(categoryID);
    const url = "/wp-json/wp/v2/posts?_embed&categories="+categoryID;
    
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        appendPosts(data);
      });
  }

  // append wp posts to the DOM
  function appendPosts(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      console.log(post);
      htmlTemplate += /*html*/`
        <article>
          <div class="img-container">
            <a href="${post.link}">
              <img src="${getFeaturedImageUrl(post)}">
            </a>
          </div>
          <div class="content-container">
              <div class="content">
                <h3>${post.title.rendered}</h3>
                <p>${post.content.rendered}</p>
                <a href="${post.link}" class="elementor-button-link elementor-button elementor-size-sm" role="button">
                    Read More
                </a> 
              </div>
              
          </div>
        </article>
      `;
    }
    document.querySelector('#wp-posts').innerHTML = htmlTemplate;
  }

  // get the featured image url
  function getFeaturedImageUrl(post) {
    let imageUrl = "";
    if (post._embedded['wp:featuredmedia']) {
      imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
    }
    return imageUrl;
  }

})();