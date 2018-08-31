var __initFlag=false;var _successCallback=null;var _processCallback=null;var _messageCallback=null;var _failCallback=null;var _currentBridge=null;var isAndroid=false;var isIOS=false;var isPC=false;var tempCallback=null;var _language=null;var OnMessage=function(e){var json=JSON.parse(e.data);var funN=eval(json["callback"]);new funN(json["response"]);}
var callBackObj={success:{},error:{}};var reqNum=0;var maxReqNumOnce=26;function getMagicNum(){reqNum++
var templeNum="ABCDEFGHIJKLMNOPQRSTUVWXYZ";var tmpNum=reqNum%maxReqNumOnce;return templeNum.charAt(tmpNum);}
var regesterCallback=function(data){var callback={};var tmp=getMagicNum();callBackObj.success[tmp]=function(res){_onSuccess(data.success,res);}
callBackObj.error[tmp]=function(res){var errorCB=(data.error)?data.error:data.fail;_onFail(errorCB,res);}
callback.success="callBackObj.success."+tmp;callback.error="callBackObj.error."+tmp;return callback;}
var _onSuccess=function(fun,data){console.log("onSuccess--"+data);var res=data;if(typeof(data)!="object"){try{data=data.replace(/\\/g,"\\\\");res=eval("("+data+")");}catch(e){res=data;}}
fun(res);}
var _onFail=function(fun,data){var res=data;if(typeof(data)!="object"){try{res=eval("("+data+")");}catch(e){res=data;}}
fun(res);}
window.AppJsBridge={ready:function(fun){document.addEventListener("load",fun);},enableDebugMode:function(fun){try{fun();}catch(e){alert(e+"\n\r"+e.stack);}},service:{openActivity:function(data){_successCallback=data.success;_failCallback=data.error;_init();_openActivity(data.params,_successCallback);},openControlEntry:function(data){_successCallback=data.success;_failCallback=data.error;_init();_openControlEntry(data.sn,_successCallback);},openConfirm:function(data){_successCallback=data.success;_failCallback=data.error;_init();_openConfirm(data.msg,_successCallback);}}}
window.AppJsBridge.service.localeService={getResource:function(data){var callback=regesterCallback(data)
_init();_getResource(window.location.href,callback.success);}}
window.AppJsBridge.service.userService={getCurrentUserInfo:function(data){_successCallback=data.success;_failCallback=data.error;_init();_getCurrentUserInfo(_successCallback,_failCallback);}}
window.AppJsBridge.service.videoplayer={createVideoView:function(data){_successCallback=data.success;_failCallback=data.error;_init();_createVideoView(data,_successCallback,_failCallback)},initVedio:function(data){_successCallback=data.success;_failCallback=data.error;_init();_initVedio(_successCallback,_failCallback);},stop:function(data){_successCallback=data.success;_failCallback=data.error;_init();_stopDisplayCamera(_successCallback,_failCallback);},snapshot:function(data){_successCallback=data.success;_failCallback=data.error;_init();_cameraSnapShot(_successCallback,_failCallback);},record:function(data){_successCallback=data.success;_failCallback=data.error;_init();_cameraRecord(_successCallback,_failCallback);},stopRecord:function(data){_successCallback=data.success;_failCallback=data.error;_init();_cameraStopRecord(_successCallback,_failCallback);},startAudioTalk:function(data){_successCallback=data.success;_failCallback=data.error;_init();_cameraStartAudioTalk(_successCallback,_failCallback);},stopAudioTalk:function(data){_successCallback=data.success;_failCallback=data.error;_init();_cameraStopAudioTalk(_successCallback,_failCallback);},move:function(data){_successCallback=data.success;_failCallback=data.error;_init();_cameraMove(data.direction,_successCallback,_failCallback);},openNativePlayer:function(data){_successCallback=data.success;_failCallback=data.error;_init();_openNativePlayer(data.sn,_successCallback,_failCallback);},getOptions:function(data){var callback=regesterCallback(data);_init();_getOptions(data.sn,callback.success,callback.error);}}
window.AppJsBridge.service.securityService={getCurrentMode:function(data){var callback=regesterCallback(data);_init();_getCurrentMode(callback.success,callback.error)},setCurrentMode:function(data){var callback=regesterCallback(data);_init();_setCurrentMode(data.mode,callback.success,callback.error)},getModeDetail:function(data){var callback=regesterCallback(data);_init();_getModeDetail(data.mode,callback.success,callback.error)},setModeDetail:function(data){var callback=regesterCallback(data);_init();_setModeDetail(data.content,callback.success,callback.error)}}
window.AppJsBridge.service.networkService={getNetworkInfo:function(data){var callback=regesterCallback(data);_init();_getNetworkInfo(callback.success,callback.error);}}
window.AppJsBridge.service.deviceService={getDevice:function(data){var callback=regesterCallback(data);_init();_getSmartDeviceList(data.sn,callback.success,callback.error)},getDeviceList:function(data){var callback=regesterCallback(data);_init();_getSmartDeviceList(null,callback.success,callback.error)},getDeviceBySnList:function(data){var callback=regesterCallback(data);_init();_getSmartDeviceBySnList(data.sn,callback.success,callback.error)},getDeviceByClass:function(data){var callback=regesterCallback(data);_init();_getSmartDeviceByClass(data.deviceClass,callback.success,callback.error)},getDeviceByClasses:function(data){var callback=regesterCallback(data);_init();_getSmartDeviceByClasses(data.deviceClasses,callback.success,callback.error)},doAction:function(data){var callback=regesterCallback(data);_init();_smartDeviceDoAction(data,callback.success,callback.error)},getCurrentDeviceSn:function(){var sn=decodeURIComponent(getUrlParams(location.href).sn);return sn;},getMetaInfoBySn:function(data){var callback=regesterCallback(data);_init();_getMetaInfoBySn(data.sn,callback.success,callback.error)},getMetaInfoByProductName:function(data){var callback=regesterCallback(data);_init();_getMetaInfoByProductName(data.manufacturer,data.productName,callback.success,callback.error)},doConfig:function(data){var callback=regesterCallback(data);_init();_smartDeviceDoConfig(data,callback.success,callback.error)}}
window.AppJsBridge.service.socketService={connect:function(data){_successCallback=data.success;_failCallback=data.error;_messageCallback=data.message;_init();_serviceSocketConnect(data,_messageCallback,_successCallback,_failCallback);},disconnect:function(data){var connectId=data.connectId;_successCallback=data.success;_init();_serviceSocketDisconnect(connectId,_successCallback);},send:function(data){var connectId=data.connectId;var sendData=data.data;_successCallback=data.success;_init();_serviceSocketSend(connectId,sendData,_successCallback);},getGateWayIp:function(data){_successCallback=data.success;_failCallback=data.error;_init();_getGateWayIp(_successCallback,_failCallback);}}
window.AppJsBridge.service.applicationService={doAction:function(data){var callback=regesterCallback(data);_init();_applicationServiceDoAction(data,callback.success,callback.error);},showTitleBar:function(){_init();_showTitleBar();},hideTitleBar:function(){_init();_hideTitleBar();},setTitleBar:function(title){_init();_setTitleBar(title);},closePage:function(data){_init();_successCallback=data.success;_failCallback=data.error;_back(_successCallback,_failCallback);},openURL:function(data){_successCallback=data.success;_failCallback=data.error;_init();_openURL(data,_successCallback,_failCallback);},addWidgetMoreAction:function(fun){_init();_addWidgetMoreAction(fun);},showCurrentWidget:function(){_init();_showCurrentWidget()},hideCurrentWidget:function(){_init();_hideCurrentWidget();}}
window.AppJsBridge.service.securityService={redirectURL:function(data){_successCallback=data.success;_failCallback=data.error;_init();_redirectURL(data,_successCallback,_failCallback);}}
window.AppJsBridge.service.speedupService={operate:function(data){_successCallback=data.success;_failCallback=data.error;_init();_operate(data,_successCallback,_failCallback);},queryBandwidths:function(data){_successCallback=data.success;_failCallback=data.error;_init();_queryBandwidths(data,_successCallback,_failCallback);},queryService:function(data){_successCallback=data.success;_failCallback=data.error;_init();_queryService(data,_successCallback,_failCallback);},order:function(data){_successCallback=data.success;_failCallback=data.error;_init();_order(data,_successCallback,_failCallback);},queryOrderHistory:function(data){_successCallback=data.success;_failCallback=data.error;_init();_queryOrderHistory(data,_successCallback,_failCallback);},queryUseRecord:function(data){_successCallback=data.success;_failCallback=data.error;_init();_queryUseRecord(data,_successCallback,_failCallback);}}
window.AppJsBridge.service.wifiService={getControllerWifi:function(data){var callback=regesterCallback(data);_init();_getControllerWifi(callback.success,callback.error);},wifiSwitch:function(data){var callback=regesterCallback(data);_init();_wifiSwitch(data.ssid,data.password,callback.success,callback.error);},getWifiList:function(data){var callback=regesterCallback(data);_init();_getWifiList(callback.success,callback.error);}}
window.AppJsBridge.service.scanService={scan:function(data){_successCallback=data.success;_failCallback=data.error;_init();_scan(_successCallback,_failCallback);}}
window.AppJsBridge.service.storageService={listObjects:function(data){var type=data.type;var url=data.url;_successCallback=data.success;_init();_listObjects(type,url,_successCallback);},putObject:function(data){var type=data.type;var url=data.url;var files=data.files;_successCallback=data.success;_processCallback=data.process;_init();_putObject(type,url,files,_processCallback,_successCallback);},chooseFiles:function(data){var type=data.type;var source=data.source;var maxFile=data.maxFile;_successCallback=data.success;_init();_chooseFiles(maxFile,type,source,_successCallback);},createDirectory:function(data){var type=data.type;var url=data.url;var name=data.name;_successCallback=data.success;_init();_createDirectory(type,url,name,_successCallback);},getObject:function(data){var type=data.type;var url=data.url;_successCallback=data.success;_init();_getObject(type,url,_successCallback);},renameObject:function(data){var type=data.type;var url=data.url;var newName=data.newName;_successCallback=data.success;_init();_renameObject(type,url,newName,_successCallback);},deleteObject:function(data){var type=data.type;var url=data.url;_successCallback=data.success;_init();_deleteObject(type,url,_successCallback);},moveObject:function(data){var type=data.type;var srcPath=data.srcPath;var destPath=data.destPath;_successCallback=data.success;_init();_moveObject(type,srcPath,destPath,_successCallback);},getExternalStorageStorageData:function(data){_successCallback=data.success;_failCallback=data.error;_init();_getExternalStorageData(_successCallback,_failCallback);},getCloudStorageData:function(data){_successCallback=data.success;_failCallback=data.error;_init();_getCloudStorageData(_successCallback,_failCallback);},openStorageImageViewer:function(data){var callback=regesterCallback(data);_init();_openStorageImageViewer(data.type,data.url,callback.success,callback.error);},openStorageVideoPlayer:function(data){var callback=regesterCallback(data);_init();_openStorageVideoPlayer(data.type,data.url,callback.success,callback.error);}}
window.AppJsBridge.service.broadbandService={speedup:{start:function(data){_successCallback=data.success;_failCallback=data.error;_init();_speedupStart(data.data,_successCallback,_failCallback);},stop:function(data){_successCallback=data.success;_failCallback=data.error;_init();_speedupStop(data.data,_successCallback,_failCallback);}}}
window.AppJsBridge.service.vpnService={wanGetL2tpTunnelStatus:function(data){_successCallback=data.success;_failCallback=data.error;_init();_wanGetL2tpTunnelStatus(data.data,_successCallback,_failCallback);},wanCreateL2tpTunnel:function(data){_successCallback=data.success;_failCallback=data.error;_init();_wanCreateL2tpTunnel(data.data,_successCallback,_failCallback);},wanAttachL2tpTunnel:function(data){_successCallback=data.success;_failCallback=data.error;_init();_wanAttachL2tpTunnel(data.data,_successCallback,_failCallback);},wanRemoveL2tpTunnel:function(data){_successCallback=data.success;_failCallback=data.error;_init();_wanRemoveL2tpTunnel(data.data,_successCallback,_failCallback);},wanDetachL2tpTunnel:function(data){_successCallback=data.success;_failCallback=data.error;_init();_wanDetachL2tpTunnel(data.data,_successCallback,_failCallback);}}
window.AppJsBridge.service.messageService={sendMsgToGateway:function(data){var parameter=data.parameter;_successCallback=data.success;_failCallback=data.error;_init();_sendMsgToGateway(parameter,_successCallback);}}
window.AppJsBridge.service.dataService={put:function(data){_successCallback=data.success;_failCallback=data.error;_init();_putData(data["key"],data.data,_successCallback,_failCallback);},remove:function(data){_successCallback=data.success;_failCallback=data.error;_init();_removeData(data["key"],_successCallback,_failCallback);},clear:function(data){_successCallback=data.success;_failCallback=data.error;_init();_clearData(_successCallback,_failCallback);},list:function(data){_successCallback=data.success;_failCallback=data.error;_init();_listData(_successCallback,_failCallback);}}
var _init=function(){if(__initFlag==false){__initFlag=true;recogniseDevice();if(isAndroid){_initAndroidBridge(function(bridge){_currentBridge=bridge;});}else if(isIOS){_initIOSBridge(function(bridge){_currentBridge=bridge;bridge.init(function(message,responseCallback){});bridge.registerHandler('refreshPage',function(data,responseCallback){var responseData={'Javascript Says':'...'}
responseCallback(responseData)});});}else{_currentBridge=window.parent;}
window.addEventListener("message",OnMessage,false);}}
function recogniseDevice(){var sUserAgent=navigator.userAgent.toLowerCase();if(sUserAgent.indexOf('android')>-1){isAndroid=true;}else if(sUserAgent.indexOf('iphone')>-1){isIOS=true;}else{isPC=true;}}
var _sendMsgToGateway=function(params,_successCallback){if(isAndroid){_currentBridge.sendMsgToGateway(params,"_successCallback");}}
var _initIOSBridge=function(callback){if(window.WebViewJavascriptBridge){callback(WebViewJavascriptBridge)}else if(parent.window.WebViewJavascriptBridge){iframeFlag=true;_currentBridge=parent.currentBridge;}else{document.addEventListener('WebViewJavascriptBridgeReady',function(){callback(WebViewJavascriptBridge)},false)}}
var initBridge=function(fun){var intervalTimer=setInterval(function(){if(_currentBridge){clearInterval(intervalTimer);fun();}},10);}
var _initAndroidBridge=function(callback){if(window.AppJSBridge){callback(window.AppJSBridge);}else if(window.deviceService){callback(window.deviceService);}}
var _getSmartDevice=function(success,error){var sn=decodeURIComponent(getUrlParams(location.href).sn);var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}}catch(e){frameName=null;}
if(isAndroid){if(window.deviceService){_currentBridge.getSmartDevice(JSON.stringify({"sn":sn,"frameName":frameName,"success":success,"error":error}));}else{if(frameName!=null){_currentBridge.initWedgistData(frameName,success);}else{var data=_currentBridge.getSmartDevice(sn);console.log(data);console.log(success);var callback=eval(success);callback(data);}}}else if(isIOS){var param={};param.sn=sn;param.request="getSmartDevice";_currentBridge.send(param,success);var param2={};param2.sn=sn;param2.request="getSmartDeviceState";_currentBridge.send(param2,success);}else{_currentBridge.getSmartDevice({"sn":sn,"successCallback":success,"errorCallback":error});}}
var _back=function(success,error){if(isAndroid){var data=_currentBridge.doAction('exit','');success(data);}else if(isIOS){var param={};param.request="goBack";_currentBridge.send(param,success);}else{}}
var _initVedio=function(_successCallback,_failCallback){if(isAndroid)
{var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.initVedio(frameName,"_successCallback");}}
else if(isIOS)
{var param={};param.request="initVedio";_currentBridge.send(param,_successCallback);}}
var _openActivity=function(params,_successCallback){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.openActivity(JSON.stringify(params),frameName,"_successCallback");}else{_currentBridge.openActivity(JSON.stringify(params),"","_successCallback");}}else if(isIOS){params.request="openActivity";_currentBridge.send(params,_successCallback);}
else
{_currentBridge.openActivity(params,_successCallback);}}
var _openURL=function(data,_successCallback,_failCallback){var title=data.title;var url=data.url;var urlRoot=url.substring(0,url.indexOf("/")+1);var currentUrl=window.location.href;var realUrl=currentUrl.substring(0,currentUrl.lastIndexOf(urlRoot))+url
realUrl=encodeURI(realUrl);if(isAndroid)
{var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.openURL(realUrl,title,frameName,"_successCallback");}else{_currentBridge.openURL(realUrl,title,"","_successCallback");}}
else if(isIOS)
{var param={};param.request="openURL";param.title=title;param.realUrl=realUrl;_currentBridge.send(param,_successCallback);}
else
{_currentBridge.openURL(realUrl,title,"","_successCallback");}}
var _stopDisplayCamera=function(_successCallback,_failCallback){if(isAndroid)
{var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.stopDisplayCamera(frameName,"_successCallback");}else{_currentBridge.stopDisplayCamera("","_successCallback");}}
else if(isIOS)
{var param={};param.request="stopDisplayCamera";_currentBridge.send(param,_successCallback);}}
var _cameraSnapShot=function(_successCallback,_failCallback){if(isAndroid)
{var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.cameraSnapShot(frameName,"_successCallback");}else{_currentBridge.cameraSnapShot("","_successCallback");}}
else if(isIOS)
{var param={};param.request="cameraSnapShot";_currentBridge.send(param,_successCallback);}}
var _cameraRecord=function(_successCallback,_failCallback){if(isAndroid)
{var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.cameraStartRecord(frameName,"_successCallback");}else{_currentBridge.cameraStartRecord("","_successCallback");}}
else if(isIOS)
{var param={};param.request="cameraRecord";_currentBridge.send(param,_successCallback);}}
var _cameraStopRecord=function(_successCallback,_failCallback){if(isAndroid)
{var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.cameraStopRecord(frameName,"_successCallback");}else{_currentBridge.cameraStopRecord("","_successCallback");}}
else if(isIOS)
{var param={};param.request="cameraStopRecord";_currentBridge.send(param._successCallback);}}
var _cameraStartAudioTalk=function(_successCallback,_failCallback){if(isAndroid)
{var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.cameraStartAutoTaik(frameName,"_successCallback");}else{_currentBridge.cameraStartAutoTaik("","_successCallback");}}
else if(isIOS)
{var param={};param.request="cameraStartAudioTalk";_currentBridge.send(param,_successCallback);}}
var _cameraStopAudioTalk=function(_successCallback,_failCallback){if(isAndroid)
{var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.cameraStopAutoTaik(frameName,"_successCallback");}else{_currentBridge.cameraStopAutoTaik("","_successCallback");}}
else if(isIOS)
{var param={};param.request="cameraStopAudioTalk";_currentBridge.send(param,_successCallback);}}
var _cameraMove=function(direction,_successCallback,_failCallback){if(isAndroid)
{var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.cameraMove(direction,frameName,"_successCallback");}else{_currentBridge.cameraMove(direction,"","_successCallback");}}
else if(isIOS)
{var param={};param.request="cameraMove";param.direction=direction;_currentBridge.send(param,_successCallback);}}
var _openNativePlayer=function(sn,_successCallback,_failCallback){if(isAndroid)
{var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.openNativePlayer(sn,frameName,"_successCallback");}else{_currentBridge.openNativePlayer(sn,"","_successCallback");}}
else if(isIOS)
{var param={};param.sn=sn;param.request="openNativePlayer";_currentBridge.send(param,_successCallback);}}
var _getOptions=function(sn,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.getCameraOptions(sn,frameName,success);}else{_currentBridge.getCameraOptions(sn,"",success);}}
else if(isIOS)
{var param={};param.request="getOptions";param.sn=sn;_currentBridge.send(param,eval(success));}}
var _createVideoView=function(param,_successCallback,_failCallback){if(isAndroid)
{var jsonObj={};if(param){if(param.sn){jsonObj.sn=param.sn;}else{jsonObj.sn="";}
if(param.layout){jsonObj.layout={};if(param.layout.x){jsonObj.layout.x=param.layout.x;}else{jsonObj.layout.x=0;}
if(param.layout.y){jsonObj.layout.y=param.layout.y;}else{jsonObj.layout.y=0;}
if(param.layout.width){jsonObj.layout.width=param.layout.width;}else{jsonObj.layout.width=0;}
if(param.layout.height){jsonObj.layout.height=param.layout.height;}else{jsonObj.layout.height=0;}}
_currentBridge.createVideoView(JSON.stringify(jsonObj),"_successCallback","_failCallback");}}
else if(isIOS)
{var paramObj={};if(param){if(param.sn){paramObj.sn=param.sn;}else{paramObj.sn="";}
if(param.layout){paramObj.layout={};if(param.layout.x){paramObj.layout.x=param.layout.x;}else{paramObj.layout.x=0;}
if(param.layout.y){paramObj.layout.y=param.layout.y;}else{paramObj.layout.y=0;}
if(param.layout.width){paramObj.layout.width=param.layout.width;}else{paramObj.layout.width=0;}
if(param.layout.height){paramObj.layout.height=param.layout.height;}else{paramObj.layout.height=0;}}
paramObj.request="createVideoView";_currentBridge.send(paramObj,_successCallback);}}}
var _getNetworkInfo=function(success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
_currentBridge.getNetworkInfo(frameName,success);}else if(isIOS){var param={};param.request="getONTDevice";_currentBridge.send(param,eval(success));}
else
{_currentBridge.getNetworkInfo(eval(success));}}
var _openControlEntry=function(sn,_successCallback){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.openControlEntry(sn,frameName,"_successCallback");}else{_currentBridge.openControlEntry(sn,"","_successCallback");}}else if(isIOS){var param={};param.sn=sn;param.request="openControlEntry";_currentBridge.send(param,_successCallback);}}
var _openConfirm=function(msg,_successCallback){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.openConfirm(msg,frameName,"_successCallback");}else{_currentBridge.openConfirm(msg,"","_successCallback");}}else if(isIOS){var param={};param.request="openConfirm";param.msg="showTips";_currentBridge.send(param,_successCallback);}}
var _getSmartDeviceList=function(sn,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
if(window.deviceService){_currentBridge.getSmartDeviceList(JSON.stringify({"sn":sn,"frameName":frameName,"success":success,"error":error}));}else{if(sn!=null){_currentBridge.getSmartDeviceList(sn,frameName,success);}else{_currentBridge.getSmartDeviceList(frameName,success);}}}else if(isIOS){var param={};if(null!=sn)
{param.sn=sn;}
param.request="getSmartDeviceList";_currentBridge.send(param,eval(success));}
else
{if(sn!=null){_currentBridge.getDevice(sn,eval(success));}else{_currentBridge.getDeviceList(eval(success));}}}
var _getSmartDeviceBySnList=function(params,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
if(frameName==null){_currentBridge.getSmartDeviceBySnList(JSON.stringify(params),"",success);}else{_currentBridge.getSmartDeviceBySnList(JSON.stringify(params),frameName,success);}}else if(isIOS){param.request="getSmartDeviceBySnList";_currentBridge.send(param,eval(success));}
else
{_currentBridge.getSmartDeviceBySnList(params,eval(success));}}
var _getSmartDeviceByClass=function(deviceClass,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.getSmartDeviceByClass(deviceClass,frameName,success);}else{_currentBridge.getSmartDeviceByClass(deviceClass,"",success);}}else if(isIOS){param.request="getSmartDeviceByClass";_currentBridge.send(param,eval(success));}
else
{_currentBridge.getSmartDeviceByClass(deviceClass,eval(success));}}
var _getSmartDeviceByClasses=function(params,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.getSmartDeviceByClasses(JSON.stringify(params),frameName,success);}else{_currentBridge.getSmartDeviceByClasses(JSON.stringify(params),"",success);}}else if(isIOS){var param={};param.request="getSmartDeviceByClasses";param.params=params;_currentBridge.send(param,eval(success));}
else
{_currentBridge.getSmartDeviceByClasses(JSON.stringify(params),eval(success));}}
var _smartDeviceDoAction=function(params,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
var devInfo={"deviceClass":params.deviceClass,"action":params.action,"sn":params.sn};if(frameName==null){_currentBridge.smartDeviceDoAction(JSON.stringify(devInfo),JSON.stringify(params.parameters),"",success);}else{_currentBridge.smartDeviceDoAction(JSON.stringify(devInfo),JSON.stringify(params.parameters),frameName,success);}}else if(isIOS){var devInfo={"deviceClass":params.deviceClass,"action":params.action,"sn":params.sn};var param={};param.request="smartDeviceDoAction";param.devInfo=devInfo;param.parameters=params.parameters;_currentBridge.send(param,eval(success));}
else
{_currentBridge.smartDeviceDoAction(params.deviceClass,params.action,params.sn,JSON.stringify(params.parameters),eval(success));}}
var _smartDeviceDoConfig=function(params,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
if(frameName==null){_currentBridge.smartDeviceDoConfig(JSON.stringify(params),JSON.stringify(params.parameters),frameName,success);}else{_currentBridge.smartDeviceDoConfig(JSON.stringify(params),JSON.stringify(params.parameters),"",success);}}else if(isIOS){var param={};param.request="smartDeviceDoConfig";param.params=params;param.parameters=params.parameters;_currentBridge.send(param,eval(success));}
else
{_currentBridge.smartDeviceDoConfig(params.manufacturer,params.brand,params.action,JSON.stringify(params.parameters),eval(success));}}
var _getMetaInfoBySn=function(sn,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
if(frameName==null){_currentBridge.getMetaInfoBySn(sn,frameName,success);}else{_currentBridge.getMetaInfoBySn(sn,"",success);}}
else if(isIOS)
{var param={};param.request="getMetaInfoBySn";param.sn=params.sn;_currentBridge.send(param,eval(success));}
else
{_currentBridge.getMetaInfoBySn(sn,eval(success));}}
var _getMetaInfoByProductName=function(manufacturer,productName,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
if(frameName==null){_currentBridge.getMetaInfoByProductName(manufacturer,productName,frameName,success);}else{_currentBridge.getMetaInfoByProductName(manufacturer,productName,"",success);}}
else if(isIOS)
{var param={};param.request="getMetaInfoByProductName";param.manufacturer=manufacturer;param.productName=productName;_currentBridge.send(param,eval(success));}
else
{_currentBridge.getMetaInfoByProductName(manufacturer,productName,eval(success));}}
var _applicationServiceDoAction=function(params,success,error){var applicationName=params.applicationName;var serviceName=params.serviceName;var action=params.action;var parameter=params.parameters;if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
var appData={"applicationName":applicationName,"serviceName":serviceName,"action":action};if(window.deviceService){_currentBridge.applicationServiceDoAction(JSON.stringify(appData),JSON.stringify(parameter),frameName,success);}else{_currentBridge.applicationServiceDoAction(JSON.stringify(appData),JSON.stringify(parameter),frameName,success);}}else if(isIOS){var param={};param.request="applicationServiceDoAction";param.applicationName=params.applicationName;param.serviceName=params.serviceName;param.action=params.action;param.parameter=parameter;_currentBridge.send(param,eval(success));}
else
{_currentBridge.applicationServiceDoAction(params.applicationName,params.serviceName,params.action,JSON.stringify(params.parameters),eval(success));}}
var _serviceSocketConnect=function(data,_messageCallback,_successCallback,_failCallback){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
var connectData={"mode":data['mode'],"ip":data['ip'],"port":data["port"],"type":data["type"],"timeout":data["timeout"]};_currentBridge.socketConnect(JSON.stringify(connectData),frameName,"_messageCallback","_successCallback","_failCallback");}else if(isIOS){param.request="serviceSocketConnect";param.ip=data['ip'];param.port=data["port"];param.type=data["type"];param.timeout=data["timeout"];_currentBridge.send(param,_successCallback);}}
var _serviceSocketDisconnect=function(connectId,_successCallback){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
_currentBridge.socketDisconnect(connectId,frameName,"_successCallback");}else if(isIOS){param.request="serviceSocketConnect";param.connectId=connectId;_currentBridge.send(param,_successCallback);}}
var _serviceSocketSend=function(connectId,sendData,_successCallback){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
_currentBridge.socketSend(connectId,sendData,frameName,"_successCallback");}else if(isIOS){param.request="serviceSocketConnect";param.connectId=connectId;param.sendData=sendData;_currentBridge.send(param,_successCallback);}}
var _getCurrentMode=function(success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.getCurrentSecurityMode(frameName,success);}}}
var _setCurrentMode=function(mode,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.setCurrentSecurityMode(mode,frameName,success);}}}
var _setModeDetail=function(content,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.setSecurityModeDetail(JSON.stringify(content),success);}else{_currentBridge.setSecurityModeDetail(JSON.stringify(content),success);}}}
var _getModeDetail=function(mode,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName){_currentBridge.getSecurityModeDetail(mode,success);}else{_currentBridge.getSecurityModeDetail(mode,success);}}}
var _getDeviceList=function(success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName){_currentBridge.getDeviceList(success);}else{_currentBridge.getDeviceList(error);}}}
var _speedupStart=function(params,success,error){if(isAndroid){_currentBridge.speedupStart(JSON.stringify(params),"_successCallback","_failCallback");}
else if(isIOS){params.request="speedupStart";_currentBridge.send(params,_successCallback);}}
var _speedupStop=function(params,success,error){if(isAndroid){_currentBridge.speedupStop(JSON.stringify(params),"_successCallback","_failCallback");}
else if(isIOS){params.request="speedupStop";_currentBridge.send(params,_successCallback);}}
var _wanGetL2tpTunnelStatus=function(params,success,error){if(isAndroid){_currentBridge.wanGetL2tpTunnelStatus(JSON.stringify(params),"_successCallback","_failCallback");}
else if(isIOS){params.request="getWanl2tpTunnel";_currentBridge.send(params,_successCallback);}}
var _wanCreateL2tpTunnel=function(params,success,error){if(isAndroid){_currentBridge.wanCreateL2tpTunnel(JSON.stringify(params),"_successCallback","_failCallback");}
else if(isIOS){params.request="createWanl2tpTunnel";_currentBridge.send(params,_successCallback);}}
var _wanAttachL2tpTunnel=function(params,success,error){if(isAndroid){_currentBridge.wanAttachL2tpTunnel(JSON.stringify(params),"_successCallback","_failCallback");}
else if(isIOS){params.request="attachWanl2tpTunnel";_currentBridge.send(params,_successCallback);}}
var _wanRemoveL2tpTunnel=function(params,success,error){if(isAndroid){_currentBridge.wanRemoveL2tpTunnel(JSON.stringify(params),"_successCallback","_failCallback");}
else if(isIOS){params.request="removeWanl2tpTunnel";_currentBridge.send(params,_successCallback);}}
var _wanDetachL2tpTunnel=function(params,success,error){if(isAndroid){_currentBridge.wanDetachL2tpTunnel(JSON.stringify(params),"_successCallback","_failCallback");}
else if(isIOS){params.request="wanDetachL2tpTunnel";_currentBridge.send(params,_successCallback);}}
String.prototype.endWith=function(endStr){var d=this.length-endStr.length;return(d>=0&&this.lastIndexOf(endStr)==d)}
String.prototype.startWith=function(endStr){return(this.indexOf(endStr)==0)}
function getUrlParams(url){var params={};url.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key]=value;});return params;}
var _redirectURL=function(param,_successCallback,_failCallback){var jsonObj={};if(param){if(param.symbolicName){jsonObj.symbolicName=param.symbolicName;}else{jsonObj.symbolicName="";return-1;}
if(param.data){jsonObj.data=param.data;}
_currentBridge.redirectAuthURL(JSON.stringify(jsonObj),"_successCallback","_failCallback");}}
var _operate=function(param,_successCallback,_failCallback){if(param.data){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName==null){frameName="";}
_currentBridge.operate(JSON.stringify(param.data),frameName,"_successCallback");}
else if(isIOS){params.request="speedupoperate";_currentBridge.send(params,_successCallback);}}}
var _queryBandwidths=function(param,_successCallback,_failCallback){if(param.data){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName==null){frameName="";}
_currentBridge.queryBandwidths(JSON.stringify(param.data),frameName,"_successCallback");}
else if(isIOS){params.request="queryBandwidths";_currentBridge.send(params,_successCallback);}}}
var _queryService=function(param,_successCallback,_failCallback){if(param.data){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName==null){frameName="";}
_currentBridge.queryService(JSON.stringify(param.data),frameName,"_successCallback");}
else if(isIOS){params.request="speedupQueryService";_currentBridge.send(params,_successCallback);}}}
var _order=function(param,_successCallback,_failCallback){if(param.data){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName==null){frameName="";}
_currentBridge.order(JSON.stringify(param.data),frameName,"_successCallback");}
else if(isIOS){params.request="orderSpeedup";_currentBridge.send(params,_successCallback);}}}
var _queryOrderHistory=function(param,_successCallback,_failCallback){if(param.data){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName==null){frameName="";}
_currentBridge.queryOrderHistory(JSON.stringify(param.data),frameName,"_successCallback");}
else if(isIOS){params.request="queryOrderHistory";_currentBridge.send(params,_successCallback);}}}
var _queryUseRecord=function(param,_successCallback,_failCallback){if(param.data){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName==null){frameName="";}
_currentBridge.queryUseRecord(JSON.stringify(param.data),frameName,"_successCallback");}
else if(isIOS){params.request="queryUseRecord";_currentBridge.send(params,_successCallback);}}}
var _scan=function(_successCallback,_failCallback){if(isAndroid){_currentBridge.scan("_successCallback","_failCallback");}}
var _wifiSwitch=function(ssid,password,success,error){if(isAndroid){var jsonObj={};jsonObj.ssid=ssid;if(password)
{jsonObj.password=password;}
else
{jsonObj.password="";}
var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName);}}catch(e){frameName=null;}
if(frameName==null){frameName="";}
_currentBridge.switchWifi(JSON.stringify(jsonObj),frameName,success);}}
var _getControllerWifi=function(success,error){if(isAndroid){_currentBridge.currentWifiInfo(success);}}
var _getWifiList=function(success,error){if(isAndroid){_currentBridge.getWifiList(success);}}
var _getResource=function(url,success){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
if(frameName!=null){_currentBridge.getResource(url,frameName,success);}else{_currentBridge.getResource(url,"",success);}}
else if(isIOS){var param={};param.request="getResource";param.url=url;initBridge(function(){_currentBridge.send(param,eval(success));})}
else
{_currentBridge.getResource(url,eval(success));}}
var _showTitleBar=function(){if(isAndroid){_currentBridge.showTitleBar();}
else if(isIOS)
{var param={};param.request="showTitleBar";initBridge(function(){_currentBridge.send(param);})}
else
{if(getUrlParams(window.location.href).frameId){var frameId=getUrlParams(window.location.href).frameId;_currentBridge.showTitleBar(frameId);}}}
var _hideTitleBar=function(){if(isAndroid){_currentBridge.hideTitleBar();}
else if(isIOS)
{var param={};param.request="hideTitleBar";initBridge(function(){_currentBridge.send(param);})}
else
{if(getUrlParams(window.location.href).frameId){var frameId=getUrlParams(window.location.href).frameId;_currentBridge.hideTitleBar(frameId);}}}
var _setTitleBar=function(title){if(isAndroid){_currentBridge.setTitleBar(title,"");}
else if(isIOS)
{var param={};param.request="setTitleBar";param.title=title;_currentBridge.send(param);}
else
{if(getUrlParams(window.location.href).frameId){var frameId=getUrlParams(window.location.href).frameId;_currentBridge.setTitleBar(title,frameId);}}}
var _addWidgetMoreAction=function(fun){if(isAndroid){if(getUrlParams(window.location.href).frameId){var frameId=getUrlParams(window.location.href).frameId;parent.setEventOnElement(frameId,fun);}}
else if(isIOS)
{if(getUrlParams(window.location.href).frameId){var frameId=getUrlParams(window.location.href).frameId;parent.setEventOnElement(frameId,fun);}}
else
{if(getUrlParams(window.location.href).frameId){var frameId=getUrlParams(window.location.href).frameId;_currentBridge.addWidgetMoreAction(frameId,fun);}}}
var _showCurrentWidget=function(){if(isAndroid)
{try{var frameId=getUrlParams(window.location.href).frameId;var iframe=parent.document.getElementById(frameId);var widgetDiv=parent.document.getElementById("div_"+frameId);widgetDiv.style.display="block";iframe.parentNode.style.display="block";iframe.height=iframe.contentWindow.document.documentElement.scrollHeight;}catch(e){}}
else if(isIOS)
{try{var frameId=getUrlParams(window.location.href).frameId;var iframe=parent.document.getElementById(frameId);var widgetDiv=parent.document.getElementById("div_"+frameId);widgetDiv.style.display="block";iframe.parentNode.style.display="block";iframe.height=iframe.contentWindow.document.documentElement.scrollHeight;}catch(e){}}
else
{if(getUrlParams(window.location.href).frameId){var frameId=getUrlParams(window.location.href).frameId;_currentBridge.showCurrentWidget(frameId);}}}
var _hideCurrentWidget=function(){if(isAndroid)
{try{var frameId=getUrlParams(window.location.href).frameId;var widgetDiv=parent.document.getElementById("div_"+frameId);widgetDiv.style.display="none";}catch(e){}}
else if(isIOS)
{try{var frameId=getUrlParams(window.location.href).frameId;var widgetDiv=parent.document.getElementById("div_"+frameId);widgetDiv.style.display="none";}catch(e){}}
else
{if(getUrlParams(window.location.href).frameId){var frameId=getUrlParams(window.location.href).frameId;_currentBridge.hideCurrentWidget(frameId);}}}
var _getFamilyId=function(_successCallback){if(isAndroid){_currentBridge.getFamilyId("_successCallback");}}
var _listObjects=function(type,url,_successCallback){if(isAndroid){_currentBridge.listObjects(type,url,"_successCallback");}}
var _chooseFiles=function(maxFile,type,source,_successCallback){if(isAndroid){_currentBridge.chooseFiles(maxFile,type,source,"_successCallback");}}
var _putObject=function(type,url,files,_processCallback,_successCallback){if(isAndroid){_currentBridge.putObject(type,url,files,"_processCallback","_successCallback");}}
var _createDirectory=function(type,url,name,_successCallback){if(isAndroid){_currentBridge.createDirectory(type,url,name,"_successCallback");}}
var _getObject=function(type,url,_successCallback){if(isAndroid){_currentBridge.getObject(type,url,"_successCallback");}}
var _renameObject=function(type,url,newName,_successCallback){if(isAndroid){_currentBridge.renameObject(type,url,newName,"_successCallback");}}
var _deleteObject=function(type,url,_successCallback){if(isAndroid){_currentBridge.deleteObject(type,url,"_successCallback");}}
var _moveObject=function(type,srcPath,destPath,_successCallback){if(isAndroid){_currentBridge.moveObject(type,srcPath,destPath,"_successCallback");}}
var _getCurrentUserInfo=function(success,error){if(isAndroid){var userInfo=_currentBridge.getCurrentUserInfo();success(JSON.parse(userInfo));console.log(userInfo);}else if(isIOS){var param={};param.request="getCurrentUserInfo";_currentBridge.send(param,eval(success));}else{_currentBridge.getCurrentUserInfo(success);}}
var _connect=function(data,success,error){if(isAndroid){_currentBridge.putObject(JSON.stringify(data),"_successCallback");}}
var _disconnect=function(connectId,success,error){if(isAndroid){_currentBridge.putObject(connectId,"_successCallback","_failCallback");}}
var _send=function(connectId,data,success,error){if(isAndroid){_currentBridge.putObject(connectId,data,"_successCallback","_failCallback");}}
var _putData=function(key,data,_successCallback,_failCallback){if(isAndroid){var jsonParams={};if(key)
{jsonParams.key=key;}
if(data)
{jsonParams.data=data;}
_currentBridge.putData(JSON.stringify(jsonParams),window.location.href,"_successCallback","_failCallback");}}
var _removeData=function(key,_successCallback,_failCallback){if(isAndroid){_currentBridge.removeData(key,window.location.href,"_successCallback","_failCallback");}}
var _clearData=function(_successCallback,_failCallback){if(isAndroid){_currentBridge.clearData(window.location.href,"_successCallback","_failCallback");}}
var _listData=function(_successCallback,_failCallback){if(isAndroid){_currentBridge.listData(window.location.href,"_successCallback","_failCallback");}}
var _getGateWayIp=function(_successCallback,_failCallback){if(isAndroid){_currentBridge.getGateWayIp("_successCallback","_failCallback");}
else if(isIOS)
{var param={};param.request="getGateWayIp";_currentBridge.send(param,_successCallback);}}
var _getCloudStorageData=function(_successCallback,_failCallback){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
_currentBridge.getCloudStorageData(frameName,"_successCallback");}else if(isIOS){var param={};param.request="getCloudStorageData";_currentBridge.send(param,_successCallback);}}
var _getExternalStorageData=function(_successCallback,_failCallback){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
_currentBridge.getExternalStorageStorageData(frameName,"_successCallback");}else if(isIOS){var param={};param.request="getExternalStorageStorageData";_currentBridge.send(param,_successCallback);}}
var _openStorageVideoPlayer=function(type,url,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
if(frameName==null){_currentBridge.openStorageVideoPlayer(type,url,"",success);}else{_currentBridge.openStorageVideoPlayer(type,url,frameName,success);}}else if(isIOS){var param={};param.request="openStorageVideoPlayer";param.type=type;param.url=url;_currentBridge.send(param,eval(success));}}
var _openStorageImageViewer=function(type,url,success,error){if(isAndroid){var frameName=null;try{if(getUrlParams(location.href).frameName){frameName=decodeURIComponent(getUrlParams(location.href).frameName)}else{frameName=null;}}catch(e){frameName=null;}
if(frameName==null){_currentBridge.openStorageImageViewer(type,url,"",success);}else{_currentBridge.openStorageImageViewer(type,url,frameName,success);}}else if(isIOS){var param={};param.request="openStorageImageViewer";param.type=type;param.url=url;_currentBridge.send(param,eval(success));}}