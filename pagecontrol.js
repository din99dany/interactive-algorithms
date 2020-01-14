var theme = 2;

window.onload = function(){
    getComments();
    if ( theme == 2 )
    {
        ChangeTheam2()
    }
    else
    {
        ChangeTheam3()
    }
}


function getComments(){
    fetch("http://localhost:3000/comments")
    .then((data) => { return data.json() })
    .then((json) => displayComments(json))
}

function displayComments(data){
    let responseArea = document.getElementById('responseArea');
    for (let i = 0; i<data.length; i++)
    {
        let authorName = document.createElement('P');
        authorName.innerText = "Auhor : " + data[i]["author"];
        let commentContent = document.createElement('P');
        commentContent.innerText = "Comm: " + data[i]["comment"];
        commentContent.style.margin = "0px";
        let resp = document.createElement('DIV')
        resp.appendChild(authorName)
        resp.appendChild(commentContent);
        resp.style.border = "1px solid black";
        responseArea.appendChild(resp);
    }
    
}

function sendInformation(){
    let name = document.getElementById('name').value;
    let comment = document.getElementById('comment').value;

    fetch("http://localhost:3000", {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({author: name, comment: comment})
    }).then((data) => {
        return data.json()
    }).then((json)=>{
        if(json.Status === 'OK'){
            document.getElementById('responseArea').innerText='Information receieved';
            setTimeout(function(){ alert("Please refresh"); }, 3000);
        } else {
            document.getElementById('responseArea').innerText='\nInformation was not received';
        }
        console.log(json);
    })
}


function ChangeTheam2()
{   
    theme = 1;
    document.getElementById("footer").style.background="red";
    document.getElementById("NavBar").style.background="red";
    
    let buttons = document.getElementsByClassName("DropMenu");
    
    for ( let i = 0; i < buttons.length; ++i )
    {
        buttons[ i ].style.background = "green"
    }

    buttons = document.getElementsByClassName("DropMenu-Content");
    for ( let i = 0; i < buttons.length; ++i )
    {
        buttons[ i ].style.background = "green"
    }
}


function ChangeTheam3()
{   
    theme = 2;
    document.getElementById("footer").style.background="darkblue";
    document.getElementById("NavBar").style.background="black";
    
    let buttons = document.getElementsByClassName("DropMenu");
    
    for ( let i = 0; i < buttons.length; ++i )
    {
        buttons[ i ].style.background = "#2e2d29"
    }

    buttons = document.getElementsByClassName("DropMenu-Content");
    for ( let i = 0; i < buttons.length; ++i )
    {
        buttons[ i ].style.background = "#2e2d29"
    }
}