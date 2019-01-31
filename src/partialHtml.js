const partialHtmls = {
  loginForm: `<form id = 'form'  method="POST" action='/login' >
    <span>
    Name: <input name="name" type="text" id="_name">
    <button id="login" type="submit" >Login</button>
    </span>
    <br> <br>
    <p id="commentDiv"></p>
    <input type="submit" class="Submit" >
  </form>`,

  logOutForm: function(name) {
    return `<form id = 'form' action = "/logout" method="POST" >
    <span>
    Name: ${name}
    <button id="login" type="submit" >Logout</button>
    </span>
    <br> <br>
    <p id="commentDiv"></p>
  </form>
  <form>
		Comment:
    <textarea type="text" id="comment" style="width:150px; height:8"></textarea>
		<br><br>
    </form>
     <button style="background-color: aliceblue" onclick="updateComments()">Submit</button>`;
  }
};

module.exports = { partialHtmls };
