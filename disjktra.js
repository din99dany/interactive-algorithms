
var n = 7;
var m = 7;
const INFI = 999999;
var matrix = [];
var alreadyGenerated = false;

function GenerateMatrix()
{
    if ( alreadyGenerated )
        return ;
    
    alreadyGenerated = true;

    var table = document.getElementById("Matrice");

    for ( var i = 0; i < n; ++i )
    {   
        matrix[ i ] = new Array( m );   
        var newRow = table.insertRow(i);
        for ( var j = 0; j < m; ++j  )
        {
            var newCell = newRow.insertCell(j);
            var newElem = document.createElement("BUTTON");
            
            newElem.setAttribute("onClick","ChnageButton("+i + "," + j+")");
            newElem.setAttribute("class","Element");
            newElem.setAttribute("id",i+"_"+j);
            newElem.innerText = "    ";
            newCell.appendChild( newElem );

            matrix[ i ][ j ] = 0;
        }
    }
}

function ChnageButton( i, j )
{
    matrix[ i ][ j ] = !matrix[ i ][ j ];
    var elem = document.getElementById(i+"_"+j);
    if ( matrix[ i ][ j ] == 1 )
    {
        elem.setAttribute("style","background-color: grey");   
    }
    else
    {
        elem.setAttribute("style","background-color:#DDDDDD;");
    }    

}

function Calculate()
{   
    var secondMatrix = [];
    for ( var i = 0; i < n; ++i )
    {
        secondMatrix[ i ] = new Array( m );
        for ( var j = 0; j < m; ++j )
        {
            if ( matrix[ i ][ j ] == 1 )
            {
                secondMatrix[ i ][ j ] = -1;
            }
            else{
                secondMatrix[ i ][ j ] = INFI;
            }
        }
    }

    var que = [];
    var xShift = [ 0, 0, -1, 1 ];
    var yShift = [ -1, 1, 0, 0 ];

    que.push([0,0]);
    secondMatrix[ 0 ][ 0 ] = 0;
    while( que.length != 0 )
    {
        var pos = que.shift();
        for ( var i = 0; i < 4; ++i )
        {
            var x = pos[ 0 ] + xShift[ i ];
            var y = pos[ 1 ] + yShift[ i ];
            if ( 0 <= x && x < n && 0 <= y && y < m  )
            {
                if ( secondMatrix[ x ][ y ] > secondMatrix[ pos[ 0 ] ][ pos[ 1 ] ] + 1 )
                {
                    secondMatrix[ x ][ y ] = secondMatrix[ pos[ 0 ] ][ pos[ 1 ] ] + 1
                    que.push([ x, y ]);
                }
            }
        }
    }

    for ( var i = 0; i < n; ++i )
    {
        for ( var j = 0; j < m; ++j )
        {   
            var elem = document.getElementById(  i + "_" + j);
            if (  0 <= secondMatrix[ i ][ j ] && secondMatrix[ i ][ j ] < INFI )
            {
                elem.innerHTML = secondMatrix[ i ][ j ];
            }
        }
    }

    Animate( secondMatrix );

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Animate( secondMatrix )
{

    for ( var k = 0; k < n * m ; ++k )
    {
        for ( var i = 0; i < n; ++i )
        {
            for ( var j = 0; j < m; ++j )
            {
                if ( secondMatrix[ i ][ j ] == k )
                {
                    document.getElementById( i + "_" + j ).setAttribute( "class", "ElementAnimated" );
                }
            }
        }
        await sleep(1000);
    }
    
    for ( var i = 0; i < n; ++i )
    {
        for ( var j = 0; j < m; ++j )
        {
            if ( secondMatrix[ i ][ j ] == k )
            {
                document.getElementById( i + "_" + j ).setAttribute( "class", "Element" );
            }

        }
    }

}

function Reset()
{
    for ( var i = 0; i < n; ++i )
    {
        for ( var j = 0; j < m; ++j )
        {   
            document.getElementById( i + "_" + j ).innerHTML = "";
            if ( matrix[ i ][ j ] )
                ChnageButton( i, j );
        }
    }
}