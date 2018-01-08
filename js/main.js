// ---------------------- Modal --------------------------------
	// set the image to the carousel
function setImage(imageSrc, objectId, counter, imagesPath) {
	// check if image exists
	var img = new Image();
	img.onload = function(){
		// Calls the function as long as image path exists and store in array
	 	imageSrc = "assets/images/" + objectId + counter + ".jpg";
	   	counter++;
	   	imagesPath.push(imageSrc);
	   	setImage("assets/images/" + objectId + counter + ".jpg", objectId ,counter, imagesPath);
	}; 
	img.onerror = function(){
		// setting the image to the carousel
		for(var i = 0; i < imagesPath.length; i++){
			var div = document.createElement("div");
			var li = document.createElement("li");
			li.setAttribute("data-target", "#myCarousel");
			li.setAttribute("data-slide-to", i);
			div.className = "item";
			if(i == 0){
				div.className = "item active";
				li.className = "active";
			}
			var carouselImage = new Image();
			carouselImage.src = imagesPath[i];
			div.appendChild(carouselImage);
			carouselInner.appendChild(div);
			carouselIndicators.appendChild(li);
		}
	   	return;
	};
	img.src = imageSrc;        
}

	// read text from file and set it to html element
function setText(objectId,type,location){
	var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "assets/documents/" + objectId + " " + type + ".txt", true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                location.innerText = allText;
                if(type === "testimonial"){
                	location.innerText = "\"" + allText + "\" \u00A0 \u2E3A \u00A0"; 
            	}
            }
        }
    }
    rawFile.send(null);
}

function setTechnologies(array,objectId){
	array.forEach(function(element){
		switch(element){
			case "html":
				var content = document.createElement("span");
				content.innerHTML = "<i class='devicon-html5-plain-wordmark'></i>";
				technologiesLogo.appendChild(content);
				break;
			case "css":
				var content = document.createElement("span");
				content.innerHTML = "<i class='devicon-css3-plain-wordmark'></i>";
				technologiesLogo.appendChild(content);
				break;
			case "js":
				var content = document.createElement("span");
				content.className = "js-logo"
				content.innerHTML = "<i class='devicon-javascript-plain'></i>";
				technologiesLogo.appendChild(content);
				break;
			case "python":
				var content = document.createElement("span");
				content.className = "python-logo"
				content.innerHTML = "<i class='devicon-python-plain'></i>";
				technologiesLogo.appendChild(content);
				break;
			case "firebase":
				var content = document.createElement("span");
				content.className = "python-logo"
				content.innerHTML = "<img src = 'assets/images/firebase.png' alt = 'Firebase Logo'>";
				technologiesLogo.appendChild(content);
			default:
		}
	});

	setText(objectId, "technologies", technologiesText);
}

function modalFunction(thisObject,objectId){
	var imagesPath = [];
	var counter = 1;
	var title = null;
	for (var i = 0; i < thisObject.childNodes.length; i++) {
	    if (thisObject.childNodes[i].className == "work-title") {
	      notes = thisObject.childNodes[i];
	      notes = notes.getElementsByClassName("title")[0].innerHTML;
	      break;
	    }        
	}
	carousel.className = "carousel slide";
	modalTitle.innerHTML = notes;
	setImage("assets/images/" + objectId + counter + ".jpg", objectId, counter, imagesPath);
	setText(objectId, "overview", projectOverview);
	// setText(objectId, "testimonial", statement);
	// setText(objectId, "testimonee", testimonee);
	viewBtn.setAttribute("target", "_blank");
	btnContent.innerHTML = "Visit Website"
	btnLogo.innerHTML = "<i class='fa fa-angle-right fa-lg' aria-hidden='true'></i>";
}

function closeModal(){
	modalTitle.innerHTML = "";
	carousel.className = "";
	carouselIndicators.innerHTML = "";
	carouselInner.innerHTML = "";
	projectOverview.innerHTML = "";
	technologiesLogo.innerHTML = "";
	// statement.innerHTML = "";
	// testimonee.innerHTML = "";
	btnLogo.innerHTML = "";
	btnContent.innerHTML = "";
}

var modal = document.getElementById("work-description");
var modalTitle = document.getElementsByClassName("modal-title")[0];
var carousel = document.getElementById("myCarousel");
var carouselIndicators = document.getElementsByClassName("carousel-indicators")[0];
var carouselInner = document.getElementsByClassName("carousel-inner")[0]; 
var projectOverview = document.getElementsByClassName("project-description")[0];
var technologiesLogo = document.getElementsByClassName("technologies-logos")[0];
var technologiesText = document.getElementsByClassName("technologies-text")[0];
// var statement = document.getElementsByClassName("statement")[0];
// var testimonee = document.getElementsByClassName("testimonee")[0];
var viewBtn = document.getElementsByClassName("view")[0]
var btnContent = document.getElementsByClassName("btn-content")[0];
var btnLogo = document.getElementsByClassName("btn-logo")[0];
var closeButton = document.getElementsByClassName("close")[0];
// var wynp = document.getElementById("wynp");
// var bookkeepExcel = document.getElementById("bookkeep_excel");
var portfolioSimulation = document.getElementById("portfolio_simulation");
var forexBot = document.getElementById("forex_bot");

closeButton.addEventListener("click", function () {
	closeModal();
});

window.onclick = function(event) {
    if (event.target === modal) {
       closeModal(); 
    }
}

window.addEventListener("keyup", function(event){
	if(event.keyCode === 27){
		closeModal();
	}
});

// wynp.addEventListener("click", function(){
// 	var objectId = this.id;
// 	modalFunction(objectId);
// 	setTechnologies(["html", "css","js"]);
// });

// bookkeepExcel.addEventListener("click", function(){
// 	var objectId = this.id;
// 	modalFunction(this,objectId);
// 	setTechnologies(["excel"]);
// });

portfolioSimulation.addEventListener("click", function(){
	var objectId = this.id;
	modalFunction(this,objectId);
	viewBtn.setAttribute("href", "https://codepen.io/tjykenth/full/bwvwjY/");
	setTechnologies(["html","css","js"],objectId);
});

forexBot.addEventListener("click", function(){
	var objectId = this.id;
	modalFunction(this,objectId);
	viewBtn.setAttribute("href", "https://t.me/forex_updates_bot");
	setTechnologies(["python", "firebase"],objectId);
});