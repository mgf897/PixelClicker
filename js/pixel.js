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
    myCell.style.backgroundColor = backgrounds[myCell.colorIdx++ % backgrounds.length];
	updateJSON();
}

function updateJSON(){
	if (table != null) {
		colorMap = [];
		for (var i = 0; i < table.rows.length; i++) {
			for (var j = 0; j < table.rows[i].cells.length; j++){
				//Retrive background color
				//colorMap += table.rows[i].cells[j].style.backgroundColor;
				//cellColor = getComputedStyle(table.rows[i].cells[j], null).getPropertyValue("background-color").replace(/[^\d,]/g, '').split(',');
				colorIndex = table.rows[i].cells[j].colorIdx
				colorMap.push(" "+colorIndex);
			}
		}
		document.getElementById("JSONdata").innerHTML = colorMap;
	}
}



tableCreate(8,8);
var backgrounds = ["red","orange","yellow","green","lightblue","blue","pink","purple","white"];
var table = document.getElementById("tbl_pixel");
updateJSON();
//if (table != null) {
//    for (var i = 0; i < table.rows.length; i++) {
//        for (var j = 0; j < table.rows[i].cells.length; j++)
//			table.rows[i].cells[j].onclick = function () {
//				tableText(this);
//			};		
//    }
//}