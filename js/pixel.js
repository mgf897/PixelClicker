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
	myCell.colorIdx++;
	//myCell.colorIdx = myCell.colorIdx || 0;
    myCell.style.backgroundColor = palette[myCell.colorIdx % palette.length];
	updateJSON();
	//
}

function updateJSON(){
	if (table != null) {
		var colorIndexes = [];
		for (var i = 0; i < table.rows.length; i++) {
			for (var j = 0; j < table.rows[i].cells.length; j++){
				var colorIndex = table.rows[i].cells[j].colorIdx % palette.length;
				colorIndexes.push(colorIndex);
			}
		}
		
		var colorMap = {"palette":palette,"data":colorIndexes}
		document.getElementById("JSONdata").innerHTML = JSON.stringify(colorMap);
		//console.log(colorMap);
		
		$.ajax({
			url:"https://api.myjson.com/bins/8d1b3",
			type:"PUT",
			data:colorMap,
			contentType:"application/json; charset=utf-8",
			dataType:"json",
			success: function(data, textStatus, jqXHR){
				console.log("updated")
			}
		}); 
		
	}
}

function loadJSON(){
	
	//load data from myjson
	myjsonURL = "https://api.myjson.com/bins/8d1b3"
	webData = 0;
	
	$.get(myjsonURL, function(data, textStatus, jqXHR) {
		populateJSON(data);
	})
}

function populateJSON(webData){
	palette = webData.palette;
	var k = 0;
		for (var i = 0; i < table.rows.length; i++) {
			for (var j = 0; j < table.rows[i].cells.length; j++){
				table.rows[i].cells[j].style.backgroundColor = webData.palette[webData.data[k]];
				table.rows[i].cells[j].colorIdx = webData.data[k];
				k++;
			}
		}
	updateJSON();
}

tableCreate(8,8);
var palette = ["white","red","orange","yellow","green","lightblue","blue","pink","purple"];
var table = document.getElementById("tbl_pixel");
loadJSON();
