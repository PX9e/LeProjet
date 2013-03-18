/**/
var jqxhrName = null;
function lookForProjectName() {
	if (jqxhr != null) {
		jqxhr.abort();
	}
	jqxhrName = $.post("/lookForProjectName", {"name" : $("#projectName").html()}, function(data) {
		jqxhrName = null;
		if (data.found == "0") {
			$("#state").append(
						'<div class="alert alert-success">'
						+ '<button type="button" class="close" data-dismiss="alert">&times;</button>'
						+ '<strong>ok!</strong> this name is free.'
						+ '</div>');
		} else {
			$("#state").append(
					  '<div class="alert alert-error">'
					+ '<button type="button" class="close" data-dismiss="alert">&times;</button>'
					+ '<strong>Error!</strong> There is already a project with this name.'
					+ '</div>');
		}
	}, "json");
}

var jqxhrGithub = null;
function lookForGithub() {
	if (jqxhrGithub != null) {
		jqxhrGithub.abort();
	}
	jqxhrGithub = $.post("/lookForGithub", {"url" : $("#inputGithub").val(), "branch": $("#branch").val()}, function(data) {
		jqxhrGithub = null;
		if (data.desc != "") {
			$("#descriptionArea").val(data.desc);
			$("#github").removeAttr("disabled");
		} else {
			$("#descriptionArea").val("");
		}
	}, "json");
}

function validateForm()	{
	if($("#descriptionArea").val().length > 0)	{
		$("#github").removeAttr("disabled");
	}
}

