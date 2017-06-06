function tableCreate(rows, cols){
    var myDiv = document.getElementById("pixel");
    tbl  = document.createElement('table');
	tbl.setAttribute("id", "tbl_pixel");

    for(var i = 0; i < rows; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < cols; j++){
			var td = tr.insertCell();
			td.setAttribute("id","r"+i+"c"+j);
			td.setAttribute("class","content");
			td.appendChild(document.createTextNode(''));
			td.style.border = '1px solid black';
			td.style.backgroundColor = 'white';
			td.colorIdx = 0;
			td.onclick = function () {tableText(this);};			
			}
        }
    myDiv.appendChild(tbl);
}

function tableText(myCell) {
	myCell.colorIdx = myCell.colorIdx || 0;
    myCell.style.backgroundColor = palette[myCell.colorIdx++ % palette.length];
	updateJSON();
}

function updateJSON(){
	if (table != null) {
		var colorIndexes = [];
		for (var i = 0; i < table.rows.length; i++) {
			for (var j = 0; j < table.rows[i].cells.length; j++){
				//Retrive background color
				//colorMap += table.rows[i].cells[j].style.backgroundColor;
				//cellColor = getComputedStyle(table.rows[i].cells[j], null).getPropertyValue("background-color").replace(/[^\d,]/g, '').split(',');
				var colorIndex = table.rows[i].cells[j].colorIdx % palette.length;
				colorIndexes.push(colorIndex);
			}
		}
		
		var colorMap = {"palette":palette,"data":colorIndexes}
		document.getElementById("JSONdata").innerHTML = JSON.stringify(colorMap);
		//console.log(colorMap);
	}
}



tableCreate(8,8);
var palette = ["red","orange","yellow","green","lightblue","blue","pink","purple","white"];
var table = document.getElementById("tbl_pixel");
updateJSON();
