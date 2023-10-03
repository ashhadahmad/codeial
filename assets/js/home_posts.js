{
  // Method to  submit the form data for a new post with AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          const newPost = createNewPostDOM(data.data.post);
          $("#post-list-container").prepend(newPost);
          deletePost($(" #delete-post-btn", newPost));
        },
        error: function (error) {
          console.log("ERROR", error.responseText);
        },
      });
    });
  };

  //   Method to create a new post in DOM
  let createNewPostDOM = function (post) {
    return $(`<article id="post-${post._id}" class="card">
    <div class="card-header">
      <a href="/users/profile/${post.user.id}">
        <span><img src="/images/avatar.png" /></span>
        <div class="card-metadata">
          <div class="card-user">${post.user.name}</div>
          <div class="card-time">${post.createdAt}</div>
        </div>
      </a>
    </div>
    <div class="card-body">
      <p>${post.content}</p>
    </div>
    <div class="card-footer">
      <div class="footer-left-items">
        <a href="#" class="card-footer-item">
          <i class="ph-bold ph-heart"></i>
          Like
        </a>
        <a href="#" class="card-footer-item">
          <i class="ph-bold ph-chat-circle-text"></i>
          Comment
        </a>
      </div>
      <div class="footer-right-items post-delete-btn">
        <a href="/posts/destroy/${post._id}" id="delete-post-btn" class="card-footer-item">
          <i class="ph-bold ph-trash"></i>
          Delete
        </a>
      </div>
    </div>
    <div class="comment-box">
      <div class="comment-wrapper">
        <form action="/comments/post" method="post">
          <input
            type="text"
            name="content"
            placeholder="Comment goes here..."
            class="form-input"
            required
          />
          <input type="hidden" name="post" value="${post._id}" />
          <input type="submit" class="submit-btn" value="Comment" />
        </form>
      </div>
    </div>
  
    <div class="comments">
    </div>
  </article>
  `);
  };

  //   Method to delete a post

  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.post_id}`).remove();
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
  };

  createPost();
}
