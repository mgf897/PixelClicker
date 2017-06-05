function tableCreate(rows, cols){
    var myDiv = document.getElementById("pixel");
    tbl  = document.createElement('table');
	tbl.setAttribute("id", "tbl_pixel");
    //tbl.style.width  = '100px';
    //tbl.style.border = '1px solid black';

    for(var i = 0; i < rows; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < cols; j++){
			var td = tr.insertCell();
			td.setAttribute("id","r"+i+"c"+j);
			td.setAttribute("class","content");
			td.appendChild(document.createTextNode(''));
			td.style.border = '1px solid black';
			td.style.backgroundColor = 'white';
			}
        }
    myDiv.appendChild(tbl);
}

tableCreate(8,8);
var backgrounds = ["red","orange","yellow","green","light-blue","blue","pink","purple","white"];

var table = document.getElementById("tbl_pixel");
if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function () {
            tableText(this);
        };
    }
}

function tableText(el) {
    //alert(tableCell.id);
	//document.getElementById(tableCell.id).style.backgroundColor ="red";
	el.colorIdx = el.colorIdx || 0;
    el.style.backgroundColor = backgrounds[el.colorIdx++ % backgrounds.length];
	exportJSON();
}

function exportJSON(){
	if (table != null) {
		colorMap = [];
		for (var i = 0; i < table.rows.length; i++) {
			for (var j = 0; j < table.rows[i].cells.length; j++){
				//Retrive background color
				//colorMap += table.rows[i].cells[j].style.backgroundColor;
				colorMap.push(getComputedStyle(table.rows[i].cells[j], null).getPropertyValue("background-color"));
			}
		}
		document.getElementById("pixelJSON").innerHTML = colorMap;
	}
}