try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'js/fecru-compatibility.js' */
if(jQuery!=undefined&&AJS!=undefined){jQuery=AJS.$};
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'js/rest-service.js' */
AppLinks=AJS.$.extend(window.AppLinks||{},{Event:{NAMESPACE:"applinks",}});AppLinks.Event=AJS.$.extend(window.AppLinks.Event,{PREREADY:AppLinks.Event.NAMESPACE+".preready",READY:AppLinks.Event.NAMESPACE+".ready"});if(AJS.AppLinksInitialisationBinder){AppLinks.initialisationBinder=AJS.AppLinksInitialisationBinder}else{AppLinks.initialisationBinder=function(a){AJS.toInit(a)}}AppLinks.initialisationBinder(function(){var b=AJS.$;AppLinks=b.extend(window.AppLinks||{},{failure:function(e){if(e.status==401){window.location.reload()}else{var c=AppLinks.parseError(e);var d=b(".page-error");if(d.length>0){d.html(c).fadeIn("slow")}else{alert("REST request failed: "+c)}}},jsonRequest:function(d,e,f,g,c){if(f){f=JSON.stringify(f)}b(".page-error").fadeOut("fast");if(!c){c=AppLinks.failure}return jQuery.ajax({url:d,type:e,data:f,dataType:"json",contentType:"application/json; charset=utf-8",cache:false,success:g,error:c})},xmlRequest:function(d,e,f,g,c){if(f){f=JSON.stringify(f)}b(".page-error").fadeOut("fast");if(!c){c=AppLinks.failure}return jQuery.ajax({url:d,type:e,data:f,dataType:"xml",contentType:"application/xml; charset=utf-8",cache:false,success:g,error:c})},parseError:function(f){var c;try{c=JSON.parse(f.responseText)}catch(d){if(f.statusText){return c=f.statusText}else{return f}}if(c.message){if(b.isArray(c.message)){return c.message.join(" ")}return c.message}else{return f.statusText}},put:function(d,e,f,c){return AppLinks.jsonRequest(d,"PUT",e,f,c)},post:function(d,e,f,c){return AppLinks.jsonRequest(d,"POST",e,f,c)},update:function(d,e,c){AppLinks.put(AppLinks.self_link(d),d,e,c)},get:function(d,e,c){return AppLinks.jsonRequest(d,"GET",null,e,c)},getXml:function(d,e,c){return AppLinks.xmlRequest(d,"GET",null,e,c)},self_link:function(e){for(var c=0,f=e.link.length;c<f;c++){var d=e.link[c];if(d.rel=="self"){return d.href}}throw"No self-link found"},del:function(f,e,d){var c;if(typeof(f)=="string"){c=f}else{c=AppLinks.self_link(f)}return AppLinks.jsonRequest(c,"DELETE",null,e,d)},SPI:b.extend({},{API_VERSION:"1.0",REST_RESOURCE_URL:AJS.contextPath()+"/rest/applinks/",BASE_URL:AJS.contextPath()+"/rest/applinks/1.0",setApiVersion:function(c){AppLinks.SPI.API_VERSION=c;AppLinks.SPI.setBaseUrl(AppLinks.SPI.REST_RESOURCE_URL+AppLinks.SPI.API_VERSION)},setBaseUrl:function(c){AppLinks.SPI.BASE_URL=c},getRemoteRestBaseUrl:function(c){return c+"/rest/applinks/"+AppLinks.SPI.API_VERSION},getRemotePluginServletBaseUrl:function(c){return c+"/plugins/servlet"},getAllLinks:function(e,d){var c=AppLinks.SPI.BASE_URL+"/applicationlink";return AppLinks.get(c,e,d)},getAllLinksWithAuthInfo:function(e,d){var c=AppLinks.SPI.BASE_URL+"/listApplicationlinks";return AppLinks.get(c,e,d)},getLinksOfType:function(e,f,d){var c=AppLinks.SPI.BASE_URL+"/applicationlink/type/"+e;return AppLinks.get(c,f,d)},tryToFetchManifest:function(e,f,d){var c=AppLinks.SPI.BASE_URL+"/applicationlinkForm/manifest.json?url="+encodeURIComponent(e);return AppLinks.get(c,f,d)},getManifestFor:function(f,e,d){var c=AppLinks.SPI.BASE_URL+"/manifest/"+f+".json";return AppLinks.get(c,e,d)},getLocalManifest:function(e,d){var c=AppLinks.SPI.BASE_URL+"/manifest.json";return AppLinks.get(c,e,d)},getRemoteManifest:function(e,f,d){var c=AppLinks.SPI.getRemoteRestBaseUrl(e)+"/manifest.json";return AppLinks.get(c,f,d)},getRemoteOAuthConsumerInfo:function(e,f,d){var c=AppLinks.SPI.getRemotePluginServletBaseUrl(e)+"/oauth/consumer-info";return AppLinks.getXml(c,f,d)},createStaticUrlAppLink:function(f,e,d){var c=AppLinks.SPI.BASE_URL+"/applicationlinkForm/createStaticUrlAppLink?typeId="+f;return AppLinks.post(c,null,e,d)},createLink:function(j,h,l,d,i,k,f,m,e){var c=AppLinks.SPI.BASE_URL+"/applicationlinkForm/createAppLink";var g={applicationLink:j,username:h,password:l,createTwoWayLink:d,customRpcURL:i,rpcUrl:k,configFormValues:f};return AppLinks.post(c,g,m,e)},createLinkWithOrphanedTrust:function(j,h,m,d,i,k,f,l,n,e){var c=AppLinks.SPI.BASE_URL+"/applicationlinkForm/createAppLink";var g={applicationLink:j,username:h,password:m,createTwoWayLink:d,customRpcURL:i,rpcUrl:k,configFormValues:f,orphanedTrust:l};return AppLinks.post(c,g,n,e)},verifyTwoWayLinkDetails:function(c,i,j,f,h,e){var d=AppLinks.SPI.BASE_URL+"/applicationlinkForm/details";var g={username:j,password:f,remoteUrl:c,rpcUrl:i};return AppLinks.post(d,g,h,e)},getApplicationLinkInfo:function(e,f,d){var c=AppLinks.SPI.BASE_URL+"/applicationlinkInfo/id/"+e;return AppLinks.get(c,f,d)},deleteLink:function(g,c,f,e){var d=AppLinks.SPI.BASE_URL+"/applicationlink/"+g.id;if(c){d+="?reciprocate=true"}return AppLinks.del(d,f,e)},makePrimary:function(e,d){var c=AppLinks.SPI.BASE_URL+"/applicationlink/primary/"+e.id;return AppLinks.post(c,null,d)},relocate:function(h,f,c,g,e){var d=AppLinks.SPI.BASE_URL+"/relocateApplicationlink/"+h.id+"?newUrl="+encodeURIComponent(f)+"&nowarning="+(c?"true":"false");return AppLinks.post(d,null,g,e)},legacyUpgrade:function(f,e,d){var c=AppLinks.SPI.BASE_URL+"/upgrade/legacy/"+f.id;return AppLinks.post(c,null,e,d)},ualUpgrade:function(g,c,f,e){var d=AppLinks.SPI.BASE_URL+"/upgrade/ual/"+g.id;return AppLinks.post(d,c,f,e)},getEntityTypesForApplicationType:function(f,e,d){var c=AppLinks.SPI.BASE_URL+"/type/entity/"+f;return AppLinks.get(c,e,d)},getLocalEntitiesWithLinksToApplication:function(c,f,e){var d=AppLinks.SPI.BASE_URL+"/entitylink/localEntitiesWithLinksTo/"+c+".json";return AppLinks.get(d,f,e)},getEntityLinksForApplication:function(c,f,e){var d=AppLinks.SPI.BASE_URL+"/entities/"+c+".json";AppLinks.get(d,f,e)},getEntityLinksForApplicationUsingAnonymousAccess:function(c,f,e){var d=AppLinks.SPI.BASE_URL+"/entities/anonymous/"+c+".json";return AppLinks.get(d,f,e)},createNonUalEntityLink:function(l,g,d,f,j,e,k,i){var c=AppLinks.SPI.BASE_URL+"/entitylink/"+l+"/"+g+"?reciprocate=false";var h={applicationId:d,typeId:f,key:j,name:e,isPrimary:false};return AppLinks.put(c,h,k,i)},createEntityLink:function(h,g,d,c,i,f){var e=AppLinks.SPI.BASE_URL+"/entitylink/"+h+"/"+g+"?reciprocate=";e+=(c?"true":"false");return AppLinks.put(e,d,i,f)},getConfiguredEntityLinks:function(f,e,g,d){var c=AppLinks.SPI.BASE_URL+"/entitylink/primaryLinks/"+f+"/"+e+".json";return AppLinks.get(c,g,d)},deleteEntityLink:function(h,g,d,c,i,f){var e=AppLinks.SPI.BASE_URL+"/entitylink/"+h+"/"+g+"?typeId="+d.typeId+"&key="+d.key+"&applicationId="+d.applicationId+"&reciprocate="+c;return AppLinks.del(e,i,f)},makePrimaryEntityLink:function(g,f,c,h,e){var d=AppLinks.SPI.BASE_URL+"/entitylink/primary/"+g+"/"+f+"?typeId="+c.typeId+"&key="+c.key+"&applicationId="+c.applicationId;return AppLinks.post(d,null,h,e)},canDeleteAppLink:function(f,e,d){var c=AppLinks.SPI.BASE_URL+"/permission/reciprocate-application-delete/"+f;return AppLinks.get(c,e,d)},canDeleteEntityLink:function(g,f,c,h,e){var d=AppLinks.SPI.BASE_URL+"/permission/reciprocate-entity-delete/"+c.applicationId+"/"+g+"/"+f+"/"+c.typeId+"/"+c.key;return AppLinks.get(d,h,e)},canCreateReciprocateEntityLink:function(f,e,d){var c=AppLinks.SPI.BASE_URL+"/permission/reciprocate-entity-create/"+f;return AppLinks.get(c,e,d)},processPermissionCode:function(d){var c={noPermission:function(){},missing:function(){},credentialsRequired:function(e){},authenticationFailed:function(e){},noAuthentication:function(e){},noAuthenticationConfigured:function(){},noConnection:function(){},allowed:function(){},unrecognisedCode:function(e){},updateView:function(g,f,e){}};if(!d){d={}}d=b.extend(c,d);return function(f){var e=f.code;if(e=="NO_PERMISSION"){d.noPermission()}else{if(e=="MISSING"){d.missing()}else{if(e=="CREDENTIALS_REQUIRED"){d.credentialsRequired(f.url)}else{if(e=="AUTHENTICATION_FAILED"){d.authenticationFailed(f.url)}else{if(e=="NO_AUTHENTICATION"){d.noAuthentication(f.url)}else{if(e=="NO_AUTHENTICATION_CONFIGURED"){d.noAuthenticationConfigured()}else{if(e=="NO_CONNECTION"){d.noConnection()}else{if(e=="ALLOWED"){d.allowed()}else{d.unrecognisedCode(f.code)}}}}}}}}}},addAuthenticationTrigger:function(e,c,d){if(!d){d={}}if(typeof d.onSuccess=="undefined"){d.onSuccess=function(){location.reload()}}if(typeof d.onFailure=="undefined"){d.onFailure=function(){return true}}b(e).unbind("click");b(e).click(function(){if(d.before){d.before()}AppLinks.authenticateRemoteCredentials(c,d.onSuccess,d.onFailure)})},deleteOrphanedTrust:function(g,e,f,d){var c=AppLinks.SPI.BASE_URL+"/orphaned-trust/"+e+"/"+g;return AppLinks.del(c,f,d)},getOrphanedTrust:function(e,d){var c=AppLinks.SPI.BASE_URL+"/orphaned-trust/";return AppLinks.get(c,e,d)},showCreateEntityLinkSuggestion:function(){return true},getApplicationLink:function(f,e,d){var c=AppLinks.SPI.BASE_URL+"/applicationlink/"+f;return AppLinks.get(c,e,d)},createApplicationLink:function(f,d,i,j,c,k,g){var e=AppLinks.SPI.BASE_URL+"/applicationlink";var h={id:f,name:d,rpcUrl:i,displayUrl:j,typeId:c};return AppLinks.put(e,h,k,g)},createConsumer:function(e,n,d,m,i,l,g,p,h,k,o,f){var c=AppLinks.SPI.BASE_URL+"/applicationlink/"+e+"/authentication/consumer";var j={key:n,name:d,description:m,sharedSecret:i,publicKey:l,outgoing:k,twoLOAllowed:g,executingTwoLOUser:p,twoLOImpersonationAllowed:h};return AppLinks.put(c,j,o,f)},createConsumerAutoConfigure:function(j,i,f,c,h,e){var d=AppLinks.SPI.BASE_URL+"/applicationlink/"+j+"/authentication/consumer?autoConfigure=true";var g={twoLOAllowed:i,executingTwoLOUser:f,twoLOImpersonationAllowed:c};return AppLinks.put(d,g,h,e)},registerProvider:function(i,h,e,g,d){var c=AppLinks.SPI.BASE_URL+"/applicationlink/"+i+"/authentication/provider";var f={config:e,provider:h};return AppLinks.put(c,f,g,d)}},(window.AppLinks&&window.AppLinks.SPI)||{})});var a="applinks";AppLinks.UI={showInfoBox:function(c){b(".aui-message.success").remove();AppLinks.UI.createMessage("success",c,"page-info")},hideInfoBox:function(){b(".aui-message.success").remove()},showErrorBox:function(c){AppLinks.UI.createMessage("error",c,"page-error")},hideErrorBox:function(){b(".aui-message.error").remove()},showWarningBox:function(d){if(b.isArray(d)&&d.length>0){var c=b("<ul></ul>");b(d).each(function(f){c.append(b("<li/>",{text:d[f]}))});var e=b('<div class="page-warning"></div>').append(c);AppLinks.UI.createMessage("warning",e.html(),"page-warning")}else{AppLinks.UI.createMessage("warning",d,"page-warning")}},hideWarningBox:function(){b(".aui-message.warning").remove()},shortenString:function(d,c){if(d.length>c){d=d.substring(0,c)+"..."}return d},createMessage:function(d,e,c){var f=b('<div class="'+c+'">');f.html(e);AJS.messages[d](".applinks-message-bar",{title:"",body:f.wrap("<div></div>").parent().html(),closeable:true})},displayValidationErrorMessages:function(c,f,e){if(b.isArray(e)){b(e).each(function(j,h){var k=b('<div class="error applinks-error">');k.text(h);b(f).find("."+c).append(k)})}else{if(typeof e!="undefined"){var g=b('<div class="error applinks-error">');g.text(e.toString());b(f).find("."+c).append(g)}}},displayValidationError:function(c,d,e){return function(j){if(j.status==401){window.location.reload();return}b(".applinks-error").remove();b(".loading").remove();var h=j.responseText;var i=b.parseJSON(h);var g=i.message;if(typeof i.fields=="undefined"){AppLinks.UI.displayValidationErrorMessages(c,d,g)}else{var f=i.fields;b(f).each(function(k){var l=b('<div class="error applinks-error" id="'+f[k]+'-error">');l.text(g[k]);if(b(d).find("."+f[k]).length>0){l.insertAfter(b(d).find("."+f[k]))}else{l.insertAfter(b(d).find("."+c).append(l))}})}b(d).find("."+c).addClass("fully-populated-errors");if(e){e()}}},addProtocolToURL:function(c){var f=b.trim(c);var e=f.toLowerCase();var d=false;if(e.length>=7){if(e.substring(0,7).indexOf("http")!=-1){d=true}}if(!d){f="http://"+f}return f},prettyJoin:function(d,g,f){if(!f){f=AppLinks.I18n.getText("applinks.and")}var c=d.length;var e="";b.each(d,function(h,i){if(h==(c-1)&&c>1){e+=" "+f+"  "+g(i)}else{e+=g(i);if(h+2<c){e+=", "}}});return e},showLoadingIcon:function(c){b('<span class="loading">&nbsp;</span>').insertAfter(c)},hideLoadingIcon:function(c){b(c).next(".loading").remove()},findUrl:function(f){var e=undefined;var g=f.toLowerCase();var d=g.indexOf("http:");if(d==-1){d=g.indexOf("https:")}if(d>-1){var c=g.indexOf(" ",d);if(c==-1){c=g.length}e=f.substring(d,c)}return e},findApplicationType:function(c){c=c.toLowerCase();if(c.indexOf("jira")!=-1){return"jira"}else{if(c.indexOf("fisheye")!=-1){return"fecru"}else{if(c.indexOf("confluence")!=-1){return"confluence"}else{if(c.indexOf("refapp")!=-1){return"refapp"}else{return undefined}}}}},escapeSelector:function(c){return c.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g,"\\$1")},sanitiseHTML:function(c){var d={"<":"&lt;",'"':"&quot;","&":"&amp;"};return c.replace(/[<"&]/g,function(e){return d[e]})},refreshOrphanedTrust:function(){var c=function(d){b("tr.orphaned-trust-row").each(function(){var j=b(this);var k=j.attr("data-id");var g=j.attr("data-type");var f=false;for(var e=0;e<d.orphanedTrust.length;e++){var h=d.orphanedTrust[e];if(k==h.id&&g==h.type){f=true;break}}if(!f){j.remove();if(d.orphanedTrust.length==0){b(".orphaned-trust-warning").hide()}}})};AppLinks.SPI.getOrphanedTrust(c)},removeCssClass:function(c,d){b(c).removeClass(function(f,h){var g=h.split(" ");var e="";b.each(g,function(i,j){if(j.indexOf(d)!=-1){e=j}});return e})}};(function(){var c=b({});b.each(["bind","unbind","trigger"],function(d,e){AppLinks.UI[e]=function(){return c[e].apply(c,arguments)}})})();AppLinks.I18n={interpolate:function(d,c){if(c){if(!b.isArray(c)){c=[new String(c)]}c.unshift(d);d=AJS.format.apply(AJS,c)}return d},getTextWithPrefix:function(c,d){return AppLinks.I18n.interpolate(appLinksI18n.entries[a+"."+c],d)},getText:function(c,d){return AppLinks.I18n.interpolate(AppLinks.I18n.resolveValue(c),d)},getApplicationTypeName:function(c){return appLinksI18n.entries["applinks.application.type."+c]},getEntityTypeName:function(c){return appLinksI18n.entries["applinks.entity.type."+c]},getPluralizedEntityTypeName:function(c){return appLinksI18n.entries["applinks.entity.type.plural."+c]},getAuthenticationTypeName:function(c){return appLinksI18n.entries["applinks.auth.provider."+c]},resolveValue:function(c){var d=appLinksI18n.entries[c];return typeof d=="undefined"?c:d}};AppLinks.Docs={createDocLink:function(d,e,c){if(!c){c=""}else{c=" "+c}return b("<a/>",{"class":"ual-help-link"+c,href:AppLinks.Docs.getDocHref(d,e),target:"_blank",text:AppLinks.I18n.getText("applinks.help"),title:AppLinks.I18n.getText("applinks.help")})},getDocHref:function(d,e){var c=AppLinks.Docs.resolveValue("applinks.docs.root")+"/"+AppLinks.Docs.resolveValue(d);if(e){c+="#"+AppLinks.Docs.resolveValue(e)}return c},resolveValue:function(c){var d=applinksDocs.entries[c];return typeof d=="undefined"?c:d}};b(document).trigger(AppLinks.Event.PREREADY);b(document).trigger(AppLinks.Event.READY)});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'js/json2.js' */
if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'js/autocomplete.js' */
AJS.$(document).bind(AppLinks.Event.READY,function(){AppLinks.autoComplete={cacheManager:function(c){var a={},b=[],c=c||30;return{get:function(d){return a[d]},put:function(d,e){a[d]=e;b.push(d);if(b.length>c){delete a[b.shift()]}},clear:function(){a={};b=[]}}}};(function(d){var c=function(f){AJS.log("InputDrivenDropDown: truncating text");var h=f.$.closest(".aui-dropdown").width(),g=20;d("a span:not(.icon)",f.$).each(function(){var j=d(this),i=AJS("var","&#8230;"),l=i.width(),k=false;j.wrapInner(d("<em>"));d("em",j).each(function(){var m=d(this);m.show();if(this.offsetLeft+this.offsetWidth>h){var t=this.childNodes,s=false;for(var o=t.length-1;o>=0;o--){var p=t[o],n=1,r=(p.nodeType==3)?"nodeValue":"innerHTML",q=p[r];do{if(n<=q.length){p[r]=q.substr(0,q.length-n++)}else{break}}while(this.offsetLeft+this.offsetWidth+l>h-g);if(n<=q.length){s=true;break}}if(s){k=true}else{m.hide()}}});if(k){j.append(i);this.elpss=i}})};var b=function(f,l){if(!l.length||!l[0]){return}AJS.log("InputDrivenDropDown: highlighting tokens");for(var h=0,j=l.length;h<j;h++){var g=l[h];l[h]=g?g.replace(/[\.\*\+\?\|\(\)\[\]{}\\]/g,"\\$"):""}var k=new RegExp("("+l.join("|")+")","gi");d("li a:not(.dropdown-prevent-highlight) span",f.$).each(function(){var m=d(this),i=m.html().replace(k,"<strong>$1</strong>");m.html(i)})};var e=function(j,g){var i=j.options,h=j.dd;if(h){h.hide();h.$.remove()}i.ajsDropDownOptions=i.ajsDropDownOptions||{};if(i.ajsDropDownOptions&&!i.ajsDropDownOptions.alignment){i.ajsDropDownOptions.alignment="left"}i.ajsDropDownOptions.selectionHandler=i.ajsDropDownOptions.selectionHandler||function(l,k){if(l.type!="click"){l.preventDefault();d("a",k).click();document.location=d("a",k).attr("href")}};i.ajsDropDownOptions.displayHandler=function(k){return AJS.escapeHtml(k.name)};var f=j.dd=new AJS.dropDown(g.matrix,i.ajsDropDownOptions)[0];if(i.ajsDropDownOptions&&i.ajsDropDownOptions.className){f.$.addClass(i.ajsDropDownOptions.className)}if(i.dropdownPlacement){i.dropdownPlacement(f.$)}else{AJS.log("No dropdownPlacement function specified. Appending dropdown to the body.");d("body").append(f.$)}b(f,g.queryTokens||[g.query]);c(f);if(i.dropdownPostprocess){i.dropdownPostprocess(f.$)}f.show(j._effect);if(typeof i.onShow=="function"){i.onShow.call(f,f.$)}return f};function a(g,f){this._effect="appear";this._timer=null;this.id=g;this.options=f;this.inactive=false;this.busy=false;this.cacheManager=AppLinks.autoComplete.cacheManager()}a.prototype.clearCache=function(){this.cacheManager.clear()};a.prototype.change=function(h,g){var f=this;if(h!=f._value||g){f._value=h;f.busy=false;clearTimeout(f._timer);if(g||(/\S{0,}/).test(h)){var i=f.cacheManager.get(h);if(i){e(f,i)}else{f.busy=true;f._timer=setTimeout(function(){f.options.getDataAndRunCallback.call(f,h,f.show)},200)}}else{f.dd&&f.dd.hide()}}};a.prototype.dropDownLength=function(){return this.dd.links?this.dd.links.length:0};a.prototype.dropDownItem=function(f){return this.dropDownLength()>f?this.dd.links[f]:null};a.prototype.hide=function(){this.dd&&this.dd.hide()};a.prototype.remove=function(){var f=this.dd;if(f){this.hide();f.$.remove()}this.inactive=true;this.options.onDeath&&this.options.onDeath()};a.prototype.show=function(g,i,h){if(this.inactive){AJS.log("Quick search abandoned before server response received, ignoring. "+this);return}var f={matrix:g,query:i,queryTokens:h};this.cacheManager.put(i,f);e(this,f);this.busy=false};AppLinks.inputDrivenDropdown=function(f){return new a("inputdriven-dropdown",f)}})(jQuery)});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'js/wizard.js' */
AJS.$(document).bind(AppLinks.Event.PREREADY,function(){(function(d){d.fn.wizard=function(v){var u={width:500,height:350,onshow:function(w,x){return true},aftershow:function(){return true},oncancel:function(){return true},onsubmit:function(){return true},aftersubmit:function(){return true},onnext:function(){return true},onprevious:function(){return true},cancelLabel:AppLinks.I18n.getText("applinks.cancel"),submitLabel:AppLinks.I18n.getText("applinks.create"),nextLabel:AppLinks.I18n.getText("applinks.next"),previousLabel:AppLinks.I18n.getText("applinks.previous"),id:""};if(!v){v={}}v=d.extend(u,v);var t=this;this.each(function(){var D=d(this);var w=new AJS.Dialog(v.width,v.height,v.id);var L=q(w,v.onshow,v.aftershow);var K=c(w,v.oncancel);var z=h(w,v.onsubmit,v.aftersubmit);var M=a(w,v.onprevious);var I=m(w,v.onnext);var G=k(w);var B=o(w);var C=g(w);var H=l(w);var J=s(w);var E=n(w);if(v.showButtonId){d("#"+v.showButtonId).click(L)}var y=f(D);for(var A=0;A<y.length;A++){var F=y[A];j(w,F);if(F.className){w.addHeader(F.title,F.className+"-header")}else{w.addHeader(F.title)}if(A!=0&&d(F.div).attr("previous")!="false"){w.addButton(v.previousLabel,M,"applinks-previous-button")}if(A<y.length-1&&d(F.div).attr("submit")!="true"&&d(F.div).attr("next")!="false"){w.addButton(v.nextLabel,I,"applinks-next-button")}if(d(F.div).attr("submit")=="true"){w.addButton(v.submitLabel,z,"wizard-submit")}if(!w.getPage(A).buttonpanel){w.addButton("",null);d(w.getPage(A).buttonpanel).empty();var x=d('<a class="button-panel-button applinks-cancel-link">'+v.cancelLabel+"</a>");w.getPage(A).buttonpanel.append(x);x.click(K)}else{var x=d('<a class="button-panel-link button-panel-cancel-link applinks-cancel-link">'+v.cancelLabel+"</a>");d(w.getPage(A).buttonpanel).append(x);x.click(K)}if(A<y.length-1){w.addPage()}}t={dialog:w,nextPage:I,prevPage:M,submit:z,cancel:K,show:L,disableNextBtn:G,enableNextBtn:B,disableSubmitBtn:C,enableSubmitBtn:H,disablePreviousBtn:J,enablePreviousBtn:E};w.gotoPage(0);w.gotoPanel(0)});return t};function s(t){return function(){b(r(t,"applinks-previous-button"))}}function n(t){return function(){i(r(t,"applinks-previous-button"))}}function k(t){return function(){b(r(t,"applinks-next-button"))}}function o(t){return function(){i(r(t,"applinks-next-button"))}}function g(t){return function(v){var u=r(t,"wizard-submit");b(u);if(typeof(v)=="undefined"||v){d('<span class="loading">&nbsp;</span>').insertBefore(u)}else{u.parent().find(".loading").remove()}}}function l(t){return function(){var u=r(t,"wizard-submit");i(u);u.parent().find(".loading").remove()}}function r(u,t){return d(u.getPage(u.curpage).buttonpanel).find("."+t)}function p(t){d(t.popup.element).find("form").each(function(){this.reset()})}function i(t){t.attr("disabled",false)}function b(t){t.attr("disabled",true)}function q(t,u,v){return function(w){if(u(t,w)!==false){t.gotoPage(0);t.gotoPanel(0);d(document).unbind("keydown.ual.dialog");d(document).bind("keydown.ual.dialog",e(t));t.show();v()}}}function c(t,u){return function(){if(u(t)!==false){t.hide();p(t)}}}function a(t,u){return function(){if(u(t)!==false){t.prevPage()}}}function m(t,u){return function(){if(u(t)!==false){t.nextPage()}}}function e(t){return function(u){if(u.keyCode===27){p(t);d(document).unbind("keydown.ual.dialog")}}}function h(u,v,t){return function(){if(v(u)!==false){t(u);p(u)}}}function j(v,w){var u=d("> div[panel]",w.div);if(u.length>0){u.each(function(y,z){var x=v.addPanel(z.title,null,z.className,"menu-"+z.id);x.getCurrentPanel().body.append(u[y])})}else{var t=v.addPanel(w.title);t.getCurrentPanel().body.append(w.div)}}function f(v){var u=d(" > div",v);var t=[];u.each(function(x){var w=d(this);t[x]={title:w.attr("title")||null,className:w.attr("class"),div:w}});return t}})(jQuery)});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'js/applinkwizard.js' */
(function(a){AppLinks.Wizard={getWizard:function(){return a("#create-application-link-container").data("wizard")},initAuthenticationUI:function(d){var h=a(d);var f=h.find(".create-reciprocal-link");var c=h.find(".ual-arrow");var l=h.find(".two-way-link-details");var j=h.find(".reciprocal-link-description");var b=h.find(".no-reciprocal-link-description");f.click(function(){if(f.is(":checked")){c.removeClass("no-background");l.show();j.show();b.hide()}else{c.addClass("no-background");l.hide();j.hide();b.show()}});var i=h.find(".same-user-radio-btn");var k=h.find(".different-user-radio-btn");var e=h.find(".different-userbase-image");var g=h.find(".same-userbase-image");i.click(function(){e.addClass("different-userbase-image-grey");g.removeClass("same-userbase-image-grey")});k.click(function(){g.addClass("same-userbase-image-grey");e.removeClass("different-userbase-image-grey")})},initNonUALUI:function(e){var c=a(e);var b=c.find(".application-types");for(var d=0;d<nonAppLinksApplicationTypes.length;d++){a('<option value="'+nonAppLinksApplicationTypes[d].typeId+'">'+nonAppLinksApplicationTypes[d].label+"</option>").appendTo(b)}},fetchManifest:function(e,h,d,b){var i=h.find("#application-url");if(i.val()==""){var c=h.find("#application-types");if(c.val()==""){a('<div class="error applinks-error">'+AppLinks.I18n.getText("applinks.error.url.field.empty")+"</div>").insertAfter(i);return false}var g=function(j){e.enableSubmitBtn();e.enablePreviousBtn();e.cancel();AppLinks.UI.listApplicationLinks(j.applicationLink.id,"new",j)};AppLinks.SPI.createStaticUrlAppLink(c.val(),g,null);return true}var f=AppLinks.UI.addProtocolToURL(i.val());AppLinks.UI.showLoadingIcon(i);var g=function(l){var k=l;e.enableNextBtn();h.find(".loading").remove();h.find(".reciprocal-rpc-url").val(a("#baseUrl").val());if(typeof l.typeId!="undefined"){AppLinks.Wizard.handleUALManifest(k,h);e.dialog.gotoPage(2);h.find(".reciprocal-link-username").focus();if(d){d(k)}}else{if(l.code=="applinks.warning.redirected.host"&&!i.data("hasWarnedAboutRedirection")){AppLinks.UI.displayValidationErrorMessages("manifest-validation-errors",h,l.warning);i.data("hasWarnedAboutRedirection","true");var m=function(){a(i).removeData("hasWarnedAboutRedirection");a(i).unbind("change",m)};i.bind("change",m)}else{if(l.code=="applinks.warning.unknown.host"&&!i.data("forceWhenHostIsOffline")){AppLinks.UI.displayValidationErrorMessages("manifest-validation-errors",h,l.warning);i.data("forceWhenHostIsOffline","true");var j=function(){a(i).removeData("forceWhenHostIsOffline");a(i).unbind("change",j)};i.bind("change",j)}else{if(k.code=="applinks.warning.unknown.host"||k.code=="applinks.warning.redirected.host"){delete k.warning;delete k.code}AppLinks.Wizard.handleNonUALManifest(k,f,h);e.dialog.gotoPage(1);h.find(".application-name").focus();if(b){b(k)}}}}};e.disableNextBtn();AppLinks.SPI.tryToFetchManifest(f,g,AppLinks.UI.displayValidationError("manifest-validation-errors",h,function(){e.enableNextBtn()}));return f},handleUALManifest:function(f,e){var c=a(e);c.find(".remote-app-image").removeClass(function(j,l){var k=l.split(" ");var i="";a.each(k,function(m,n){if(n.indexOf("application-type-image-")!=-1){i=n}});return i});c.find(".remote-app-image").addClass("application-type-image-"+f.typeId);c.find(".link-to-app-type").html(AppLinks.I18n.getText("applinks.create.title.link.to",AppLinks.I18n.getApplicationTypeName(f.typeId)));c.find(".remote-app-name").text(AppLinks.UI.shortenString(f.name,20));c.find(".create-reciprocal-link").attr("checked",true);c.find("#reciprocal-link-back-to-server").html(AppLinks.I18n.getText("applinks.create.link.back.to.server",AJS.escapeHtml(f.name)));var d=["administrator",AJS.escapeHtml(f.name),'<a target="_blank" href="'+AppLinks.Docs.getDocHref("applinks.docs.adding.application.link")+'">',"</a>"];var h=f.applinksVersion.split(".");var b=parseInt(h[0]);var g=parseInt(h[1]);if((f.typeId=="jira"||f.typeId=="confluence")&&(b==3&&g<10)){d[0]="system administrator"}c.find(".reciprocal-link-description").html(AppLinks.I18n.getText("applinks.create.two.way.link",d));c.find(".no-reciprocal-link-description").hide();c.find(".no-reciprocal-link-description").html(AppLinks.I18n.getText("applinks.create.two.way.no.link",AJS.escapeHtml(f.name)));c.find(".reciprocal-link-username").val("");c.find(".reciprocal-link-password").val("");c.find(".ual-arrow").removeClass("no-background");c.find(".two-way-link-details").show();c.find(".reciprocal-link-description").show();c.find(".no-reciprocal-link-description").hide()},handleNonUALManifest:function(d,e,c){var b=a(c);b.find(".application-name").val("");b.find(".application-types option:first-child").attr("selected","selected");b.find(".non-ual-application-url").text(e);if(d.warning){b.find(".create-non-ual-warning").show();b.find(".create-non-ual-warning").html(d.warning)}else{b.find(".create-non-ual-warning").hide()}},checkReciprocalLinkFormThreeStepMode:function(c,d,g,j,f){var h=a(c);if(h.find(".create-reciprocal-link").is(":checked")){var k=a.trim(h.find(".reciprocal-rpc-url").val());if(k==""){a("<div class='error applinks-error'>"+AppLinks.I18n.getText("applinks.error.url.field.empty")+"</div>").insertAfter(h.find(".reciprocal-rpc-url"));if(f){f()}return}var e=h.find(".reciprocal-link-username");var b=h.find(".reciprocal-link-password");if(e.val()==""){a('<div class="error applinks-error">'+AppLinks.I18n.getText("applinks.error.username.empty")+"</div>").insertAfter(e);if(f){f()}return false}var i=function(l){h.find(".same-user-description").find("input").attr("checked",true);h.find(".trust-radio-btn").attr("checked",true);h.find(".same-user-radio-btn").click();g(l)};k=AppLinks.UI.addProtocolToURL(k);AppLinks.SPI.verifyTwoWayLinkDetails(j,k,e.val(),b.val(),i,AppLinks.UI.displayValidationError("two-way-link-errors",c,f));return false}else{d();return false}},checkReciprocalLinkFormTwoStepMode:function(f,h,b,i){var c=a(f);var g=a.trim(c.find(".reciprocal-rpc-url").val());if(g==""){a("<div class='error applinks-error'>"+AppLinks.I18n.getText("applinks.error.url.field.empty")+"</div>").insertAfter(c.find(".reciprocal-rpc-url"));if(i){i()}return}var d=c.find(".reciprocal-link-username");var e=c.find(".reciprocal-link-password");if(d.val()==""){a('<div class="error applinks-error">'+AppLinks.I18n.getText("applinks.error.username.empty")+"</div>").insertAfter(d);if(i){i()}return false}g=AppLinks.UI.addProtocolToURL(g);AppLinks.SPI.verifyTwoWayLinkDetails(h,g,d.val(),e.val(),b,AppLinks.UI.displayValidationError("two-way-link-errors",f,i));return false}}})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'js/urls.js' */
(function(){AppLinks.Urls={generateUrl:function(b,a){var c=b;if(typeof a=="undefined"){return c}else{AJS.$.each(a,function(d,e){if(c.indexOf("?")<0){c=c+"?"}else{c=c+"&"}c=c+d+"="+encodeURIComponent(JSON.stringify(e))});return c}},generateApplinksAdminUrl:function(d,c,a){var b=d+"/plugins/servlet/applinks/listApplicationLinks";if(c==="confluence"){b=d+"/admin/listapplicationlinks.action"}return AppLinks.Urls.generateUrl(b,a)}}})();
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-oauth-ui', location = 'js/oauth-dialog.js' */
AJS.$(document).bind(AppLinks.Event.READY,function(){(function(a){AppLinks.OAuthCallback=function(){};AppLinks.OAuthCallback.prototype.success=function(){this.aouthWindow.close();this.onSuccess()};AppLinks.OAuthCallback.prototype.failure=function(){this.aouthWindow.close();this.onFailure()};AppLinks.OAuthCallback.prototype.show=function(b,d,c){this.onSuccess=d;this.onFailure=c;this.aouthWindow=window.open(b,"com_atlassian_applinks_authentication")};oauthCallback=new AppLinks.OAuthCallback();AppLinks.authenticateRemoteCredentials=function(b,d,c){a(".applinks-error").remove();oauthCallback.show(b,d,c)}})(AJS.$)});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'confluence.extra.jira:common-resources', location = 'templates/extra/jira/common.js' */
AJS.JiraIssues={Remote:{}};var appLinksI18n={entries:{}};jQuery(document).ready(function(){AJS.JiraIssues=jQuery.extend(AJS.JiraIssues||{},{bindOAuthLink:function(c,f){var e={onSuccess:function(){f()},onFailure:function(){}};var d=c.attr("href");c.click(function(g){AppLinks.authenticateRemoteCredentials(d,e.onSuccess,e.onFailure);g.preventDefault()})},getOAuthRealm:function(f){var d=f.getResponseHeader("WWW-Authenticate")||"";var c=/OAuth realm\=\"([^\"]+)\"/;var e=c.exec(d);if(e){return e[1]}else{return null}}});jQuery("a.static-oauth-init").each(function(){AJS.JiraIssues.bindOAuthLink(jQuery(this),function(){window.location.reload()})});jQuery("a.anonymous-init").each(function(f,e){var c=encodeURIComponent(window.location.pathname.replace(Confluence.getContextPath(),""));var d=Confluence.getContextPath()+"/login.action?os_destination="+c;AJS.$(e).attr("href",d)});var a=function(j){var e=AJS.JiraIssues.Remote[j];var h="";for(var g=0;g<e.length;g++){h=h+(e[g].key+(g<e.length-1?",":""))}var d=function(l){var i="issuekey in ("+l+")";var m="/sr/jira.issueviews:searchrequest-xml/temp/SearchRequest.xml?jqlQuery="+encodeURIComponent(i)+"&returnMax=true";var k=contextPath+"/plugins/servlet/issue-retriever?appId="+j+"&url="+encodeURIComponent(m)+"&columns=summary&columns=type&columns=resolution&columns=status";return k};var f=function(k){var i=AJS.$("item",k);i.each(function(){var u=AJS.$("link",this).text();var v=AJS.$("key",this).text();var r=AJS.$("summary",this).text();var s=AJS.$("type",this);var m=AJS.$("resolution",this);var w=m.attr("id")!="-1";var o=AJS.$("status",this);var n=AJS.$(".unknown-jira-issue."+v);for(var p=0;p<n.length;p++){var t=AJS.$("<a style=\"background-image: url('"+s.attr("iconUrl")+'\')" href="'+u+'"></a>');t.text(v);var l=AJS.$('<span class="jira-status"></span>');l.text(o.text().toUpperCase());var q=AJS.$('<span class="jira-issue'+(w?" resolved":"")+'" ></span>');q.append(t);q.append(document.createTextNode(" - "+r+" - "));q.append(l);AJS.$(n[p]).replaceWith(q)}})};var c=d(h);AJS.$.ajax({url:c,success:f,error:function(l){if(l.status==401){var k=AJS.JiraIssues.getOAuthRealm(l);if(k){var i={};AJS.$(e).each(function(){if(!i[this.key]){i[this.key]=true;var m=AJS.$('<span class="oauth-msg"> - <a class="oauth-init" href="'+k+'">'+"Authenticate"+"</a> "+"to see issue details"+"</span>");AJS.$(".unknown-jira-issue."+this.key).addClass("single-issue-oauth").append(m)}});AJS.JiraIssues.bindOAuthLink(AJS.$(".single-issue-oauth a.oauth-init"),function(){window.location.reload()})}}else{if(l.status==400&&e.length>1){AJS.$(e).each(function(){var m=this.key;var n=d(m);AJS.$.ajax({url:n,success:f,error:function(p){var o=AJS.$(".unknown-jira-issue."+m);o.removeClass("single-issue-oauth");AJS.$(".oauth-msg",o).remove();o.addClass("jira-error")}})})}}}})};AJS.$(".unknown-jira-issue").each(function(e,f){var d=AJS.$(f);var g=d.attr("data-app-link");var c=d.attr("data-key");AJS.JiraIssues.Remote[g]=AJS.JiraIssues.Remote[g]||[];AJS.JiraIssues.Remote[g].push({key:c})});for(var b in AJS.JiraIssues.Remote){a(b)}});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'confluence.extra.jira:refresh-resources', location = '/jira/refresh.js' */
(function(b){var c={REFRESH_STATE_STARTED:1,REFRESH_STATE_DONE:2,REFRESH_STATE_FAILED:3,refreshs:[],sortables:[],init:function(){a.getAll().each(function(){c.registerRefresh(this.getRefresh())});b.each(this.refreshs,function(e,f){var g=a.get(f.id);g.getRefreshButton().bind("click",f,c.handleRefreshClick);g.getRefreshLink().bind("click",f,c.handleRefreshClick)});d.getAll().each(function(){c.registerSort(this.getSortable())});b.each(this.sortables,function(f,e){var g=d.get(e.id);g.getHeadersTable().bind("click",e,c.onHeaderClick)})},onHeaderClick:function(m){refeshId=m.data.id;var f="ASC";if(b(this).hasClass("tablesorter-headerAsc")){f="DESC"}var h=b(this).find(".jim-table-header-content").text();var l=b("#refresh-wiki-"+refeshId).val();var g=b("#refresh-page-id-"+refeshId).val();var k=b("#refresh-"+refeshId);var i=new c.Refresh(refeshId,l,g,k.html());var j=a.get(refeshId);j.updateRefreshVisibility(c.REFRESH_STATE_STARTED);c.processRefresh(i,h,f)},replaceRefresh:function(g,e){var f=a.get(g);f.updateRefreshVisibility(c.REFRESH_STATE_DONE);b.each(this.refreshs,function(l,m){if(m.id===g){c.refreshs.splice(l,1);var n=a.get(e);var j=n.getRefresh();c.registerRefresh(j);c.sortables.splice(l,1);var h=d.get(e);var k=h.getSortable();c.registerSort(k);n.getRefreshButton().bind("click",j,c.handleRefreshClick);n.getRefreshLink().bind("click",j,c.handleRefreshClick);h.getHeadersTable().bind("click",k,c.onHeaderClick)}})},registerRefresh:function(e){if(!(e instanceof c.Refresh)){throw "Refresh object must be an instance of RefreshMacro.Refresh"}c.refreshs.push(e)},registerSort:function(e){if(!(e instanceof c.Sortable)){throw "Refresh object must be an instance of RefreshMacro.Refresh"}c.sortables.push(e)},handleRefreshClick:function(h){var f=h.data;var g=a.get(f.id);g.getMacroPanel().html(f.loadingMsg);g.updateRefreshVisibility(c.REFRESH_STATE_STARTED);c.processRefresh(f)},processRefresh:function(g,f,e){var h={};if(arguments.length==1){h={pageId:g.pageId,wikiMarkup:g.wiki}}else{if(arguments.length==3){h={pageId:g.pageId,wikiMarkup:g.wiki,columnName:f,order:e}}}AJS.$.ajax({type:"POST",dataType:"html",url:Confluence.getContextPath()+"/plugins/servlet/jiraRefreshRenderer",data:h,success:function(j){var i=b(j).attr("id");if(i){i=i.replace("refresh-module-","");a.get(g.id).getContentModule().replaceWith(j);new c.CallbackSupport(g).callback(i)}else{new c.CallbackSupport(g).errorHandler(j)}},error:function(j,k,i){new c.CallbackSupport(g).errorHandler(i)}})}};c.Refresh=function(f,e){this.id=f;this.wiki=e;this.pageId=arguments.length>2?arguments[2]:null;this.loadingMsg=arguments.length>3?arguments[3]:null};c.CallbackSupport=function(e){this.refresh=e;this.module=b("#refresh-module-"+e.id)};c.CallbackSupport.prototype={errorHandler:function(f){var g=a.get(this.refresh.id);var e=AJS.format("There was a problem rendering this section: {0}",f);g.getErrorMessagePanel().html(e);g.updateRefreshVisibility(c.REFRESH_STATE_FAILED)},callback:function(e){c.replaceRefresh(this.refresh.id,e)}};var a=function(){if(arguments.length==1){this.id=arguments[0]}};var d=function(){if(arguments.length==1){this.id=arguments[0]}};a.prototype.getRefresh=function(){return new c.Refresh(this.id,this.getWikiMarkup(),this.getPageId(),this.getMacroPanel().html())};d.prototype.getSortable=function(){return new c.Sortable(this.id,b("#refresh-page-id-"+this.id).val(),b("#refresh-"+this.id).html())};a.get=function(f){var e=b("#refresh-"+f);if(!e){return null}return new a(f)};d.get=function(f){var e=b("#refresh-"+f);if(!e){return null}return new d(f)};c.Sortable=function(g,e,f){this.id=g;this.pageId=e;this.loadingMsg=f};d.getAll=function(){return b("div.refresh-macro").map(function(){var e=this.id.replace("refresh-","");return d.get(e)})};a.getAll=function(){return b("div.refresh-macro").map(function(){var e=this.id.replace("refresh-","");return a.get(e)})};a.prototype.getErrorMessagePanel=function(){return b("#error-message-"+this.id)};a.prototype.removeDarkLayer=function(){b("#jim-dark-layout-"+this.id).remove()};a.prototype.displayDarkLayer=function(){var f=b("#refresh-module-"+this.id);var e=f.position();b("<div />",{id:"jim-dark-layout-"+this.id,"class":"jim-sortable-dark-layout",css:{top:e.top+"px",left:e.left+"px",width:f.width()+"px",height:f.height()+"px"}}).appendTo(f.parent())};a.prototype.getMacroPanel=function(){return b("#refresh-"+this.id)};d.prototype.getMacroPanel=function(){return b("#refresh-"+this.id).val()};a.prototype.getContentModule=function(){return b("#refresh-module-"+this.id)};a.prototype.getPageId=function(){return b("#refresh-page-id-"+this.id).val()};d.prototype.getPageId=function(){return b("#refresh-page-id-"+this.id).val()};a.prototype.getWikiMarkup=function(){return b("#refresh-wiki-"+this.id).val()};a.prototype.getRefreshButton=function(){return b("#refresh-issues-button-"+this.id)};d.prototype.getHeadersTable=function(){return b("#jira-issues-"+this.id+" .jira-tablesorter-header")};a.prototype.getRefreshLink=function(){return b("#refresh-issues-link-"+this.id)};a.prototype.getJiraIssuesArea=function(){return b("#jira-issues-"+this.id)};a.prototype.getIssuesCountArea=function(){return b("#total-issues-count-"+this.id)};a.prototype.updateRefreshVisibility=function(e){if(e===c.REFRESH_STATE_STARTED){this.displayDarkLayer()}else{if(e===c.REFRESH_STATE_FAILED){this.getRefreshButton().show();this.getRefreshLink().show();this.removeDarkLayer()}else{if(e===c.REFRESH_STATE_DONE){this.removeDarkLayer()}}}};b(function(){c.init()})})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'confluence.extra.jira:web-resources', location = 'resources/flexigrid/flexigrid.js' */
(function($){$.addFlex=function(t,p){if(t.grid){return false}p=$.extend({height:200,width:"auto",striped:true,novstripe:false,minwidth:30,minheight:80,resizable:true,url:false,method:"POST",dataType:"xml",errormsg:"Connection Error",usepager:false,nowrap:true,page:1,total:1,useRp:true,rp:15,rpOptions:[10,15,20,25,40],title:false,pagestat:"Displaying {from} to {to} of {total} items",procmsg:"Processing, please wait ...",query:"",qtype:"",nomsg:"No items",minColToggle:1,showToggleBtn:true,hideOnSubmit:true,autoload:true,blockOpacity:0.5,onToggleCol:false,onChangeSort:false,onSuccess:false,onSubmit:false,onReload:false},p);$(t).show().attr({cellPadding:0,cellSpacing:0,border:0}).removeAttr("width");var g={hset:{},rePosDrag:function(){var cdleft=0-this.hDiv.scrollLeft;if(this.hDiv.scrollLeft>0){cdleft-=Math.floor(p.cgwidth/2)}$(g.cDrag).css({top:g.hDiv.offsetTop+1});var cdpad=this.cdpad;$("div",g.cDrag).hide();$("thead tr:first th:visible",this.hDiv).each(function(){var n=$("thead tr:first th:visible",g.hDiv).index(this);var cdpos=parseInt($("div",this).width());var ppos=cdpos;if(cdleft==0){cdleft-=Math.floor(p.cgwidth/2)}cdpos=cdpos+cdleft+cdpad;$("div:eq("+n+")",g.cDrag).css({left:cdpos+"px"}).show();cdleft=cdpos})},fixHeight:function(newH){newH=false;if(!newH){newH=$(g.bDiv).height()}var hdHeight=$(this.hDiv).height();$("div",this.cDrag).each(function(){$(this).height(newH+hdHeight)});var nd=parseInt($(g.nDiv).height());if(nd>newH){$(g.nDiv).height(newH).width(200)}else{$(g.nDiv).height("auto").width("auto")}$(g.block).css({height:newH,marginBottom:(newH*-1)});var hrH=g.bDiv.offsetTop+newH;if(p.height!="auto"&&p.resizable){hrH=g.vDiv.offsetTop}$(g.rDiv).css({height:hrH})},dragStart:function(dragtype,e,obj){if(dragtype=="colresize"){$(g.nDiv).hide();$(g.nBtn).hide();var n=$("div",this.cDrag).index(obj);var ow=$("th:visible div:eq("+n+")",this.hDiv).width();$(obj).addClass("dragging").siblings().hide();$(obj).prev().addClass("dragging").show();this.colresize={startX:e.pageX,ol:parseInt(obj.style.left),ow:ow,n:n};$("body").css("cursor","col-resize")}else{if(dragtype=="vresize"){var hgo=false;$("body").css("cursor","row-resize");if(obj){hgo=true;$("body").css("cursor","col-resize")}this.vresize={h:p.height,sy:e.pageY,w:p.width,sx:e.pageX,hgo:hgo}}else{if(dragtype=="colMove"){$(g.nDiv).hide();$(g.nBtn).hide();this.hset=$(this.hDiv).offset();this.hset.right=this.hset.left+$("table",this.hDiv).width();this.hset.bottom=this.hset.top+$("table",this.hDiv).height();this.dcol=obj;this.dcoln=$("th",this.hDiv).index(obj);this.colCopy=document.createElement("div");this.colCopy.className="colCopy";this.colCopy.innerHTML=obj.innerHTML;if($.browser.msie){this.colCopy.className="colCopy ie"}$(this.colCopy).css({position:"absolute","float":"left",display:"none",textAlign:obj.align});$("body").append(this.colCopy);$(this.cDrag).hide()}}}$("body").noSelect()},dragMove:function(e){if(this.colresize){var n=this.colresize.n;var diff=e.pageX-this.colresize.startX;var nleft=this.colresize.ol+diff;var nw=this.colresize.ow+diff;if(nw>p.minwidth){$("div:eq("+n+")",this.cDrag).css("left",nleft);this.colresize.nw=nw}}else{if(this.vresize){var v=this.vresize;var y=e.pageY;var diff=y-v.sy;if(!p.defwidth){p.defwidth=p.width}if(p.width!="auto"&&!p.nohresize&&v.hgo){var x=e.pageX;var xdiff=x-v.sx;var newW=v.w+xdiff;if(newW>p.defwidth){this.gDiv.style.width=newW+"px";p.width=newW}}var newH=v.h+diff;if((newH>p.minheight||p.height<p.minheight)&&!v.hgo){this.bDiv.style.height=newH+"px";p.height=newH;this.fixHeight(newH)}v=null}else{if(this.colCopy){$(this.dcol).addClass("thMove").removeClass("thOver");if(e.pageX>this.hset.right||e.pageX<this.hset.left||e.pageY>this.hset.bottom||e.pageY<this.hset.top){$("body").css("cursor","move")}else{$("body").css("cursor","pointer")}$(this.colCopy).css({top:e.pageY+10,left:e.pageX+20,display:"block"})}}}},dragEnd:function(){if(this.colresize){var n=this.colresize.n;var nw=this.colresize.nw;$("th:visible div:eq("+n+")",this.hDiv).css("width",nw);$("tr",this.bDiv).each(function(){$("td:visible div:eq("+n+")",this).css("width",nw)});this.hDiv.scrollLeft=this.bDiv.scrollLeft;$("div:eq("+n+")",this.cDrag).siblings().show();$(".dragging",this.cDrag).removeClass("dragging");this.rePosDrag();this.fixHeight();this.colresize=false}else{if(this.vresize){this.vresize=false}else{if(this.colCopy){$(this.colCopy).remove();if(this.dcolt!=null){if(this.dcoln>this.dcolt){$("th:eq("+this.dcolt+")",this.hDiv).before(this.dcol)}else{$("th:eq("+this.dcolt+")",this.hDiv).after(this.dcol)}this.switchCol(this.dcoln,this.dcolt);$(this.cdropleft).remove();$(this.cdropright).remove();this.rePosDrag()}this.dcol=null;this.hset=null;this.dcoln=null;this.dcolt=null;this.colCopy=null;$(".thMove",this.hDiv).removeClass("thMove");$(this.cDrag).show()}}}$("body").css("cursor","default");$("body").noSelect(false)},toggleCol:function(cid,visible){var ncol=$("th[axis='col"+cid+"']",this.hDiv)[0];var n=$("thead th",g.hDiv).index(ncol);var cb=$("input[value="+cid+"]",g.nDiv)[0];if(visible==null){visible=ncol.hide}if($("input:checked",g.nDiv).length<p.minColToggle&&!visible){return false}if(visible){ncol.hide=false;$(ncol).show();cb.checked=true}else{ncol.hide=true;$(ncol).hide();cb.checked=false}$("tbody tr",t).each(function(){if(visible){$("td:eq("+n+")",this).show()}else{$("td:eq("+n+")",this).hide()}});this.rePosDrag();if(p.onToggleCol){p.onToggleCol(cid,visible)}return visible},switchCol:function(cdrag,cdrop){$("tbody tr",t).each(function(){if(cdrag>cdrop){$("td:eq("+cdrop+")",this).before($("td:eq("+cdrag+")",this))}else{$("td:eq("+cdrop+")",this).after($("td:eq("+cdrag+")",this))}});if(cdrag>cdrop){$("tr:eq("+cdrop+")",this.nDiv).before($("tr:eq("+cdrag+")",this.nDiv))}else{$("tr:eq("+cdrop+")",this.nDiv).after($("tr:eq("+cdrag+")",this.nDiv))}if($.browser.msie&&$.browser.version<7){$("tr:eq("+cdrop+") input",this.nDiv)[0].checked=true}this.hDiv.scrollLeft=this.bDiv.scrollLeft},scroll:function(){this.hDiv.scrollLeft=this.bDiv.scrollLeft;this.rePosDrag()},addData:function(data){if(p.preProcess){data=p.preProcess(data)}$(".pReload",this.pDiv).removeClass("loading");this.loading=false;if(!data){$(".pPageStat",this.pDiv).html(p.errormsg);return false}if(p.dataType=="xml"){p.total=+$("rows total",data).text()}else{p.total=data.total}if(p.total==0){$("tr, a, td, div",t).unbind();$(t).empty();p.pages=1;p.page=1;this.buildpager();$(".pPageStat",this.pDiv).html(p.nomsg);return false}p.pages=Math.ceil(p.total/p.rp);if(p.dataType=="xml"){p.page=+$("rows page",data).text()}else{p.page=data.page}this.buildpager();var tbody=document.createElement("tbody");if(p.dataType=="json"){$.each(data.rows,function(i,row){var tr=document.createElement("tr");if(i%2&&p.striped){tr.className="erow"}if(row.id){tr.id="row"+row.id}$("thead tr:first th",g.hDiv).each(function(){var td=document.createElement("td");var idx=$(this).attr("axis").substr(3);td.align=this.align;td.innerHTML=row.cell[idx];td.nowrap=this.nowrap;$(tr).append(td);td=null});if($("thead",this.gDiv).length<1){for(idx=0;idx<cell.length;idx++){var td=document.createElement("td");td.innerHTML=row.cell[idx];$(tr).append(td);td=null}}$(tbody).append(tr);tr=null})}else{if(p.dataType=="xml"){i=1;$("rows row",data).each(function(){i++;var tr=document.createElement("tr");if(i%2&&p.striped){tr.className="erow"}var nid=$(this).attr("id");if(nid){tr.id="row"+nid}nid=null;var robj=this;$("thead tr:first th",g.hDiv).each(function(){var td=document.createElement("td");var idx=$(this).attr("axis").substr(3);td.align=this.align;td.innerHTML=$("cell:eq("+idx+")",robj).text();$(tr).append(td);td=null});if($("thead",this.gDiv).length<1){$("cell",this).each(function(){var td=document.createElement("td");td.innerHTML=$(this).text();$(tr).append(td);td=null})}$(tbody).append(tr);tr=null;robj=null})}}$("tr",t).unbind();$(t).empty();$(t).append(tbody);this.addCellProp();this.addRowProp();this.rePosDrag();if(p.onSuccess){p.onSuccess(data)}if(p.hideOnSubmit){$(g.block).remove()}this.hDiv.scrollLeft=this.bDiv.scrollLeft;if($.browser.opera){$(t).css("visibility","visible")}tbody=null;data=null;i=null},changeSort:function(th){if(this.loading){return true}$(g.nDiv).hide();$(g.nBtn).hide();if(p.sortname==$(th).attr("abbr")){if(p.sortorder=="asc"){p.sortorder="desc"}else{p.sortorder="asc"}}$(th).addClass("sorted").siblings().removeClass("sorted");$(".sdesc",this.hDiv).removeClass("sdesc");$(".sasc",this.hDiv).removeClass("sasc");$("div",th).addClass("s"+p.sortorder);p.sortname=$(th).attr("abbr");if(p.onChangeSort){p.onChangeSort(p.sortname,p.sortorder)}else{this.populate()}},buildpager:function(){$(".pcontrol input",this.pDiv).val(p.page);$(".pcontrol span",this.pDiv).html(p.pages);var r1=(p.page-1)*p.rp+1;var r2=r1+p.rp-1;if(p.total<r2){r2=p.total}var stat=p.pagestat;stat=stat.replace(/{from}/,r1);stat=stat.replace(/{to}/,r2);stat=stat.replace(/{total}/,p.total);$(".pPageStat",this.pDiv).html(stat);if(p.pages==1){var groupIndex=0;if(p.useRp){groupIndex--}if(p.searchitems){groupIndex--}$(".pGroup",g.pDiv).each(function(){if(groupIndex>=0&&groupIndex<3){$(this).css("opacity","0.3");$(".pButton",this).each(function(){$(this).css("cursor","default");$(this).hover(function(){$(this).css({border:"0px",width:"22px",height:"22px",cursor:"default"});$("span",this).each(function(){$(this).css({border:"0px",width:"22px",height:"22px",cursor:"default"})})},function(){})});$("input",this).each(function(){$(this).attr("readonly","true")})}groupIndex++})}else{$(g.gDiv).find(".pFirst, .pPrev").each(function(){if(p.page==1){$(this).removeClass("pBtnOver");$(this).css({cursor:"default",opacity:"0.3"})}else{$(this).css({cursor:"pointer",opacity:"1.0"})}});$(g.gDiv).find(".pLast, .pNext").each(function(){if(p.page==p.pages){$(this).removeClass("pBtnOver");$(this).css({cursor:"default",opacity:"0.3"})}else{$(this).css({cursor:"pointer",opacity:"1.0"})}})}},populate:function(){if(this.loading){return true}if(p.onSubmit){var gh=p.onSubmit();if(!gh){return false}}this.loading=true;if(!p.url){return false}$(".pPageStat",this.pDiv).html(p.procmsg);$(".pReload",this.pDiv).addClass("loading");$(g.block).css({top:g.bDiv.offsetTop});if(p.hideOnSubmit){$(this.gDiv).prepend(g.block)}if($.browser.opera){$(t).css("visibility","hidden")}if(!p.newp){p.newp=1}if(p.page>p.pages){p.page=p.pages}var param=[{name:"page",value:p.newp},{name:"rp",value:p.rp},{name:"sortname",value:p.sortname},{name:"sortorder",value:p.sortorder},{name:"query",value:p.query},{name:"qtype",value:p.qtype}];if(p.params){for(var pi=0;pi<p.params.length;pi++){param[param.length]=p.params[pi]}}$.ajax({type:p.method,url:p.url,data:param,dataType:"text",success:function(data){var obj=data;if(p.dataType=="json"&&$.isPlainObject&&!$.isPlainObject(data)){obj=eval("("+data+")")}g.addData(obj)},error:function(xmlhttprequest,textmsg,error){try{if(p.onError){p.onError(xmlhttprequest,textmsg,error)}}catch(e){}}})},doSearch:function(){p.query=$("input[name=q]",g.sDiv).val();p.qtype=$("select[name=qtype]",g.sDiv).val();p.newp=1;this.populate()},changePage:function(ctype){if(this.loading){return true}switch(ctype){case"first":p.newp=1;break;case"prev":if(p.page>1){p.newp=parseInt(p.page)-1}break;case"next":if(p.page<p.pages){p.newp=parseInt(p.page)+1}break;case"last":p.newp=p.pages;break;case"input":var nv=parseInt($(".pcontrol input",this.pDiv).val());if(isNaN(nv)){nv=1}if(nv<1){nv=1}else{if(nv>p.pages){nv=p.pages}}$(".pcontrol input",this.pDiv).val(nv);p.newp=nv;break}if(p.newp==p.page){return false}if(p.onChangePage){p.onChangePage(p.newp)}else{this.populate()}},addCellProp:function(){$("tbody tr td",g.bDiv).each(function(){var tdDiv=document.createElement("div");var n=$("td",$(this).parent()).index(this);var pth=$("th:eq("+n+")",g.hDiv).get(0);if(pth!=null){if(p.sortname==$(pth).attr("abbr")&&p.sortname){this.className="sorted"}$(tdDiv).css({textAlign:pth.align,width:$("div:first",pth)[0].style.width});if(pth.hide){$(this).css("display","none")}}if(this.nowrap==false){$(tdDiv).css("white-space","normal")}if(this.innerHTML==""){this.innerHTML="&nbsp;"}tdDiv.innerHTML=this.innerHTML;var prnt=$(this).parent()[0];var pid=false;if(prnt.id){pid=prnt.id.substr(3)}if(pth!=null){if(pth.process){pth.process(tdDiv,pid)}}$(this).empty().append(tdDiv).removeAttr("width")})},getCellDim:function(obj){var ht=parseInt($(obj).height());var pht=parseInt($(obj).parent().height());var wt=parseInt(obj.style.width);var pwt=parseInt($(obj).parent().width());var top=obj.offsetParent.offsetTop;var left=obj.offsetParent.offsetLeft;var pdl=parseInt($(obj).css("paddingLeft"));var pdt=parseInt($(obj).css("paddingTop"));return{ht:ht,wt:wt,top:top,left:left,pdl:pdl,pdt:pdt,pht:pht,pwt:pwt}},addRowProp:function(){$("tbody tr",g.bDiv).each(function(){$(this).click(function(e){var obj=(e.target||e.srcElement);if(obj.href||obj.type){return true}$(this).toggleClass("trSelected");if(p.singleSelect){$(this).siblings().removeClass("trSelected")}}).mousedown(function(e){if(e.shiftKey){$(this).toggleClass("trSelected");g.multisel=true;this.focus();$(g.gDiv).noSelect()}}).mouseup(function(){if(g.multisel){g.multisel=false;$(g.gDiv).noSelect(false)}}).hover(function(e){if(g.multisel){$(this).toggleClass("trSelected")}},function(){});if($.browser.msie&&$.browser.version<7){$(this).hover(function(){$(this).addClass("trOver")},function(){$(this).removeClass("trOver")})}})},pager:0};if(p.colModel){thead=document.createElement("thead");tr=document.createElement("tr");for(i=0;i<p.colModel.length;i++){var cm=p.colModel[i];var th=document.createElement("th");th.innerHTML=cm.display;if(cm.name&&cm.sortable){$(th).attr("abbr",cm.name)}$(th).attr("axis","col"+i);if(cm.align){th.align=cm.align}if(cm.width){$(th).attr("width",cm.width)}if(cm.hide){th.hide=true}if(cm.process){th.process=cm.process}if(cm.nowrap!=undefined){th.nowrap=cm.nowrap}else{th.nowrap=p.nowrap}$(tr).append(th)}$(thead).append(tr);$(t).prepend(thead)}g.options=p;g.gDiv=document.createElement("div");g.mDiv=document.createElement("div");g.hDiv=document.createElement("div");g.bDiv=document.createElement("div");g.vDiv=document.createElement("div");g.rDiv=document.createElement("div");g.cDrag=document.createElement("div");g.block=document.createElement("div");g.nDiv=document.createElement("div");g.nBtn=document.createElement("div");g.iDiv=document.createElement("div");g.tDiv=document.createElement("div");g.sDiv=document.createElement("div");if(p.usepager){g.pDiv=document.createElement("div")}g.hTable=document.createElement("table");g.gDiv.className="flexigrid";if(p.width!="auto"){g.gDiv.style.width=p.width+"px"}if($.browser.msie){$(g.gDiv).addClass("ie")}if(p.novstripe){$(g.gDiv).addClass("novstripe")}$(t).before(g.gDiv);$(g.gDiv).append(t);if(p.buttons){g.tDiv.className="tDiv";var tDiv2=document.createElement("div");tDiv2.className="tDiv2";for(i=0;i<p.buttons.length;i++){var btn=p.buttons[i];if(!btn.separator){var btnDiv=document.createElement("div");btnDiv.className="fbutton";btnDiv.innerHTML="<div><span>"+btn.name+"</span></div>";if(btn.bclass){$("span",btnDiv).addClass(btn.bclass).css({paddingLeft:20})}btnDiv.onpress=btn.onpress;btnDiv.name=btn.name;if(btn.onpress){$(btnDiv).click(function(){this.onpress(this.name,g.gDiv)})}$(tDiv2).append(btnDiv);if($.browser.msie&&$.browser.version<7){$(btnDiv).hover(function(){$(this).addClass("fbOver")},function(){$(this).removeClass("fbOver")})}}else{$(tDiv2).append("<div class='btnseparator'></div>")}}$(g.tDiv).append(tDiv2);$(g.tDiv).append("<div style='clear:both'></div>");$(g.gDiv).prepend(g.tDiv)}g.hDiv.className="hDiv";$(t).before(g.hDiv);g.hTable.cellPadding=0;g.hTable.cellSpacing=0;$(g.hDiv).append('<div class="hDivBox"></div>');$("div",g.hDiv).append(g.hTable);var thead=$("thead:first",t).get(0);if(thead){$(g.hTable).append(thead)}thead=null;if(!p.colmodel){var ci=0}$("thead tr:first th",g.hDiv).each(function(){var thdiv=document.createElement("div");if($(this).attr("abbr")){$(this).click(function(e){if(!$(this).hasClass("thOver")){return false}var obj=(e.target||e.srcElement);if(obj.href||obj.type){return true}g.changeSort(this)});if($(this).attr("abbr")==p.sortname){this.className="sorted";thdiv.className="s"+p.sortorder}}if(this.hide){$(this).hide()}if(!p.colmodel){$(this).attr("axis","col"+ci++)}$(thdiv).css({textAlign:this.align,width:this.width+"px"});thdiv.innerHTML=this.innerHTML;$(this).empty().append(thdiv).removeAttr("width").mousedown(function(e){g.dragStart("colMove",e,this)}).hover(function(){if(!g.colresize&&!$(this).hasClass("thMove")&&!g.colCopy){$(this).addClass("thOver")}if($(this).attr("abbr")!=p.sortname&&!g.colCopy&&!g.colresize&&$(this).attr("abbr")){$("div",this).addClass("s"+p.sortorder)}else{if($(this).attr("abbr")==p.sortname&&!g.colCopy&&!g.colresize&&$(this).attr("abbr")){var no="";if(p.sortorder=="asc"){no="desc"}else{no="asc"}$("div",this).removeClass("s"+p.sortorder).addClass("s"+no)}}if(g.colCopy){var n=$("th",g.hDiv).index(this);if(n==g.dcoln){return false}if(n<g.dcoln){$(this).append(g.cdropleft)}else{$(this).append(g.cdropright)}g.dcolt=n}else{if(!g.colresize){var nv=$("th:visible",g.hDiv).index(this);var onl=parseInt($("div:eq("+nv+")",g.cDrag).css("left"));var nw=parseInt($(g.nBtn).width())+parseInt($(g.nBtn).css("borderLeftWidth"));nl=onl-nw+Math.floor(p.cgwidth/2);$(g.nDiv).hide();$(g.nBtn).hide();$(g.nBtn).css({left:nl,top:g.hDiv.offsetTop}).show();var ndw=parseInt($(g.nDiv).width());$(g.nDiv).css({top:g.bDiv.offsetTop});if((nl+ndw)>$(g.gDiv).width()){$(g.nDiv).css("left",onl-ndw+1)}else{$(g.nDiv).css("left",nl)}if($(this).hasClass("sorted")){$(g.nBtn).addClass("srtd")}else{$(g.nBtn).removeClass("srtd")}}}},function(){$(this).removeClass("thOver");if($(this).attr("abbr")!=p.sortname){$("div",this).removeClass("s"+p.sortorder)}else{if($(this).attr("abbr")==p.sortname){var no="";if(p.sortorder=="asc"){no="desc"}else{no="asc"}$("div",this).addClass("s"+p.sortorder).removeClass("s"+no)}}if(g.colCopy){$(g.cdropleft).remove();$(g.cdropright).remove();g.dcolt=null}})});g.bDiv.className="bDiv";$(t).before(g.bDiv);$(g.bDiv).css({height:(p.height=="auto")?"auto":p.height+"px"}).scroll(function(e){g.scroll()}).append(t);if(p.height=="auto"){$("table",g.bDiv).addClass("autoht")}g.addCellProp();g.addRowProp();var cdcol=$("thead tr:first th:first",g.hDiv).get(0);if(cdcol!=null){g.cDrag.className="cDrag";g.cdpad=0;g.cdpad+=(isNaN(parseInt($("div",cdcol).css("borderLeftWidth")))?0:parseInt($("div",cdcol).css("borderLeftWidth")));g.cdpad+=(isNaN(parseInt($("div",cdcol).css("borderRightWidth")))?0:parseInt($("div",cdcol).css("borderRightWidth")));g.cdpad+=(isNaN(parseInt($("div",cdcol).css("paddingLeft")))?0:parseInt($("div",cdcol).css("paddingLeft")));g.cdpad+=(isNaN(parseInt($("div",cdcol).css("paddingRight")))?0:parseInt($("div",cdcol).css("paddingRight")));g.cdpad+=(isNaN(parseInt($(cdcol).css("borderLeftWidth")))?0:parseInt($(cdcol).css("borderLeftWidth")));g.cdpad+=(isNaN(parseInt($(cdcol).css("borderRightWidth")))?0:parseInt($(cdcol).css("borderRightWidth")));g.cdpad+=(isNaN(parseInt($(cdcol).css("paddingLeft")))?0:parseInt($(cdcol).css("paddingLeft")));g.cdpad+=(isNaN(parseInt($(cdcol).css("paddingRight")))?0:parseInt($(cdcol).css("paddingRight")));$(g.bDiv).before(g.cDrag);var cdheight=$(g.bDiv).height();var hdheight=$(g.hDiv).height();$(g.cDrag).css({top:-hdheight+"px"});$("thead tr:first th",g.hDiv).each(function(){var cgDiv=document.createElement("div");$(g.cDrag).append(cgDiv);if(!p.cgwidth){p.cgwidth=$(cgDiv).width()}$(cgDiv).css({height:cdheight+hdheight}).mousedown(function(e){g.dragStart("colresize",e,this)});if($.browser.msie&&$.browser.version<7){g.fixHeight($(g.gDiv).height());$(cgDiv).hover(function(){g.fixHeight();$(this).addClass("dragging")},function(){if(!g.colresize){$(this).removeClass("dragging")}})}})}if(p.striped){$("tbody tr:odd",g.bDiv).addClass("erow")}if(p.resizable&&p.height!="auto"){g.vDiv.className="vGrip";$(g.vDiv).mousedown(function(e){g.dragStart("vresize",e)}).html("<span></span>");$(g.bDiv).after(g.vDiv)}if(p.resizable&&p.width!="auto"&&!p.nohresize){g.rDiv.className="hGrip";$(g.rDiv).mousedown(function(e){g.dragStart("vresize",e,true)}).html("<span></span>").css("height",$(g.gDiv).height());if($.browser.msie&&$.browser.version<7){$(g.rDiv).hover(function(){$(this).addClass("hgOver")},function(){$(this).removeClass("hgOver")})}$(g.gDiv).append(g.rDiv)}if(p.usepager){g.pDiv.className="pDiv";g.pDiv.innerHTML='<div class="pDiv2"></div>';$(g.bDiv).after(g.pDiv);var html=' <div class="pGroup"> <div class="pFirst pButton"><span></span></div><div class="pPrev pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pcontrol">Page <input type="text" size="4" value="1" /> of <span> 1 </span></span></div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pNext pButton"><span></span></div><div class="pLast pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pReload pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pPageStat"></span></div>';$("div",g.pDiv).html(html);$(".pReload",g.pDiv).click(function(){if(p.onReload){var gh=p.onReload();if(!gh){return false}}g.populate()});$(".pFirst",g.pDiv).click(function(){g.changePage("first")});$(".pPrev",g.pDiv).click(function(){g.changePage("prev")});$(".pNext",g.pDiv).click(function(){g.changePage("next")});$(".pLast",g.pDiv).click(function(){g.changePage("last")});$(".pcontrol input",g.pDiv).keydown(function(e){if(e.keyCode==13){g.changePage("input")}});$(".pReload",g.pDiv).hover(function(){$(this).addClass("pBtnOver")},function(){$(this).removeClass("pBtnOver")});$(".pFirst, .pPrev").hover(function(){if(!(p.page&&p.page==1)){$(this).addClass("pBtnOver")}},function(){$(this).removeClass("pBtnOver")});$(".pLast, .pNext").hover(function(){if(!(p.page&&p.pages&&p.page==p.pages)){$(this).addClass("pBtnOver")}},function(){$(this).removeClass("pBtnOver")});if(p.useRp){var opt="";for(var nx=0;nx<p.rpOptions.length;nx++){if(p.rp==p.rpOptions[nx]){sel='selected="selected"'}else{sel=""}opt+="<option value='"+p.rpOptions[nx]+"' "+sel+" >"+p.rpOptions[nx]+"&nbsp;&nbsp;</option>"}$(".pDiv2",g.pDiv).prepend("<div class='pGroup'><select name='rp'>"+opt+"</select></div> <div class='btnseparator'></div>");$("select",g.pDiv).change(function(){if(p.onRpChange){p.onRpChange(+this.value)}else{p.newp=1;p.rp=+this.value;g.populate()}})}if(p.searchitems){$(".pDiv2",g.pDiv).prepend("<div class='pGroup'> <div class='pSearch pButton'><span></span></div> </div>  <div class='btnseparator'></div>");$(".pSearch",g.pDiv).click(function(){$(g.sDiv).slideToggle("fast",function(){$(".sDiv:visible input:first",g.gDiv).trigger("focus")})});g.sDiv.className="sDiv";sitems=p.searchitems;var sopt="";for(var s=0;s<sitems.length;s++){if(p.qtype==""&&sitems[s].isdefault==true){p.qtype=sitems[s].name;sel='selected="selected"'}else{sel=""}sopt+="<option value='"+sitems[s].name+"' "+sel+" >"+sitems[s].display+"&nbsp;&nbsp;</option>"}if(p.qtype==""){p.qtype=sitems[0].name}$(g.sDiv).append("<div class='sDiv2'>Quick Search <input type='text' size='30' name='q' class='qsbox' /> <select name='qtype'>"+sopt+"</select> <input type='button' value='Clear' /></div>");$("input[name=q],select[name=qtype]",g.sDiv).keydown(function(e){if(e.keyCode==13){g.doSearch()}});$("input[value=Clear]",g.sDiv).click(function(){$("input[name=q]",g.sDiv).val("");p.query="";g.doSearch()});$(g.bDiv).after(g.sDiv)}}$(g.pDiv,g.sDiv).append("<div style='clear:both'></div>");if(p.title){g.mDiv.className="mDiv";g.mDiv.innerHTML='<div class="ftitle">'+p.title+"</div>";$(g.gDiv).prepend(g.mDiv);if(p.showTableToggleBtn){$(g.mDiv).append('<div class="ptogtitle" title="Minimize/Maximize Table"><span></span></div>');$("div.ptogtitle",g.mDiv).click(function(){$(g.gDiv).toggleClass("hideBody");$(this).toggleClass("vsble")})}}g.cdropleft=document.createElement("span");g.cdropleft.className="cdropleft";g.cdropright=document.createElement("span");g.cdropright.className="cdropright";g.block.className="gBlock";var gh=$(g.bDiv).height();var gtop=g.bDiv.offsetTop;$(g.block).css({width:g.bDiv.style.width,height:gh,background:"white",position:"relative",marginBottom:(gh*-1),zIndex:1,top:gtop,left:"0px"});$(g.block).fadeTo(0,p.blockOpacity);if($("th",g.hDiv).length){g.nDiv.className="nDiv";g.nDiv.innerHTML="<table cellpadding='0' cellspacing='0'><tbody></tbody></table>";$(g.nDiv).css({marginBottom:(gh*-1),display:"none",top:gtop}).noSelect();var cn=0;$("th div",g.hDiv).each(function(){var kcol=$("th[axis='col"+cn+"']",g.hDiv)[0];var chk='checked="checked"';if(kcol.style.display=="none"){chk=""}$("tbody",g.nDiv).append('<tr><td class="ndcol1"><input type="checkbox" '+chk+' class="togCol" value="'+cn+'" /></td><td class="ndcol2">'+this.innerHTML+"</td></tr>");cn++});if($.browser.msie&&$.browser.version<7){$("tr",g.nDiv).hover(function(){$(this).addClass("ndcolover")},function(){$(this).removeClass("ndcolover")})}$("td.ndcol2",g.nDiv).click(function(){if($("input:checked",g.nDiv).length<=p.minColToggle&&$(this).prev().find("input")[0].checked){return false}return g.toggleCol($(this).prev().find("input").val())});$("input.togCol",g.nDiv).click(function(){if($("input:checked",g.nDiv).length<p.minColToggle&&this.checked==false){return false}$(this).parent().next().trigger("click")});$(g.gDiv).prepend(g.nDiv);$(g.nBtn).addClass("nBtn").html("<div></div>").attr("title","Hide/Show Columns").click(function(){$(g.nDiv).toggle();return true});if(p.showToggleBtn){$(g.gDiv).prepend(g.nBtn)}}$(g.iDiv).addClass("iDiv").css({display:"none"});$(g.bDiv).append(g.iDiv);$(g.bDiv).hover(function(){$(g.nDiv).hide();$(g.nBtn).hide()},function(){if(g.multisel){g.multisel=false}});$(g.gDiv).hover(function(){},function(){$(g.nDiv).hide();$(g.nBtn).hide()});$(document).mousemove(function(e){g.dragMove(e)}).mouseup(function(e){g.dragEnd()}).hover(function(){},function(){g.dragEnd()});if($.browser.msie&&$.browser.version<7){$(".hDiv,.bDiv,.mDiv,.pDiv,.vGrip,.tDiv, .sDiv",g.gDiv).css({width:"100%"});$(g.gDiv).addClass("ie6");if(p.width!="auto"){$(g.gDiv).addClass("ie6fullwidthbug")}}g.rePosDrag();g.fixHeight();t.p=p;t.grid=g;if(p.url&&p.autoload){g.populate()}return t};var docloaded=false;$(document).ready(function(){docloaded=true});$.fn.flexigrid=function(p){return this.each(function(){if(!docloaded){$(this).hide();var t=this;$(document).ready(function(){$.addFlex(t,p)})}else{$.addFlex(this,p)}})};$.fn.flexReload=function(p){return this.each(function(){if(this.grid&&this.p.url){this.grid.populate()}})};$.fn.flexOptions=function(p){return this.each(function(){if(this.grid){$.extend(this.p,p)}})};$.fn.flexToggleCol=function(cid,visible){return this.each(function(){if(this.grid){this.grid.toggleCol(cid,visible)}})};$.fn.flexAddData=function(data){return this.each(function(){if(this.grid){this.grid.addData(data)}})};$.fn.noSelect=function(p){if(p==null){prevent=true}else{prevent=p}if(prevent){return this.each(function(){if($.browser.msie||$.browser.safari){$(this).bind("selectstart",function(){return false})}else{if($.browser.mozilla){$(this).css("MozUserSelect","none");$("body").trigger("focus")}else{if($.browser.opera){$(this).bind("mousedown",function(){return false})}else{$(this).attr("unselectable","on")}}}})}else{return this.each(function(){if($.browser.msie||$.browser.safari){$(this).unbind("selectstart")}else{if($.browser.mozilla){$(this).css("MozUserSelect","inherit")}else{if($.browser.opera){$(this).unbind("mousedown")}else{$(this).removeAttr("unselectable","on")}}}})}}})(jQuery);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'confluence.extra.jira:web-resources', location = 'templates/extra/jira/jiraIssues.js' */
jQuery(document).ready(function(){var a=jQuery.extend(window.JiraIssues||{},{ADG_ENABLED:AJS.Meta.getNumber("build-number")>=4000,ADG_FONT_SIZE_OVER_FLEXIGRID_FONT_SIZE_RATIO:14/11,fixMenusShowingUnderWidgetInIE:function(){if(jQuery.browser.msie){jQuery("ul.ajs-menu-bar li.ajs-menu-item").each(function(){jQuery(this).hover(function(){jQuery("div.ajs-drop-down",jQuery(this)).parents().each(function(){var c=jQuery(this);var b=c.css("position");if(b&&b!="auto"){c.addClass("ajs-menu-bar-z-index-fix-for-ie")}})},function(){jQuery("div.ajs-drop-down",jQuery(this)).parents().removeClass("ajs-menu-bar-z-index-fix-for-ie")})})}},onSuccessFunction:function(d){if(!jQuery("fieldset input[name='height']",d).length){var b=jQuery(".bDiv table[id^='jiraissues_table']",d)[0];var e=b.grid;var c=b.clientHeight+jQuery(".hDiv",d)[0].clientHeight;jQuery(".bDiv",d).css("height",c+"px");e.options.height=c;e.fixHeight(c)}},onErrorFunction:function(h,c,b,n,f){var o=jQuery("#"+c);var g=b+": ";if(n.status=="200"){g+=f}else{g+=n.responseText}var i=n.getResponseHeader("WWW-Authenticate")||"";if(n.status=="401"&&i.indexOf("OAuth")!=-1){var m=/OAuth realm\=\"([^\"]+)\"/;var e=m.exec(i);if(e){o.empty();a.bigMessageFunction(c,'<a class="oauth-init" href="'+e[1]+'">'+"Authenticate"+"</a> "+"to retrieve your issues"+"</span>");jQuery(".bmDiv",h).css({"z-index":2});var j={onSuccess:function(){window.location.reload()},onFailure:function(){}};var l=jQuery(".oauth-init",o.parent());var d=l.attr("href");l.click(function(p){AppLinks.authenticateRemoteCredentials(d,j.onSuccess,j.onFailure);p.preventDefault()});AJS.$(".gBlock").remove()}}else{if(n.status=="400"){a.bigMessageFunction(c,"The JIRA server was not able to process the search. This may indicate a problem with the syntax of this macro. Alternatively, if this table is requesting specific issue keys, you may not have permission to view one of these issues. ")}else{var k=jQuery("iframe.jiraissues_errorMsgSandbox",h);k.load(function(){var r=this.contentWindow||this.contentDocument;var q=jQuery((r.document?r.document:r).body);jQuery("a",q).each(function(){this.target="_top"});jQuery(".pPageStat",h).empty().text(q.text());var p=jQuery("div.bmDiv",h)[0];k.removeClass("hidden");k.css({height:p.clientHeight+"px",width:p.clientWidth+"px"})});k[0].src=jQuery("fieldset input[name='retrieverUrlHtml']",h).val();a.bigMessageFunction(c,k)}}jQuery(h).find(".pReload").removeClass("loading");o[0].grid.loading=false;jQuery(h).find(".pButton").each(function(){jQuery(this).removeClass("pBtnOver");jQuery(this).css({cursor:"default",opacity:"0.3"})});jQuery(h).find("span.pcontrol input").attr("readonly","true")},onReloadFunction:function(b,d,c){jQuery(".bmDiv",d).remove();jQuery(".bmDistance",d).remove();c.onSubmit=function(){a.reloadOnSubmitFunction(b,c);return true}},reloadOnSubmitFunction:function(b,c){c.params=[{name:"useCache",value:false}];c.onSubmit=function(){a.onSubmitFunction(b,c);return true}},onSubmitFunction:function(b,c){c.params=[{name:"useCache",value:b}]},showTrustWarningsFunction:function(d,c){var b=jQuery(d).children(".trusted_warnings");if(c.trustedMessage){b.find("td:last").html(c.trustedMessage);b.css("display","block")}else{b.css("display","none")}},preProcessFunction:function(e,b,d,c,f){if(d){a.showTrustWarningsFunction(e,c)}if(c.total==0){jQuery(".pPageStat",e).html(f);a.bigMessageFunction(b,f);jQuery(".pReload",e).removeClass("loading");return}},bigMessageFunction:function(e,f){var d=jQuery("<div></div>");var b=jQuery("<div></div>");d.addClass("bmDistance");b.addClass("bmDiv");if(typeof f=="string"){b.html("<p><strong>"+f+"</strong></p>")}else{f.appendTo(b)}var c=jQuery("#"+e);c.after(b).after(d)},getParamsFrom:function(c){var b={};c.children("input").each(function(){b[jQuery(this).attr("name")]=jQuery(this).attr("value")});return b},initializeColumnWidth:function(f,p){var d={},m=function(i){return a.ADG_ENABLED?Math.round(i*a.ADG_FONT_SIZE_OVER_FLEXIGRID_FONT_SIZE_RATIO):i};if(!(p&&p.length)){return d}var h=37,n=11,k=f.width()-(h+(p.length*n)),j=false,q=false,o=0,c=m(140);for(var l=0,e=p.length;l<e;l++){var g=p[l].name;switch(g){case"summary":j=true;o++;break;case"description":q=true;o++;break;case"type":o++;d[g]=30;k-=30;break;case"priority":o++;d[g]=50;k-=50;break;case"status":o++;d[g]=m(100);k-=m(100);break;case"key":o++;d[g]=m(90);k-=m(90);break;case"comments":case"attachments":case"version":case"component":case"resolution":o++;d[g]=m(80);k-=m(80);break;default:d[g]=c}}if(j||q){k-=(c*(p.length-o));var b=250;if(j&&q){d.summary=Math.max(k/2,b);d.description=Math.max(k/2,b)}else{if(j){d.summary=Math.max(k,b)}else{d.description=Math.max(k,b)}}}else{if(!j&&!q&&(p.length>o)){c=k/(p.length-o);for(l=0;l<e;l++){if(!{resolution:true,key:true,type:true,priority:true,status:true}[p[l]]){d[p[l]]=c}}}}return d}});a.fixMenusShowingUnderWidgetInIE();jQuery(".jiraissues_table").each(function(f,j){var k=jQuery(j),h=k.children("fieldset"),e=a.getParamsFrom(h),c="jiraissues_table_"+f;k.append('<table id="'+c+'" style="display:none"></table>');k.css("width",e.width);var d=[];h.children(".columns").each(function(l){var m=jQuery(this).hasClass("nowrap");d[l]={display:this.name,name:this.value,nowrap:m,sortable:true,align:"left"}});var b=a.initializeColumnWidth(k,d);jQuery.each(d,function(l,m){m.width=b[m.name]});var g=jQuery("<div></div>");jQuery("<a></a>").attr({rel:"nofollow",href:e.clickableUrl}).text(e.title).appendTo(g);jQuery("#"+c).flexigrid({url:e.retrieverUrlHtml,method:"GET",dataType:"json",colModel:d,sortname:e.sortField,sortorder:e.sortOrder,usepager:true,title:g.html(),page:parseInt(e.requestedPage,10),useRp:false,rp:parseInt(e.resultsPerPage,10),showTableToggleBtn:true,height:(function(){return e.height?parseInt(e.height,10):480})(),onSuccess:function(){a.onSuccessFunction(j)},onSubmit:function(){a.onSubmitFunction(e.useCache,this);return true},preProcess:function(i){a.preProcessFunction(j,c,e.showTrustWarnings,i,e.nomsg);return i},onError:function(m,l,i){a.onErrorFunction(j,c,e.jiraissuesError,m,l,i)},onReload:function(){a.onReloadFunction(e.useCache,j,this);return true},errormsg:e.errormsg,pagestat:e.pagestat,procmsg:e.procmsg,nomsg:e.nomsg})});jQuery(".jiraissues_count").each(function(b,d){var c=jQuery(d);jQuery.ajax({cache:false,type:"GET",url:c.find(".url").text(),data:{useCache:c.find(".use-cache").text(),rp:c.find(".rp").text(),showCount:"true"},success:function(f){var e=c.find(".result");if(f>1){e.text(AJS.format("{0} issues",f))}else{e.text(AJS.format("{0} issue",f))}e.removeClass("hidden");jQuery(".calculating, .error, .data",c).remove()},error:function(h){var f=jQuery(".error",c).removeClass("hidden"),g=h.getResponseHeader("WWW-Authenticate")||"",j=false;if(h.status===401&&g.indexOf("OAuth")!=-1){var e=/OAuth realm\=\"([^\"]+)\"/,i=e.exec(g);if(i){f.empty().append(AJS.$("<a/>",{href:i[1],"class":"oauth-init"}).text("Authenticate").click(function(){AppLinks.authenticateRemoteCredentials(i[1],function(){window.location.reload()},function(){});return false})).append(AJS.$("<span/>",{text:" "+"to retrieve your issues"}));j=true}}if(!j){f.text(AJS.format(f.text(),h.status))}jQuery(".calculating, .result, .data",c).remove()}})})});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'confluence.web.resources:about', location = '/includes/js/about/about-page.js' */
AJS.toInit(function(d){var a=d("#confluence-about-link"),b;var c=function(){var f=AJS.Meta.get("version-number").match(/^\d+\.\d+/),h="Atlassian Confluence and Confluence Plugins",g=AJS.Meta.get("context-path")+"/aboutconfluence.action",e=new AJS.ConfluenceDialog({id:"about-confluence-dialog",closeOnOutsideClick:true});e.addHeader(h);e.addCancel("Close",function(){e.hide()});d.get(g,function(i){e.addPanel("default",i,"about-page-content")});return e};a.click(function(f){f.preventDefault();d(this).removeClass("interactive");if(b==null){b=c()}b.show()})});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'confluence.web.resources:analytics-support', location = '/includes/js/analytics-support/analytics-common.js' */
(function(f){AJS.Confluence.Analytics=AJS.Confluence.Analytics||{};var g=/([^\?]+)[\?]?([^#]*)[#]?(.*)/;var c=["source","urlPath","queryParams","anchor"];var b;var i;function j(o){var n={};var q=g.exec(o);if(q){for(var p=0;p<c.length;p++){n[c[p]]=q[p]}n.queryParams=d(n.queryParams)}return n}function k(n){if(f.isEmptyObject(n)){return""}else{return(!n.urlPath?"":n.urlPath)+(f.isEmptyObject(n.queryParams)?"":"?"+m(n.queryParams))+(!n.anchor?"":"#"+n.anchor)}}function d(r){var q={};if(r){var p=r.split("&");for(var o=0;o<p.length;o++){var n=p[o].split("=");if(!q[n[0]]){q[n[0]]=[]}q[n[0]].push(p[o].substring(n[0].length+1))}}return q}function m(o){var q="";for(var p in o){for(var n=0;n<o[p].length;n++){q+="&"+p;if(o[p][n]){q+="="+o[p][n]}}}return q.substring(1)}function a(o,p){var n=j(o);if(!f.isEmptyObject(n)){n.queryParams.src=[p]}return k(n)}function e(){if("undefined"===typeof b){b=f('script[src$="/ga.js"]').length>0}return b}function h(){if("undefined"===typeof i){var n=f._data(window,"events");i=n.analytics&&n.analytics.length>0}return i}function l(){if(e()){if(_gaq){_gaq.push(function(){window.history.replaceState(null,"",AJS.Confluence.Analytics.srcRemovedUrl(document.URL))})}else{AJS.log("ERROR: Could not queue src parameter URL clean up task: _gaq is not defined but Google Analytics is activated.")}}else{window.history.replaceState(null,"",AJS.Confluence.Analytics.srcRemovedUrl(document.URL))}}AJS.Confluence.Analytics.setAnalyticsSource=function(n,o){if(e()||h()){n.attr("href",function(q,p){return a(p,encodeURIComponent(o))})}};AJS.Confluence.Analytics.srcRemovedUrl=function(o){var n=j(o);delete n.queryParams.src;return k(n)};AJS.Confluence.Analytics.srcParamValues=function(n){var o=j(n).queryParams;return o&&o.src?o.src:[]};AJS.toInit(function(p){var n=AJS.Confluence.Analytics.srcParamValues(document.URL);for(var o=0;o<n.length;o++){AJS.trigger("analytics",{name:"confluence.viewpage.src."+n[o]})}if(window.history&&window.history.replaceState){l()}})}(AJS.$));
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-software-blueprints:requirements-resources', location = 'com/atlassian/confluence/plugins/requirements/soy/how-to.soy' */
// This file was automatically generated from how-to.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.Requirements == 'undefined') { Confluence.Blueprints.Requirements = {}; }


Confluence.Blueprints.Requirements.howTo = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="howto-content-wrapper"><h2>', soy.$$escapeHtml("With product requirements you can\u2026"), '</h2><ol class="howto-steps horizontal"><li class="howto-step"><div><h3>', soy.$$escapeHtml("Define document properties"), '</h3><p class="howto-description">', soy.$$escapeHtml("Add properties like status and owner to your document to make it easy to organise and sort your product requirements."), '</p></div></li><li class="howto-step"><div><h3>', soy.$$escapeHtml("Create requirements"), '</h3><p class="howto-description">', soy.$$escapeHtml("The customisable template brings structure and consistency to your product requirements. If you use JIRA you can create stories right from the requirements page."), '</p></div></li><li class="howto-step"><div><h3>', soy.$$escapeHtml("Track progress"), '</h3><p class="howto-description">', soy.$$escapeHtml("See the status of all your requirements at a glance. Sort by properties like status and release, or access linked JIRA issues from your requirements pages."), '</p></div></li></ol></div>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-software-blueprints:requirements-resources', location = 'com/atlassian/confluence/plugins/requirements/soy/user-mention.soy' */
// This file was automatically generated from user-mention.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.Requirements == 'undefined') { Confluence.Templates.Requirements = {}; }


Confluence.Templates.Requirements.userMention = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.username) ? '<p><ac:link><ri:user ri:username="' + soy.$$escapeHtml(opt_data.username) + '" /></ac:link></p>' : '<p><ac:placeholder ac:type="mention">' + soy.$$escapeHtml("Person responsible") + '</ac:placeholder></p>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'confluence.extra.jira:jqlHelper', location = '/jira/jqlhelper.js' */
AJS.JQLHelper=(function(){var a=/^\s*((key|issuekey)\s*=\s*)?([A-Z]+)([0-9]+)?([A-Z]+)?-([0-9]+)\s*$/i;var e=/\s*([A-Z][A-Z]+)-[0-9]+\s*/;var j=/(issue|searchrequest)-xml/i;var g=/\/(i#)?browse\/([\x00-\x19\x21-\x22\x24\x27-\x3E\x40-\x7F]+-[0-9]+$)/i;var i=/\/jira\.issueviews:issue-xml\/([\x00-\x19\x21-\x22\x24\x27-\x3E\x40-\x7F]+-[0-9]+)\//;var c=/(jqlQuery|jql)\s*\=([^&]+)/i;var h=/(\?|&)(requestId|filter)\=([^&]+)/i;var b=/(searchrequest-xml\/)([0-9]+)\/SearchRequest/i;var k=/(requestId|filter)\=([^&]+)/i;var d=/=|!=|~|>|<|!~| is | in | was | changed /i;var f=function(p){var m="";var q=g.exec(p);if(q){m="key="+q[2]}else{var n=c.exec(p);if(n){m=n[2]}else{var o=e.exec(p);if(o){m="key="+o[0]}}}m=m.replace(/\+/g," ");return m};var l=function(n,p){var m;var o=decodeURIComponent(n);var q=function(r){if(r.jql){m=r.jql}};AJS.JQLHelper.getJqlQueryFromJiraFilter(o,p,q);return m};return{isSingleKeyJQLExp:function(m){return a.exec(m)},isMultipleSingleKeyJQLExp:function(p){var o=p.split(",");for(var n in o){var m=AJS.$.trim(o[n]);if(!AJS.JQLHelper.isSingleKeyJQLExp(m)){return false}}return true},isIssueUrlOrXmlUrl:function(m){if(g.test(m)||j.test(m)||c.test(m)||i.test(m)){return true}return false},isFilterUrl:function(m){return h.test(m)||b.test(m)},getFilterFromFilterUrl:function(m){if(h.test(m)){var n=h.exec(m);return n[2]+"="+n[3]}else{if(b.test(m)){return"filter="+b.exec(m)[2]}}},getJqlQueryFromJiraFilter:function(p,q,r,o){var m=(h.exec(p)||b.exec(p))[2];var n="/rest/jiraanywhere/1.0/jira/appLink/"+q+"/filter/"+m;AJS.$.ajax({async:false,dataType:"json",url:Confluence.getContextPath()+n,success:r,error:o})},findServerIndexFromUrl:function(m,p){if(typeof(p)!=="undefined"||p.length>0){var o=m.toLowerCase();for(var n=0;n<p.length;n++){if(o.indexOf(p[n].url.toLowerCase())==0){if(m.charAt(p[n].url.length)=="/"){return n}}}}return -1},getJqlQueryFromUrl:f,getJqlAndServerIndexFromUrl:function(n,o){var m={};m.serverIndex=this.findServerIndexFromUrl(n,o);m.jqlQuery=f(n);return m},checkQueryType:function(m){if(!AJS.Editor.JiraAnalytics){return undefined}if(!m||AJS.$.trim(m).length==0){return}if(m.indexOf("http")!=0){return AJS.Editor.JiraAnalytics.linkTypes.jqlDirect}else{if(m.indexOf("jira.issueviews:searchrequest-xml")!=-1||m.indexOf("jira.issueviews:issue-xml")!=-1){return AJS.Editor.JiraAnalytics.linkTypes.xml}else{if(m.indexOf("jira.issueviews:searchrequest-rss")!=-1){return AJS.Editor.JiraAnalytics.linkTypes.rss}else{if(m.indexOf("filter=")!=-1||m.indexOf("filter\\=")!=-1){return AJS.Editor.JiraAnalytics.linkTypes.filter}else{return AJS.Editor.JiraAnalytics.linkTypes.jql}}}}},convertToJQL:function(n,p){var o;if(AJS.$.trim(n)!==""){if(n.indexOf("http")===0&&this.isFilterUrl(n)){o=l(n,p)}else{if(n.indexOf("http")===0&&this.isIssueUrlOrXmlUrl(n)){var m=f(decodeURIComponent(n));if(m.length>0){o=m}}else{if(n.indexOf("http")!==0&&n.match(d)){o=n}else{if(n.match(e)){o="key="+n}else{o='summary ~ "'+n+'" OR description ~ "'+n+'"'}}}}}return o}}})();
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-software-blueprints:jirareports-resources', location = 'com/atlassian/confluence/plugins/jirareports/js/jirareports.js' */
Confluence.Blueprints.JiraReport=(function(f){var r;var u;var n="jirareports-changelog-static";var b="jirareports-changelog-dynamic";var k="-1";var g=-1;var s=6109;var d=6155;var m="Status report is not available for your version of JIRA. Upgrade to JIRA 6.1.1 or later to use this report.";var p;var a=function(v){var x=Confluence.Blueprints.JiraReport.servers;for(var w=0;w<x.length;w++){if(x[w].id===v){return x[w]}}return null};var i=function(v,y){var x;for(var w=0;w<u.length;w++){x=u[w];if(typeof x[v]==="function"){if(y){x[v].apply(null,Array.prototype.slice.call(y))}else{x[v]()}}}};var h=function(v){v.authUrl=null;r.oauthForm.addClass("hidden");i("onAuthenticatedSuccess")};var j=function(B,y,x){var z=[];if((B.val()!==k)&&!B.select2("enable")){z.push("project = '",q(B.val()),"'");if(!y.select2("enable")){var w=y.find('option[value!="'+k+'"]:selected');var C=w.length;if(C>0){var v="";for(var A=0;A<w.length;A++){v=v+c(w[A])+", "}z.push(" AND fixVersion in (",v.substring(0,v.length-2),")")}}}return z.join("")};var c=function(w){var v="";var x=q(w.text);if(x==="No Version"&&w.value==="EMPTY"){v=w.value}else{v="'"+x+"'"}return v};var q=function(v){return v.replace(/'/g,"\\'")};var o=function(w){var v=w.buildNumber;return v==g||(v>=s&&v<d)};var e=function(w){if(r.selectedReportType!==Confluence.Blueprints.JiraReport.REPORT_TYPE_STATUS){return false}var v=o(w);if(v){r.errorForm.html(Confluence.Blueprints.JiraReports.Dialog.warning({infor:m}));i("disableForm");l()}else{i("enableForm");t()}return v};var l=function(){p&&p.attr("disabled","disabled")};var t=function(){p&&p.removeAttr("disabled","disabled")};return{REPORT_TYPE_CHANGE_LOG:1,REPORT_TYPE_STATUS:2,prepareData:function(){AJS.$.ajax({dataType:"json",url:Confluence.getContextPath()+"/rest/jiraanywhere/1.0/servers",async:false}).done(function(v){Confluence.Blueprints.JiraReport.servers=v;AJS.$.each(v,function(w,x){if(x.selected){Confluence.Blueprints.JiraReport.primaryServer=x}})})},init:function(w,v){u=v;r={server:w.$container.find("#jira-reports-servers"),project:w.$container.find("#jira-reports-project"),version:w.$container.find("#jira-reports-fix-version"),title:w.$container.find("#jira-reports-page-title"),spaceKey:w.wizardData.spaceKey,textSearch:w.$container.find("#jira-query"),oauthForm:w.$container.find("#oauth-form"),errorForm:w.$container.find("#error-form"),switchSearchType:w.$container.find("#switch-search-type")};p=AJS.$("#create-dialog .create-dialog-create-button:visible");r.switchSearchType.click(function(y){var x=r.switchSearchType.hasClass("simple");if(x){r.textSearch.val(j(r.project,r.version,r.selectedReportType));r.textSearch.removeClass("placeholded");r.switchSearchType.removeClass("simple").addClass("advanced").text("Switch to simple")}else{r.switchSearchType.removeClass("advanced").addClass("simple").text("Switch to advanced")}w.$container.find("#advanced-jira-search").toggleClass("hidden",!x);w.$container.find("#simple-jira-search").toggleClass("hidden",x);w.$container.find("#inforWarning").empty()});i("init",[r,w.$container]);r.server.change(function(){var x=a(r.server.val());if(e(x)){return}Confluence.Blueprints.JiraReport.checkOauthForm(x);i("onServerChange")})},loadServers:function(){var v=Confluence.Blueprints.JiraReport.servers;if(v.length===1){r.server.parent().addClass("hidden")}r.server.append(Confluence.Blueprints.JiraReports.Dialog.serverOptions({servers:v}));if(e(Confluence.Blueprints.JiraReport.primaryServer)){return}Confluence.Blueprints.JiraReport.checkOauthForm(Confluence.Blueprints.JiraReport.primaryServer);r.project.trigger("servers-load-completed")},validateForm:function(v){if(p&&p.is(":disabled")){return false}if(v.$container.find("#simple-jira-search").hasClass("hidden")){return Confluence.Blueprints.JiraReport.DynamicDialog.validateForm(v)}return Confluence.Blueprints.JiraReport.StaticDialog.validateForm(v)},checkOauthForm:function(v){if(v&&v.authUrl){r.oauthForm.removeClass("hidden");r.oauthForm.click(function(w){AppLinks.authenticateRemoteCredentials(v.authUrl,function(){h(v)});w.preventDefault()})}else{r.oauthForm.addClass("hidden")}},setupChangeLogSubmitData:function(v){if(r.switchSearchType.hasClass("simple")){v.pageData.contentTemplateKey=n;v.pageData.multiVersion=Confluence.Blueprints.JiraReport.StaticDialog.getMultiVersion()}else{v.pageData.contentTemplateKey=b}},setupStatusReportSubmitData:function(v){if(r.switchSearchType.hasClass("simple")){v.pageData.dialogMode="simple";v.pageData["jira-query"]=Confluence.Blueprints.JiraReport.StaticDialog.getStaticJiraQuery(v)}},setSelectedReportType:function(v){r.selectedReportType=v}}})(AJS.$);Confluence.Blueprints.JiraReport.StaticDialog=(function(j){var b;var n=Confluence.getContextPath()+"/rest/jirareports/1.0/";var k=401;var p="-1";var F=5;var h=4;var x=255;var E="\u2026";var t={};var l=function(G){G.empty();G.append(Confluence.Blueprints.JiraReports.Dialog.defaultOption({defaultValue:p}));G.auiSelect2("val",p);B(G)};var D=function(G){G.empty();G.auiSelect2("val",p)};var r=function(G){D(G);G.auiSelect2("enable",false)};var i=function(G){G.empty();G.append(Confluence.Blueprints.JiraReports.Dialog.loadingOption());G.auiSelect2("val","loading")};var z=function(G){G.auiSelect2("enable",true)};var s=function(G){G.auiSelect2("enable",false)};var m=function(G,H){AJS.$(G).attr("tabindex",H)};var f=function(G,H){if(H===b.project.val()){b.errorForm.empty();D(b.version);b.version.append(Confluence.Blueprints.JiraReports.Dialog.versionOptions({versions:G}));z(b.version)}};var a=function(H,G){if(G===b.server.val()){b.errorForm.empty();l(b.project);b.project.append(Confluence.Blueprints.JiraReports.Dialog.projectOptions({projects:H}));z(b.project)}};var c=function(){b.project.bind("servers-load-completed",Confluence.Blueprints.JiraReport.StaticDialog.loadProjects);b.project.change(function(){if(b.project.val()===p){D(b.version);o()}else{B(b.project);Confluence.Blueprints.JiraReport.StaticDialog.loadVersions();q(b.project.find("option:selected").text())}});b.project.on("select2-opening",function(){if(b.project.val()===p){b.project.find('option[value="'+p+'"]').addClass("hidden")}});b.version.change(function(){var G=b.project.find("option:selected").text();if(!b.version.val()){q(G)}else{if(b.version.val().length>1){q(G)}else{var H=b.version.find("option:selected").text();q(G+" "+H,true)}}});b.title.change(function(){u()})};var o=function(){b.title.val("");B(b.title)};var u=function(G){if(G===undefined){G=b.title.val()}if(G===""){return true}if(!Confluence.Blueprint.canCreatePage(b.spaceKey,G)){e(b.title,"A page with this name already exists.");return false}B(b.title);return true};var w=function(H,G){if(j.trim(H.val())===p){e(b.project,G);return false}return true};var C=function(H){if(!Confluence.Blueprint.canCreatePage(b.spaceKey,H)){var I;for(var G=1;G<=F;G++){I=H.concat(" (",G,")");if(Confluence.Blueprint.canCreatePage(b.spaceKey,I)){B(b.title);return I}}e(b.title,"A page with this name already exists.")}else{B(b.title)}return H};var q=function(H,G){if(G&&H.length<x-h){b.title.val(C(H));return}if(H.length>x){H=H.substr(0,x-1)+E}b.title.val(H);u(H)};var e=function(G,H){G.focus().siblings(".error").text(H)};var B=function(G){G.siblings(".error").empty()};var g=function(H,G){return{width:"300px",containerCssClass:H,dropdownCssClass:G,formatResult:function(I,J,K){J.attr("title",I.text);return j.fn.select2.defaults.formatResult.apply(this,arguments)}}};var y=function(G,H){AJS.$(G+" .select2-input").attr("placeholder",H)};var v=function(G){if(G==="timeout"){return "Connection Timeout."}return "Can not connect to JIRA server."};var d=function(H,G){l(H);b.errorForm.empty();b.errorForm.append(Confluence.Blueprints.JiraReports.Dialog.showErrorMessage({message:v(G)}));z(H)};var A=function(G){return G.select2("val")};return{init:function(G){b=G;b.project.auiSelect2(g("select2-project-container","select2-project-dropdown"));b.version.auiSelect2(g("select2-version-container","select2-version-dropdown"));y(".select2-project-dropdown","Filter Project ...");y(".select2-version-dropdown","Filter Fix Version ...");m(".select2-project-container > .aui-select2-choice",10);m(".select2-version-container > .aui-select2-choice",10);c(this);t={}},validateForm:function(H){H.$container.find(".error").empty();var I=w(b.project,"Project field is required");var G=u()&&I;if(G){H.pageData["jira-server-name"]=b.server.find("option:selected").text();H.pageData["jira-server-id"]=b.server.find("option:selected").val();return true}return false},onServerChange:function(){this.loadProjects(false);r(b.version);o()},onAuthenticatedSuccess:function(){this.loadProjects(true);o()},loadProjects:function(H){var G=b.server.val();s(b.project);i(b.project);if(!H&&t[G]){a(t[G],G);r(b.version)}else{AJS.$.ajax({dataType:"json",url:n+"appLink/"+G+"/projects",timeout:AJS.Meta.getNumber("connection-timeout")}).done(function(I){t[G]=I;a(I,G)}).fail(function(K,J){if(K.status===k){var I=j.parseJSON(K.responseText);t[G]=I;a(I,G)}else{if(G===b.server.val()){d(b.project,J)}}})}},loadVersions:function(){s(b.version);i(b.version);var G=b.project.val();AJS.$.ajax({dataType:"json",url:n+"appLink/"+b.server.val()+"/project/"+G+"/versions",timeout:AJS.Meta.getNumber("connection-timeout")}).done(function(H){f(H,G)}).fail(function(I,H){if(I.status===k){f(j.parseJSON(I.responseText),G)}else{if(G===b.project.val()){d(b.version,H)}}})},getStaticJiraQuery:function(I){var H="";if(b.project.val()!==p){H+="project = "+b.project.val();if(b.version.val()){var G=[];j(b.version.val()).each(function(J,K){G.push("'"+b.version.find("option[value='"+K+"']").text()+"'")});H+=" and fixVersion in ("+G.join(",")+")"}}return H},getMultiVersion:function(){return A(b.version).join(",")},disableForm:function(){l(b.project);s(b.project);r(b.version);o();b.title.attr("disabled","disabled")},enableForm:function(){z(b.project);z(b.version);b.title.removeAttr("disabled","disabled")}}})(AJS.$);Confluence.Blueprints.JiraReport.DynamicDialog=(function(i){var e,c;var j=/=|!=|~|>|<|!~| is | in | was | changed /i;var n=/\s*([A-Z][A-Z]+)-[0-9]+\s*/;var d=function(q){q.focus().siblings(".error").empty()};var m=function(){c.find("#inforWarning").empty()};var b=function(q){m();c.find("#inforWarning").append(q)};var h=function(q){var r;if(q.serverIndex!==-1){e.server.val(Confluence.Blueprints.JiraReport.servers[q.serverIndex].id);e.server.trigger("change");if(q.jqlQuery.length>0){r=q.jqlQuery}}else{b(Confluence.Blueprints.JiraReports.Dialog.noServerWarning({isAdministrator:AJS.Meta.get("is-confluence-admin"),contentPath:Confluence.getContextPath()}))}return r};var p=function(q){var r=decodeURIComponent(q);var t=AJS.JQLHelper.findServerIndexFromUrl(r,Confluence.Blueprints.JiraReport.servers);if(t!==-1){e.server.val(Confluence.Blueprints.JiraReport.servers[t].id);e.server.trigger("change");var s=function(v){b(Confluence.Blueprints.JiraReports.Dialog.warning({infor:"The URL filter is not available to you, perhaps it has been deleted or had its permissions changed."}));e.textSearch.val('summary ~ "'+q+'" OR description ~ "'+q+'"')};var u=function(v){if(v.jql){e.textSearch.val(v.jql)}else{s()}};AJS.JQLHelper.getJqlQueryFromJiraFilter(r,Confluence.Blueprints.JiraReport.servers[t].id,u,s)}else{b(Confluence.Blueprints.JiraReports.Dialog.noServerWarning({isAdministrator:AJS.Meta.get("is-confluence-admin"),contentPath:Confluence.getContextPath()}));e.textSearch.val('summary ~ "'+q+'" OR description ~ "'+q+'"')}};var g=function(q,r){return q.hasClass("placeholded")&&q.val()===r};var k=function(r){if(i.trim(r)!==""&&!g(e.textSearch,"Search URL, saved filter, JQL ")){if(r.indexOf("http")===0&&AJS.JQLHelper.isFilterUrl(r)){p(r)}else{if(r.indexOf("http")===0&&AJS.JQLHelper.isIssueUrlOrXmlUrl(r)){var q=AJS.JQLHelper.getJqlAndServerIndexFromUrl(decodeURIComponent(r),Confluence.Blueprints.JiraReport.servers);if(h(q)){e.textSearch.val(q.jqlQuery)}else{e.textSearch.val('summary ~ "'+r+'" OR description ~ "'+r+'"')}}else{if(r.indexOf("http")!==0&&r.match(j)){e.textSearch.val(r)}else{if(r.match(n)){e.textSearch.val("key="+r)}else{e.textSearch.val('summary ~ "'+r+'" OR description ~ "'+r+'"')}}}}}};var f=function(){d(e.textSearch);m();setTimeout(function(){var q=e.textSearch.val();k(q)},100)};var o=function(q,r){var s=c.find(q);if(i.trim(s.val())===""){s.focus().siblings(".error").html(r);return false}return true};var a=function(){if(e.title.val()!==""&&!Confluence.Blueprint.canCreatePage(e.spaceKey,e.title.val())){return false}return true};var l=function(){e.textSearch.val("");e.textSearch.siblings(".error").empty();m()};return{init:function(q,r){e=q;c=r;e.textSearch.bind("paste",f);e.textSearch.bind("change",f)},onServerChange:l,validateForm:function(q){if(!o("#jira-query","JIRA Query field is required")){return false}if(!a()){return false}q.pageData["jira-server-name"]=e.server.find("option:selected").text();q.pageData["jira-server-id"]=e.server.find("option:selected").val();if(!e.textSearch.val().match(j)){k(e.textSearch.val());q.pageData["jira-query"]=e.textSearch.val()}return true},disableForm:function(){l();e.textSearch.attr("disabled","disabled")},enableForm:function(){e.textSearch.removeAttr("disabled","disabled")}}})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-software-blueprints:jirareports-resources', location = 'com/atlassian/confluence/plugins/jirareports/js/jirareports-wizard.js' */
(function(c){function h(m,l){var k=c("#jirareports-select-type");var j=k.find(".template");if(Confluence.Blueprints.JiraReport.servers.length===0){j.addClass("disable disable-element");var i=Confluence.Blueprints.JiraReports.Dialog.showMessageNoAppLink({isAdministrator:AJS.Meta.get("is-confluence-admin"),contentPath:Confluence.getContextPath()});l.$container.find(".warningAppLink").append(i);c(".create-dialog-create-button:visible").addClass("hidden")}else{j.click(function(){c(this).siblings().removeClass("selected");c(this).addClass("selected")}).dblclick(function(){c(".create-dialog-create-button:visible").click()});k.attr("tabindex",0).keydown(function(o){var n=k.find(".selected");if(o.keyCode==38){o.preventDefault();n.removeClass("selected");n.prev().length?n.prev().addClass("selected"):j.last().addClass("selected")}else{if(o.keyCode==40){o.preventDefault();n.removeClass("selected");n.next().length?n.next().addClass("selected"):j.first().addClass("selected")}}});setTimeout(function(){j.first().click();k.focus()},0)}}function g(k,j){var i=j.$container.find(".selected").attr("id");if(i==="jirareports-select-changelog"){j.nextPageId="changelogPageId";j.wizardData.jiraReportType=Confluence.Blueprints.JiraReport.REPORT_TYPE_CHANGE_LOG}else{if(i==="jirareports-select-statusreport"){j.nextPageId="statusreportPageId";j.wizardData.jiraReportType=Confluence.Blueprints.JiraReport.REPORT_TYPE_STATUS}else{return false}}}function e(k,j){var i=[Confluence.Blueprints.JiraReport.DynamicDialog,Confluence.Blueprints.JiraReport.StaticDialog];Confluence.Blueprints.JiraReport.init(j,i);Confluence.Blueprints.JiraReport.setSelectedReportType(j.wizardData.jiraReportType);Confluence.Blueprints.JiraReport.loadServers()}function f(j,i){e(j,i);c("#jira-report-type").parents(".field-group").addClass("hidden")}function d(j,i){if(Confluence.Blueprints.JiraReport.validateForm(i)){Confluence.Blueprints.JiraReport.setupChangeLogSubmitData(i);return true}return false}function a(j,i){if(!Confluence.Blueprints.JiraReport.validateForm(i)){return false}Confluence.Blueprints.JiraReport.setupStatusReportSubmitData(i);i.pageData["statusreport-type"]="jirareports-statusreport-dynamic";i.pageData["issues-list-type"]="dynamic";i.pageData.contentTemplateKey="jirareports-statusreport"}function b(){Confluence.Blueprints.JiraReport.prepareData()}Confluence.Blueprint.setWizard("com.atlassian.confluence.plugins.confluence-software-blueprints:jirareports-item",function(i){i.on("pre-render.selectreportPageId",b);i.on("post-render.selectreportPageId",h);i.on("submit.selectreportPageId",g);i.on("post-render.changelogPageId",e);i.on("submit.changelogPageId",d);i.on("post-render.statusreportPageId",f);i.on("submit.statusreportPageId",a)})})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-software-blueprints:jirareports-resources', location = 'com/atlassian/confluence/plugins/jirareports/soy/dialogs.soy' */
// This file was automatically generated from dialogs.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.JiraReports == 'undefined') { Confluence.Blueprints.JiraReports = {}; }
if (typeof Confluence.Blueprints.JiraReports.Dialog == 'undefined') { Confluence.Blueprints.JiraReports.Dialog = {}; }


Confluence.Blueprints.JiraReports.Dialog.selectreport = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="template-select-container-body loadable"><div class="warningAppLink"></div><ol id="jirareports-select-type" class="jirareports-templates"><li class="template" id="jirareports-select-changelog"><img class="template-preview" src="', soy.$$escapeHtml("/confluence"), '/download/resources/com.atlassian.confluence.plugins.confluence-software-blueprints:jirareports-resources/icon-changelog-48.png"><div class="template-meta"><div class="template-name">', soy.$$escapeHtml("Change log"), '</div><div class="template-description">', soy.$$escapeHtml("Create a report with a list of JIRA issues for a project, release or specific query."), '</div></div></li><li class="template" id="jirareports-select-statusreport"><img class="template-preview" src="', soy.$$escapeHtml("/confluence"), '/download/resources/com.atlassian.confluence.plugins.confluence-software-blueprints:jirareports-resources/icon-statusreport-48.png"><div class="template-meta"><div class="template-name">', soy.$$escapeHtml("Status report"), '</div><div class="template-description">', soy.$$escapeHtml("Create a report with charts to communicate the status of your release with stakeholders."), '</div></div></li></ol></div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.changelog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form class="aui change-log-form" method="post" action="#"><fieldset><div id="error-form"/><div class="hidden" id="oauth-form"><div class="aui-message-container"><div class="aui-message info"><span class="aui-icon icon-info"></span>', soy.$$escapeHtml("You are viewing this selected server as anonymous. You may want to"), '&nbsp;<a href="#">', soy.$$escapeHtml("Login \x26 Approve"), '</a></div></div></div><div class="field-group"><label for="jira-reports-servers">', soy.$$escapeHtml("Server"), '</label><select id="jira-reports-servers" class="select long-field" name="jira-reports-servers" /></div><div id="simple-jira-search"><div class="field-group"><label for="jira-reports-project">', soy.$$escapeHtml("Project"), '<span class="aui-icon icon-required"> required</span></label><select id="jira-reports-project" name="jira-reports-project"><option value=\'-1\' selected=\'selected\'>', soy.$$escapeHtml("Select"), '</option></select><div class="error"></div></div><div class="field-group" id="versions-field"><label for="jira-reports-fix-version">', soy.$$escapeHtml("Fix version(s)"), '</label><select id="jira-reports-fix-version" multiple="true" class="select long-field" disabled="disabled" placeholder="', soy.$$escapeHtml("Leave empty to get all versions"), '"></select></div></div><div id="advanced-jira-search" class="hidden"><div class="field-group"><label for="jira-query">', soy.$$escapeHtml("JIRA Query"), '<span class="aui-icon icon-required"> required</span></label><input id="jira-query" class="text long-field" type="text" name="jira-query" title="name" placeholder="', soy.$$escapeHtml("Search URL, saved filter, JQL "), '" maxlength="255"><div id="inforWarning" class="error"></div></div></div><div class="field-group"><a id="switch-search-type" href="#" class="simple">', soy.$$escapeHtml("Switch to advanced"), '</a></div><div class="field-group"><br><label for="jira-reports-page-title">', soy.$$escapeHtml("Title"), '</label><input id="jira-reports-page-title" class="text long-field" type="text" name="title" title="title" maxlength="255"><div class="error"></div></div><div id="advanced-jira-search" class="hidden"><div class="field-group"><div class="checkbox"><input class="checkbox" type="checkbox" id="jira-report-type" name="jira-report-type" checked="checked" value="dynamic" /><label for="jira-report-type">', soy.$$escapeHtml("Automatically update issue status and"), '</label></br><label for="jira-report-type">', soy.$$escapeHtml("summaries from JIRA"), '</label></div></div></div></fieldset></form>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.leftmenuchangelog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li class="page-menu-item selected" id="simple-jira-search"><button class="item-button">', soy.$$escapeHtml("jirareports.changelog.menu.simple.search"), '</button></li><li class="page-menu-item" id="advanced-jira-search"><button class="item-button">', soy.$$escapeHtml("jirareports.changelog.menu.advanced.search"), '</button></li>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.statusreport = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div><div>Change log report</div><div>Status report</div></div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.warning = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-message-container"><div class="aui-message warning">', soy.$$escapeHtml(opt_data.infor), '<span class="aui-icon icon-warning"></span></div></div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.noServerWarning = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-message-container"><div class="aui-message warning">', (opt_data.isAdministrator == true) ? AJS.format("No server found match with your URL. \x3ca id\x3d\x22open_applinks\x22 target\x3d\x22_blank\x22 href\x3d\x22{0}/admin/listapplicationlinks.action\x22\x3e Click here \x3c/a\x3e to set this up",opt_data.contentPath) : AJS.format("No server found match with your URL. Contact your administrator \x3ca id\x3d\x22open_applinks\x22 target\x3d\x22_blank\x22 href\x3d\x22{0}/wiki/contactadministrators.action\x22\x3e here \x3c/a\x3e to set this up for you.",opt_data.contentPath), '<span class="aui-icon icon-warning"></span></div></div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.showMessageNoAppLink = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-message-container"><div class="aui-message error">', (opt_data.isAdministrator == true) ? AJS.format("Your confluence has not been configured to connect to JIRA. Click \x3ca id\x3d\x22open_applinks\x22 target\x3d\x22_blank\x22 href\x3d\x22{0}/admin/listapplicationlinks.action\x22\x3e here \x3c/a\x3e to set your connection.",opt_data.contentPath) : AJS.format("Your confluence has not been configured to connect to JIRA. Contact your administrator \x3ca id\x3d\x22open_applinks\x22 target\x3d\x22_blank\x22 href\x3d\x22{0}/wiki/contactadministrators.action\x22\x3e here \x3c/a\x3e to set this up for you.",opt_data.contentPath), '<span class="aui-icon icon-warning"></span></div></div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.showErrorMessage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-message-container"><div class="aui-message error"><p class="title"><span class="aui-icon icon-error"></span><strong>', soy.$$escapeHtml(opt_data.message), '</strong></p></div></div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.defaultOption = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<option value="', soy.$$escapeHtml(opt_data.defaultValue), '" selected="selected">', soy.$$escapeHtml("Select"), '</option>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.loadingOption = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<option value="loading" selected="selected">', soy.$$escapeHtml("Loading..."), '</option>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.serverOptions = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var serverList91 = opt_data.servers;
  var serverListLen91 = serverList91.length;
  for (var serverIndex91 = 0; serverIndex91 < serverListLen91; serverIndex91++) {
    var serverData91 = serverList91[serverIndex91];
    output.append((serverData91.selected) ? '<option value="' + soy.$$escapeHtml(serverData91.id) + '" selected="selected">' + soy.$$escapeHtml(serverData91.name) + '</option>' : '<option value="' + soy.$$escapeHtml(serverData91.id) + '">' + soy.$$escapeHtml(serverData91.name) + '</option>');
  }
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.projectOptions = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var projectList107 = opt_data.projects;
  var projectListLen107 = projectList107.length;
  for (var projectIndex107 = 0; projectIndex107 < projectListLen107; projectIndex107++) {
    var projectData107 = projectList107[projectIndex107];
    output.append('<option value="', soy.$$escapeHtml(projectData107.key), '">', soy.$$escapeHtml(projectData107.name), '</option>');
  }
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Dialog.versionOptions = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var versionsLeng__soy115 = opt_data.versions.length;
  output.append((versionsLeng__soy115 > 0) ? '<option value="EMPTY">' + soy.$$escapeHtml("No Version") + '</option>' : '');
  var iLimit121 = versionsLeng__soy115;
  for (var i121 = 0; i121 < iLimit121; i121++) {
    var version__soy122 = opt_data.versions[versionsLeng__soy115 - i121 - 1];
    output.append('<option value="', soy.$$escapeHtml(version__soy122.id), '">', soy.$$escapeHtml(version__soy122.name), '</option>');
  }
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-software-blueprints:jirareports-resources', location = 'com/atlassian/confluence/plugins/jirareports/soy/jirareport-templates.soy' */
// This file was automatically generated from jirareport-templates.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.JiraReports == 'undefined') { Confluence.Blueprints.JiraReports = {}; }
if (typeof Confluence.Blueprints.JiraReports.Template == 'undefined') { Confluence.Blueprints.JiraReports.Template = {}; }


Confluence.Blueprints.JiraReports.Template.jiraissues = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:macro ac:name="jira"><ac:parameter ac:name="serverId">', soy.$$escapeHtml(opt_data.serverId), '</ac:parameter><ac:parameter ac:name="server">', soy.$$escapeHtml(opt_data.server), '</ac:parameter><ac:parameter ac:name="', soy.$$escapeHtml(opt_data.keyJQL), '">', soy.$$escapeHtml(opt_data.valJQL), '</ac:parameter>', (opt_data.isCount) ? '<ac:parameter ac:name="count">true</ac:parameter>' : '', '</ac:macro>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Template.piechart = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<p><h3>', soy.$$escapeHtml(opt_data.titleType), (opt_data.statType == 'statuses') ? opt_data.totalIssues : '', '</h3></p><p><ac:macro ac:name="jirachart"><ac:parameter ac:name="serverId">', soy.$$escapeHtml(opt_data.serverId), '</ac:parameter><ac:parameter ac:name="server">', soy.$$escapeHtml(opt_data.server), '</ac:parameter><ac:parameter ac:name="jql">', soy.$$escapeHtml(opt_data.jql), '</ac:parameter><ac:parameter ac:name="statType">', soy.$$escapeHtml(opt_data.statType), '</ac:parameter><ac:parameter ac:name="width">', soy.$$escapeHtml(opt_data.width), '</ac:parameter><ac:parameter ac:name="border">', soy.$$escapeHtml(opt_data.border), '</ac:parameter><ac:parameter ac:name="chartType">pie</ac:parameter></ac:macro></p>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Template.createFromTemplateMacro = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:macro ac:name="create-from-template"><ac:parameter ac:name="blueprintModuleCompleteKey">', soy.$$escapeHtml(opt_data.blueprintKey), '</ac:parameter><ac:parameter ac:name="buttonLabel">', soy.$$escapeHtml("Add JIRA Report"), '</ac:parameter><ac:parameter ac:name="spaceKey">', soy.$$escapeHtml(opt_data.spaceKey), '</ac:parameter><ac:parameter ac:name="templateName">', soy.$$escapeHtml(opt_data.blueprintKey), '</ac:parameter></ac:macro>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Template.errortimeout = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<p><ac:placeholder><strong>', soy.$$escapeHtml("Cannot get data from JIRA Server due to connection timeout."), '</strong></ac:placeholder></p>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.JiraReports.Template.releaseTitle = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:placeholder>', soy.$$escapeHtml("Insert release name here."), '</ac:placeholder>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'confluence.web.resources:moment', location = '/includes/js/moment/moment.js' */
(function(B){var O,aw="2.5.0",x=this,T=Math.round,Y,t=0,e=1,aK=2,s=3,ap=4,q=5,Q=6,ar={},ag=(typeof module!=="undefined"&&module.exports&&typeof require!=="undefined"),b=/^\/?Date\((\-?\d+)/i,aT=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,ay=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,aj=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,X=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,f=/\d\d?/,Z=/\d{1,3}/,C=/\d{1,4}/,aZ=/[+\-]?\d{1,6}/,aP=/\d+/,G=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,n=/Z|[\+\-]\d\d:?\d\d/gi,j=/T/i,aH=/[\+\-]?\d+(\.\d{1,3})?/,W=/\d/,o=/\d\d/,aS=/\d{3}/,aG=/\d{4}/,ac=/[+\-]?\d{6}/,aD=/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,R="YYYY-MM-DDTHH:mm:ssZ",aR=["YYYY-MM-DD","GGGG-[W]WW","GGGG-[W]WW-E","YYYY-DDD"],E=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],V=/([\+\-]|\d\d)/gi,aA="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),A={Milliseconds:1,Seconds:1000,Minutes:60000,Hours:3600000,Days:86400000,Months:2592000000,Years:31536000000},c={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},aO={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},af={},aJ="DDD w W M D d".split(" "),ah="M D H h m s w W".split(" "),aL={M:function(){return this.month()+1},MMM:function(i){return this.lang().monthsShort(this,i)},MMMM:function(i){return this.lang().months(this,i)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(i){return this.lang().weekdaysMin(this,i)},ddd:function(i){return this.lang().weekdaysShort(this,i)},dddd:function(i){return this.lang().weekdays(this,i)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return H(this.year()%100,2)},YYYY:function(){return H(this.year(),4)},YYYYY:function(){return H(this.year(),5)},YYYYYY:function(){var a1=this.year(),i=a1>=0?"+":"-";return i+H(Math.abs(a1),6)},gg:function(){return H(this.weekYear()%100,2)},gggg:function(){return this.weekYear()},ggggg:function(){return H(this.weekYear(),5)},GG:function(){return H(this.isoWeekYear()%100,2)},GGGG:function(){return this.isoWeekYear()},GGGGG:function(){return H(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),true)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),false)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return J(this.milliseconds()/100)},SS:function(){return H(J(this.milliseconds()/10),2)},SSS:function(){return H(this.milliseconds(),3)},SSSS:function(){return H(this.milliseconds(),3)},Z:function(){var a1=-this.zone(),i="+";if(a1<0){a1=-a1;i="-"}return i+H(J(a1/60),2)+":"+H(J(a1)%60,2)},ZZ:function(){var a1=-this.zone(),i="+";if(a1<0){a1=-a1;i="-"}return i+H(J(a1/60),2)+H(J(a1)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},S=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];function L(a1,i){return function(a2){return H(a1.call(this,a2),i)}}function g(i,a1){return function(a2){return this.lang().ordinal(i.call(this,a2),a1)}}while(aJ.length){Y=aJ.pop();aL[Y+"o"]=g(aL[Y],Y)}while(ah.length){Y=ah.pop();aL[Y+Y]=L(aL[Y],2)}aL.DDDD=L(aL.DDD,3);function aB(){}function I(i){aX(i);au(this,i)}function aa(a3){var a6=l(a3),a5=a6.year||0,a1=a6.month||0,i=a6.week||0,a9=a6.day||0,a7=a6.hour||0,a4=a6.minute||0,a8=a6.second||0,a2=a6.millisecond||0;this._milliseconds=+a2+a8*1000+a4*60000+a7*3600000;this._days=+a9+i*7;this._months=+a1+a5*12;this._data={};this._bubble()}function au(a2,a1){for(var a3 in a1){if(a1.hasOwnProperty(a3)){a2[a3]=a1[a3]}}if(a1.hasOwnProperty("toString")){a2.toString=a1.toString}if(a1.hasOwnProperty("valueOf")){a2.valueOf=a1.valueOf}return a2}function k(i){if(i<0){return Math.ceil(i)}else{return Math.floor(i)}}function H(a4,a3,a2){var a1=Math.abs(a4)+"",i=a4>=0;while(a1.length<a3){a1="0"+a1}return(i?(a2?"+":""):"-")+a1}function D(a3,a2,a6,a5){var a1=a2._milliseconds,a8=a2._days,i=a2._months,a4,a7;if(a1){a3._d.setTime(+a3._d+a1*a6)}if(a8||i){a4=a3.minute();a7=a3.hour()}if(a8){a3.date(a3.date()+a8*a6)}if(i){a3.month(a3.month()+i*a6)}if(a1&&!a5){O.updateOffset(a3)}if(a8||i){a3.minute(a4);a3.hour(a7)}}function a(i){return Object.prototype.toString.call(i)==="[object Array]"}function d(i){return Object.prototype.toString.call(i)==="[object Date]"||i instanceof Date}function aI(a6,a5,a2){var a1=Math.min(a6.length,a5.length),a3=Math.abs(a6.length-a5.length),a7=0,a4;for(a4=0;a4<a1;a4++){if((a2&&a6[a4]!==a5[a4])||(!a2&&J(a6[a4])!==J(a5[a4]))){a7++}}return a7+a3}function aN(a1){if(a1){var i=a1.toLowerCase().replace(/(.)s$/,"$1");a1=c[a1]||aO[i]||i}return a1}function l(a2){var a1={},i,a3;for(a3 in a2){if(a2.hasOwnProperty(a3)){i=aN(a3);if(i){a1[i]=a2[a3]}}}return a1}function am(a1){var i,a2;if(a1.indexOf("week")===0){i=7;a2="day"}else{if(a1.indexOf("month")===0){i=12;a2="month"}else{return}}O[a1]=function(a7,a4){var a6,a3,a8=O.fn._lang[a1],a5=[];if(typeof a7==="number"){a4=a7;a7=B}a3=function(ba){var a9=O().utc().set(a2,ba);return a8.call(O.fn._lang,a9,a7||"")};if(a4!=null){return a3(a4)}else{for(a6=0;a6<i;a6++){a5.push(a3(a6))}return a5}}}function J(i){var a2=+i,a1=0;if(a2!==0&&isFinite(a2)){if(a2>=0){a1=Math.floor(a2)}else{a1=Math.ceil(a2)}}return a1}function aV(i,a1){return new Date(Date.UTC(i,a1+1,0)).getUTCDate()}function aQ(i){return aE(i)?366:365}function aE(i){return(i%4===0&&i%100!==0)||i%400===0}function aX(i){var a1;if(i._a&&i._pf.overflow===-2){a1=i._a[e]<0||i._a[e]>11?e:i._a[aK]<1||i._a[aK]>aV(i._a[t],i._a[e])?aK:i._a[s]<0||i._a[s]>23?s:i._a[ap]<0||i._a[ap]>59?ap:i._a[q]<0||i._a[q]>59?q:i._a[Q]<0||i._a[Q]>999?Q:-1;if(i._pf._overflowDayOfYear&&(a1<t||a1>aK)){a1=aK}i._pf.overflow=a1}}function az(i){i._pf={empty:false,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:false,invalidMonth:null,invalidFormat:false,userInvalidated:false,iso:false}}function av(i){if(i._isValid==null){i._isValid=!isNaN(i._d.getTime())&&i._pf.overflow<0&&!i._pf.empty&&!i._pf.invalidMonth&&!i._pf.nullInput&&!i._pf.invalidFormat&&!i._pf.userInvalidated;if(i._strict){i._isValid=i._isValid&&i._pf.charsLeftOver===0&&i._pf.unusedTokens.length===0}}return i._isValid}function z(i){return i?i.toLowerCase().replace("_","-"):i}function u(i,a1){return a1._isUTC?O(i).zone(a1._offset||0):O(i).local()}au(aB.prototype,{set:function(a1){var a3,a2;for(a2 in a1){a3=a1[a2];if(typeof a3==="function"){this[a2]=a3}else{this["_"+a2]=a3}}},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(i){return this._months[i.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(i){return this._monthsShort[i.month()]},monthsParse:function(a1){var a2,a4,a3;if(!this._monthsParse){this._monthsParse=[]}for(a2=0;a2<12;a2++){if(!this._monthsParse[a2]){a4=O.utc([2000,a2]);a3="^"+this.months(a4,"")+"|^"+this.monthsShort(a4,"");this._monthsParse[a2]=new RegExp(a3.replace(".",""),"i")}if(this._monthsParse[a2].test(a1)){return a2}}},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(i){return this._weekdays[i.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(i){return this._weekdaysShort[i.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(i){return this._weekdaysMin[i.day()]},weekdaysParse:function(a4){var a1,a3,a2;if(!this._weekdaysParse){this._weekdaysParse=[]}for(a1=0;a1<7;a1++){if(!this._weekdaysParse[a1]){a3=O([2000,1]).day(a1);a2="^"+this.weekdays(a3,"")+"|^"+this.weekdaysShort(a3,"")+"|^"+this.weekdaysMin(a3,"");this._weekdaysParse[a1]=new RegExp(a2.replace(".",""),"i")}if(this._weekdaysParse[a1].test(a4)){return a1}}},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a1){var i=this._longDateFormat[a1];if(!i&&this._longDateFormat[a1.toUpperCase()]){i=this._longDateFormat[a1.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a2){return a2.slice(1)});this._longDateFormat[a1]=i}return i},isPM:function(i){return((i+"").toLowerCase().charAt(0)==="p")},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(i,a1,a2){if(i>11){return a2?"pm":"PM"}else{return a2?"am":"AM"}},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a1,a2){var i=this._calendar[a1];return typeof i==="function"?i.apply(a2):i},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a3,a2,a1,a4){var i=this._relativeTime[a1];return(typeof i==="function")?i(a3,a2,a1,a4):i.replace(/%d/i,a3)},pastFuture:function(a2,i){var a1=this._relativeTime[a2>0?"future":"past"];return typeof a1==="function"?a1(i):a1.replace(/%s/i,i)},ordinal:function(i){return this._ordinal.replace("%d",i)},_ordinal:"%d",preparse:function(i){return i},postformat:function(i){return i},week:function(i){return y(i,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}});function ae(a1,i){i.abbr=a1;if(!ar[a1]){ar[a1]=new aB()}ar[a1].set(i);return ar[a1]}function aU(i){delete ar[i]}function at(a5){var a4=0,a2,a7,a6,a3,a1=function(i){if(!ar[i]&&ag){try{require("./lang/"+i)}catch(a8){}}return ar[i]};if(!a5){return O.fn._lang}if(!a(a5)){a7=a1(a5);if(a7){return a7}a5=[a5]}while(a4<a5.length){a3=z(a5[a4]).split("-");a2=a3.length;a6=z(a5[a4+1]);a6=a6?a6.split("-"):null;while(a2>0){a7=a1(a3.slice(0,a2).join("-"));if(a7){return a7}if(a6&&a6.length>=a2&&aI(a3,a6,true)>=a2-1){break}a2--}a4++}return O.fn._lang}function ad(i){if(i.match(/\[[\s\S]/)){return i.replace(/^\[|\]$/g,"")}return i.replace(/\\/g,"")}function p(a3){var a4=a3.match(aj),a1,a2;for(a1=0,a2=a4.length;a1<a2;a1++){if(aL[a4[a1]]){a4[a1]=aL[a4[a1]]}else{a4[a1]=ad(a4[a1])}}return function(a5){var i="";for(a1=0;a1<a2;a1++){i+=a4[a1] instanceof Function?a4[a1].call(a5,a3):a4[a1]}return i}}function ai(i,a1){if(!i.isValid()){return i.lang().invalidDate()}a1=a0(a1,i.lang());if(!af[a1]){af[a1]=p(a1)}return af[a1](i)}function a0(a3,a4){var a1=5;function a2(i){return a4.longDateFormat(i)||i}X.lastIndex=0;while(a1>=0&&X.test(a3)){a3=a3.replace(X,a2);X.lastIndex=0;a1-=1}return a3}function al(a3,a2){var a1,i=a2._strict;switch(a3){case"DDDD":return aS;case"YYYY":case"GGGG":case"gggg":return i?aG:C;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return i?ac:aZ;case"S":if(i){return W}case"SS":if(i){return o}case"SSS":case"DDD":return i?aS:Z;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return G;case"a":case"A":return at(a2._l)._meridiemParse;case"X":return aH;case"Z":case"ZZ":return n;case"T":return j;case"SSSS":return aP;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return i?o:f;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return i?W:f;default:a1=new RegExp(aY(ao(a3.replace("\\","")),"i"));return a1}}function v(a1){a1=a1||"";var i=(a1.match(n)||[]),a4=i[i.length-1]||[],a3=(a4+"").match(V)||["-",0,0],a2=+(a3[1]*60)+J(a3[2]);return a3[0]==="+"?-a2:a2}function an(a4,a2,a3){var a1,i=a3._a;switch(a4){case"M":case"MM":if(a2!=null){i[e]=J(a2)-1}break;case"MMM":case"MMMM":a1=at(a3._l).monthsParse(a2);if(a1!=null){i[e]=a1}else{a3._pf.invalidMonth=a2}break;case"D":case"DD":if(a2!=null){i[aK]=J(a2)}break;case"DDD":case"DDDD":if(a2!=null){a3._dayOfYear=J(a2)}break;case"YY":i[t]=J(a2)+(J(a2)>68?1900:2000);break;case"YYYY":case"YYYYY":case"YYYYYY":i[t]=J(a2);break;case"a":case"A":a3._isPm=at(a3._l).isPM(a2);break;case"H":case"HH":case"h":case"hh":i[s]=J(a2);break;case"m":case"mm":i[ap]=J(a2);break;case"s":case"ss":i[q]=J(a2);break;case"S":case"SS":case"SSS":case"SSSS":i[Q]=J(("0."+a2)*1000);break;case"X":a3._d=new Date(parseFloat(a2)*1000);break;case"Z":case"ZZ":a3._useUTC=true;a3._tzm=v(a2);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":a4=a4.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":a4=a4.substr(0,2);if(a2){a3._w=a3._w||{};a3._w[a4]=a2}break}}function ab(a5){var a7,a6,ba=[],a3,a9,a2,bb,bc,a4,a8,a1;if(a5._d){return}a3=m(a5);if(a5._w&&a5._a[aK]==null&&a5._a[e]==null){a2=function(bd){var i=parseInt(bd,10);return bd?(bd.length<3?(i>68?1900+i:2000+i):i):(a5._a[t]==null?O().weekYear():a5._a[t])};bb=a5._w;if(bb.GG!=null||bb.W!=null||bb.E!=null){bc=r(a2(bb.GG),bb.W||1,bb.E,4,1)}else{a4=at(a5._l);a8=bb.d!=null?aW(bb.d,a4):(bb.e!=null?parseInt(bb.e,10)+a4._week.dow:0);a1=parseInt(bb.w,10)||1;if(bb.d!=null&&a8<a4._week.dow){a1++}bc=r(a2(bb.gg),a1,a8,a4._week.doy,a4._week.dow)}a5._a[t]=bc.year;a5._dayOfYear=bc.dayOfYear}if(a5._dayOfYear){a9=a5._a[t]==null?a3[t]:a5._a[t];if(a5._dayOfYear>aQ(a9)){a5._pf._overflowDayOfYear=true}a6=F(a9,0,a5._dayOfYear);a5._a[e]=a6.getUTCMonth();a5._a[aK]=a6.getUTCDate()}for(a7=0;a7<3&&a5._a[a7]==null;++a7){a5._a[a7]=ba[a7]=a3[a7]}for(;a7<7;a7++){a5._a[a7]=ba[a7]=(a5._a[a7]==null)?(a7===2?1:0):a5._a[a7]}ba[s]+=J((a5._tzm||0)/60);ba[ap]+=J((a5._tzm||0)%60);a5._d=(a5._useUTC?F:ak).apply(null,ba)}function ax(a1){var i;if(a1._d){return}i=l(a1._i);a1._a=[i.year,i.month,i.day,i.hour,i.minute,i.second,i.millisecond];ab(a1)}function m(a1){var i=new Date();if(a1._useUTC){return[i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate()]}else{return[i.getFullYear(),i.getMonth(),i.getDate()]}}function N(a4){a4._a=[];a4._pf.empty=true;var a3=at(a4._l),a7=""+a4._i,a6,a2,ba,a5,a9,a1=a7.length,a8=0;ba=a0(a4._f,a3).match(aj)||[];for(a6=0;a6<ba.length;a6++){a5=ba[a6];a2=(a7.match(al(a5,a4))||[])[0];if(a2){a9=a7.substr(0,a7.indexOf(a2));if(a9.length>0){a4._pf.unusedInput.push(a9)}a7=a7.slice(a7.indexOf(a2)+a2.length);a8+=a2.length}if(aL[a5]){if(a2){a4._pf.empty=false}else{a4._pf.unusedTokens.push(a5)}an(a5,a2,a4)}else{if(a4._strict&&!a2){a4._pf.unusedTokens.push(a5)}}}a4._pf.charsLeftOver=a1-a8;if(a7.length>0){a4._pf.unusedInput.push(a7)}if(a4._isPm&&a4._a[s]<12){a4._a[s]+=12}if(a4._isPm===false&&a4._a[s]===12){a4._a[s]=0}ab(a4);aX(a4)}function ao(i){return i.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a1,a5,a4,a3,a2){return a5||a4||a3||a2})}function aY(i){return i.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function aM(a1){var a5,a3,a4,a2,a6;if(a1._f.length===0){a1._pf.invalidFormat=true;a1._d=new Date(NaN);return}for(a2=0;a2<a1._f.length;a2++){a6=0;a5=au({},a1);az(a5);a5._f=a1._f[a2];N(a5);if(!av(a5)){continue}a6+=a5._pf.charsLeftOver;a6+=a5._pf.unusedTokens.length*10;a5._pf.score=a6;if(a4==null||a6<a4){a4=a6;a3=a5}}au(a1,a3||a5)}function h(a3){var a4,a2=a3._i,a1=aD.exec(a2);if(a1){a3._pf.iso=true;for(a4=4;a4>0;a4--){if(a1[a4]){a3._f=aR[a4-1]+(a1[6]||" ");break}}for(a4=0;a4<4;a4++){if(E[a4][1].exec(a2)){a3._f+=E[a4][0];break}}if(a2.match(n)){a3._f+="Z"}N(a3)}else{a3._d=new Date(a2)}}function M(a2){var a1=a2._i,i=b.exec(a1);if(a1===B){a2._d=new Date()}else{if(i){a2._d=new Date(+i[1])}else{if(typeof a1==="string"){h(a2)}else{if(a(a1)){a2._a=a1.slice(0);ab(a2)}else{if(d(a1)){a2._d=new Date(+a1)}else{if(typeof(a1)==="object"){ax(a2)}else{a2._d=new Date(a1)}}}}}}}function ak(a7,i,a5,a4,a6,a3,a2){var a1=new Date(a7,i,a5,a4,a6,a3,a2);if(a7<1970){a1.setFullYear(a7)}return a1}function F(a1){var i=new Date(Date.UTC.apply(null,arguments));if(a1<1970){i.setUTCFullYear(a1)}return i}function aW(i,a1){if(typeof i==="string"){if(!isNaN(i)){i=parseInt(i,10)}else{i=a1.weekdaysParse(i);if(typeof i!=="number"){return null}}}return i}function aC(i,a2,a1,a3,a4){return a4.relativeTime(a2||1,!!a1,i,a3)}function w(a2,i,a1){var a7=T(Math.abs(a2)/1000),a3=T(a7/60),a6=T(a3/60),a8=T(a6/24),a4=T(a8/365),a5=a7<45&&["s",a7]||a3===1&&["m"]||a3<45&&["mm",a3]||a6===1&&["h"]||a6<22&&["hh",a6]||a8===1&&["d"]||a8<=25&&["dd",a8]||a8<=45&&["M"]||a8<345&&["MM",T(a8/30)]||a4===1&&["y"]||["yy",a4];a5[2]=i;a5[3]=a2>0;a5[4]=a1;return aC.apply({},a5)}function y(a4,a2,a5){var a1=a5-a2,i=a5-a4.day(),a3;if(i>a1){i-=7}if(i<a1-7){i+=7}a3=O(a4).add("d",i);return{week:Math.ceil(a3.dayOfYear()/7),year:a3.year()}}function r(a4,a3,a5,a7,i){var a6=new Date(H(a4,6,true)+"-01-01").getUTCDay(),a2,a1;a5=a5!=null?a5:i;a2=i-a6+(a6>a7?7:0);a1=7*(a3-1)+(a5-i)+a2+1;return{year:a1>0?a4:a4-1,dayOfYear:a1>0?a1:aQ(a4-1)+a1}}function K(a1){var i=a1._i,a2=a1._f;if(typeof a1._pf==="undefined"){az(a1)}if(i===null){return O.invalid({nullInput:true})}if(typeof i==="string"){a1._i=i=at().preparse(i)}if(O.isMoment(i)){a1=au({},i);a1._d=new Date(+i._d)}else{if(a2){if(a(a2)){aM(a1)}else{N(a1)}}else{M(a1)}}return new I(a1)}O=function(a1,a2,a3,i){if(typeof(a3)==="boolean"){i=a3;a3=B}return K({_i:a1,_f:a2,_l:a3,_strict:i,_isUTC:false})};O.utc=function(a2,a3,a4,a1){var i;if(typeof(a4)==="boolean"){a1=a4;a4=B}i=K({_useUTC:true,_isUTC:true,_l:a4,_i:a2,_f:a3,_strict:a1}).utc();return i};O.unix=function(i){return O(i*1000)};O.duration=function(a1,a5){var a6=a1,a4=null,i,a3,a2;if(O.isDuration(a1)){a6={ms:a1._milliseconds,d:a1._days,M:a1._months}}else{if(typeof a1==="number"){a6={};if(a5){a6[a5]=a1}else{a6.milliseconds=a1}}else{if(!!(a4=aT.exec(a1))){i=(a4[1]==="-")?-1:1;a6={y:0,d:J(a4[aK])*i,h:J(a4[s])*i,m:J(a4[ap])*i,s:J(a4[q])*i,ms:J(a4[Q])*i}}else{if(!!(a4=ay.exec(a1))){i=(a4[1]==="-")?-1:1;a2=function(a8){var a7=a8&&parseFloat(a8.replace(",","."));return(isNaN(a7)?0:a7)*i};a6={y:a2(a4[2]),M:a2(a4[3]),d:a2(a4[4]),h:a2(a4[5]),m:a2(a4[6]),s:a2(a4[7]),w:a2(a4[8])}}}}}a3=new aa(a6);if(O.isDuration(a1)&&a1.hasOwnProperty("_lang")){a3._lang=a1._lang}return a3};O.version=aw;O.defaultFormat=R;O.updateOffset=function(){};O.lang=function(a1,i){var a2;if(!a1){return O.fn._lang._abbr}if(i){ae(z(a1),i)}else{if(i===null){aU(a1);a1="en"}else{if(!ar[a1]){at(a1)}}}a2=O.duration.fn._lang=O.fn._lang=at(a1);return a2._abbr};O.langData=function(i){if(i&&i._lang&&i._lang._abbr){i=i._lang._abbr}return at(i)};O.isMoment=function(i){return i instanceof I};O.isDuration=function(i){return i instanceof aa};for(Y=S.length-1;Y>=0;--Y){am(S[Y])}O.normalizeUnits=function(i){return aN(i)};O.invalid=function(a1){var i=O.utc(NaN);if(a1!=null){au(i._pf,a1)}else{i._pf.userInvalidated=true}return i};O.parseZone=function(i){return O(i).parseZone()};au(O.fn=I.prototype,{clone:function(){return O(this)},valueOf:function(){return +this._d+((this._offset||0)*60000)},unix:function(){return Math.floor(+this/1000)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var i=O(this).utc();if(0<i.year()&&i.year()<=9999){return ai(i,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}else{return ai(i,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}},toArray:function(){var i=this;return[i.year(),i.month(),i.date(),i.hours(),i.minutes(),i.seconds(),i.milliseconds()]},isValid:function(){return av(this)},isDSTShifted:function(){if(this._a){return this.isValid()&&aI(this._a,(this._isUTC?O.utc(this._a):O(this._a)).toArray())>0}return false},parsingFlags:function(){return au({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){this.zone(0);this._isUTC=false;return this},format:function(a1){var i=ai(this,a1||O.defaultFormat);return this.lang().postformat(i)},add:function(i,a2){var a1;if(typeof i==="string"){a1=O.duration(+a2,i)}else{a1=O.duration(i,a2)}D(this,a1,1);return this},subtract:function(i,a2){var a1;if(typeof i==="string"){a1=O.duration(+a2,i)}else{a1=O.duration(i,a2)}D(this,a1,-1);return this},diff:function(a4,a3,i){var a5=u(a4,this),a1=(this.zone()-a5.zone())*60000,a6,a2;a3=aN(a3);if(a3==="year"||a3==="month"){a6=(this.daysInMonth()+a5.daysInMonth())*43200000;a2=((this.year()-a5.year())*12)+(this.month()-a5.month());a2+=((this-O(this).startOf("month"))-(a5-O(a5).startOf("month")))/a6;a2-=((this.zone()-O(this).startOf("month").zone())-(a5.zone()-O(a5).startOf("month").zone()))*60000/a6;if(a3==="year"){a2=a2/12}}else{a6=(this-a5);a2=a3==="second"?a6/1000:a3==="minute"?a6/60000:a3==="hour"?a6/3600000:a3==="day"?(a6-a1)/86400000:a3==="week"?(a6-a1)/604800000:a6}return i?a2:k(a2)},from:function(a1,i){return O.duration(this.diff(a1)).lang(this.lang()._abbr).humanize(!i)},fromNow:function(i){return this.from(O(),i)},calendar:function(){var i=u(O(),this).startOf("day"),a2=this.diff(i,"days",true),a1=a2<-6?"sameElse":a2<-1?"lastWeek":a2<0?"lastDay":a2<1?"sameDay":a2<2?"nextDay":a2<7?"nextWeek":"sameElse";return this.format(this.lang().calendar(a1,this))},isLeapYear:function(){return aE(this.year())},isDST:function(){return(this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone())},day:function(a1){var i=this._isUTC?this._d.getUTCDay():this._d.getDay();if(a1!=null){a1=aW(a1,this.lang());return this.add({d:a1-i})}else{return i}},month:function(i){var a1=this._isUTC?"UTC":"",a2;if(i!=null){if(typeof i==="string"){i=this.lang().monthsParse(i);if(typeof i!=="number"){return this}}a2=this.date();this.date(1);this._d["set"+a1+"Month"](i);this.date(Math.min(a2,this.daysInMonth()));O.updateOffset(this);return this}else{return this._d["get"+a1+"Month"]()}},startOf:function(i){i=aN(i);switch(i){case"year":this.month(0);case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}if(i==="week"){this.weekday(0)}else{if(i==="isoWeek"){this.isoWeekday(1)}}return this},endOf:function(i){i=aN(i);return this.startOf(i).add((i==="isoWeek"?"week":i),1).subtract("ms",1)},isAfter:function(a1,i){i=typeof i!=="undefined"?i:"millisecond";return +this.clone().startOf(i)>+O(a1).startOf(i)},isBefore:function(a1,i){i=typeof i!=="undefined"?i:"millisecond";return +this.clone().startOf(i)<+O(a1).startOf(i)},isSame:function(a1,i){i=i||"ms";return +this.clone().startOf(i)===+u(a1,this).startOf(i)},min:function(i){i=O.apply(null,arguments);return i<this?this:i},max:function(i){i=O.apply(null,arguments);return i>this?this:i},zone:function(i){var a1=this._offset||0;if(i!=null){if(typeof i==="string"){i=v(i)}if(Math.abs(i)<16){i=i*60}this._offset=i;this._isUTC=true;if(a1!==i){D(this,O.duration(a1-i,"m"),1,true)}}else{return this._isUTC?a1:this._d.getTimezoneOffset()}return this},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){if(this._tzm){this.zone(this._tzm)}else{if(typeof this._i==="string"){this.zone(this._i)}}return this},hasAlignedHourOffset:function(i){if(!i){i=0}else{i=O(i).zone()}return(this.zone()-i)%60===0},daysInMonth:function(){return aV(this.year(),this.month())},dayOfYear:function(i){var a1=T((O(this).startOf("day")-O(this).startOf("year"))/86400000)+1;return i==null?a1:this.add("d",(i-a1))},quarter:function(){return Math.ceil((this.month()+1)/3)},weekYear:function(i){var a1=y(this,this.lang()._week.dow,this.lang()._week.doy).year;return i==null?a1:this.add("y",(i-a1))},isoWeekYear:function(i){var a1=y(this,1,4).year;return i==null?a1:this.add("y",(i-a1))},week:function(i){var a1=this.lang().week(this);return i==null?a1:this.add("d",(i-a1)*7)},isoWeek:function(i){var a1=y(this,1,4).week;return i==null?a1:this.add("d",(i-a1)*7)},weekday:function(i){var a1=(this.day()+7-this.lang()._week.dow)%7;return i==null?a1:this.add("d",i-a1)},isoWeekday:function(i){return i==null?this.day()||7:this.day(this.day()%7?i:i-7)},get:function(i){i=aN(i);return this[i]()},set:function(i,a1){i=aN(i);if(typeof this[i]==="function"){this[i](a1)}return this},lang:function(i){if(i===B){return this._lang}else{this._lang=at(i);return this}}});function aF(i,a1){O.fn[i]=O.fn[i+"s"]=function(a2){var a3=this._isUTC?"UTC":"";if(a2!=null){this._d["set"+a3+a1](a2);O.updateOffset(this);return this}else{return this._d["get"+a3+a1]()}}}for(Y=0;Y<aA.length;Y++){aF(aA[Y].toLowerCase().replace(/s$/,""),aA[Y])}aF("year","FullYear");O.fn.days=O.fn.day;O.fn.months=O.fn.month;O.fn.weeks=O.fn.week;O.fn.isoWeeks=O.fn.isoWeek;O.fn.toJSON=O.fn.toISOString;au(O.duration.fn=aa.prototype,{_bubble:function(){var a2=this._milliseconds,a7=this._days,i=this._months,a5=this._data,a6,a4,a1,a3;a5.milliseconds=a2%1000;a6=k(a2/1000);a5.seconds=a6%60;a4=k(a6/60);a5.minutes=a4%60;a1=k(a4/60);a5.hours=a1%24;a7+=k(a1/24);a5.days=a7%30;i+=k(a7/30);a5.months=i%12;a3=k(i/12);a5.years=a3},weeks:function(){return k(this.days()/7)},valueOf:function(){return this._milliseconds+this._days*86400000+(this._months%12)*2592000000+J(this._months/12)*31536000000},humanize:function(a1){var a2=+this,i=w(a2,!a1,this.lang());if(a1){i=this.lang().pastFuture(a2,i)}return this.lang().postformat(i)},add:function(i,a2){var a1=O.duration(i,a2);this._milliseconds+=a1._milliseconds;this._days+=a1._days;this._months+=a1._months;this._bubble();return this},subtract:function(i,a2){var a1=O.duration(i,a2);this._milliseconds-=a1._milliseconds;this._days-=a1._days;this._months-=a1._months;this._bubble();return this},get:function(i){i=aN(i);return this[i.toLowerCase()+"s"]()},as:function(i){i=aN(i);return this["as"+i.charAt(0).toUpperCase()+i.slice(1)+"s"]()},lang:O.fn.lang,toIsoString:function(){var a3=Math.abs(this.years()),i=Math.abs(this.months()),a5=Math.abs(this.days()),a1=Math.abs(this.hours()),a2=Math.abs(this.minutes()),a4=Math.abs(this.seconds()+this.milliseconds()/1000);if(!this.asSeconds()){return"P0D"}return(this.asSeconds()<0?"-":"")+"P"+(a3?a3+"Y":"")+(i?i+"M":"")+(a5?a5+"D":"")+((a1||a2||a4)?"T":"")+(a1?a1+"H":"")+(a2?a2+"M":"")+(a4?a4+"S":"")}});function U(i){O.duration.fn[i]=function(){return this._data[i]}}function aq(i,a1){O.duration.fn["as"+i]=function(){return +this/a1}}for(Y in A){if(A.hasOwnProperty(Y)){aq(Y,A[Y]);U(Y.toLowerCase())}}aq("Weeks",604800000);O.duration.fn.asMonths=function(){return(+this-this.years()*31536000000)/2592000000+this.years()*12};O.lang("en",{ordinal:function(a2){var i=a2%10,a1=(J(a2%100/10)===1)?"th":(i===1)?"st":(i===2)?"nd":(i===3)?"rd":"th";return a2+a1}});function P(a1){var i=false,a2=O;if(typeof ender!=="undefined"){return}if(a1){x.moment=function(){if(!i&&console&&console.warn){i=true;console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")}return a2.apply(null,arguments)};au(x.moment,a2)}else{x.moment=O}}if(ag){module.exports=O;P(true)}else{if(typeof define==="function"&&define.amd){define("moment",function(a1,i,a2){if(a2.config&&a2.config()&&a2.config().noGlobal!==true){P(a2.config().noGlobal===B)}return O})}else{P()}}}).call(this);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-software-blueprints:retrospective-resources', location = 'com/atlassian/confluence/plugins/retrospectives/js/retrospectives-wizard.js' */
(function(c){function b(f,d){Confluence.Blueprints.Restrospectives.init(d)}function a(f,d){return Confluence.Blueprints.Restrospectives.validateRetroForm()}Confluence.Blueprint.setWizard("com.atlassian.confluence.plugins.confluence-software-blueprints:retrospectives-item",function(d){d.on("post-render.retrospectivePageId",b);d.on("submit.retrospectivePageId",a)})})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-software-blueprints:retrospective-resources', location = 'com/atlassian/confluence/plugins/retrospectives/js/retrospectives.js' */
Confluence.Blueprints.Restrospectives=(function(d){var h;var e="YYYY-MM-DD";var c=function(i){i.siblings(".error").empty()};var b=function(i,j){i.focus().siblings(".error").text(j)};var g=function(){if(h.title.val()===""){return true}if(!Confluence.Blueprint.canCreatePage(h.spaceKey,h.title.val())){b(h.title,"A page with this name already exists.");return false}c(h.title);return true};var f=function(){h.title.change(g)};var a=function(){var j=d("meta[name=confluence-request-time]").attr("content");var i=moment(parseFloat(j)).format(e);h.title.val(i+" "+"Retrospective")};return{init:function(i){h={title:i.$container.find("#retro-title"),participants:i.$container.find("#retro-participants"),spaceKey:i.wizardData.spaceKey};f();a()},validateRetroForm:function(){return g()}}})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-software-blueprints:retrospective-resources', location = 'com/atlassian/confluence/plugins/retrospectives/soy/dialogs.soy' */
// This file was automatically generated from dialogs.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.Retrospectives == 'undefined') { Confluence.Blueprints.Retrospectives = {}; }
if (typeof Confluence.Blueprints.Retrospectives.Dialog == 'undefined') { Confluence.Blueprints.Retrospectives.Dialog = {}; }


Confluence.Blueprints.Retrospectives.Dialog.retrospective = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form class="aui retrospective" method="post" action="#"><fieldset><div class="field-group"><label for="retro-title">', soy.$$escapeHtml("Title"), '</label><input id="retro-title" class="text long-field" type="text" name="retro-title" title="title" maxlength="255"><div class="error"/></div><div class="field-group"><label for="retro-participants">', soy.$$escapeHtml("Participants"), '</label><input id="retro-participants" class="text long-field autocomplete-multiuser" type="text" name="retro-participants" data-autofill-user="true" placeholder="', soy.$$escapeHtml("Add the participants of this retrospective"), '"></div></fieldset></form>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-software-blueprints:retrospective-resources', location = 'com/atlassian/confluence/plugins/blueprints/common/common.soy' */
// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.Common == 'undefined') { Confluence.Blueprints.Common = {}; }


Confluence.Blueprints.Common.userList = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul>');
  var nameList4 = opt_data.names;
  var nameListLen4 = nameList4.length;
  for (var nameIndex4 = 0; nameIndex4 < nameListLen4; nameIndex4++) {
    var nameData4 = nameList4[nameIndex4];
    output.append('<li><ac:link><ri:user ri:username="', soy.$$escapeHtml(nameData4), '" /></ac:link></li>');
  }
  output.append('</ul>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Common.userTable = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var nameList11 = opt_data.names;
  var nameListLen11 = nameList11.length;
  for (var nameIndex11 = 0; nameIndex11 < nameListLen11; nameIndex11++) {
    var nameData11 = nameList11[nameIndex11];
    output.append('<tr><td><ac:macro ac:name="profile-picture"><ac:parameter ac:name="User">', soy.$$escapeHtml(nameData11), '</ac:parameter></ac:macro><br></br><ac:link><ri:user ri:username="', soy.$$escapeHtml(nameData11), '" /></ac:link></td><td/><td/></tr>');
  }
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Common.users = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var nameList19 = opt_data.names;
  var nameListLen19 = nameList19.length;
  for (var nameIndex19 = 0; nameIndex19 < nameListLen19; nameIndex19++) {
    var nameData19 = nameList19[nameIndex19];
    output.append('<ac:link><ri:user ri:username="', soy.$$escapeHtml(nameData19), '" /></ac:link>&nbsp;');
  }
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Common.createFromTemplateMacro = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:macro ac:name="create-from-template"><ac:parameter ac:name="blueprintModuleCompleteKey">', soy.$$escapeHtml(opt_data.blueprintKey), '</ac:parameter><ac:parameter ac:name="buttonLabel">', soy.$$escapeHtml(opt_data.buttonLabel), '</ac:parameter><ac:parameter ac:name="spaceKey">', soy.$$escapeHtml(opt_data.spaceKey), '</ac:parameter><ac:parameter ac:name="templateName">', soy.$$escapeHtml(opt_data.blueprintKey), '</ac:parameter></ac:macro>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-space-blueprints:confluence-team-space-blueprint-resources', location = 'com/atlassian/confluence/plugins/team/js/confluence-team-space-blueprints.js' */
AJS.bind("blueprint.wizard-register.ready",function(){function a(d,c){c.pageData.ContentPageTitle=c.pageData.name;return Confluence.SpaceBlueprint.CommonWizardBindings.submit(d,c)}function b(d,c){c.soyRenderContext.atlToken=AJS.Meta.get("atl-token");c.soyRenderContext.showSpacePermission=false}Confluence.Blueprint.setWizard("com.atlassian.confluence.plugins.confluence-space-blueprints:team-space-blueprint-item",function(c){c.on("submit.teamSpaceId",a);c.on("pre-render.teamSpaceId",b);c.on("post-render.teamSpaceId",Confluence.SpaceBlueprint.CommonWizardBindings.postRender)})});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-space-blueprints:confluence-team-space-blueprint-resources', location = 'com/atlassian/confluence/plugins/team/soy/dialog-page.soy' */
// This file was automatically generated from dialog-page.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.SpaceBlueprints == 'undefined') { Confluence.SpaceBlueprints = {}; }
if (typeof Confluence.SpaceBlueprints.Team == 'undefined') { Confluence.SpaceBlueprints.Team = {}; }


Confluence.SpaceBlueprints.Team.dialogForm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form action="#" method="post" id="decisions-form" class="common-space-form aui">');
  Confluence.Templates.Blueprints.CreateSpace.createSpaceFormFields({showSpacePermission: false, fieldErrors: opt_data.fieldErrors, name: opt_data.name, spaceKey: opt_data.spaceKey}, output);
  output.append('<fieldset><div class="field-group"><label for="team-members">', soy.$$escapeHtml("Team members"), '</label><input id="team-members" class="text long-field autocomplete-multiuser" type="text" name="members" placeholder="', soy.$$escapeHtml("Add your team members"), '" data-autofill-user="true"/></div><div class="field-group"><label for="team-description">', soy.$$escapeHtml("Description"), '</label><textarea id="team-description" class="textarea long-field" rows="3" type="text" name="description" placeholder="', soy.$$escapeHtml("Let others know what this space is for"), '"></textarea></div></fieldset><input type="hidden" name="atl_token" value="', soy.$$escapeHtml(opt_data.atlToken), '" /></form>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-space-blueprints:confluence-documentation-space-blueprint-resources', location = 'com/atlassian/confluence/plugins/documentation/js/confluence-documentation-space-blueprint.js' */
AJS.bind("blueprint.wizard-register.ready",function(){function b(d,c){c.pageData.ContentPageTitle=c.pageData.name;return Confluence.SpaceBlueprint.CommonWizardBindings.submit(d,c)}function a(d,c){c.soyRenderContext.atlToken=AJS.Meta.get("atl-token");c.soyRenderContext.showSpacePermission=false}Confluence.Blueprint.setWizard("com.atlassian.confluence.plugins.confluence-space-blueprints:documentation-space-blueprint-item",function(c){c.on("submit.documentationSpaceId",b);c.on("pre-render.documentationSpaceId",a);c.on("post-render.documentationSpaceId",Confluence.SpaceBlueprint.CommonWizardBindings.postRender)})});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-space-blueprints:confluence-documentation-space-blueprint-resources', location = 'com/atlassian/confluence/plugins/documentation/soy/dialog-page.soy' */
// This file was automatically generated from dialog-page.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.SpaceBlueprints == 'undefined') { Confluence.SpaceBlueprints = {}; }
if (typeof Confluence.SpaceBlueprints.Documentation == 'undefined') { Confluence.SpaceBlueprints.Documentation = {}; }


Confluence.SpaceBlueprints.Documentation.dialogForm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form action="#" method="post" id="documentation-space-form" class="common-space-form aui">');
  Confluence.Templates.Blueprints.CreateSpace.createSpaceFormFields({showSpacePermission: false, fieldErrors: opt_data.fieldErrors, name: opt_data.name, key: opt_data.key}, output);
  output.append('<fieldset><div class="field-group"><label for="documentation-description">', soy.$$escapeHtml("Description"), '</label><textarea id="documentation-description" class="textarea long-field" rows="3" type="text" name="spaceDesc" placeholder="', soy.$$escapeHtml("Briefly describe the documentation in this space"), '"></textarea></div></fieldset><input type="hidden" name="noPageTitlePrefix" value="true" /><input type="hidden" name="atl_token" value="', soy.$$escapeHtml(opt_data.atlToken), '" /></form>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-feature-discovery-plugin:confluence-feature-discovery-plugin-resources', location = '/js/confluence-feature-discovery-plugin.js' */
(function(d){Confluence.FeatureDiscovery={};var f,a=false,b=3;function c(g){if(f===undefined){f=JSON.parse(AJS.Meta.get("discovered-plugin-features")||"{}")}if(g){return f[g]||[]}return f}function e(j,l){var k=c(j);for(var h=0,g=k.length;h<g;h++){if(k[h]==l){return true}}return false}Confluence.FeatureDiscovery.forPlugin=function(i,h){var l=Confluence.storageManager("feature-discovery."+i);h=h||b;function k(n){var m=parseInt(l.getItem(n),10);return isNaN(m)?0:m}function j(n,m){return l.setItem(n,m)}function g(m){return l.removeItem(m)}return{addDiscoveryView:function(m){j(m,k(m)+1)},shouldShow:function(m){if(a||e(i,m)){return false}if(k(m)>=h){this.markDiscovered(m);return false}a=true;return true},markDiscovered:function(n,m){if(e(i,n)){return}d.ajax({url:AJS.contextPath()+"/rest/feature-discovery/1.0/discovered/"+i+"/"+n,type:"POST",success:function(){c(i).unshift(n);g(n);AJS.trigger("feature-discovered",{pluginKey:i,featureKey:n});if(m&&d.isFunction(m)){m()}}})},listDiscovered:function(){return c(i).slice(0)}}}})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'templates/recently.soy' */
// This file was automatically generated from recently.soy.
// Please don't edit this file by hand.

if (typeof RY == 'undefined') { var RY = {}; }
if (typeof RY.Templates == 'undefined') { RY.Templates = {}; }


RY.Templates.body = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="recently-viewed" class="aui-group"><div class="aui-item"><div class="top"><div class="filter"><form class="aui"><input class="filter-input text" type="text" placeholder="', "Filter", '"></form></div></div><div class="pages"></div><div class="recently-viewed-spinner" id="', soy.$$escapeHtmlAttribute(opt_data.spinnerId), '"></div></div></div>');
  return opt_sb ? '' : output.toString();
};


RY.Templates.pageCollection = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="groups"></div><div class="empty"></div>');
  return opt_sb ? '' : output.toString();
};


RY.Templates.pageGroup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h3>', soy.$$escapeHtml(opt_data.title), '</h3><ul/>');
  return opt_sb ? '' : output.toString();
};


RY.Templates.pageItem = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-icon"><a href=', soy.$$escapeHtmlAttributeNospace(soy.$$filterNormalizeUri(opt_data.href)), ' class="icon icon-', soy.$$escapeHtmlAttribute(opt_data.type), '"></a></div><div class="page-title"><a class="ellipsis" href=', soy.$$escapeHtmlAttributeNospace(soy.$$filterNormalizeUri(opt_data.href)), '>', soy.$$escapeHtml(opt_data.title), ' - ', soy.$$escapeHtml(opt_data.space), '</a></div>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'js/util.js' */
var RY=RY||{};(function(){var b=new Date();var c=new Date(b).getTime();var a=new Date(b.getFullYear(),b.getMonth(),b.getDate()).getTime();var d=new Date(b.getFullYear(),b.getMonth(),b.getDate()-1).getTime();RY.util=RY.Util={analytics:{trackDialogOpen:function(){AJS.trigger("analytics",{name:"recently-viewed-dialog-open"})},trackPageOpen:function(){AJS.trigger("analytics",{name:"recently-viewed-page-open"})}},quote:function(e){return(e).replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")},diffInDays:function(g,f){var e=1000*60*60*24;return Math.floor((g-f)/e)},daysSince:function(e){if(e>=a){return 0}else{if(e>=d){return 1}else{return RY.util.diffInDays(c,e)}}},formatDate:function(e){if(e>=a){e="Today"}else{if(e>=d){e="Yesterday"}else{var f=RY.util.diffInDays(c,e);e=AJS.format("{0} days ago",f)}}return e},wait:function(h,j,f){var i,k,e;var g=function(){k=setTimeout(function(){h.apply(f,e)},j)};return function(){e=arguments;var l=new Date();if(i&&l-i<j){clearTimeout(k)}g();i=l}}}}());
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'js/page-storage.js' */
var RY=RY||{};RY.RecentPageStorage=function(h){var f="com.atlassian.confluence.plugins.recently.viewed.pages.v1";var d=100;var c={};var b=function(){var i=function(k,l){if(k==="lastSeen"&&_.isString(l)){if(AJS.$.browser.msie){l=l.replace(/\-/g,"/");l=l.replace(/T.*$/,"")}return new Date(l).getTime()}else{return l}};try{c=JSON.parse(h.getItem(f),i)||{}}catch(j){c={}}return c};var g=function(){var i=_.values(c);var k=i.length-d;if(k>0){var j=_.sortBy(i,function(l){return l.lastSeen});_.times(k,function(){var l=j.shift();delete c[l.id]})}};var e=function(){g();try{h.setItem(f,JSON.stringify(c))}catch(i){}};this.addCurrentPage=function(i){if(!(i.id&&i.title)){return}b();a(i);e()};var a=function(i){var j=c[i.id];if(!j){c[i.id]=j={}}j=_.extend(j,i);j.lastSeen=new Date().getTime();j.count=j.count+1||1};this.getPages=function(){return _.values(b())}};
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'js/filter.js' */
var RY=RY||{};RY.FilterView=Backbone.View.extend({className:"filter",events:{"input .filter-input":"onInput","keyup .filter-input":"onInput","keydown .filter-input":"onKeydown"},initialize:function(){_.bindAll(this,"render","onInput","onKeydown","search");this.navigationEvents=this.options.navigationEvents;this.onInput=RY.util.wait(this.onInput,100,this)},render:function(){this.$input=this.$(".filter-input");return this},onInput:function(a){if(a&&_.contains([37,38,39,40],a.which)){return}this.search()},onKeydown:function(a){switch(a.which){case 13:this.navigationEvents.trigger("select");a.preventDefault();a.stopPropagation();break;case 38:this.navigationEvents.trigger("previous");a.preventDefault();break;case 40:this.navigationEvents.trigger("next");a.preventDefault();break}},search:function(){var a=this.$input.val();this.collection.search(a)}});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'js/page.js' */
var RY=RY||{};RY.Page=Backbone.Model.extend({href:function(){return AJS.contextPath()+this.get("url")},daysSinceLastSeen:function(){return RY.util.daysSince(this.get("lastSeen"))}});RY.PageCollection=Backbone.Collection.extend({model:RY.Page,url:AJS.contextPath()+"/rest/recentlyviewed/1.0/recent",search:function(b){var a;if(AJS.$.trim(b).length===0){a=this.models}else{var c=b.match(/[^\s-]+/g);a=this.filter(function(f){var g=f.get("title");var e=f.get("space");var d=(g+e).toLowerCase();return _.all(c,function(h){return d.indexOf(h.toLowerCase())!==-1})})}this.trigger("filter",a,b);return a},comparator:function(a){return -(a.get("lastSeen"))}});RY.PageView=Backbone.View.extend({tagName:"li",className:"ry-page",template:RY.Templates.pageItem,initialize:function(){_.bindAll(this,"hide","show","render")},hide:function(){this.$el.hide().removeClass("shown")},show:function(){this.$el.show().addClass("shown")},render:function(){var a=this.model.toJSON();a.href=this.model.href();this.$el.html(this.template(a));return this}});RY.PageGroupView=Backbone.View.extend({className:"group",template:RY.Templates.pageGroup,initialize:function(){_.bindAll(this,"hide","hideAll","show","showBorder","showPages","add","render");this.title=this.options.title;this.modelViews={}},hide:function(){this.$el.hide()},hideAll:function(){this.$el.removeClass("border").hide();_.invoke(_.values(this.modelViews),"hide")},show:function(){this.$el.show()},showBorder:function(){this.$el.addClass("border")},showPages:function(a){var c=this;var b=false;_.each(a,function(e){var d=c.modelViews[e.cid];if(d){b=true;d.show()}});if(b){this.show()}return b},add:function(b){var a=new RY.PageView({model:b});this.modelViews[b.cid]=a;this.$list.append(a.render().el)},render:function(){this.$el.html(this.template({title:this.title}));this.$list=this.$("ul");return this}});RY.PageNavigator=function(a,e,c){var g=null;function f(){return a.find("li.shown")}function b(i){pageItems=f();var h=pageItems.index(pageItems.filter(".highlight"));if(g){g.removeClass("highlight")}i+=h;if(i<0){i=pageItems.length-1}if(i>=pageItems.length){i=0}g=pageItems.eq(i);g.addClass("highlight")}function d(){if(!g.length){return}var k=e;var l=k.children();var j=k.height();var i=g.outerHeight(true);var h=g.position().top;if(h<0){if(f().index(g)===0){k.scrollTop(0);return}k.scrollTop(g.offset().top-l.offset().top)}else{if(h>j){k.scrollTop(g.offset().top-l.offset().top-j+i)}}}c.on("select",function(){if(g&&g.is(":visible")){RY.util.analytics.trackPageOpen();var h=g.find(".page-title a").attr("href");window.location=h}},this);c.on("previous",function(){b(-1);d()},this);c.on("next",function(){b(1);d()},this)};RY.PageCollectionView=Backbone.View.extend({template:RY.Templates.pageCollection,events:{"click .page-title a":RY.util.analytics.trackPageOpen},initialize:function(){_.bindAll(this,"checkEmpty","filter","_groupForPage","addOne","showEmptyMessage","clearEmptyMessage","addAll","render");this.modelViews={};this.collection.on("reset",this.addAll,this);this.collection.on("add",this.addOne,this);this.collection.on("filter",this.filter,this)},checkEmpty:function(a,e){var f=this.collection.isEmpty();var b=a.length===0;if(f||b){var c;if(f){c="Sorry mate, looks like you haven\'t visited any pages yet."}else{var d=AJS.contextPath()+"/dosearchsite.action?queryString="+encodeURIComponent(e);c=AJS.format("We didn\'\'t find any matching pages in your history. \u003ca href=\"{0}\">Click here\u003c\/a> to search for this term instead.",d)}this.showEmptyMessage(c)}else{this.clearEmptyMessage()}},filter:function(b,d){d=d||"";this.checkEmpty(b,d);var a=[this.$today,this.$yesterday,this.$older];_.invoke(a,"hideAll");var c=[];_.each(a,function(f){var e=f.showPages(b);if(e){c.push(f)}});if(c.length>1){c.pop();_.invoke(c,"showBorder")}},_groupForPage:function(a){var b=a.daysSinceLastSeen();if(b===0){return this.$today}else{if(b===1){return this.$yesterday}else{return this.$older}}},addOne:function(a){var b=this._groupForPage(a);b.add(a)},showEmptyMessage:function(a){this.$(".empty").html(AJS.$("<p>").html(a))},clearEmptyMessage:function(){this.$(".empty").html("")},addAll:function(){this.collection.each(this.addOne)},render:function(){this.$el.html(this.template());this.$today=new RY.PageGroupView({title:"Today"});this.$yesterday=new RY.PageGroupView({title:"Yesterday"});this.$older=new RY.PageGroupView({title:"Older"});var a=this.$(".groups");a.append(this.$today.render().el);a.append(this.$yesterday.render().el);a.append(this.$older.render().el);_.invoke([this.$today,this.$yesterday,this.$older],"hideAll");return this}});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'js/quicknav/util.js' */
var RYQ=RYQ||{};(function(){RYQ.util={analytics:{trackQuickNavOpen:function(){AJS.trigger("analytics",{name:"recently-viewed-quicknav-open"})},trackQuickNavPageOpen:function(){AJS.trigger("analytics",{name:"recently-viewed-quicknav-click-page"})},trackQuickNavRecentlyDialogOpen:function(){AJS.trigger("analytics",{name:"recently-viewed-quicknav-click-more-recent"})}}}}());
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:app-resources', location = 'js/quicknav/quicknav.js' */
var RYQ=RYQ||{};RYQ.QuickNavEntry=Backbone.Model.extend({classNameByType:{blogpost:"content-type-blogpost",page:"content-type-page"},parse:function(a){return{className:this.classNameByType[a.type],name:a.title,href:AJS.contextPath()+a.url,id:a.id,spaceName:a.space,lastSeen:a.lastSeen}}},{escape:function(b){var a=_.map(b,_.clone);_.each(a,function(c){c.name=_.escape(c.name);c.spaceName=_.escape(c.spaceName)});return a}});RYQ.QuickNavEntryCollection=Backbone.Collection.extend({model:RYQ.QuickNavEntry,url:AJS.contextPath()+"/rest/recentlyviewed/1.0/recent?limit=8",search:function(b){var a;if(AJS.$.trim(b).length===0){a=this.models}else{var c=b.match(/[^\s-]+/g);a=this.filter(function(e){var f=e.get("name");var d=f.toLowerCase();return _.all(c,function(g){return d.indexOf(g.toLowerCase())!==-1})})}this.trigger("filter",a);return a},comparator:function(a){return -(a.get("lastSeen"))}});(function(a){RYQ.QuickNav=Backbone.View.extend({initialize:function(){this.moreLink={className:"recently-viewed",href:"#",name:"More recently viewed pages..."};this.$input=a("#quick-search-query");this.makeDropdown();this.addShowHideHandlers();this.getHistory=_.once(this._getHistory);_.bindAll(this,"makeDropdown","addSearchResultBoostingHandler","_getHistory","render","addShowHideHandlers","_getItemsToShow","showQuickResults","onQuickSearch")},makeDropdown:function(){var c=function(d){a("a",d).each(function(){var g=a(this);var e=g.find("span");var f=AJS.dropDown.getAdditionalPropertyValue(e,"spaceName");if(f&&!g.is(".content-type-spacedesc")){g.after(g.clone().attr("class","space-name").html(f));g.parent().addClass("with-space-name")}})};var b=this;this.$dropdown=AJS.inputDrivenDropdown({dropdownPlacement:function(d){b.$input.closest("form").find(".quick-nav-drop-down").append(d)},dropdownPostprocess:function(d){c(d)},ajsDropDownOptions:{className:"recently-viewed-dropdown"}})},addSearchResultBoostingHandler:function(){var b=this;a(window).on("quicksearch.ajax-success",function(g,f){var d=f.url.match("/json/contentnamesearch.action");var c=f.url.match(/rest\/quicknav\/\d\/search/);if(d||c){b.onQuickSearch(g,f)}})},_getHistory:function(){return this.collection.fetch().done(this.addSearchResultBoostingHandler)},render:function(){var b=this.getHistory();b.done(_.bind(function(){if(AJS.dropDown.current==null&&this.collection.length!==0&&this.$input.val().length===0){this.showQuickResults()}},this));var c=this.$input;c.trigger("quick-search-loading-start");b.always(function(){c.trigger("quick-search-loading-stop")})},addShowHideHandlers:function(){var b=this;this.$input.on("focus",function(){b.render()}).on("click",function(c){c.stopPropagation();b.render()}).on("keyup",function(f){var c=f.which===27;var g=f.which===13;var d=a(this).val().length!==0;if(d||c){if(b.$dropdown.dd&&b.$dropdown.dd.$.is(":visible")){b.$dropdown.hide()}}else{if(!g){b.render()}}})},_getItemsToShow:function(){var c=this.collection.toJSON();var b=c.length>0&&c[0].id==AJS.Meta.get("page-id");if(b){c.shift()}return c},showQuickResults:function(){var b=RYQ.QuickNavEntry.escape(this._getItemsToShow());this.$dropdown.show([b,[this.moreLink]],"","");a(".recently-viewed-dropdown").on("click",".recently-viewed",function(c){c.preventDefault();a("#view-user-history-link").click();RYQ.util.analytics.trackQuickNavRecentlyDialogOpen()});a(".recently-viewed-dropdown").on("click",".with-space-name",function(c){RYQ.util.analytics.trackQuickNavPageOpen()});RYQ.util.analytics.trackQuickNavOpen()},onQuickSearch:function(l,f){var o=f.json.query;var c=_.map(this.collection.search(o),function(e){return e.attributes});c=RYQ.QuickNavEntry.escape(c);if(c.length==0){return}var m=f.json.contentNameMatches;var p=-1;for(var g=0;g<m.length;g++){var n=m[g][0].className;if(n=="content-type-blogpost"||n=="content-type-page"){p=g;break}}if(p!=-1){var h=m[p];var b=Math.min(h.length>4?2:6-h.length,c.length);h.unshift.apply(h,_(c).first(b));m[p]=_.uniq(h,function(e){return +e.id});if(h.length>6){var k=6-b;for(var d=k;d>0;d--){h.pop()}}}else{m.unshift(_(c).first(6))}}})}(AJS.$));
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:main-resources', location = 'js/main.js' */
var RY=RY||{};AJS.toInit(function(a){a("#view-user-history-link").unbind("click");a("#view-user-history-link").click(function(i){i.preventDefault();var d=new AJS.Dialog({width:600,height:500,id:"recently-viewed-dialog",closeOnOutsideClick:true});var c="recently-viewed-spinner-"+Math.random();var h=a(RY.Templates.body({spinnerId:c}));d.addHeader("Recently viewed pages");d.addPanel("SinglePanel",h);d.addLink("Close",function(e){e.hide()});var f=a("<div>",{"class":"dialog-tip"}).text("Hint: type \"g\" and then \"r\" anywhere to quickly open this menu");d.popup.element.find(".dialog-button-panel").append(f);var j=new RY.PageCollection();var b=new RY.PageCollectionView({collection:j});h.find(".pages").html(b.render().el);var g=Raphael.spinner(c,16,"#707070");j.fetch({success:function(){g();var k=_.extend({},Backbone.Events);var l=new RY.PageNavigator(b.$el,h.parent(),k);var e=new RY.FilterView({collection:j,el:h.find(".filter"),navigationEvents:k}).render();e.search()}});d.gotoPanel(0);d.show();RY.util.analytics.trackDialogOpen()})});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.recently-viewed-plugin:main-resources', location = 'js/quicknav/main.js' */
var RYQ=RYQ||{};AJS.toInit(function(){var b=new RYQ.QuickNavEntryCollection();var a=new RYQ.QuickNav({collection:b})});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugins.atlassian-plugins-webresource-plugin:data', location = 'js/data/data.js' */
(function(){if(!window.WRM){window.WRM={}}var a={};function b(d){if(!d){return d}return JSON.parse(d)}function c(e,d){return Object.prototype.hasOwnProperty.call(e,d)}WRM.data=function(d){if(!c(a,d)){if(WRM._unparsedData&&c(WRM._unparsedData,d)){var g=WRM._unparsedData[d];try{a[d]=b(g);WRM._unparsedData[d]=undefined}catch(f){console&&console.log&&console.log("JSON Error parsing data with key "+d+": "+f)}}else{a[d]=null}}return a[d]}}());
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'confluence.aui.staging:content-ready', location = 'js/content-ready.js' */

// This has been added to directly to confluence to make it into confluence 5.0; it should be remove
// once contentReady is in AUI.

(function($) {

    var EVENT = 'content.ready'; // event name used in underlying event implementation

    // Check it's not already defined, eg when it's added to AUI plugin
    if (AJS.contentReady) {
        return;
    }

    /**
     * Binds an event handler to be called when content is ready.
     *
     * Usage:
     *
     * AJS.contentReady(fn)
     * called whenever content is ready
     *
     * AJS.contentReady(selector, fn)
     * called whenever content has been added that matches the given selector.
     * If the selector matches no elements, the handler will not be called.
     *
     * fn is always called with the first argument as a jQuery element.
     * Optional arguments can be passed by the triggering code.
     */
    AJS.contentReady = function() {
        var handler, boundSelector;
        if (1 === arguments.length) {
            handler = arguments[0];
        }
        else if (2 === arguments.length) {
            boundSelector = arguments[0];
            handler = arguments[1];
        }
        $(AJS).on(EVENT, function(e) {
            var args = Array.prototype.slice.call(arguments, 1),
                $element = args[0];
            if (boundSelector) {
                var $matched;
                if ($element.is(boundSelector)) {
                    $matched = $element;
                }
                else {
                    $matched = $element.find(boundSelector);
                }
                if ($matched.length) {
                    args[0] = $matched;
                    handler.apply(this, args);
                }
            }
            else {
                handler.apply(this, args);
            }
        });
    };

    /**
     * Triggers all bound contentReady event handlers.
     *
     * Usage:
     *
     * AJS.triggerContentReady($el, args...)
     * Calls all contentReady event handlers with the given element.
     * The $el argument is jQuery element and is required.
     * args... are optional arguments passed through to event handlers.
     */
    AJS.triggerContentReady = function() {
        $(AJS).trigger(EVENT, arguments);
    };

    /**
     * contentReady is always triggered on document ready. It is triggered with the body as the context.
     * Developers can set AJS.contentReady.onReadyArgs as a single value or array; these are passed
     * to handlers that are executed on ready.
     */
    $(function() {
        var args = [$("body")];
        if (AJS.contentReady.onReadyArgs) {
            args = args.concat(AJS.contentReady.onReadyArgs);
        }
        AJS.triggerContentReady.apply(this, args);
    });

}(AJS.$));

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugin.notifications.notifications-module:notification-util', location = '/js/notifications-module-util.js' */
if(typeof AJS.namespace==="undefined"){AJS.namespace=function(d,c,e){var f=d.split(".");c=c||window;for(var b=0,g=f.length-1;b<g;b++){var a=c[f[b]];c=(a!=null)?a:c[f[b]]={}}return c[f[b]]=e||{}}}AJS.overrides={};AJS.Meta=jQuery.extend({},AJS.Meta,{set:function(a,b){AJS.overrides[a]=b},get:function(b){if(typeof AJS.overrides[b]!="undefined"){return AJS.overrides[b]}var a=jQuery("meta[name='ajs-"+b+"']");if(!a.length){return undefined}var c=a.attr("content");return AJS.asBooleanOrString(c)},getBoolean:function(a){return this.get(a)===true},getNumber:function(a){return +this.get(a)},getAllAsMap:function(){var a={};jQuery("meta[name^=ajs-]").each(function(){a[this.name.substring(4)]=this.content});return jQuery.extend(a,AJS.overrides)}});if(typeof Class==="undefined"){(function(){begetObject=function(d){var c=function(){};c.prototype=d;return new c()};var a=false,b=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(){var j;var g=this.prototype;if(arguments.length>1){var i=AJS.$.makeArray(arguments);j=i.pop();var h;AJS.$.each(i,function(l,k){if(h){h=h.extend(k)}else{h=k}});return h.extend(this.prototype).extend(j)}else{j=arguments[0]}a=true;var f=new this();a=false;for(var e in j){if(f[e]=typeof j[e]=="function"&&typeof g[e]=="function"&&b.test(j[e])){f[e]=(function(k,l){return function(){var n=this._super;this._super=g[k];var m=l.apply(this,arguments);this._super=n;return m}})(e,j[e])}else{if(typeof g[e]==="object"){var d=begetObject(j[e]);AJS.$.each(g[e],function(l,m){if(!d[l]){d[l]=m}else{if(typeof d[l]==="object"){var k=begetObject(d[l]);AJS.$.each(m,function(o,n){if(!k[o]){k[o]=n}});d[l]=k}}});f[e]=d}else{f[e]=j[e]}}}function c(){if(!a&&this.init){this.init.apply(this,arguments)}}c.fn=c.prototype=f;c.constructor=c;c.extend=arguments.callee;return c}})()};
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugin.notifications.notifications-module:notification-util', location = '/js/FormDialog.js' */
(function(){AJS.namespace("Notifications.FormDialog");Notifications.FormDialog=Class.extend({init:function(b){var a=this;this.options=b;this.$trigger=AJS.$(this.options.trigger);this.url=this.$trigger.attr("href");this.options.id=this.options.id||"notifiations-form-dialog";AJS.$(".notifications-form-dialog").remove();this.dialog=new AJS.Dialog({width:this.options.width||810,height:this.options.height||600,id:this.options.id});AJS.$(this.dialog.popup.element).addClass("notifications-form-dialog");this.ajaxOptions=AJS.$.extend({url:this.url,success:function(c){a._renderContents(c);a.dialog.show()},error:function(c){alert("Unknown error occurred. Please reload the page and try again.")},complete:function(d,c){a._hideLoadingIndicator()}},this.options.ajaxOptions)},show:function(){this._showLoadingIndicator();AJS.$.ajax(this.ajaxOptions)},hide:function(){this.dialog.hide()},_getThrobber:function(){if(!this.$throbber){this.$throbber=AJS.$('<span class="icon throbber loading notif-hidden"></span>');this.dialog.popup.element.find(".dialog-button-panel").prepend(this.$throbber)}return this.$throbber},_showThrobber:function(){this._getThrobber().show()},_hideThrobber:function(){this._getThrobber().hide()},_handleSubmit:function(b){var a=this;a._showThrobber();b.addClass("submitting");AJS.$(".error",b).remove();var c=b.serializeArray();AJS.$.ajax({url:b.attr("action"),type:!!this.options.edit?"PUT":"POST",contentType:"application/json",data:JSON.stringify({config:c}),success:function(d){b.removeClass("submitting");window.location.reload()},error:function(f){if(f&&f.responseText){try{var d=JSON.parse(f.responseText);if(d&&d.errors){AJS.$.each(d.errors,function(h,i){AJS.$("input[name='"+h+"']",b).after("<div class='error'>"+i+"</div>")})}if(d&&d.errorMessages){var g="";AJS.$.each(d.errorMessages,function(h,i){g+=i+"<br/>"});if(g!==""){AJS.$("#errorContainer",b).append("<div class='field-group error'>"+g+"</div>")}}}catch(e){alert("Unknown error occurred. Please reload the page and try again.")}}b.removeClass("submitting")},complete:function(e,d){a._hideThrobber()}})},_renderContents:function(f){var e=AJS.$(f),a=this,c=AJS.$(":header:first",e);this.dialog.addHeader(c.text());c.remove();this.dialog.addPanel(this.options.id);var b=this.dialog.getPanel(0,0);b.html(e);e.find("form").submit(function(i){i.preventDefault();var h=AJS.$(this);a._handleSubmit.call(a,h)});var d=AJS.$("div.buttons-container",e);var g=d.find(".button:first");this.dialog.addButton(g.val(),function(){e.find("form").submit()},"aui-button "+g.attr("id"));this.dialog.addLink("Cancel",function(){a.hide()},"cancel-dialog");d.remove();if(this.options.decorateContents){this.options.decorateContents(e)}this.dialog.popup.element.addClass("jira-dialog-content-ready")},_showLoadingIndicator:function(){var a=this,b=440,c=0;clearInterval(this.loadingTimer);this._getLoadingIndicator().show();this.loadingTimer=window.setInterval(function(){if(c===b){c=0}c=c+40;a._getLoadingIndicator().css("backgroundPosition","0 -"+c+"px")},50)},_hideLoadingIndicator:function(){clearInterval(this.loadingTimer);this._getLoadingIndicator().hide()},_getLoadingIndicator:function(){if(!this.loadingIndicator){this.loadingIndicator=AJS.$('<div class="aui-loading"></div>');this.loadingIndicator.appendTo("body")}return this.loadingIndicator}})})();
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugin.notifications.notifications-module:notification-prefs-checker', location = 'js/user-notification-prompt.js' */
(function(){AJS.$(function(){var b=AJS.Meta.get("show-notifications-prompt");if(b){var c=AJS.format("New notification servers are available! Please visit your personal {0}notification settings{1} to ensure all your preferences are up to date.","<a href='"+AJS.contextPath()+AJS.Meta.get("show-notifications-url")+"' target='_blank'>","</a>");var a=AJS.$('<div class="notif-global-warning" id="notificationsBanner"/>').html(c);a.prependTo("body")}})})();
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:analytics', location = 'analytics/analytics.js' */
var _gaq=_gaq||[];AJS.$(function(){_gaq.push(["navlinks._setAccount","UA-20272869-14"]);_gaq.push(["navlinks._setDomainName","none"]);_gaq.push(["navlinks._setAllowLinker",true]);_gaq.push(["navlinks._setDetectTitle",false]);_gaq.push(["navlinks._trackPageview",location.pathname]);AJS.$.ajax(AJS.contextPath()+"/rest/nav-links-analytics-data/1.0/",{success:function(a){_gaq.push(["navlinks._setCustomVar",1,"isUserAdmin",a.isUserAdmin?"true":"false",2])}})});(function(a){a.trackEvent=function(c,e,b,d){if(d===undefined){_gaq.push(["navlinks._trackEvent",c,e,b])}else{_gaq.push(["navlinks._trackEvent",c,e,b,d])}if(AJS.EventQueue){AJS.EventQueue.push({name:c+"."+e,properties:{label:b,value:d}})}};a.getCurrentApplication=function(){if(window.Confluence!==undefined){return"confluence"}else{if(window.BAMBOO!==undefined){return"bamboo"}else{if(window.JIRA!==undefined){return"jira"}else{return""}}}}}(window.NL=(window.NL||{})));
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:analytics', location = 'analytics/help-analytics.js' */
(function(c,b){function a(g,d,f){try{b.trackEvent("helpmenu",g,d,f)}catch(h){AJS.log("failed to track analytics event, category: helpmenu, action: "+g+", label: "+d+", value: "+f)}}c(function(){var d=c("#system-help-menu-content,#help-menu-link-content,#bamboo\\.global\\.header-help\\.menu");d.bind({"aui-dropdown2-show":function(f){a("show","")},"aui-dropdown2-hide":function(f){a("hide","")}}).find("a").unbind(".analytics").bind("click.analytics",function(){var e=this.attributes.href;a("linkFollowed",typeof e==="object"?e.value:e)}).addClass("interactive")})}(jQuery,window.NL=(window.NL||{})));
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-menu', location = 'appswitcher/appswitcher.soy' */
// This file was automatically generated from appswitcher.soy.
// Please don't edit this file by hand.

if (typeof navlinks == 'undefined') { var navlinks = {}; }
if (typeof navlinks.templates == 'undefined') { navlinks.templates = {}; }
if (typeof navlinks.templates.appswitcher == 'undefined') { navlinks.templates.appswitcher = {}; }


navlinks.templates.appswitcher.linkSection = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.list.length > 0) {
    output.append('<div class="aui-nav-heading sidebar-section-header">', soy.$$escapeHtml(opt_data.title), '</div><ul class="aui-nav nav-links">');
    var linkList8 = opt_data.list;
    var linkListLen8 = linkList8.length;
    for (var linkIndex8 = 0; linkIndex8 < linkListLen8; linkIndex8++) {
      var linkData8 = linkList8[linkIndex8];
      navlinks.templates.appswitcher.applicationsItem(linkData8, output);
    }
    output.append('</ul>');
  }
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher.applicationsItem = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li class="nav-link"><a href="', soy.$$escapeHtml(opt_data.link), '" class="interactive', (opt_data.self) ? ' checked' : '', '" title="', soy.$$escapeHtml(opt_data.link), '"><span class="nav-link-label">', soy.$$escapeHtml(opt_data.label), '</span></a></li>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher.shortcutsItem = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li class="nav-link"><a href="', soy.$$escapeHtml(opt_data.link), '" class="interactive', (opt_data.self) ? ' checked' : '', '" title="', soy.$$escapeHtml(opt_data.link), '"><span class="nav-link-label">', soy.$$escapeHtml(opt_data.label), '</span>', (opt_data.showDescription && opt_data.description) ? '<span class="nav-link-description">' + soy.$$escapeHtml(opt_data.description) + '</span>' : '', '</a></li>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher.error = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="app-switcher-error">', "\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\x3cspan class\x3d\x22app-switcher-retry\x22\x3e\u518d\u8bd5\u4e00\u6b21\x3c/span\x3e.", '</div>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher.sidebarContents = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-page-panel-nav"><nav class="aui-navgroup aui-navgroup-vertical"><div class="app-switcher-section app-switcher-applications"><div class="aui-nav-heading">', soy.$$escapeHtml("\u5e94\u7528\u94fe\u63a5"), '</div><div class="app-switcher-loading">', "\u6b63\u5728\u8fd0\u884c\x26hellip;", '</div></div><div class="app-switcher-section app-switcher-shortcuts"><div class="aui-nav-heading">', soy.$$escapeHtml("\u5feb\u6377\u65b9\u5f0f"), '</div><div class="app-switcher-loading">', "\u6b63\u5728\u8fd0\u884c\x26hellip;", '</div></div></nav></div>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher.trigger = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class="aui-icon aui-icon-small aui-iconfont-appswitcher">', soy.$$escapeHtml("\u5df2\u94fe\u63a5\u7a0b\u5e8f"), '</span>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher.projectHeaderSection = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="app-switcher-title">');
  aui.avatar.avatar({size: 'large', avatarImageUrl: opt_data.avatarUrl, isProject: true, title: opt_data.name}, output);
  output.append('<div class="sidebar-project-name">', soy.$$escapeHtml(opt_data.name), '</div></div>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher.cogDropdown = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var dropdownList__soy74 = new soy.StringBuilder();
  navlinks.templates.appswitcher.dropdownList({list: opt_data.links}, dropdownList__soy74);
  dropdownList__soy74 = dropdownList__soy74.toString();
  aui.dropdown2.dropdown2({menu: {'id': opt_data.id, 'content': dropdownList__soy74, 'extraClasses': 'aui-style-default sidebar-customize-section'}, trigger: {'showIcon': false, 'content': '<span class="aui-icon aui-icon-small aui-iconfont-configure"></span>', 'container': '#app-switcher'}}, output);
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher.dropdownList = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class="sidebar-admin-links">');
  var linkList82 = opt_data.list;
  var linkListLen82 = linkList82.length;
  for (var linkIndex82 = 0; linkIndex82 < linkListLen82; linkIndex82++) {
    var linkData82 = linkList82[linkIndex82];
    output.append('<li class="nav-link"><a href="', soy.$$escapeHtml(linkData82.href), '" title="', soy.$$escapeHtml(linkData82.title), '"><span class="nav-link-label">', soy.$$escapeHtml(linkData82.label), '</span></a></li>');
  }
  output.append('</ul>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher.switcher = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (true) {
    if (AJS.DarkFeatures.isEnabled('rotp.sidebar')) {
      var sidebarContents__soy97 = new soy.StringBuilder();
      navlinks.templates.appswitcher.sidebarContents(null, sidebarContents__soy97);
      sidebarContents__soy97 = sidebarContents__soy97.toString();
      var triggerContent__soy99 = new soy.StringBuilder();
      navlinks.templates.appswitcher.trigger(null, triggerContent__soy99);
      triggerContent__soy99 = triggerContent__soy99.toString();
      navlinks.templates.appswitcher.sidebar({sidebar: {'id': 'app-switcher', 'content': sidebarContents__soy97}, trigger: {'showIcon': false, 'content': triggerContent__soy99}}, output);
      output.append('<script>\n                (function (NL) {\n                    var initialise = function () {\n                        new NL.SideBar({\n                            sidebarContents: \'#app-switcher\'\n                        });\n                    };\n                    if (NL.SideBar) {\n                        initialise();\n                    } else {\n                        NL.onInit = initialise;\n                    }\n                }(window.NL = (window.NL || {})));\n                window.NL.isUserAdmin = ', soy.$$escapeHtml(false), '<\/script>');
    } else {
      navlinks.templates.appswitcher_old.switcher(null, output);
    }
  }
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher.sidebar = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a class="sidebar-trigger app-switcher-trigger" aria-owns="', soy.$$escapeHtml(opt_data.sidebar.id), '" aria-haspopup="true">', opt_data.trigger.content, '</a><div id=', soy.$$escapeHtml(opt_data.sidebar.id), ' class="app-switcher-sidebar aui-style-default sidebar-offscreen">', opt_data.sidebar.content, '</div>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-menu', location = 'appswitcher/appswitcher.js' */
(function(c,a){a.SideBar=function(d){var e=this;this.$sidebar=null;d=c.extend({sidebarContents:null},d);this.getLinks=function(){return c.ajax({url:AJS.contextPath()+"/rest/menu/latest/appswitcher",cache:false,dataType:"json"}).done(this.updateAppLinks).fail(this.showAppSwitcherError)};this.populateProjectHeader=function(g,f){e.getSidebar().find(".app-switcher-shortcuts .aui-nav-heading").after(navlinks.templates.appswitcher.projectHeaderSection({avatarUrl:f,name:g}))};this.getProjectData=function(){var f=c(".project-shortcut-dialog-trigger"),g=f.data("key"),h=f.data("entity-type");if(f.size()==0||!g||!h){c(".app-switcher-shortcuts").remove();return}var j,i;i=c.ajax({url:AJS.contextPath()+"/rest/project-shortcuts/1.0/local/"+g,cache:false,data:{entityType:h},dataType:"json"});j=c.ajax({url:AJS.contextPath()+"/rest/project-shortcuts/1.0/remote/"+g,cache:false,data:{entityType:h},dataType:"json"});c.when(i,j).then(function(l,k){e.updateProjectShortcuts(l,k,{key:g,entityType:h,name:f.data("name"),avatarUrl:f.find("img").prop("src")})},e.showProjectShortcutsError)};this.getSidebar=function(){if(!this.$sidebar){this.$sidebar=c(d.sidebarContents)}return this.$sidebar};this.addApplicationsCog=function(){c(".app-switcher-applications .aui-nav-heading").before(navlinks.templates.appswitcher.cogDropdown({id:"sidebar-applications-admin-dropdown",links:[{href:AJS.contextPath()+"/plugins/servlet/customize-application-navigator",label:"\u81EA\u5B9A\u4E49\u5BFC\u822A",title:"\u6DFB\u52A0\u65B0\u7684\u6761\u76EE\uFF0C\u9690\u85CF\u73B0\u6709\u7684\u6216\u9650\u5236\u8C01\u80FD\u770B\u89C1\u4EC0\u4E48"},{href:AJS.contextPath()+"/plugins/servlet/applinks/listApplicationLinks",label:"\u7BA1\u7406\u5E94\u7528\u7A0B\u5E8F\u94FE\u63A5",title:"\u94FE\u63A5\u5230\u66F4\u591AAtlassian\u5E94\u7528\u7A0B\u5E8F"}]}))};this.addProjectShortcutsCog=function(f,h){var g=[{href:AJS.contextPath()+"/plugins/servlet/custom-content-links-admin?entityKey="+f,label:"\u81EA\u5B9A\u4E49\u5FEB\u6377\u952E",title:""}];if(e.entityMappings[h]){g.push({href:e.generateEntityLinksUrl(f,e.entityMappings[h]),label:"\u7BA1\u7406\u4EA7\u54C1\u94FE\u63A5",title:""})}e.getSidebar().find(".app-switcher-shortcuts .aui-nav-heading").before(navlinks.templates.appswitcher.cogDropdown({id:"sidebar-project-shortcuts-admin-dropdown",links:g}))};this.updateAppLinks=function(f){c(function(){e.getSidebar().find(".app-switcher-applications").html(navlinks.templates.appswitcher.linkSection({title:"\u5E94\u7528\u94FE\u63A5",list:f}));if(a.isUserAdmin){e.addApplicationsCog()}e.bindAnalyticsHandlers(e.getSidebar(),f)})};this.updateProjectShortcuts=function(i,g,h){var j=i[0].shortcuts,f=g[0].shortcuts;e.getSidebar().find(".app-switcher-shortcuts").html(navlinks.templates.appswitcher.linkSection({title:"\u5FEB\u6377\u65B9\u5F0F",list:j.concat(f)}));if(a.isUserAdmin){e.addProjectShortcutsCog(h.key,h.entityType)}e.populateProjectHeader(h.name,h.avatarUrl);e.bindAnalyticsHandlers(e.getSidebar(),data)};this.entityMappings={"confluence.space":"com.atlassian.applinks.api.application.confluence.ConfluenceSpaceEntityType","jira.project":"com.atlassian.applinks.api.application.jira.JiraProjectEntityType","bamboo.project":"com.atlassian.applinks.api.application.bamboo.BambooProjectEntityType","stash.project":"com.atlassian.applinks.api.application.stash.StashProjectEntityType"};this.generateEntityLinksUrl=function(f,g){if(g===e.entityMappings["confluence.space"]){return AJS.contextPath()+"/spaces/listentitylinks.action?typeId="+g+"&key="+f}else{return AJS.contextPath()+"/plugins/servlet/applinks/listEntityLinks/"+g+"/"+f}};this.showAppSwitcherError=function(){c(function(){var f=e.getSidebar();f.find(".app-switcher-applications .app-switcher-loading").replaceWith(navlinks.templates.appswitcher.error());f.off(".appswitcher").on("click.appswitcher",".app-switcher-retry",c.proxy(e.retryLoading,e))})};this.showProjectShortcutsError=function(){c(function(){var f=e.getSidebar();f.find(".app-switcher-shortcuts .app-switcher-loading").replaceWith(navlinks.templates.appswitcher.error());f.off(".appswitcher").on("click.appswitcher",".app-switcher-retry",c.proxy(e.retryLoading,e))})};this.retryLoading=function(f){this.getSidebar().html(navlinks.templates.appswitcher.sidebarContents());this.getLinks();this.getProjectData();f&&f.stopPropagation()};this.trackEvent=function(h,f,g){try{a.trackEvent("appswitcher-new",h,f,g)}catch(i){AJS.log("failed to track analytics event, category: appswitcher, action: "+h+", label: "+f+", value: "+g)}};this.bindAnalyticsHandlers=function(f,g){};this.getLinks();c(this.getProjectData);this.toggleSidebar=function(h){var i=e.getSidebar(),g=c("body"),f=c(window.document);if(!g.hasClass("app-switcher-open")){var k=c("#header");i.css("left",-i.width());i.parent("body").length||i.appendTo("body");b({data:i});i.animate({left:0},300);function j(l){var n=l.target&&c(l.target),m=l.keyCode;if(l.originalEvent===h.originalEvent){return}if(n&&!m&&!(n.closest(i).length||n.closest(k).length)&&h.which==1&&!(l.shiftKey||l.ctrlKey||l.metaKey)){e.toggleSidebar()}else{if(m===27){e.toggleSidebar()}}}f.on("click.appSwitcher",j);f.on("keydown.appSwitcher",j);f.on("scroll.appSwitcher",i,b)}else{f.off(".appSwitcher")}g.toggleClass("app-switcher-open")};c("#header").on("click",".app-switcher-trigger",this.toggleSidebar)};function b(f){var d=c(document).scrollTop(),g=c("#header"),e=(g.height()+g.offset().top)-d;if(e>=0){f.data.css({top:e,position:"fixed"})}else{f.data.css({top:0,left:0,position:"fixed"})}}if(a.onInit){a.onInit()}}(jQuery,window.NL=(window.NL||{})));
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-menu', location = 'appswitcher/appswitcher_old.js' */
(function(b,a){a.AppSwitcher=function(c){var d=AJS.contextPath()+"/plugins/servlet/customize-application-navigator";var e=this;this.$dropdown=null;c=b.extend({dropdownContents:null},c);this.getLinks=function(){return b.ajax({url:AJS.contextPath()+"/rest/menu/latest/appswitcher",cache:false,dataType:"json"}).done(this.updateDropdown).fail(this.showError)};this.getDropdown=function(){if(!this.$dropdown){this.$dropdown=b(c.dropdownContents)}return this.$dropdown};this.updateDropdown=function(f){b(function(){e.getDropdown().html(navlinks.templates.appswitcher_old.applications({apps:f,showAdminLink:a.isUserAdmin,adminLink:d}));e.bindAnalyticsHandlers(e.getDropdown(),f)})};this.showError=function(){b(function(){e.getDropdown().html(navlinks.templates.appswitcher_old.error()).off(".appswitcher").on("click.appswitcher",".app-switcher-retry",b.proxy(e.retryLoading,e))})};this.retryLoading=function(f){this.getDropdown().html(navlinks.templates.appswitcher_old.loading());this.getLinks();f&&f.stopPropagation()};this.trackEvent=function(h,f,g){try{a.trackEvent("appswitcher-new",h,f,g)}catch(i){AJS.log("failed to track analytics event, category: appswitcher, action: "+h+", label: "+f+", value: "+g)}};this.bindAnalyticsHandlers=function(i,h){function g(){var l=0;for(var j in h){var k=h[j];if(k.custom){l+=1}}return l}var f=g();i.on({"aui-dropdown2-show":function(j){e.trackEvent("show",a.getCurrentApplication(),h.length)},"aui-dropdown2-hide":function(j){e.trackEvent("hide",a.getCurrentApplication(),h.length)}});i.off(".analytics").on("click.analytics","a",function(j){e.trackEvent("appSelected",b(this).attr("href"),h.length)})};this.getLinks()};if(a.onInit){a.onInit()}}(jQuery,window.NL=(window.NL||{})));
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-menu', location = 'appswitcher/appswitcher_old.soy' */
// This file was automatically generated from appswitcher_old.soy.
// Please don't edit this file by hand.

if (typeof navlinks == 'undefined') { var navlinks = {}; }
if (typeof navlinks.templates == 'undefined') { navlinks.templates = {}; }
if (typeof navlinks.templates.appswitcher_old == 'undefined') { navlinks.templates.appswitcher_old = {}; }


navlinks.templates.appswitcher_old.applications = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  navlinks.templates.appswitcher_old.applicationsSection({list: opt_data.apps, listClass: 'nav-links', showDescription: opt_data.showDescription}, output);
  if (opt_data.custom) {
    navlinks.templates.appswitcher_old.applicationsSection({list: opt_data.custom, showDescription: opt_data.showDescription}, output);
  }
  if (opt_data.showAdminLink) {
    navlinks.templates.appswitcher_old.adminSection(opt_data, output);
  }
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher_old.applicationsSection = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.list.length > 0) {
    var param19 = new soy.StringBuilder('<ul', (opt_data.listClass) ? ' class="' + soy.$$escapeHtml(opt_data.listClass) + '"' : '', '>');
    var linkList27 = opt_data.list;
    var linkListLen27 = linkList27.length;
    for (var linkIndex27 = 0; linkIndex27 < linkListLen27; linkIndex27++) {
      var linkData27 = linkList27[linkIndex27];
      navlinks.templates.appswitcher_old.applicationsItem(soy.$$augmentData(linkData27, {showDescription: opt_data.showDescription}), param19);
    }
    param19.append('</ul>');
    aui.dropdown2.section({content: param19.toString()}, output);
  }
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher_old.applicationsItem = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li class="nav-link', (opt_data.self) ? ' nav-link-local' : '', '"><a href="', soy.$$escapeHtml(opt_data.link), '" class="aui-dropdown2-radio interactive', (opt_data.self) ? ' checked' : '', '" title="', soy.$$escapeHtml(opt_data.link), '"><span class="nav-link-label">', soy.$$escapeHtml(opt_data.label), '</span>', (opt_data.showDescription && opt_data.description) ? '<span class="nav-link-description">' + soy.$$escapeHtml(opt_data.description) + '</span>' : '', '</a></li>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher_old.adminSection = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  aui.dropdown2.section({content: '<ul class="nav-links"><li><a class="nav-link-edit-wrapper" href="' + soy.$$escapeHtml(opt_data.adminLink) + '"><span class="nav-link-edit">' + "\u914d\u7f6e..." + '</span></a></li></ul>'}, output);
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher_old.error = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="app-switcher-error">', "\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\x3cspan class\x3d\x22app-switcher-retry\x22\x3e\u518d\u8bd5\u4e00\u6b21\x3c/span\x3e.", '</div>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher_old.loading = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="app-switcher-loading">', "\u6b63\u5728\u8fd0\u884c\x26hellip;", '</div>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher_old.trigger = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class="aui-icon aui-icon-small aui-iconfont-appswitcher">', soy.$$escapeHtml("\u5df2\u94fe\u63a5\u7a0b\u5e8f"), '</span>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.appswitcher_old.switcher = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (true) {
    var loadingContent__soy81 = new soy.StringBuilder();
    navlinks.templates.appswitcher_old.loading(null, loadingContent__soy81);
    loadingContent__soy81 = loadingContent__soy81.toString();
    var triggerContent__soy83 = new soy.StringBuilder();
    navlinks.templates.appswitcher_old.trigger(null, triggerContent__soy83);
    triggerContent__soy83 = triggerContent__soy83.toString();
    aui.dropdown2.dropdown2({menu: {'id': 'app-switcher', 'content': loadingContent__soy81, 'extraClasses': 'aui-style-default'}, trigger: {'showIcon': false, 'content': triggerContent__soy83, 'extraClasses': 'app-switcher-trigger'}}, output);
    output.append('<script>\n            (function (NL) {\n                var initialise = function () {\n                    // For some milestones of AUI, the atlassian soy namespace was renamed to aui. Handle that here by ensuring that window.atlassian is defined.\n                    window.atlassian = window.atlassian || window.aui;\n                    new NL.AppSwitcher({\n                        dropdownContents: \'#app-switcher\'\n                    });\n                };\n                if (NL.AppSwitcher) {\n                    initialise();\n                } else {\n                    NL.onInit = initialise;\n                }\n            }(window.NL = (window.NL || {})));\n            window.NL.isUserAdmin = ', soy.$$escapeHtml(false), '<\/script>');
  }
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-ui-components:space-page-picker', location = '/js/space-page-picker.js' */
(function(i,c){var t={conf_all:"All spaces",conf_favorites:"Favourite spaces",conf_global:"Site spaces",conf_personal:"Personal spaces",conf_current:"Current space"};var b={data:null,suggestCategories:null};var v="SPACE-PAGE-TRIGGER-VALUE";var f={placeholder:"Select a space or page",multiple:true,formatInputTooShort:function(){return "Start typing to search"},formatResult:function(G,I,L){if(G.children){I.addClass("space-page-picker-result-category");return i.fn.select2.defaults.formatResult.apply(this,arguments)}else{if(G.id){I.attr("title",G.text);I.addClass("space-page-picker-result-label-with-icon");var F=i("<span/>").addClass(G.className+" item-text").html(i.fn.select2.defaults.formatResult.apply(this,arguments));var K=(G.subText)?i("<span/>").addClass("space-name").html(G.subText):i("");var H=i("<span/>").attr(s(G.id),G.id).append(F).append(K);var J=i("<span/>").append(H);return J}else{I.addClass(G.className);return i.fn.select2.defaults.formatResult.apply(this,arguments)}}},formatSelection:function(G,H){H.addClass("space-page-picker-selected-item");H.attr("title",G.text);var F=i("<span/>").attr(s(G.id),G.id).addClass(G.className+" item-text").html(i.fn.select2.defaults.formatSelection.apply(this,arguments));H.append(F)},escapeMarkup:function(F){return F},formatResultCssClass:function(F){return(F.children||F.id)?"":"select2-result-space-page-separator"},containerCssClass:"space-page-picker-container",dropdownCssClass:"space-page-picker-drop"};var B=function(F,H){var G=F.data("select2").opts.manualInit;if(G===true){return}d(F.val(),F,H)};function r(H,G,F){var I=_.map(H,function(J){return G[J]});return(F)?I:((I.length>0)?I[0]:null)}var l=function(F){var G;if(F.suggestCategories){var H={text:"Suggested categories",children:_.map(F.suggestCategories,function(I){return o(I)})}}return function(J){if(G){J.callback(G);return}var I=[];G={results:[]};if(x(F)){var L=i.getJSON(AJS.contextPath()+"/rest/recentlyviewed/1.0/recent/spaces").done(function(M){var N=(H)?[H]:[];(M.length>0)&&N.push({text:"Suggested spaces",children:_.map(M,function(O){return m(O.key,_.escape(O.name),null,true)})});(N.length>0)&&(G.results=G.results.concat(N))}).fail(function(){AJS.debug("Couldn't fetch recent spaces");var M=(H)?[H]:[];(M.length>0)&&(G.results=G.results.concat(M))});I.push(L)}if(j(F)){var K=i.getJSON(AJS.contextPath()+"/rest/recentlyviewed/1.0/recent/pages",{noTrashedContent:true}).done(function(M){if(M.length>0){G.results.push({text:"Suggested pages",children:_.map(M,function(N){return h(N.id,_.escape(N.title),_.escape(N.space),"content-type-page",true)})})}}).fail(function(){AJS.debug("Couldn't fetch recent pages")});I.push(K)}i.when.apply(i,_.map(I,function(N){var M=i.Deferred();N.always(function(){M.resolve()});return M})).done(function(){if(G.results.length===0){G.results=[{text:"",children:[]}]}J.callback(G)})}};var w=function(F){var G="";if(!F||F.length===2&&F.indexOf("space")>=0&&F.indexOf("page")>=0){G="type=spacedesc&type=personalspacedesc&type=page"}else{if(F.length===1&&F[0]==="space"){G="type=spacedesc&type=personalspacedesc"}else{if(F.length===1&&F[0]==="page"){G="type=page"}else{return}}}return window.Select2.query.ajax({url:AJS.contextPath()+"/rest/quicknav/1/search?"+G,data:function(H,I){return{query:H,maxPerCategory:25}},quietMillis:250,results:function(K,O){var N=K.contentNameMatches;if(N.length<=1){return{results:[]}}else{var P=[];var I=function(Q){return E(Q.spaceKey,Q.spaceName,Q.id,Q.name,Q.className)};for(var L=0;L<N.length-1;L++){var M=[];for(var J=0;J<N[L].length;J++){var H=I(N[L][J]);if(H){M.push(H)}}if(M.length>0){P=P.concat(M);P.push({id:"",text:"",subText:"",className:"",disabled:true})}}return{results:[{text:"Search results",children:P}]}}}})};var p=function(G){var F=w(G.contentType);var H=l(G);return function(I){if(I.term.length<2){H(I)}else{F(I)}}};function s(F){return(F.indexOf("page:")===0)?"data-item-id":"data-item-key"}function m(F,I,G,H){G=(G)?G:((F.indexOf("~")===0)?"content-type-personalspacedesc":"content-type-spacedesc");return e("space",F,I,"",G,H)}function o(F){var G=t[F];return e("space-cat",F,G,"","content-type-space-category",G)}function h(J,I,F,G,H){return e("page",J,I,F,G,H)}function e(L,I,K,H,G,J){var F=y(L,I);K=(!K)?I:K;G=(J)?G:(G+" content-not-found");return{id:F,text:K,subText:H,className:G,disabled:(J?false:true)}}function C(F){return"space-cat:"+F}function a(F){return"space:"+F}function D(F){return"page:"+F}function E(J,G,K,H,I){var F;if(I==="content-type-spacedesc"||I==="content-type-personalspacedesc"){F=m(J,G,I,true)}else{if(I==="content-type-page"){F=h(K,H,G,I,true)}}return F}function y(){var F=Array.prototype.slice.apply(arguments);return F.join(":")}function x(F){return((!F.contentType||F.contentType.length===0||F.contentType.indexOf("space")>=0)&&F.showRecentlyViewedSpaces!==false)}function j(F){return((!F.contentType||F.contentType.length===0||F.contentType.indexOf("page")>=0)&&F.showRecentlyViewedPages!==false)}function n(G,F){var H=q("SpaceCat",G,F.inputSpaceCatId,(F.inputSpaceCatName)?F.inputSpaceCatName:F.inputSpaceCatId);return u(G,H.id,H.name)}function g(G,F){var H=q("Space",G,F.inputSpaceId,(F.inputSpaceName)?F.inputSpaceName:F.inputSpaceId);return u(G,H.id,H.name)}function z(G,F){var H=q("Page",G,F.inputPageId,(F.inputPageName)?F.inputPageName:F.inputPageId);return u(G,H.id,H.name)}function q(J,H,K,G){var F;if(!K){F=H.attr("id");if(!F){return null}K=F+J}if(!G){var I=H.attr("name")||F;G=I+J}return{id:K,name:G}}function u(G,I,F){var H=i("#"+I);if(H.length===0){H=i(Confluence.UI.Components.templates.hiddenField({id:I,name:F}));G.after(H)}return H}function k(G,I,H){if(!G){return}var F=_.filter(I,function(J){return J.indexOf(H)===0});F=_.map(F,function(J){return J.substring(H.length,J.length)});G.val(F.join(","))}function A(M,H,I,F){I=(I)?(_.isArray(I)?I:I.split(",")):[];F=(F)?F.split(","):[];var L=_.union(I,F);var G=_.map(L,function(O){return H+O});var J=M.val();var N=J?J.split(","):[];var K=_.union(N,G);if(K.length>0){M.val(K.join(","))}}c.build=function(G){var F=_.extend({},b,f,G);if(!G.data){F=_.extend({},{initSelection:B,query:p(F)},F)}var H=i(F.orgElement);if(!H||H.length!==1){return F}if(!H.val()&&!F.manualInit){H.val(v)}H.addClass("select2-input");return F};c.setValue=function(G,F){d(G,F,function(H){F.auiSelect2("data",H)})};function d(P,G,S){var U=G.data("select2").opts;var Q=U.placeholder||G.data("placeholder");var K=n(G,U);var M=g(G,U);var I=z(G,U);G.on("change",function(V){k(K,V.val,"space-cat:");k(M,V.val,"space:");k(I,V.val,"page:")});G.val("");var T=(G["0"].tagName==="SELECT")?(G.context.multiple):(U.multiple);var N=[];var R=[];var L=[];var F={};var H=(P)?P.split(","):[];H=_.filter(H,function(V){var W=V.split(":");if(W.length===2){return true}else{if(W.length<0||W.length>=3||(W.length===1&&(W[0]!==v&&W[0]!==Q))){AJS.debug("Error value: "+W)}}});P=H.join(",");G.val(P);A(G,"space-cat:",U.spaceCatKeys,(K)?K.val():"");A(G,"space:",U.spaceKeys,(M)?M.val():"");A(G,"page:",U.pageIds,(I)?I.val():"");P=G.val();H=(P)?P.split(","):[];k(K,H,"space-cat:");k(M,H,"space:");k(I,H,"page:");if(H.length===0){return}_.each(H,function(V,W){var Z=V.split(":");if(Z.length===2){var Y=Z[0];var X=Z[1];if(Y==="space-cat"){N.push(X)}else{if(Y==="space"){R.push(X)}else{if(Y==="page"){L.push(X)}}}}});_.each(N,function(V){F[C(V)]=o(V)});var O=[];if(R.length>0){var J=i.getJSON(AJS.contextPath()+"/rest/prototype/1/space",{spaceKey:R}).done(function(X){var V=[];_.each(X.space,function(Y){F[a(Y.key)]=m(Y.key,_.escape(Y.name),null,true);V.push(Y.key)});var W=_.difference(R,V);_.each(W,function(Y){F[a(Y)]=m(Y,Y,null,false)})}).fail(function(){AJS.debug("Couldn't resolve spaceKeys:",R);_.each(R,function(V){F[a(V)]=m(V,V,null,false)})});O.push(J)}_.each(L,function(V){var W=i.getJSON(AJS.contextPath()+"/rest/api/content/"+V,{expand:"space"}).done(function(X){F[D(X.id)]=h(X.id,_.escape(X.title),_.escape(X.space.name),"content-type-page",true)}).fail(function(){AJS.debug("Couldn't resolve pageId:",V);F[D(V)]=h(V,V,"","content-type-page",false)});O.push(W)});i.when.apply(i,_.map(O,function(W){var V=new i.Deferred();W.always(function(){V.resolve()});return V.promise()})).done(function(){S(r(H,F,T))})}}(AJS.$,window.Confluence.UI.Components.SpacePagePicker));
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-ui-components:space-page-picker', location = '/soy/space-page-picker.soy' */
// This file was automatically generated from space-page-picker.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.UI == 'undefined') { Confluence.UI = {}; }
if (typeof Confluence.UI.Components == 'undefined') { Confluence.UI.Components = {}; }
if (typeof Confluence.UI.Components.templates == 'undefined') { Confluence.UI.Components.templates = {}; }


Confluence.UI.Components.templates.hiddenField = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<input type="hidden" id="', soy.$$escapeHtml(opt_data.id), '" name="', soy.$$escapeHtml(opt_data.name), '" />');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-tasks:task-report-blueprint-resources', location = 'templates/task-report-blueprint.soy' */
// This file was automatically generated from task-report-blueprint.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.InlineTasks == 'undefined') { Confluence.InlineTasks = {}; }
if (typeof Confluence.InlineTasks.Report == 'undefined') { Confluence.InlineTasks.Report = {}; }
if (typeof Confluence.InlineTasks.Report.Templates == 'undefined') { Confluence.InlineTasks.Report.Templates = {}; }


Confluence.InlineTasks.Report.Templates.taskReportBlueprintForm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ol class="report-types" id="task-report-types"><li class="template" id="team-task-report"><span class="template-preview team-task-report-icon"></span><div class="template-meta"><div class="template-name">', soy.$$escapeHtml("Assigned to my team"), '</div><div class="template-description">', soy.$$escapeHtml("Show tasks assigned to specific people"), '</div></div></li><li class="template" id="location-task-report"><span class="template-preview location-task-report-icon"></span><div class="template-meta"><div class="template-name">', soy.$$escapeHtml("In my project"), '</div><div class="template-description">', soy.$$escapeHtml("Show tasks created in specific spaces and pages"), '</div></div></li><li class="template" id="custom-task-report"><span class="template-preview custom-task-report-icon"></span><div class="template-meta"><div class="template-name">', soy.$$escapeHtml("Custom"), '</div><div class="template-description">', soy.$$escapeHtml("Create your own report"), '</div></div></li></ol>');
  return opt_sb ? '' : output.toString();
};


Confluence.InlineTasks.Report.Templates.reportByTeamForm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form action="#" method="post" id="report-by-team-form" class="aui"><fieldset><div class="field-group"><label for="task-report-page-title">', soy.$$escapeHtml("Title"), '<span class="aui-icon icon-required">required</span></label><input id="task-report-page-title" class="text long-field" type="text" name="title" placeholder="', soy.$$escapeHtml("Title of your task report"), '"/><div class="error hidden"></div></div><div class="field-group"><label for="task-report-team-picker">', soy.$$escapeHtml("Assigned to"), '<span class="aui-icon icon-required">required</span></label><input id="task-report-team-picker" class="text select2-input long-field autocomplete-multiuser" type="text" name="teamMembers" placeholder="', soy.$$escapeHtml("Only show tasks assigned to these people"), '" /><div class="error hidden"></div></div><div class="field-group"><div class="checkbox"><input class="checkbox" type="checkbox" name="completed" id="task-report-completed-cb"><label for="task-report-completed-cb">', soy.$$escapeHtml("Include completed tasks"), '</label></div></div></fieldset></form>');
  return opt_sb ? '' : output.toString();
};


Confluence.InlineTasks.Report.Templates.reportByLocationForm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form action="#" method="post" id="report-by-location-form" class="aui"><fieldset><div class="field-group"><label for="task-report-page-title">', soy.$$escapeHtml("Title"), '<span class="aui-icon icon-required">required</span></label><input id="task-report-page-title" class="text long-field" type="text" name="title" placeholder="', soy.$$escapeHtml("Title of your task report"), '"/><div class="error hidden"></div></div><div class="field-group"><label for="task-report-location-picker">', soy.$$escapeHtml("Created in"), '<span class="aui-icon icon-required">required</span></label><input id="task-report-location-picker" class="text select2-input long-field" type="text" name="locations" placeholder="', soy.$$escapeHtml("Select task locations"), '"/><div class="error hidden"></div></div><div class="field-group"><label for="task-report-label-picker">', soy.$$escapeHtml("Labels"), '</label><input id="task-report-label-picker" class="text select2-input long-field" type="text" name="labels" placeholder="', soy.$$escapeHtml("Only show tasks on pages with these labels"), '"/></div><div class="field-group"><div class="checkbox"><input class="checkbox" type="checkbox" name="completed" id="task-report-completed-cb"><label for="task-report-completed-cb">', soy.$$escapeHtml("Include completed tasks"), '</label></div></div></fieldset></form>');
  return opt_sb ? '' : output.toString();
};


Confluence.InlineTasks.Report.Templates.assigneeParam = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.userKeys) {
    output.append('<ac:parameter ac:name="assignees">');
    var keyList48 = opt_data.userKeys;
    var keyListLen48 = keyList48.length;
    for (var keyIndex48 = 0; keyIndex48 < keyListLen48; keyIndex48++) {
      var keyData48 = keyList48[keyIndex48];
      output.append('<ri:user ri:userkey="', soy.$$escapeHtml(keyData48), '" />');
    }
    output.append('</ac:parameter>');
  }
  return opt_sb ? '' : output.toString();
};


Confluence.InlineTasks.Report.Templates.creatorParam = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.userKeys) {
    output.append('<ac:parameter ac:name="creators">');
    var keyList58 = opt_data.userKeys;
    var keyListLen58 = keyList58.length;
    for (var keyIndex58 = 0; keyIndex58 < keyListLen58; keyIndex58++) {
      var keyData58 = keyList58[keyIndex58];
      output.append('<ri:user ri:userkey="', soy.$$escapeHtml(keyData58), '" />');
    }
    output.append('</ac:parameter>');
  }
  return opt_sb ? '' : output.toString();
};


Confluence.InlineTasks.Report.Templates.macroParam = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.value) ? '<ac:parameter ac:name="' + soy.$$escapeHtml(opt_data.name) + '">' + soy.$$escapeHtml(opt_data.value) + '</ac:parameter>' : '');
  return opt_sb ? '' : output.toString();
};


Confluence.InlineTasks.Report.Templates.teamReportContent = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<p><ac:structured-macro ac:name="tasks-report-macro"><!-- assignee-->');
  Confluence.InlineTasks.Report.Templates.assigneeParam({userKeys: opt_data.assignees}, output);
  output.append('<!-- status--><ac:parameter ac:name="status">incomplete</ac:parameter></ac:structured-macro></p>');
  if (opt_data.showCompletedTasks) {
    output.append('<ac:structured-macro ac:name="expand"><ac:parameter ac:name="title">', soy.$$escapeHtml("Completed tasks"), '</ac:parameter><ac:rich-text-body><p><ac:structured-macro ac:name="tasks-report-macro"><!-- assignee-->');
    Confluence.InlineTasks.Report.Templates.assigneeParam({userKeys: opt_data.assignees}, output);
    output.append('<!-- status--><ac:parameter ac:name="status">complete</ac:parameter></ac:structured-macro></p></ac:rich-text-body></ac:structured-macro>');
  }
  return opt_sb ? '' : output.toString();
};


Confluence.InlineTasks.Report.Templates.locationReportContent = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<p><ac:structured-macro ac:name="tasks-report-macro"><!-- space-->');
  Confluence.InlineTasks.Report.Templates.macroParam({name: 'spaces', value: opt_data.spaceKeys}, output);
  output.append('<!-- pages-->');
  Confluence.InlineTasks.Report.Templates.macroParam({name: 'pages', value: opt_data.pageIds}, output);
  output.append('<!-- labels-->');
  Confluence.InlineTasks.Report.Templates.macroParam({name: 'labels', value: opt_data.labels}, output);
  output.append('<!-- status--><ac:parameter ac:name="status">incomplete</ac:parameter></ac:structured-macro></p>');
  if (opt_data.showCompletedTasks) {
    output.append('<ac:structured-macro ac:name="expand"><ac:parameter ac:name="title">', soy.$$escapeHtml("Completed tasks"), '</ac:parameter><ac:rich-text-body><p><ac:structured-macro ac:name="tasks-report-macro"><!-- space-->');
    Confluence.InlineTasks.Report.Templates.macroParam({name: 'spaces', value: opt_data.spaceKeys}, output);
    output.append('<!-- pages-->');
    Confluence.InlineTasks.Report.Templates.macroParam({name: 'pages', value: opt_data.pageIds}, output);
    output.append('<!-- labels-->');
    Confluence.InlineTasks.Report.Templates.macroParam({name: 'labels', value: opt_data.labels}, output);
    output.append('<!-- status--><ac:parameter ac:name="status">complete</ac:parameter></ac:structured-macro></p></ac:rich-text-body></ac:structured-macro>');
  }
  return opt_sb ? '' : output.toString();
};


Confluence.InlineTasks.Report.Templates.customReportContent = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<p><span class="text-placeholder">', soy.$$escapeHtml("Edit the Task Report macro to customise your report."), '</span></p><ac:structured-macro ac:name="tasks-report-macro"><!-- creators -->');
  Confluence.InlineTasks.Report.Templates.creatorParam({userKeys: opt_data.creators}, output);
  output.append('</ac:structured-macro>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-tasks:task-report-blueprint-resources', location = 'js/task-report-bp.js' */
(function(d){var c;function e(t){t.addClass("selected").siblings().removeClass("selected");AJS.trigger("selected.task-report-types",t)}function i(w,v){var u=d("#task-report-types");var t=u.find(".template");t.first().addClass("selected");t.click(function(){e(d(this))}).dblclick(function(){d(".create-dialog-create-button:visible").click()});u.attr("tabindex",0).keydown(function(z){if(z.keyCode==38||z.keyCode==40){z.preventDefault();var x=u.find(".selected"),y;if(z.keyCode==38){y=x.prev().length?x.prev():t.last()}else{if(z.keyCode==40){y=x.next().length?x.next():t.first()}}e(y)}});u.focus();AJS.bind("selected.task-report-types",function(y,x){if(d(x).is("#custom-task-report")){p("Create")}else{p("Next")}});p("Next")}function f(v,u){var t=u.$container.find(".selected").attr("id");if(t==="team-task-report"){u.nextPageId="teamTaskReportId"}else{if(t==="location-task-report"){u.nextPageId="locationTaskReportId"}else{if(t==="custom-task-report"){c.getSubmissionRestPath=function(){return"/rest/create-dialog/1.0/content-blueprint/create-draft"};g(u,"custom-task-report-template")}else{return false}}}}function a(u,t){o()}function m(w,v){var t=d("#report-by-team-form");b(t);var u=true;u=r(d("#task-report-team-picker"),"Assignee is required.")&&u;u=s(v.wizardData.spaceKey)&&u;u?g(v,"team-task-report-template"):h(t);return u}function n(u,t){k(d("#task-report-location-picker"),t.wizardData.spaceKey);q(d("#task-report-label-picker"));o()}function j(w,v){var t=d("#report-by-location-form");b(t);var u=true;u=r(d("#task-report-location-picker"),"A space or page is required.")&&u;u=s(v.wizardData.spaceKey)&&u;if(u){g(v,"location-task-report-template")}else{h(t)}return u}Confluence.Blueprint.setWizard("com.atlassian.confluence.plugins.confluence-inline-tasks:task-report-blueprint-item",function(t){t.on("post-render.selectTaskReportId",i);t.on("submit.selectTaskReportId",f);t.on("post-render.teamTaskReportId",a);t.on("submit.teamTaskReportId",m);t.on("post-render.locationTaskReportId",n);t.on("submit.locationTaskReportId",j);c=t});function b(t){t.find(".error").addClass("hidden").empty()}function s(v){var t=d("#task-report-page-title");var u=Confluence.Blueprint.validateTitle(t,v);if(!u){t.siblings(".error").removeClass("hidden")}return u}function r(t,u){var v=d.trim(t.val());if(!v&&u){l(t,u)}return !!v}function h(u){var t=u.find("div.error:not(.hidden)").first();var v=t.siblings("input").eq(0);if(v.hasClass("select2-offscreen")){v.select2("focus")}else{v.focus()}}function g(t,u){t.pageData.contentTemplateKey=u}function l(v,u){var t=v.siblings(".error");t.html(u);t.removeClass("hidden");return u}function q(t){t.auiSelect2(Confluence.UI.Components.LabelPicker.build())}function k(u,t){u.auiSelect2(Confluence.UI.Components.SpacePagePicker.build({spaceKeys:[t],orgElement:u}))}function p(t){d(".create-dialog-create-button:visible").text(t)}function o(){var v;var u=d("#task-report-completed-cb");var t=d("label[for=task-report-completed-cb]").add(u);t.mousedown(function(){v=true});d(".dialog-wizard-page-main").on("mouseup",function(w){if(!t.is(w.target)&&v){u.click()}v=false})}})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-knowledge-base:space-kb-web-resource', location = 'js/kb-space-dialog-wizard.js' */
AJS.bind("blueprint.wizard-register.ready",function(){function a(d,c){c.pageData.ContentPageTitle=c.pageData.name;return Confluence.SpaceBlueprint.CommonWizardBindings.submit(d,c)}function b(d,c){c.soyRenderContext.atlToken=AJS.Meta.get("atl-token");c.soyRenderContext.showSpacePermission=false}Confluence.Blueprint.setWizard("com.atlassian.confluence.plugins.confluence-knowledge-base:kb-blueprint-item",function(c){c.on("submit.kbSpaceId",a);c.on("pre-render.kbSpaceId",b);c.on("post-render.kbSpaceId",Confluence.SpaceBlueprint.CommonWizardBindings.postRender)})});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-knowledge-base:space-kb-web-resource', location = 'soy/space.soy' */
// This file was automatically generated from space.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.SpaceBlueprints == 'undefined') { Confluence.SpaceBlueprints = {}; }
if (typeof Confluence.SpaceBlueprints.KnowledgeBase == 'undefined') { Confluence.SpaceBlueprints.KnowledgeBase = {}; }


Confluence.SpaceBlueprints.KnowledgeBase.dialogForm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form action="#" method="post" id="kb-space-form" class="common-space-form aui">');
  Confluence.Templates.Blueprints.CreateSpace.createSpaceFormFields({showSpacePermission: false, fieldErrors: opt_data.fieldErrors, name: opt_data.name, spaceKey: opt_data.spaceKey}, output);
  output.append('<fieldset><div class="field-group"><label for="kb-space-desc">', soy.$$escapeHtml("Description"), '</label><textarea id="kb-space-desc" class="textarea long-field" rows="3" type="text" name="description" placeholder="', soy.$$escapeHtml("What is this knowledge base for?"), '"></textarea></div></fieldset></form>');
  return opt_sb ? '' : output.toString();
};


Confluence.SpaceBlueprints.KnowledgeBase.livesearchMacro = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:structured-macro ac:name="livesearch"><ac:parameter ac:name="additional">page excerpt</ac:parameter><ac:parameter ac:name="placeholder">', soy.$$escapeHtml("Search for a solution"), '</ac:parameter>', (opt_data.spaceKey) ? '<ac:parameter ac:name="spaceKey"><ri:space ri:space-key="' + soy.$$escapeHtml(opt_data.spaceKey) + '"/></ac:parameter>' : '', '<ac:parameter ac:name="type">page</ac:parameter><ac:parameter ac:name="size">large</ac:parameter></ac:structured-macro>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-ui-components:label-picker', location = '/js/label-picker.js' */
(function(c,a){var e=/[:;,\.\?&\[\(\)#\^\*@!<>\]]/g;var b=function(h){var i=_.uniq(h.match(e));return i.join(" ")};var g=function(h){var i=_.map(h.contentNameMatches[0],function(j){return{id:j.name,text:j.name}});return _.sortBy(i,function(j){return j.text.toLowerCase()})};var d=function(h){return function(i){return c.extend({query:i},h)}};var f={placeholder:"Add labels",multiple:true,minimumInputLength:1,maximumSelectionSize:20,tokenSeparators:[" ",","],formatInputTooShort:function(i,h){return "Start typing to search for a label"},formatSelectionTooBig:function(h){return AJS.format("You can only input {0} labels",h)},formatResult:function(h){return Confluence.UI.Components.LabelPicker.templates.labelResult({label:{labelName:h.text,isNew:h.isNew}})},formatNoMatches:function(i){var h=b(i);if(h){return Confluence.UI.Components.LabelPicker.templates.labelInvalid({inputValue:i,invalidCharacters:h})}else{return "Add labels"}},createSearchChoice:function(i){if(!i){return null}var h=b(i);if(h){return null}return{id:i,text:i,isNew:true}},ajax:{data:d(),dataType:"json",url:Confluence.getContextPath()+"/labels/autocompletelabel.action",results:function(h){return{results:g(h)}},quietMillis:300},dropdownCssClass:"labels-dropdown",containerCssClass:"labels-autocomplete"};a.build=function(i){var h=c.extend({},f,i);if(i&&i.queryOpts){h.ajax.data=d(i.queryOpts);delete h.queryOpts}return h}}(AJS.$,window.Confluence.UI.Components.LabelPicker));
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-ui-components:label-picker', location = '/soy/label-picker.soy' */
// This file was automatically generated from label-picker.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.UI == 'undefined') { Confluence.UI = {}; }
if (typeof Confluence.UI.Components == 'undefined') { Confluence.UI.Components = {}; }
if (typeof Confluence.UI.Components.LabelPicker == 'undefined') { Confluence.UI.Components.LabelPicker = {}; }
if (typeof Confluence.UI.Components.LabelPicker.templates == 'undefined') { Confluence.UI.Components.LabelPicker.templates = {}; }


Confluence.UI.Components.LabelPicker.templates.labelResult = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.label.isNew) ? soy.$$escapeHtml(AJS.format("\x22{0}\x22 - add a new label",opt_data.label.labelName)) : soy.$$escapeHtml(opt_data.label.labelName));
  return opt_sb ? '' : output.toString();
};


Confluence.UI.Components.LabelPicker.templates.labelInvalid = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var inputValueHtml__soy9 = new soy.StringBuilder('<b>', soy.$$escapeHtml(opt_data.inputValue), '</b>');
  inputValueHtml__soy9 = inputValueHtml__soy9.toString();
  var invalidCharactersHtml__soy13 = new soy.StringBuilder('<b>', soy.$$escapeHtml(opt_data.invalidCharacters), '</b>');
  invalidCharactersHtml__soy13 = invalidCharactersHtml__soy13.toString();
  output.append(AJS.format("{0} contains invalid characters {1}",inputValueHtml__soy9,invalidCharactersHtml__soy13));
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-knowledge-base:kb-article-resources', location = 'soy/kb-articles.soy' */
// This file was automatically generated from kb-articles.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.Plugin == 'undefined') { Confluence.Blueprints.Plugin = {}; }
if (typeof Confluence.Blueprints.Plugin.KnowledgeBaseArticle == 'undefined') { Confluence.Blueprints.Plugin.KnowledgeBaseArticle = {}; }


Confluence.Blueprints.Plugin.KnowledgeBaseArticle.wizardPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form action="#" method="post" id="kb-article-wizard-page-form" class="aui"><fieldset><div class="field-group"><label for="kb-article-title">', soy.$$escapeHtml("Name"), '<span class="aui-icon icon-required">', soy.$$escapeHtml("$WIZARD_FORM_FIELD_REQUIRED_I18N"), '</span></label><input id="kb-article-title" class="text  long-field" type="text" name="title" title="title" placeholder="', soy.$$escapeHtml("Title of your article."), '" maxlength="255"><div class="error"></div></div><div class="field-group"><label>', soy.$$escapeHtml("Labels"), '</label><input id="kb-article-labels" class="text select2-input long-field" type="text" name="labelsString" title="labelsString" placeholder="', soy.$$escapeHtml("Topics this article covers (e.g. \x22printer\x22)."), '"><div class="error"></div></div></fieldset></form>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Plugin.KnowledgeBaseArticle.contentbylabelMacro = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:structured-macro ac:name="contentbylabel"><ac:parameter ac:name="showLabels">false</ac:parameter><ac:parameter ac:name="max">5</ac:parameter><ac:parameter ac:name="sort">modified</ac:parameter><ac:parameter ac:name="reverse">true</ac:parameter><ac:parameter ac:name="labels">', soy.$$escapeHtml(opt_data.labels), '</ac:parameter><ac:parameter ac:name="showSpace">false</ac:parameter><ac:parameter ac:name="spaces"><ri:space ri:space-key="', soy.$$escapeHtml(opt_data.spaceKey), '" /></ac:parameter><ac:parameter ac:name="type">page</ac:parameter></ac:structured-macro>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-knowledge-base:kb-article-resources', location = 'js/kb-articles-dialog-wizard.js' */
AJS.toInit(function(c){function a(i,g){var h=g.$container;var f=c("#kb-article-labels",h);f.auiSelect2(Confluence.UI.Components.LabelPicker.build({separator:" ",queryOpts:{spaceKey:g.wizardData.spaceKey}}))}function d(j,h){var i=j,e=i.find("#kb-article-title"),g=c.trim(e.val()),f;i.find(".error").html("");if(!g){f="Title is required."}else{if(!Confluence.Blueprint.canCreatePage(h,g)){f="A page with this name already exists."}}if(f){e.focus().siblings(".error").html(f);return false}return true}function b(g,f){return d(f.$container,f.wizardData.spaceKey)}Confluence.Blueprint.setWizard("com.atlassian.confluence.plugins.confluence-knowledge-base:kb-how-to-item",function(e){e.on("post-render.kb-how-to-wizard",a);e.on("submit.kb-how-to-wizard",b)});Confluence.Blueprint.setWizard("com.atlassian.confluence.plugins.confluence-knowledge-base:kb-troubleshooting-item",function(e){e.on("post-render.kb-troubleshooting-wizard",a);e.on("submit.kb-troubleshooting-wizard",b)})});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:common-template-resources', location = 'com/atlassian/confluence/plugins/blueprint/common/soy/common-templates.soy' */
// This file was automatically generated from common-templates.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.Common == 'undefined') { Confluence.Blueprints.Common = {}; }
if (typeof Confluence.Blueprints.Common.Index == 'undefined') { Confluence.Blueprints.Common.Index = {}; }


Confluence.Blueprints.Common.Index.detailsSummaryMacro = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:macro ac:name="detailssummary"><ac:parameter ac:name="label">', soy.$$escapeHtml(opt_data.label), '</ac:parameter><ac:parameter ac:name="spaces">', soy.$$escapeHtml(opt_data.spaces), '</ac:parameter><ac:parameter ac:name="firstcolumn">', soy.$$escapeHtml(opt_data.firstcolumn), '</ac:parameter><ac:parameter ac:name="headings">', soy.$$escapeHtml(opt_data.headings), '</ac:parameter><ac:parameter ac:name="blankTitle">', soy.$$escapeHtml(opt_data.blankTitle), '</ac:parameter><ac:parameter ac:name="blankDescription">', soy.$$escapeHtml(opt_data.blankDescription), '</ac:parameter><ac:parameter ac:name="contentBlueprintId">', soy.$$escapeHtml(opt_data.contentBlueprintId), '</ac:parameter><ac:parameter ac:name="blueprintModuleCompleteKey">', soy.$$escapeHtml(opt_data.blueprintModuleCompleteKey), '</ac:parameter><ac:parameter ac:name="createButtonLabel">', soy.$$escapeHtml(opt_data.createButtonLabel), '</ac:parameter></ac:macro>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Common.Index.createFromTemplateMacro = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:macro ac:name="create-from-template"><ac:parameter ac:name="blueprintModuleCompleteKey">', soy.$$escapeHtml(opt_data.moduleKey), '</ac:parameter><ac:parameter ac:name="buttonLabel">', soy.$$escapeHtml(opt_data.buttonLabel), '</ac:parameter><ac:parameter ac:name="spaceKey">', soy.$$escapeHtml(opt_data.spaceKey), '</ac:parameter><ac:parameter ac:name="templateName">', soy.$$escapeHtml(opt_data.templateName), '</ac:parameter></ac:macro>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:file-list-resources', location = 'com/atlassian/confluence/plugins/filelist/soy/templates.soy' */
// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.FileList == 'undefined') { Confluence.Templates.FileList = {}; }


Confluence.Templates.FileList.dialogForm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form action="#" method="post" id="file-list-form" class="aui"><fieldset><div class="field-group"><label for="file-list-page-title">', soy.$$escapeHtml("Name"), '<span class="aui-icon icon-required"> required</span></label><input id="file-list-page-title" class="text long-field" type="text" name="title" placeholder="', soy.$$escapeHtml("Title of your file list"), '" maxlength="255"><div class="error"></div></div><div class="field-group"><label for="file-list-page-description">', soy.$$escapeHtml("Description"), '</label><textarea id="file-list-page-description" class="textarea long-field" name="description" rows="6" placeholder="', soy.$$escapeHtml("Description which will appear at the top of file list"), '"></textarea></div><div class="field-group"><label for="file-list-restrictions">', soy.$$escapeHtml("Restrictions"), '</label><input id="file-list-restrictions" class="text long-field autocomplete-multiuser" type="text" name="viewPermissionsUsers" placeholder="', soy.$$escapeHtml("Restrict to users"), '"></div></fieldset></form>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:file-list-resources', location = 'com/atlassian/confluence/plugins/filelist/js/create-file-list-listener.js' */
(function(b){function c(h,g){var d=h.find("#file-list-page-title"),f=b.trim(d.val()),e;if(!f){e="Name is required."}else{if(!Confluence.Blueprint.canCreatePage(g,f)){e="A page with this name already exists."}}if(e){d.focus().siblings(".error").html(e);return false}return true}function a(d,e){return c(e.$container,e.wizardData.spaceKey)}Confluence.Blueprint.setWizard("com.atlassian.confluence.plugins.confluence-business-blueprints:file-list-item",function(d){d.on("submit.file-list-page1",a)})})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:meeting-notes-resources', location = 'com/atlassian/confluence/plugins/meetingnotes/soy/how-to.soy' */
// This file was automatically generated from how-to.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.Meeting == 'undefined') { Confluence.Blueprints.Meeting = {}; }
if (typeof Confluence.Blueprints.Meeting.Notes == 'undefined') { Confluence.Blueprints.Meeting.Notes = {}; }


Confluence.Blueprints.Meeting.Notes.howTo = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1>', soy.$$escapeHtml("With meeting notes you can..."), '</h1><ol class="howto-steps"><li class="howto-step"><div><h3>', soy.$$escapeHtml("Crowd-source your agenda"), '</h3><p>', soy.$$escapeHtml("Distribute an agenda and keep meetings focused."), '</p></div></li><li class="howto-step"><div><h3>', soy.$$escapeHtml("Capture meeting minutes"), '</h3><p>', soy.$$escapeHtml("Take notes and make them available to everyone."), '</p></div></li><li class="howto-step"><div><h3>', soy.$$escapeHtml("Create and assign tasks"), '</h3><p>', soy.$$escapeHtml("Assign action items for attendees to work on afterward."), '</p></div></li></ol>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:meeting-notes-resources', location = 'com/atlassian/confluence/plugins/meetingnotes/soy/user-mention.soy' */
// This file was automatically generated from user-mention.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.Meeting == 'undefined') { Confluence.Templates.Meeting = {}; }
if (typeof Confluence.Templates.Meeting.Notes == 'undefined') { Confluence.Templates.Meeting.Notes = {}; }


Confluence.Templates.Meeting.Notes.userMention = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.username) ? '<li><p><ac:link><ri:user ri:username="' + soy.$$escapeHtml(opt_data.username) + '" /></ac:link></p></li><li><p><ac:placeholder ac:type="mention">' + soy.$$escapeHtml("@mention a person to add them as an attendee and they will be notified.") + '</ac:placeholder></p></li>' : '<li><p><ac:placeholder ac:type="mention">' + soy.$$escapeHtml("@mention a person to add them as an attendee and they will be notified.") + '</ac:placeholder></p></li>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:decisions-resources', location = 'com/atlassian/confluence/plugins/decisions/soy/decisions-templates.soy' */
// This file was automatically generated from decisions-templates.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.Decisions == 'undefined') { Confluence.Blueprints.Decisions = {}; }


Confluence.Blueprints.Decisions.dialogForm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form action="#" method="post" id="decisions-form" class="aui"><fieldset><div class="field-group"><label for="decisions-status">', soy.$$escapeHtml("Status"), '</label><select class="select long-field" id="decisions-status" name="status"><option value="GREY">', soy.$$escapeHtml("Not started"), '</option><option value="YELLOW">', soy.$$escapeHtml("In progress"), '</option><option value="GREEN">', soy.$$escapeHtml("Decided"), '</option></select></div><div class="field-group"><label for="decisions-page-title">', soy.$$escapeHtml("Decision"), '<span class="aui-icon icon-required"> required</span></label><input id="decisions-page-title" class="text long-field" type="text" name="title" placeholder="', soy.$$escapeHtml("What are you deciding?"), '" maxlength="255"><div class="error"></div></div><div class="field-group"><label for="decisions-owner">', soy.$$escapeHtml("Owner"), '</label><input id="decisions-owner" type="text" class="text long-field autocomplete-multiuser" name="owner" placeholder="', soy.$$escapeHtml("Who should make the final decision?"), '" data-autofill-user="true"></div><div class="field-group"><label for="decisions-stakeholders">', soy.$$escapeHtml("Stakeholders"), '</label><input id="decisions-stakeholders" class="text long-field autocomplete-multiuser" type="text" name="stakeholders" placeholder="', soy.$$escapeHtml("Who needs to help make this decision?"), '"></div><div class="field-group"><label for="decisions-due-date">', soy.$$escapeHtml("Due date"), '</label><input id="decisions-due-date" class="datepicker-field date-field text" type="text" name="due-date" size="10" autocomplete="off"></div><div class="field-group"><label for="decisions-background">', soy.$$escapeHtml("Background"), '</label><textarea id="decisions-background" class="textarea long-field" rows="3" name="background" placeholder="', soy.$$escapeHtml("What details are important in making this decision?"), '"></textarea></div><div class="field-group"><label for="decisions-final-decision">', soy.$$escapeHtml("Outcome"), '</label><textarea id="decisions-final-decision" class="textarea long-field" rows="3" name="final-decision" placeholder="', soy.$$escapeHtml("What did you decide?"), '"></textarea></div></fieldset></form>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Decisions.mentionXml = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var nameList35 = opt_data.names;
  var nameListLen35 = nameList35.length;
  for (var nameIndex35 = 0; nameIndex35 < nameListLen35; nameIndex35++) {
    var nameData35 = nameList35[nameIndex35];
    output.append('<ac:link><ri:user ri:username="', soy.$$escapeHtml(nameData35), '" /></ac:link>&nbsp;');
  }
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Decisions.mentionsPlaceholder = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:placeholder ac:type="mention">', soy.$$escapeHtml(opt_data.placeholderText), '</ac:placeholder>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Decisions.placeholder = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:placeholder>', soy.$$escapeHtml(opt_data.placeholderText), '</ac:placeholder>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Decisions.statusTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:macro ac:name="status"><ac:parameter ac:name="title">', soy.$$escapeHtml(opt_data.status), '</ac:parameter><ac:parameter ac:name="colour">', soy.$$escapeHtml(opt_data.statusColour), '</ac:parameter></ac:macro>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:decisions-resources', location = 'com/atlassian/confluence/plugins/decisions/js/create-decisions-listener.js' */
(function(c){function d(i,h){var e=i.find("#decisions-page-title"),g=c.trim(e.val()),f;if(!g){f="Decision is required."}else{if(!Confluence.Blueprint.canCreatePage(h,g)){f="A page with this name already exists."}}if(f){e.focus().siblings(".error").html(f);return false}return true}function a(e,f){return d(f.$container,f.wizardData.spaceKey)}function b(e,f){c("#decisions-due-date").datepicker({dateFormat:"yy/mm/dd"});c("#decisions-status").on("change",function(){var h=c("#decisions-final-decision");var g=c("label[for=decisions-final-decision]");if(c(this).find(":selected").val()=="GREEN"){h.css({display:"inline"});g.css({display:"inline"})}else{h.css({display:"none"});g.css({display:"none"})}})}Confluence.Blueprint.setWizard("com.atlassian.confluence.plugins.confluence-business-blueprints:decisions-blueprint-item",function(e){e.on("post-render.decisions-page1",b);e.on("submit.decisions-page1",a)})})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:sharelinks-urlmacro-resources', location = 'com/atlassian/confluence/plugins/sharelinksurlmacro/soy/sharelinks-urlmacro-templates.soy' */
// This file was automatically generated from sharelinks-urlmacro-templates.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.SharelinksUrlMacro == 'undefined') { Confluence.Blueprints.SharelinksUrlMacro = {}; }


Confluence.Blueprints.SharelinksUrlMacro.bookmarkletLink = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a class="aui-button sharelinks-urlmacro-button" href="');
  Confluence.Blueprints.SharelinksUrlMacro.bookmarkletScript(opt_data, output);
  output.append('"><span>', soy.$$escapeHtml("Share on Confluence"), '</span></a>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.SharelinksUrlMacro.bookmarkletScript = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('javascript:(function(){var screenWidth=screen.width,screenHeight=screen.height,popupWidth=640,popupHeight=580,popupLeft=0,popupTop=0; if(screenWidth>popupWidth){popupLeft=Math.round((screenWidth/2)-(popupWidth/2));}if(screenHeight>popupHeight){popupTop=Math.round((screenHeight/2)-(popupHeight/2));}window.open(\'', opt_data.bookmarkletActionURL, '?bookmarkedURL=\'+encodeURIComponent(window.location.href), \'\',\'left=\'+popupLeft+\',top=\'+popupTop+\',width=\'+popupWidth+\',height=\'+popupHeight+\',personalbar=0,toolbar=0,scrollbars=1,resizable=1\');}());');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:sharelinks-urlmacro-resources', location = 'com/atlassian/confluence/plugins/sharelinksurlmacro/js/sharelinks-urlmacro.js' */
AJS.toInit(function(a){a(".sharelinks-urlmacro-button").click(function(){alert("Drag this link to your toolbar");return false})});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:sharelinks-resources', location = 'com/atlassian/confluence/plugins/sharelinks/soy/sharelinks-templates.soy' */
// This file was automatically generated from sharelinks-templates.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.Sharelinks == 'undefined') { Confluence.Blueprints.Sharelinks = {}; }


Confluence.Blueprints.Sharelinks.dialogForm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form action="#" method="post" id="sharelinks-form" class="aui"><fieldset><div class="field-group"><label for="sharelinks-url">', soy.$$escapeHtml("Link"), '<span class="aui-icon icon-required"> required</span></label><input id="sharelinks-url" class="text long-field" type="text" name="url" placeholder="', soy.$$escapeHtml("Paste a link to any website"), '"/><div class="error"></div></div><div class="field-group"><label for="sharelinks-title">', soy.$$escapeHtml("Title"), '<span class="aui-icon icon-required"> required</span></label><input id="sharelinks-title" class="text long-field" type="text" name="title" title="title" placeholder="', soy.$$escapeHtml("Title of the page"), '" maxlength="255"><div class="error"></div></div><div class="field-group"><label for="sharelinks-label">', soy.$$escapeHtml("Topics"), '</label><input id="sharelinks-label" class="text select2-input long-field" type="text" name="label" placeholder="', soy.$$escapeHtml("Topics for the shared link"), '" /></div><div class="field-group"><label for="sharelinks-sharewith">', soy.$$escapeHtml("Share with"), '</label><input id="sharelinks-sharewith" class="text long-field autocomplete-multiuser" type="text" name="sharewith" placeholder="', soy.$$escapeHtml("Share this page with users"), '"/></div><div class="field-group"><label for="sharelinks-comment">', soy.$$escapeHtml("Comment"), '</label><textarea id="sharelinks-comment" class="textarea long-field" rows="4" type="text" name="comment" placeholder="', soy.$$escapeHtml("Share your thoughts about this link"), '"></textarea></div></fieldset></form>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Sharelinks.previewLink = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="sharelinks-preview">');
  if (opt_data.linkMetaData.title) {
    output.append('<h3 class="sharelinks-preview-title">', soy.$$escapeHtml(opt_data.linkMetaData.title), '</h3>');
    if (opt_data.linkMetaData.imageURL) {
      output.append('<div class="sharelinks-preview-image"><img src="', soy.$$escapeHtml(opt_data.linkMetaData.imageURL), '"/></div>');
    } else {
      var noImagePreviewContent__soy37 = new soy.StringBuilder();
      Confluence.Blueprints.Sharelinks.noImagePreview(null, noImagePreviewContent__soy37);
      noImagePreviewContent__soy37 = noImagePreviewContent__soy37.toString();
      output.append(noImagePreviewContent__soy37);
    }
    output.append((opt_data.linkMetaData.description) ? '<p>' + soy.$$escapeHtml(opt_data.linkMetaData.description) + '</p>' : '');
  } else {
    var previewUnavailableContent__soy47 = new soy.StringBuilder();
    Confluence.Blueprints.Sharelinks.previewUnavailable(null, previewUnavailableContent__soy47);
    previewUnavailableContent__soy47 = previewUnavailableContent__soy47.toString();
    output.append(previewUnavailableContent__soy47);
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Sharelinks.previewVideoLink = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="sharelinks-preview"><h3 class="sharelinks-preview-title">', soy.$$escapeHtml(opt_data.linkMetaData.title), '</h3><div class="sharelinks-preview-video">');
  if (opt_data.linkMetaData.imageURL) {
    output.append('<span class="sharelinks-preview-image"><img src="', soy.$$escapeHtml(opt_data.linkMetaData.imageURL), '"/><span class="sharelinks-preview-camera-icon sharelinks-camera-with-image"></span></span>');
  } else {
    output.append('<div>');
    var noImagePreviewContent__soy63 = new soy.StringBuilder();
    Confluence.Blueprints.Sharelinks.noImagePreview(null, noImagePreviewContent__soy63);
    noImagePreviewContent__soy63 = noImagePreviewContent__soy63.toString();
    output.append(noImagePreviewContent__soy63, '<span class="sharelinks-preview-camera-icon sharelinks-camera-with-no-image"></span></div>');
  }
  output.append('</div>', (opt_data.linkMetaData.description) ? '<p>' + soy.$$escapeHtml(opt_data.linkMetaData.description) + '</p>' : '', '</div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Sharelinks.previewLoading = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="sharelinks-preview-loading"><span class="aui-icon aui-icon-wait"></span>&nbsp;', soy.$$escapeHtml("Loading preview\u2026"), '</div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Sharelinks.metaDataHtml = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="sharelinks-link-meta-data"><ac:macro ac:name="panel"><ac:rich-text-body>', (opt_data.linkMetaData.imageURL) ? '<h3><ac:image ac:align="right"><ri:url ri:value=\'' + soy.$$escapeHtml(opt_data.linkMetaData.imageURL) + '\' /></ac:image></h3>' : '', '<p><ac:image ac:width=\'16\'><ri:url ri:value="', soy.$$escapeHtml(opt_data.faviconURL), '" /></ac:image>&nbsp;<a href="', soy.$$escapeHtml(opt_data.linkMetaData.sourceURL), '">', soy.$$escapeHtml(opt_data.linkMetaData.excerptedURL), '</a></p>', (opt_data.linkMetaData.description) ? '<blockquote><p>' + soy.$$escapeHtml(opt_data.descriptionMessage) + '</p></blockquote>' : '<p style="text-align: left;"><span style="color: rgb(128,128,128);"><em>' + soy.$$escapeHtml(opt_data.descriptionMessage) + '</em></span></p>', '<p><strong><a href="', soy.$$escapeHtml(opt_data.linkMetaData.sourceURL), '">', soy.$$escapeHtml("Open link"), '</a></strong></p></ac:rich-text-body></ac:macro></div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Sharelinks.previewError = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="sharelinks-preview">');
  var previewUnavailableContent__soy109 = new soy.StringBuilder();
  Confluence.Blueprints.Sharelinks.previewUnavailable(null, previewUnavailableContent__soy109);
  previewUnavailableContent__soy109 = previewUnavailableContent__soy109.toString();
  output.append(previewUnavailableContent__soy109, '</div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Sharelinks.videoMetaDataHtml = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ac:macro ac:name="panel"><ac:rich-text-body><ac:macro ac:name="section"><ac:rich-text-body><ac:macro ac:name="column"><ac:parameter ac:name="width">50%</ac:parameter><ac:rich-text-body><p><ac:image ac:width=\'16\'><ri:url ri:value="', soy.$$escapeHtml(opt_data.faviconURL), '" /></ac:image>&nbsp;<a href="', soy.$$escapeHtml(opt_data.linkMetaData.sourceURL), '">', soy.$$escapeHtml(opt_data.linkMetaData.excerptedURL), '</a></p>', (opt_data.linkMetaData.description) ? '<blockquote><p>' + soy.$$escapeHtml(opt_data.linkMetaData.description) + '</p></blockquote>' : '', '<p><strong><a href="', soy.$$escapeHtml(opt_data.linkMetaData.sourceURL), '">', soy.$$escapeHtml("Open link"), '</a></strong></p></ac:rich-text-body></ac:macro><ac:macro ac:name="column"><ac:parameter ac:name="width">50%</ac:parameter><ac:rich-text-body><p>', (opt_data.isSupportedMediaDomain) ? '<ac:macro ac:name="widget"><ac:parameter ac:name="url">' + soy.$$escapeHtml(opt_data.linkMetaData.sourceURL) + '</ac:parameter><ac:parameter ac:name="width">350</ac:parameter><ac:parameter ac:name="height">240</ac:parameter></ac:macro>' : '<ac:image ac:width="300"><ri:url ri:value="' + soy.$$escapeHtml(opt_data.linkMetaData.imageURL) + '" /></ac:image>', '</p></ac:rich-text-body></ac:macro></ac:rich-text-body></ac:macro></ac:rich-text-body></ac:macro>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Sharelinks.twitterMetaDataHtml = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.linkMetaData.description) {
    output.append('<div class="sharelinks-twitter-content"><p><ac:image ac:width=\'16\'><ri:url ri:value="', soy.$$escapeHtml(opt_data.faviconURL), '" /></ac:image>&nbsp;<a href="', soy.$$escapeHtml(opt_data.linkMetaData.sourceURL), '">', soy.$$escapeHtml(opt_data.linkMetaData.excerptedURL), '</a></p><p><ac:macro ac:name="widget"><ac:parameter ac:name="url">', soy.$$escapeHtml(opt_data.linkMetaData.sourceURL), '</ac:parameter></ac:macro></p><p><strong><a href="', soy.$$escapeHtml(opt_data.linkMetaData.sourceURL), '">', soy.$$escapeHtml("Open link"), '</a></strong></p></div>');
  } else {
    Confluence.Blueprints.Sharelinks.metaDataHtml(opt_data, output);
  }
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Sharelinks.bookmarkletGuideOnWizard = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var bookmarkletLinkParam__soy163 = new soy.StringBuilder();
  Confluence.Blueprints.SharelinksUrlMacro.bookmarkletLink(opt_data, bookmarkletLinkParam__soy163);
  bookmarkletLinkParam__soy163 = bookmarkletLinkParam__soy163.toString();
  output.append('<p>', bookmarkletLinkParam__soy163, '</p><p>', soy.$$escapeHtml("It will appear like this in your browser."), '</p><div class="bookmarklet-guide-picture"></div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Sharelinks.bookmarkletGuide = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var bookmarkletMacroParam__soy173 = new soy.StringBuilder('<ac:macro ac:name="sharelinks-urlmacro"/>');
  bookmarkletMacroParam__soy173 = bookmarkletMacroParam__soy173.toString();
  output.append('<ac:macro ac:name="info"><ac:parameter ac:name="icon">false</ac:parameter><ac:rich-text-body><p><ac:emoticon ac:name="information" />&nbsp;', AJS.format("Tip: share a link from anywhere by dragging this button \u2192 {0} to your browser bookmarks toolbar. Once added to your toolbar, click it to share links with your team.",bookmarkletMacroParam__soy173), '</p></ac:rich-text-body></ac:macro>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Sharelinks.noImagePreview = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<p class="image-unavailable"><span class="no-image-picture"></span>', soy.$$escapeHtml("No image available"), '</p>');
  return opt_sb ? '' : output.toString();
};


Confluence.Blueprints.Sharelinks.previewUnavailable = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<p class="link-unavailable"><span class="preview-unavailable-picture"></span>', soy.$$escapeHtml("Link preview unavailable"), '</p>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:sharelinks-resources', location = 'com/atlassian/confluence/plugins/sharelinks/js/sharelinks-creation-wizard.js' */
(function(i){var d=false;function g(s,r){var q=false;if(k(s,!q)){q=true}if(f(s,r,!q)){q=true}return !q}function k(u,q){var t=u.find("#sharelinks-url");var s=i.trim(t.val());var r="";if(!s){r="URL is required"}else{if(d){r="URL syntax is invalid"}}return j(t,r,q)}function f(w,u,s){var r=w.find("#sharelinks-title");var v=i.trim(r.val());var t="";if(!v){t="Title is required"}else{if(!Confluence.Blueprint.canCreatePage(u,v)){t="A page with this name already exists";var q=Confluence.Blueprints.Sharelinks.Analytics.errorTypes.value.duplicatedPage;Confluence.Blueprints.Sharelinks.Analytics.triggerErrorTypes(q)}}return j(r,t,s)}function j(s,r,q){s.siblings(".error").html(r);if(r&&q){s.focus()}return r}var p;function a(u,v){var s=g(v.$container,v.wizardData.spaceKey);if(s){var r=Confluence.Blueprints.Sharelinks.Analytics.submitData.value.noComment;var x=i("#sharelinks-comment").val();x=i.trim(x);if(x){r=Confluence.Blueprints.Sharelinks.Analytics.submitData.value.comment}Confluence.Blueprints.Sharelinks.Analytics.triggerSubmitData(r);var q=Confluence.Blueprints.Sharelinks.Analytics.submitData.value.noEditTitle;if(p!==i("#sharelinks-title").val()){q=Confluence.Blueprints.Sharelinks.Analytics.submitData.value.editTitle}Confluence.Blueprints.Sharelinks.Analytics.triggerSubmitData(q);var w=Confluence.Blueprints.Sharelinks.Analytics.submitData.value.noShare;var t=i("#sharelinks-sharewith").val();t=i.trim(t);if(t){w=Confluence.Blueprints.Sharelinks.Analytics.submitData.value.share}Confluence.Blueprints.Sharelinks.Analytics.triggerSubmitData(w)}v.wizardData.parentPageId=-1;return s}var e;function h(s,t){e="";i("#sharelinks-url").bind("paste",function(){setTimeout(function(){l(t.$container,t.wizardData.spaceKey,true)},0)});i("#sharelinks-url").change(function(){l(t.$container,t.wizardData.spaceKey,false)});i("#sharelinks-title").change(function(){if(i("#sharelinks-title").siblings(".error").html!=""){f(t.$container,t.wizardData.spaceKey,false)}});var u=i(".dialog-wizard-page-description,.create-dialog-page-description");var q=AJS.Meta.get("base-url")+"/plugins/sharelinksbookmarklet/bookmarklet.action";var r=Confluence.Blueprints.Sharelinks.bookmarkletGuideOnWizard({bookmarkletActionURL:q});i(r).appendTo(u);Confluence.Blueprints.Sharelinks.autocompleteMultiLabel.build(i("#sharelinks-label"));i(".create-dialog-sharelinks-page1 .sharelinks-urlmacro-button").click(function(){alert("Drag this link to your toolbar");return false})}function c(q,r){i.ajax({type:"get",dataType:"json",url:Confluence.getContextPath()+"/rest/sharelinks/1.0/can-create-comment",data:{spaceKey:r.wizardData.spaceKey},success:function(t){if(!t){var s=i("#sharelinks-comment");s.attr("disabled","disabled");s.attr("placeholder","Sorry, you don\'t have permission to add comments in this space")}}})}Confluence.Blueprint.setWizard("com.atlassian.confluence.plugins.confluence-business-blueprints:sharelinks-blueprint-item",function(q){q.on("post-render.sharelinks-page1",h);q.on("post-render.sharelinks-page1",c);q.on("submit.sharelinks-page1",a)});function b(u){var y=255;var q=180;var t=o(u.title,y);var s=i("#sharelinks-title");s.val(t);s.removeClass("placeholded");var x=i.extend({},u);x.title=o(x.title,q);var w=Confluence.Blueprints.Sharelinks.Analytics.linkTypes.value.noContent;var r;if(u.videoURL){r=Confluence.Blueprints.Sharelinks.previewVideoLink({linkMetaData:x});w=Confluence.Blueprints.Sharelinks.Analytics.linkTypes.value.video}else{r=Confluence.Blueprints.Sharelinks.previewLink({linkMetaData:x});if(u.imageURL){w=Confluence.Blueprints.Sharelinks.Analytics.linkTypes.value.image}else{if(u.title){w=Confluence.Blueprints.Sharelinks.Analytics.linkTypes.value.noVideoImage}}}var v=i(".create-dialog-page-description,.dialog-wizard-page-description");v.empty();i(r).appendTo(v);Confluence.Blueprints.Sharelinks.Analytics.triggerLinkTypes(w)}function o(r,q){if(null!=r&&q<r.length){r=r.substring(0,q-1)+"\u2026"}return r}function m(r,q){r.attr("disabled","disabled");q.attr("disabled","disabled")}function n(r,q){r.removeAttr("disabled");q.removeAttr("disabled")}function l(z,w,s){var r=i("#sharelinks-url"),v=r.val(),q=i("#sharelinks-title");v=i.trim(v);if(v){var x=Confluence.getContextPath()+"/rest/sharelinks/1.0/link";if(v!==e){e=v;var t=i(".create-dialog-page-description,.dialog-wizard-page-description").empty();var y=Confluence.Blueprints.Sharelinks.previewLoading();var A=i(y).appendTo(t);m(r,q);i.ajax({type:"get",url:x,data:{url:v},success:function(B,C){A.remove();b(B);d=false;g(z,w);n(r,q)},error:function(E,B,D){n(r,q);if(400==E.status){A.remove();d=true;k(z,false)}else{A.remove();var C=Confluence.Blueprints.Sharelinks.previewError();i(C).appendTo(t);d=false;g(z,w)}}});var u;if(s){u=Confluence.Blueprints.Sharelinks.Analytics.inputTypes.value.pasteUrl}else{u=Confluence.Blueprints.Sharelinks.Analytics.inputTypes.value.typeUrl}Confluence.Blueprints.Sharelinks.Analytics.triggerInputTypes(u)}}}})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:sharelinks-resources', location = 'com/atlassian/confluence/plugins/sharelinks/js/sharelinks-analytics.js' */
Confluence.Blueprints.Sharelinks.Analytics={inputTypes:{name:"blueprints.sharelinks.input",value:{pasteUrl:{type:"paste-url"},typeUrl:{type:"type-url"}}},linkTypes:{name:"blueprints.sharelinks.link",value:{video:{link:"video"},image:{link:"image"},noVideoImage:{link:"no-video-image"},noContent:{link:"no-content"}}},errorTypes:{name:"blueprints.sharelinks.error",value:{duplicatedPage:{error:"page-duplicated"}}},submitData:{name:"blueprints.sharelinks.submit",value:{editTitle:{submit:"edit-title"},noEditTitle:{submit:"no-edit-title"},comment:{submit:"comment"},noComment:{submit:"no-comment"},share:{submit:"share"},noShare:{submit:"no-share"}}},triggerInputTypes:function(a){AJS.EventQueue=AJS.EventQueue||[];AJS.EventQueue.push({name:Confluence.Blueprints.Sharelinks.Analytics.inputTypes.name,properties:a})},triggerLinkTypes:function(a){AJS.EventQueue=AJS.EventQueue||[];AJS.EventQueue.push({name:Confluence.Blueprints.Sharelinks.Analytics.linkTypes.name,properties:a})},triggerErrorTypes:function(a){AJS.EventQueue=AJS.EventQueue||[];AJS.EventQueue.push({name:Confluence.Blueprints.Sharelinks.Analytics.errorTypes.name,properties:a})},triggerSubmitData:function(a){AJS.EventQueue=AJS.EventQueue||[];AJS.EventQueue.push({name:Confluence.Blueprints.Sharelinks.Analytics.submitData.name,properties:a})}};
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:sharelinks-resources', location = 'com/atlassian/confluence/plugins/sharelinks/soy/sharelinks-label.soy' */
// This file was automatically generated from sharelinks-label.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Blueprints == 'undefined') { Confluence.Blueprints = {}; }
if (typeof Confluence.Blueprints.Sharelinks == 'undefined') { Confluence.Blueprints.Sharelinks = {}; }


Confluence.Blueprints.Sharelinks.labelResult = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.label.isNew) ? soy.$$escapeHtml(AJS.format("\x22{0}\x22 - add a new topic",opt_data.label.labelName)) : soy.$$escapeHtml(opt_data.label.labelName));
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-business-blueprints:sharelinks-resources', location = 'com/atlassian/confluence/plugins/sharelinks/js/sharelinks-label.js' */
Confluence.Blueprints.Sharelinks.autocompleteMultiLabel=(function(a){function b(c){c.auiSelect2(Confluence.UI.Components.LabelPicker.build({formatInputTooShort:function(){return "Start typing to search for a topic"},formatResult:function(d){return Confluence.Blueprints.Sharelinks.labelResult({label:{labelName:d.text,isNew:d.isNew}})}}))}return{build:b}})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:application-header-administration-cog-resource', location = 'header/cog.js' */
var NavLinks=(function(a){a.ApplicationHeader=function(b){b.Cog=(function(){var c=function(){var d=AJS.$("#system-admin-menu-content");if(d.length>0){return d}var e=AJS.$("#admin-menu-link-content");if(e.length>0){return e}return AJS.$("#bamboo\\.global\\.header-admin\\.menu")};return{getDropdown:c}}());return b}(a.ApplicationHeader||{});return a}(NavLinks||{}));
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-projectshortcuts', location = 'projectshortcuts/projectshortcuts.soy' */
// This file was automatically generated from projectshortcuts.soy.
// Please don't edit this file by hand.

if (typeof navlinks == 'undefined') { var navlinks = {}; }
if (typeof navlinks.templates == 'undefined') { navlinks.templates = {}; }
if (typeof navlinks.templates.projectshortcuts == 'undefined') { navlinks.templates.projectshortcuts = {}; }


navlinks.templates.projectshortcuts.dialogContent = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.localShortcuts && opt_data.localShortcuts.length > 0) {
    navlinks.templates.projectshortcuts.dialogContentShortcuts({shortcuts: opt_data.localShortcuts, listClass: 'projectshortcut-links'}, output);
  }
  if (opt_data.remoteShortcuts != null) {
    if (opt_data.remoteShortcuts.length > 0) {
      output.append('<h2 class="projectshortcuts-heading">Related Links</h2>');
      navlinks.templates.projectshortcuts.dialogContentShortcuts(soy.$$augmentData(opt_data.remoteShortcuts, {shortcuts: opt_data.remoteShortcuts, listClass: 'projectshortcut-links'}), output);
    }
  } else {
    navlinks.templates.projectshortcuts.dialogLoading(null, output);
  }
  return opt_sb ? '' : output.toString();
};


navlinks.templates.projectshortcuts.headingWrapper = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="project-dialog-header-wrapper"><div class="project-header"><img class="project-img" src="', soy.$$escapeHtml(opt_data.logoUrl), '"><h2 class="dialog-title">', soy.$$escapeHtml(opt_data.title), '</h2></div><div class="project-content-wrapper">', opt_data.contentHtml, '</div></div>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.projectshortcuts.dialogContentShortcuts = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul', (opt_data.listClass) ? ' class="' + soy.$$escapeHtml(opt_data.listClass) + '"' : '', '>');
  var shortcutList35 = opt_data.shortcuts;
  var shortcutListLen35 = shortcutList35.length;
  for (var shortcutIndex35 = 0; shortcutIndex35 < shortcutListLen35; shortcutIndex35++) {
    var shortcutData35 = shortcutList35[shortcutIndex35];
    output.append('<li', (shortcutIndex35 == shortcutListLen35 - 1) ? ' class="last"' : '', '>');
    navlinks.templates.projectshortcuts.dialogContentShortcut(shortcutData35, output);
    output.append('</li>');
  }
  output.append('</ul>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.projectshortcuts.dialogContentShortcut = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a href="', soy.$$escapeHtml(opt_data.link), '"', (opt_data.tooltip) ? ' title="' + soy.$$escapeHtml(opt_data.tooltip) + '"' : '', '>', soy.$$escapeHtml(opt_data.label), '</a>');
  return opt_sb ? '' : output.toString();
};


navlinks.templates.projectshortcuts.dialogLoading = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="projectshortcuts-loading">', (opt_data != null && opt_data.text) ? soy.$$escapeHtml(opt_data.text) : '', '</div>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-projectshortcuts', location = 'projectshortcuts/projectshortcuts.js' */
(function(e,h){var j,l={},o="key",b="name",k="entity-type";function n(r,p,q){try{h.trackEvent("projectshortcuts",r,p,q)}catch(s){AJS.log("failed to track analytics event, category: projectshortcuts, action: "+r+", label: "+p+", value: "+q)}}function f(u){var p=e(this),q=p.data(o),s=p.data(b),r=p.data(k);if(typeof q==="undefined"){return}u.preventDefault();j=new AJS.Dialog({width:600,keypressListener:function(w){if(w.which==jQuery.ui.keyCode.ESCAPE){j.remove()}},id:"project-shortcuts-dialog"}).addCancel("Close",function(){j.remove();n("hide",h.getCurrentApplication())}).addPanel("",navlinks.templates.projectshortcuts.headingWrapper({title:s,logoUrl:i(),contentHtml:navlinks.templates.projectshortcuts.dialogLoading({text:"Retrieving links…"})})).show();c(j);if(!l[q]){l[q]={entity:{title:s},localShortcuts:null,remoteShortcuts:null};d(AJS.contextPath()+"/rest/project-shortcuts/1.0/local/"+q,{entityType:r}).done(v);d(AJS.contextPath()+"/rest/project-shortcuts/1.0/remote/"+q,{entityType:r}).done(t).fail(function(){var w=j.getCurrentPanel().body.find(".project-content-wrapper");w.find(".projectshortcuts-loading").remove();AJS.messages.error(w,{body:"\u65E0\u6CD5\u68C0\u7D22\u8FDC\u7A0B\u9879\u76EE\u7684\u5FEB\u6377\u65B9\u5F0F",closeable:false});c(j)})}else{m(l[q])}function v(w){l[q].localShortcuts=w.shortcuts;m(l[q])}function t(w){l[q].remoteShortcuts=w.shortcuts;m(l[q])}n("show",h.getCurrentApplication())}function i(){return e(".project-shortcut-dialog-trigger img").attr("src")}function g(p){p.getCurrentPanel().body.find("a").unbind(".analytics").bind("click.analytics",function(){var q=this.attributes.href;n("navLinkFollowed",typeof q==="object"?q.value:q)})}function m(p){if(p.localShortcuts){j.getCurrentPanel().html(navlinks.templates.projectshortcuts.headingWrapper({title:p.entity.title,logoUrl:i(),contentHtml:navlinks.templates.projectshortcuts.dialogContent(p)}));g(j);c(j)}}function a(r){var q=210;if(!r||r.length<=q){return r}var p=q;while(p>0&&r.charAt(p)!=" "){p--}if(p==0){p=q}r=r.substring(0,p);if(r.length>=p){r=r+"..."}return r}function c(p){var s=p.popup.element,r=s.find(".dialog-panel-body"),q=s.find(".dialog-components");r.height("auto");s.height(q.outerHeight()-1);e(".aui-shadow").remove()}function d(p,q){return e.ajax({url:p,cache:false,data:q,dataType:"json"})}e(document).on("click",".project-shortcut-dialog-trigger",f)}(jQuery,window.NL=(window.NL||{})));
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:atlassian-ui-popup-display-controller', location = 'popups/DisplayController.js' */
AJS.Popups=AJS.Popups||{};AJS.Popups.DisplayController=function(){var c=[];var a=false;var b=false;AJS.toInit(function(){setTimeout(function(){AJS.Popups.DisplayController.render()},0)});return{request:function(d){c.push(d);if(a&&b===false){this.render()}},render:function(){c.sort(function(e,d){return e.weight-d.weight});a=true;if(c.length!==0){b=true;c[0].show()}}}}();
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-space-ia:spacemenu-resources', location = 'js/space-menu.js' */
AJS.toInit(function(a){var d=a(Confluence.Templates.BrowseSpaces.spacesLink());a("#space-directory-link").replaceWith(a(d));var b=a("#space-menu-link"),c=function(e){a("#space-menu-link-content").html(e.template);AJS.trigger("spacemenu-loaded");a("#create-space-header").click(function(){AJS.trigger("analyticsEvent",{name:"create-space-from-header"});Confluence.SpaceBlueprint.Dialog.launch();return false})};b.click(function(){if(!a("#space-menu-link-content .aui-dropdown2-section").length){a.ajax({url:Confluence.getContextPath()+"/rest/ia/1.0/spacesmenu",type:"GET",dataType:"json",cache:false,success:c})}return false})});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-space-ia:spacemenu-resources', location = 'soy/space-menu.soy' */
// This file was automatically generated from space-menu.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.BrowseSpaces == 'undefined') { Confluence.Templates.BrowseSpaces = {}; }


Confluence.Templates.BrowseSpaces.spacesLink = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a id="space-menu-link" class="aui-nav-link aui-dropdown2-trigger" href="#" aria-haspopup="true" aria-owns="space-menu-link-content" title="', soy.$$escapeHtml("Spaces"), '"><span class="browse">', soy.$$escapeHtml("Spaces"), '</span><span class="aui-icon-dropdown"></span></a><div id="space-menu-link-content" class="aui-dropdown2 aui-style-default aui-dropdown2-in-header" aria-hidden="false"></div>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-space-ia:space-ia-analytics', location = 'js/space-ia-analytics.js' */
(function(d){var c=RegExp("(.+[?&])src=.+?(&.+|$)");var e;if(AJS.Confluence.Analytics&&AJS.Confluence.Analytics.setAnalyticsSource){e=AJS.Confluence.Analytics.setAnalyticsSource}else{e=function(h,i){if(b()){_.each(h,function(j){d(j).attr("href",g(d(j).attr("href"),i))})}}}function g(h,j){if(h&&(h.charAt(0)!="#")){var i=c.exec(h);if(!i){if(h.indexOf("?")>-1){h=h+"&src="+j}else{h=h+"?src="+j}}else{h=i[1]+"src="+j+i[2]}}return h}function b(){var h=d(document.getElementsByTagName("script"));var i=false;h.each(function(k,j){if(d(j).attr("src")&&d(j).attr("src").indexOf("google-analytics.com/ga.js")!=-1){i=true;return false}});return i}function f(){var i=d(".acs-side-bar a:not(.external_link a, #acs-configure-link)");e(i,"sidebar");var h=d(".quick-links-section li:not(.external_link) a");e(h,"spaceshortcut");var j=d(".ia-secondary-container a:not(.more-children-link)");if(d(".ia-secondary-container").data("tree-type")=="pages"){e(j,"contextnavchildmode")}else{if(d(".ia-secondary-container").data("tree-type")=="page-tree"){e(j,"contextnavpagetreemode")}else{e(j,"contextnav")}}}function a(h){return function(){AJS.trigger("analyticsEvent",{name:"space-ia-nav",data:{linkType:h}})}}AJS.bind("sidebar.exit-configure-mode",f);AJS.bind("sidebar.flyout-triggered",function(i,h){a("flyout-triggered."+h.flyout)()});AJS.bind("spacemenu-loaded",function(){e(d("#space-menu-link-content a"),"spacemenu")});AJS.bind("sidebar.spacetools-loaded",function(){e(d("#inline-dialog-space-tools a:not(.configure-sidebar)"),"spacetools")});AJS.bind("pagetree-children-loaded",f);AJS.toInit(function(h){h(".ia-secondary-container .more-children-link").click(a("context-nav.more-children"));f()})})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-request-access-plugin:confluence-request-access-plugin-resources', location = '/js/request-access.js' */
AJS.toInit(function(e){var b=AJS.Meta.get("page-id"),c=e("#page-restricted-container"),a=AJS.Meta.get("remote-user"),d=e("#page-restricted-container button");if(c.length){e("#breadcrumbs").hide();e("#title-text.with-breadcrumbs").hide();if(d.length){AJS.trigger("analyticsEvent",{name:"confluence.request.access.plugin.request.access.to.page.view",data:{pageId:b,requestAccessUser:a}})}}d.click(function(){AJS.trigger("analyticsEvent",{name:"confluence.request.access.plugin.request.access.to.page",data:{pageId:b,requestAccessUser:a}});d.attr("aria-disabled","true");var f,g=e(Confluence.Request.Access.loading({}));d.replaceWith(g);e.ajax({url:Confluence.getContextPath()+"/rest/request-access/latest/page/restriction/"+b,success:function(h){f=e(Confluence.Request.Access.result({success:true,recipient:h}));c.removeClass("page-restricted");c.addClass("access-requested")},error:function(h,i){f=e(Confluence.Request.Access.result({success:false}))},complete:function(){g.replaceWith(f);Confluence.Binder.userHover()}})})})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-request-access-plugin:confluence-request-access-plugin-resources', location = '/js/grant-access.js' */
AJS.toInit(function(d){var a=AJS.Meta.get("page-id"),f=AJS.Meta.get("remote-user"),h=c("username"),e=c("userFullName");var g=d("#system-content-items");var j=d("#content-metadata-page-restrictions").is(":visible");if(!g.length||!j||!c("grantAccess")){return}var b=d(Confluence.Request.Access.loading());var i=AJS.InlineDialog(g,"grantAccessDialog",function(l,k,m){l.css({padding:"20px"}).html(Confluence.Grant.Access.dialog({requestAccessUsername:h,requestAccessUserFullName:e}));l.on("click",".aui-button.grant-access",function(p){p.stopPropagation();var o=l.find(".actions-result");o.replaceWith(b);AJS.trigger("analyticsEvent",{name:"confluence.request.access.plugin.grant.access.to.page",data:{pageId:a,grantAccessUser:f,requestAccessUser:h}});var n="",q=true;d.ajax({url:Confluence.getContextPath()+"/rest/request-access/latest/page/restriction/"+a,type:"POST",contentType:"application/json; charset=utf-8",data:h,success:function(s,t,r){if(r.status==202){n="Access was already granted to the user."}else{n="Access was granted, a notification to the user will be sent."}},error:function(r){q=false;if(r.status==412){n="Access was granted, but there is not a mail server configured so the notification could not be sent."}else{if(r.status==502){n="Access was granted, but an unexpected error happened while sending the notification."}else{n="Sorry, there was an unexpected error while granting access."}}},complete:function(r){b.replaceWith(d(Confluence.Grant.Access.result({success:q,message:n})));setTimeout(function(){i.hide()},4000)}})});l.on("click",".aui-button.deny-access",function(n){AJS.trigger("analyticsEvent",{name:"confluence.request.access.plugin.deny.access.to.page",data:{pageId:a,grantAccessUser:f,requestAccessUser:h}});i.hide()});m();return false},{offsetY:2,offsetX:0,width:350,hideDelay:null,noBind:true,hideCallback:function(){setTimeout(i.hide(),5000)}});i.show();function c(m){var k=window.location.search.substring(1),l,o,n=k.split("&");for(l=0;l<n.length;l++){o=n[l].split("=");if(o[0]==m){return unescape(o[1])}}return null}})(AJS.$);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-request-access-plugin:confluence-request-access-plugin-resources', location = '/templates/soy/request-access.soy' */
// This file was automatically generated from request-access.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Request == 'undefined') { Confluence.Request = {}; }
if (typeof Confluence.Request.Access == 'undefined') { Confluence.Request.Access = {}; }


Confluence.Request.Access.result = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="request-access">');
  if (opt_data.success) {
    var usernameLink__soy6 = new soy.StringBuilder();
    Confluence.Request.Access.usernameLink({user: opt_data.recipient}, usernameLink__soy6);
    usernameLink__soy6 = usernameLink__soy6.toString();
    output.append('<span class="aui-icon aui-icon-small aui-iconfont-approve" data-unicode="UTF+E005" original-title=""></span><p class="title">', AJS.format("Your request has been sent to {0}. If approved you will receive an email shortly.",usernameLink__soy6), '</p>');
  } else {
    output.append('<span class="aui-icon aui-icon-small aui-iconfont-error" data-unicode="UTF+E011" original-title=""></span><p class="title">', soy.$$escapeHtml("Your request for access has not been sent. Contact your space admin."), '</p>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Request.Access.usernameLink = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a href="', soy.$$escapeHtml("/confluence"), '/display/~', soy.$$escapeUri(opt_data.user.name), '" class="url fn confluence-userlink" title data-username="', soy.$$escapeHtml(opt_data.user.name), '">', soy.$$escapeHtml(opt_data.user.fullName), '</a>');
  return opt_sb ? '' : output.toString();
};


Confluence.Request.Access.loading = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'aui-icon aui-icon-wait\'>', soy.$$escapeHtml("Loading, please wait"), '</span>"');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-request-access-plugin:confluence-request-access-plugin-resources', location = '/templates/soy/grant-access.soy' */
// This file was automatically generated from grant-access.soy.
// Please don't edit this file by hand.

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Grant == 'undefined') { Confluence.Grant = {}; }
if (typeof Confluence.Grant.Access == 'undefined') { Confluence.Grant.Access = {}; }


Confluence.Grant.Access.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="grant-access-dialog">');
  var usernameLink__soy4 = new soy.StringBuilder();
  Confluence.Grant.Access.usernameLink({username: opt_data.requestAccessUsername, userFullName: opt_data.requestAccessUserFullName}, usernameLink__soy4);
  usernameLink__soy4 = usernameLink__soy4.toString();
  output.append('<h2 class="grant-access-title">', AJS.format("{0} requested access to view the page",usernameLink__soy4), '</h2><p class="grant-access-message">', soy.$$escapeHtml("Grant access to the page, or deny it explicitly."), '</p><div class="actions-result"><button class="aui-button grant-access">', soy.$$escapeHtml("Grant access"), '</button><button class="aui-button aui-button-link deny-access">', soy.$$escapeHtml("Deny"), '</button><div></div>');
  return opt_sb ? '' : output.toString();
};


Confluence.Grant.Access.result = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class="aui-icon aui-icon-small aui-iconfont-', (opt_data.success) ? 'approve' : 'error', '" data-unicode="UTF+E011" original-title=""></span><p class="title">', soy.$$escapeHtml(opt_data.message), '</p>');
  return opt_sb ? '' : output.toString();
};


Confluence.Grant.Access.usernameLink = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a href="', soy.$$escapeHtml("/confluence"), '/display/~', soy.$$escapeHtml(opt_data.username), '" class="url fn" title data-username="', soy.$$escapeHtml(opt_data.username), '">', soy.$$escapeHtml(opt_data.userFullName), '</a>');
  return opt_sb ? '' : output.toString();
};

} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


