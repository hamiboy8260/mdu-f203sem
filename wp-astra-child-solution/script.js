document.addEventListener("DOMContentLoaded", function () {
  initScrollToTop();

  if(document.querySelector(".typed-headline")){
    initTypedJs();
  }
  if(document.querySelector("#posts")){
    fetchWPPosts();
  }
});

// ---------- smooth scroll ---------- //

function initScrollToTop() {
  document.querySelector("body").innerHTML += /*html*/`
      <a id="scrollTop" onclick="scrollToTheTop()" title="Go to top">^</a>
  `;
  window.onscroll = function () {
      scrollFunction();
  };
}

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      document.getElementById("scrollTop").style.display = "block";
  } else {
      document.getElementById("scrollTop").style.display = "none";
  }
}

function scrollToTheTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}

// ---------- typed.js ---------- //
function initTypedJs() {
    new Typed(".typed-headline", {
        strings: ["Rasmus Cederdorff.", "a Freelancer.", "a Lecturer.", "a Web Developer.", "an App Developer.", "a Web Architect.", "a Teacher."],
        typeSpeed: 75,
        loop: true,
    });
};

// ---------- fetch wp posts ---------- //

const url = "/wp-json/wp/v2/posts?_embed&categories=5";

function fetchWPPosts(){
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
  document.querySelector('#posts').innerHTML = htmlTemplate;
}

// get the featured image url
function getFeaturedImageUrl(post) {
  let imageUrl = "";
  if (post._embedded['wp:featuredmedia']) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  }
  return imageUrl;
}