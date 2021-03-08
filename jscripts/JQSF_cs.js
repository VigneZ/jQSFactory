
console.clear();
console.log("jQSF - Generates jQuery Selctor for selected element");

var target;
var JQSelectors = new Array();

window.addEventListener("contextmenu", getTarget);
function getTarget(e) {
	target = e.target;
	var onclkValElement=target.getAttribute("onclick");
	elePar=$(target).parents()[0];
	var onclkValParent=elePar.getAttribute("onclick");
	if (onclkValElement==null || onclkValElement==""){
		onclkValElement=" ";
	}
	if (onclkValParent==null || onclkValParent==""){
		onclkValParent=" ";
	}

	// Show the popup only if context menu is disabled
	
	if ( (onclkValElement.indexOf("false")>0)  || (onclkValParent.indexOf("false")>0) ){
		LoadjQSFPopup(target);
	}

}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == "GenjQS") {
		//genjQS();
		LoadjQSFPopup(target);
	}
});



function genjQS() {
	JQSelectors=[];
	let text_Tags = ["div", "span", "label", "title", "table", "tr", "td", "h1", "h2", "h3", "h4", "h5", "h6", "li", "ui", "a", "button"];
	let alt_title_Tags = ["a", "img"];

	let attributes_Tags = ["input", "select", "button", "a", "img", "figure", "svg"];

	let attributes_to_include = ["id", "name", "type", "class", "role", "title", "alt", "value", "placeholder"]

	let attributes_to_exclude = ["href", "onclick", "style", "class", "size", "maxlength"];
	let values_to_exclude = ["", "#", ":"]


	var eleParent;
	console.log("===========Parents===========")
	//console.log($(target));
	//$(target).parents().slice(1, 10).css({ "border": "1px dotted red"})
	//$(target).parents().css({ "border": "1px dotted red" })
	eleParents = $(target).parents();
	console.log("Total Parents : " + $(target).parents().length);
	var i = 0;

	var i;
	for (i = 0; i < $(target).parents().length; i++) {
		eleParent = $(target).parents().eq(i);
		//console.log(i);
		//console.log($(target).parents().eq(i));
		
		// console.log("Tag Name: " + $(eleParent).prop("tagName"));
		// console.log("ID: " + $(eleParent).prop("id"));
		// console.log("Class: " + $(eleParent).prop("class"));
		// console.log("Name: " + $(eleParent).prop("name"));
		// console.log("Title: " + $(eleParent).prop("title"));
		// console.log("Alt: " + $(eleParent).prop("alt"));
		// console.log("aria-label: " + $(eleParent).prop("aria-label"));
		// console.log("Role: " + $(eleParent).prop("role"));
		
		
		//console.log("Text: " + $(eleParent).text().trim().substring(0, 20));
	}
	console.log("Total Parents : " + i)
	console.log("===========Parents===========")
	let tagName = $(target).prop("tagName");
	if (!isBlankAndEmpty(tagName)) {
		tagName = tagName.toLowerCase();
	}
	var isTextTag = text_Tags.includes(tagName);
	var isAltTitleTextTag = alt_title_Tags.includes(tagName);
	var isAttributeTag = attributes_Tags.includes(tagName);

	var eleText = addTextSelector(target);
	if (!isBlankAndEmpty(eleText)) {
		addJQS(tagName + ":contains(\"" + eleText + "\")");
		if (!isEmpty(eleParent) && !isBlank(eleParent)) {
			addJQS(eleParent + " " + tagName + ":contains(\"" + eleText + "\")")
		}
	}
	var eleText = addTextSelector(target);
	if (!isBlankAndEmpty(eleText)) {
		addJQS(tagName + ":contains(\"" + eleText + "\")");
		if (!isEmpty(eleParent) && !isBlank(eleParent)) {
			addJQS(eleParent + " " + tagName + ":contains(\"" + eleText + "\")")
		}
	}

	var eleText = addTextSelector(target);
	if (!isBlankAndEmpty(eleText)) {
		addJQS(tagName + ":contains(\"" + eleText + "\")");
		if (!isEmpty(eleParent) && !isBlank(eleParent)) {
			addJQS(eleParent + " " + tagName + ":contains(\"" + eleText + "\")")
		}
	}
	//Text based Selector

	//Attribute based selector
	var attributeList = "";

	$(target).each(function () {
		$.each(this.attributes, function () {
			// this.attributes is not a plain object, but an array
			// of attribute nodes, which contain both the name and value
			if (this.specified) {
				//console.log(this.name, " : ",this.value);
				let strAttributeName = this.name;
				let strAttributeValue = this.value;

				var isAttributeToBeIncuded = attributes_to_include.includes(strAttributeName);
				var isValueToBeExcluded = values_to_exclude.includes(strAttributeValue);

				if (!isValueToBeExcluded && isAttributeToBeIncuded) {
					attributeList = attributeList + "[" + strAttributeName + "=\"" + strAttributeValue + "\"]";
					//addJQS(tagName+"["+strAttributeName+"=\"" +strAttributeValue+"\"]");
				}

			}
		});
	});
	if (!isBlankAndEmpty(attributeList)) {
		addJQS(tagName + attributeList);
		if (!isBlankAndEmpty(eleParent)) {
			addJQS(eleParent + " " + tagName + attributeList)
		}
	}
	//Attribute based selector


	
	console.log("%c<<< jQS Factory Production Started... >>>", "background: #000; color: #fff");
	for (JQS in JQSelectors) {
		console.log(JQSelectors[JQS]);
	}
	console.log("%c<<< jQS Factory Production Finished!!! >>>", "background: #000; color: #fff");
	


}



//Utility functions
function addTextSelector(eleSelected) {
	strText = $(eleSelected).text().trim();
	if (!isEmpty(strText) && !isBlank(strText)) {
		return strText;
	}
	return null;
}
function addJQS(strJQS) {
	//console.log("In addJQS with param " + strJQS);

	JQSelectors[JQSelectors.length] = strJQS;
}

function isEmpty(str) {
	return (!str || 0 === str.length);
}

function isBlank(str) {
	return (!str || /^\s*$/.test(str));
}
function isBlankAndEmpty(str) {
	return (!str || /^\s*$/.test(str)) && (!str || 0 === str.length);
}
