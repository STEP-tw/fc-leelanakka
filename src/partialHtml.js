const partialHtmls = {
  loginForm: `<form id = 'form' method="POST" >
    <span>
    Name: <input name="name" type="text" id="_name">
    <button id="login" type="button" >Login</button>
    </span>
    <br> <br>
    <p id="commentDiv"></p>
    <input type="submit" class="Submit" >
  </form>`,

  logOutForm: function(name) {
    `<form id = 'form' method="POST" >
    <span>
    Name: ${name}
    <button id="login" type="button" >Logout</button>
    </span>
    <br> <br>
    <p id="commentDiv"></p>
    <input type="submit" class="Submit" >
  </form>`;
  }
};
