var base_url = "https://api.football-data.org/v2/";
var league_id = "2002";
var api_key = "f33c0c44d7d4492fa7128f2f44d512b7";

var team;
var dbPromise;

function status(response) {
    if(response.status !== 200){
        console.log("Error : "+response.status);
        return Promise.reject(new Error(response.statusText));
    }else{
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : "+error);
}

function getStandings() {
    if ('caches' in window) {
        caches.match(base_url + 'competitions/' + league_id +'/standings',{
            method: "GET",
            mode: "cors",
            headers: {
                "X-Auth-Token": api_key,
            }
        })
            .then(function(response) {
            if (response) {
                response.json().then(function (data) {
                    showStandings(data)
                })
            }
        })
    }


    fetch(base_url + 'competitions/' + league_id +'/standings',{
        method: "GET",
        mode: "cors",
        headers: {
            "X-Auth-Token": api_key,
        }
    })
        .then(function (response) {
            if (response.status !== 200) {
                console.log('Error : ' + response.status);
                return;
            }
            response.json().then(function (data) {
                showStandings(data)
            });

        }).catch(error);
}

function showStandings(data){
    var html = '';
    console.log(data)
    data.standings[0].table.forEach(function(dt) {
        html += `
                <td>${dt.position}</td>
                <td><a href="team.html?id=${dt.team.id}">${dt.team.name}</a></td>
                <td>${dt.playedGames}</td>
                <td>${dt.won}</td>
                <td>${dt.draw}</td>
                <td>${dt.lost}</td>
                <td><b>${dt.points}</b></td>
              </tr>
          `;
    });
    document.getElementById("standings").innerHTML = html;
}

function getTeamById(){
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    fetch(base_url + "teams/" + idParam, {
        method: "GET",
        mode: "cors",
        headers: {
            "X-Auth-Token": api_key,
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            team = data;
            var teamBody = '';

            teamBody += `<img src=${data.crestUrl.replace(/^http:\/\//i, 'https://')} align="center" width="150" height="150" class="responsive-img center"><br>
                  <h5>${data.name}</h5>
                  <center>
                  <button onclick="addToFavorite()" id="add" class="waves-effect waves-light btn-small">Add Favorite</button> 
                   <button onclick="deleteFromFavorite()" id="remove" class="btn red waves-effect waves-light">Delete Favorite</button>
                  </center>
                  <br>
                <br> `;

            teamBody += `<table class="responsive-table highlight" width=500>
                            <thead class="indigo lighten-4">
                              <tr>
                                <td>Name</td>
                                <td>Position</td>
                                <td>Nationality</td>
                              </tr>
                            </thead>
                            <tbody>`;

            data.squad.forEach(function(dt) {
                teamBody += `
              <tr>
                <td>${dt.name}</td>
                <td>${dt.position}</td>
                <td>${dt.nationality}</td>
              </tr>
          `;
            });

            teamBody += `</tbody></table>`;

            document.getElementById("body-content").innerHTML = teamBody;

            let btnAdd = document.getElementById("add");
            let btnRem = document.getElementById("remove");

            checkData(data.id).then((msg) => {
                // console.log(msg);
                btnAdd.style.display = "none";
                btnRem.style.display = "block";
            }).catch((msg) => {
                btnAdd.style.display = "block";
                btnRem.style.display = "none";
            });

        })
}

function addToFavorite() {
    addFavorite(team);
    document.getElementById("add").style.display = "none";
    document.getElementById("remove").style.display = "block";
}

function deleteFromFavorite() {
   deleteFavorite(team);
   document.getElementById("add").style.display = "block";
   document.getElementById("remove").style.display = "none";
}