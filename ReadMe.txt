This is AI Notes (Automated Interactive Note-Making) Web Application.
To use it on your webpage, follow the steps in order:
1. Link the following files for styling your web page:
"MainPage.css", and
"https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"

2. Use script files - 
"https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js", 
"buttonHighlighter.js",
"FileSaver.js",
"https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js", and "js/tobiieyeX.js".

3. Put your paragraph id names as "fontButton" for the working of "Large Font" and "Small Font" buttons.

Download all the above said files and to download chrome extension (tobiieyeX jQuery Plugin) for tobii eye-tracker, follow the following steps:

### Chrome Extension

* Download the [TobiiEyeX chromeExtension v4](chrome-extension)
* In Chrome go to _More tools -> Extensions_
* Enable _Developer Mode_ on the top right
* Click _Load unpacked extension_
* Load the folder where you put the [TobiiEyeX chromeExtension v4](chrome-extension)
* You should now see the extension at the top of your extension page
* copy the _extension ID_

### C# Native Messaging Application 

* Download the [Native Messaging Application](NativeMessagingExample)

### Windows Manifest

* Download the [Windows Manifest ](manifest/windows)
* Open add-to-registry.reg file  
* Replace `C:\\Users\\SocialNUI\\Documents\\GitHub\\tobiieyeX\\manifest\\windows\\examplemanifest.json` with the path where your examplemanifest.json is located
* Double click add-to-registry.reg to add the manifest to your registry
* Open examplemanifest.json file 
* Replace `C:/Users/SocialNUI/Documents/GitHub/tobiieyeX/NativeMessagingExample/NativeMessagingExample/bin/Debug/NativeMessagingExample.exe ` with the path where your NativeMessagingExample.exe  is located 
* Replace `chrome-extension://nhfcokbgfnleobmdcanighoempgcmeki/` with `chrome-extension://{extension ID}/`
* Click the chrome extension icon at the top right of Google Chrome and click _Connect_
* If setup correctly, the window of NativeMessageTest will launch


### Example use
#### index.html

Now try this application for making reading experience better by making automatic notes and improving your reading speed.












