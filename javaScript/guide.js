var resource = null;

function getResource()
{
	if(resource == null)
	{
		//取对应的语言文件
		resource = window.AppJsBridge.getDefaultResource();
	}
	return resource;
}

function initPage()
{
	var spanArray = document.getElementsByTagName("span");
	for(var i = 0; i < spanArray.length; i++)
	{
		var key = spanArray[i].getAttribute("local_key");
		if(getResource()[key])
		{
			spanArray[i].innerHTML = getResource()[key];
		}
	}
}

function wifi_info()
{
	//do nothing
}

function load()
{
	console.log("install guide, load ......");
	
	window.AppJsBridge.service.localeService.getResource({
		"success":function(data) 
		{
			resource = data;
			initPage();
			wifi_info();
		},
		"error":function(data){}
	})
}
