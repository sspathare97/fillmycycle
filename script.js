var tbl,pmarks;
function count(action){
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("count").innerHTML = this.responseText;
			}
		};
		xmlhttp.open("POST", "count.php", true);
  		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("action="+action);
}
function fetchcount(){
	count("select");
	setTimeout(fetchcount, 5000);
}
function check(){
	var marks=parseFloat(document.getElementById("ip").value);
	if(marks!="" && marks!=pmarks && marks>=20 && marks<=100) {
		if(marks%2!=0) {
			if(marks%2<1) marks=marks-marks%2;
			else marks+=(2-marks%2);
			document.getElementById("ip").value=marks;
			document.getElementById("marks").innerHTML=marks;
			$("#round").modal();
		}
		var diff=0;
		var l=[5,5,5,5,5];
		var lvl=(marks-marks%20)/20+Math.ceil(marks%20/20);
		l[0]=l[1]=l[2]=l[3]=l[4]=lvl;
		if(marks%20!=0)
			diff=20-marks%20;
		else
			diff=0;
		while(diff){
			if(diff>=6){
				l[1]--;
				diff-=6;
			}
			if(diff>=4){
				l[4]--;
				diff-=4;
			}
			if(diff>=2 && diff<=4){
				l[2]--;
				diff-=2;
			}
			if(diff>=6){
				l[0]--;
				diff-=6;
			}
			if(diff>=2){
				l[3]--;
				diff-=2;
			}
		}
		for(var i=0;i<5;i++) for(var j=1;j<6;j++)
			tbl.children[i].children[j].innerHTML="";
		var img='<img src="check.png">';
		for(var i=0;i<5;i++)
		tbl.children[i].children[6-l[i] ].innerHTML=img;
		pmarks=marks;
		count("update");
	}
	else if(marks>=20 && marks<=100){
		$('form').submit();
	}
}
$(document).ready(function(){
	$('#ip').focus();
	tbl=document.getElementById("tbl");
	fetchcount();
});