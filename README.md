# AdBlock
AdBlock for Chrome. Blocks ads known to serve adware and malware. Needs a better name.

## Resources:

### Extension Development
https://developer.chrome.com/extensions/getstarted

https://developer.chrome.com/extensions/storage

https://developer.chrome.com/extensions/webRequest

### List of Ad Domains
https://pgl.yoyo.org/as/serverlist.php

### Site to Test With
http://ads-blocker.com/google-chrome/
http://www.leicestermercury.co.uk/ (super shitty refreshing ads)


### Note:
Need to focus on preventing scripts from execuring, we cannot access iframe content since it is hosted on the ads domain.

https://stackoverflow.com/questions/32533580/deleting-dom-elements-before-the-page-is-displayed-to-the-screen-in-a-chrome-ex