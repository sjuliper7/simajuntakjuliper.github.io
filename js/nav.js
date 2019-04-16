document.addEventListener("DOMContentLoaded", function () {
   var elements = document.querySelectorAll(".sidenav");
   M.Sidenav.init(elements);

   loadNav();

   function loadNav() {
       var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function () {
           if(this.readyState == 4){
               if(this.status != 200) return;

               document.querySelectorAll(".topnav, .sidenav").forEach(
                   function (elm) {
                       elm.innerHTML = xhttp.responseText;
                   }
               );

               document.querySelectorAll(".sidenav a, .topnav a").forEach(
                   function (elm) {
                       elm.addEventListener("click", function () {
                           var sidenav = document.querySelector(".sidenav");
                           M.Sidenav.getInstance(sidenav).close();


                           page = event.target.getAttribute("href").substr(1);
                           loadPage(page);
                       })
                   }
               )
           }
       };

       xhttp.open("GET", "nav.html", true);
       xhttp.send();
   }

   var page = window.location.hash.substr(1);
   if(page == "")   page = "home";
   loadPage(page);
   
   function loadPage(page) {
       var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function () {
               if(this.readyState == 4){
                   var content = document.querySelector("#body-content");
                   if (this.status == 200){
                       content.innerHTML = xhttp.responseText;
                       if(page === "bundesliga"){
                           getStandings();
                       }
                       else if (page === "favorite"){
                           getFavoriteTeams();
                       }
                   }
                   else if (this.status == 404) content.innerHTML = "<p>Halaman Tidak Ditemukan</p>";
                   else content.innerHTML = "<p>Upps Halaman Tidak dapat diakses</p>";

               }
       };

       xhttp.open("GET", "pages/"+page+".html", true);
       xhttp.send();
   }

});


function getFavoriteTeams() {
    var dbData = getFavorites();
    dbData.then(function (data) {

        var timBodyHtml = '';
        data.forEach(function(team) {
            timBodyHtml +=`
            <div>
              <img src=${team.crestUrl.replace(/^http:\/\//i, 'https://')} alt="" class="responsive-img" width="220"><br>
              <a href="team.html?id=${team.id}"><b>${team.name}</b></a>
            </div><br><br>`;
        });
        document.getElementById("favoriteBody").innerHTML = timBodyHtml;
    });

}