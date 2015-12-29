# Chrome extension to automatically convert imperial units to metric

This chrome extension will try to find imperial units on websites, and convert them to metric units, and insert the converted value directly on the site.

The plugin is available for install on the chrome webstore [here](https://chrome.google.com/webstore/detail/automatic-imperial-to-met/ggidgjeiboeedjjabheimgdkolnpaoik).

See example below:

![screenshot of extension in action](https://raw.githubusercontent.com/esprimo/imperial-to-metric-chrome-extension/master/imgs/screenshot-before-after.png)

### Supported units
* Miles
* Feet
* Yards
* Pounds/lbs
* Gallons
* Stones
* Inches
* Feet+inches (eg. 7'11")

## Todo
* More test/better tests
* Support for more units
* Option to turn off extension
* Support for ranges, eg. 50-80 pounds (would currently convert "80 pounds" only)
* Convert units textnodes added via javascript after initial load
* Convert units when a textnode changes after the initial load


