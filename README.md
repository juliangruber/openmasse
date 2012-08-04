OpenMasse
=========

Want to open multiple links at once but too tired to click on each?

OpenMasse to the rescue! When activated, this bookmarklet lets you draw a rectangle over the links you wish to open. Drop, and all the links are opened! (in tabs!). 

To install, create a new bookmark in bookmark bar.
Type in `OpenMasse` as the title and fill the url field with:

```
javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://raw.github.com/juliangruber/openmasse/master/openmasse.js?'+Date.now();})();
```