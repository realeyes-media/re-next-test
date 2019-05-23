+++
headerColorOne = "Using the AngularJS $logProvider"
author = "Realeyes Media"
date = "2017-04-16"
title = "Using the AngularJS $logProvider"
backgroundImage = "img/angularjs.jpg"
accentTextColor = ""
tags = ["Angular", "Using the AngularJS $logProvider", "AngularJS", "$logProvider", "JavaScript based applications", "Logging and debugging"]
categories = ["How To"]
thumbnail = "img/angularjs-thumbnail.jpg"

+++
Logging and debugging is a daily occurrence when developing JavaScript based applications. AngularJS provides a simple, effective way to enable logging in your applications – the $logProvider. $logProvider is used to enable logging and the $log object is used to log within your applications objects.

## Enabling

Enabling the $logProvider is as simple as injecting the $log object into your object and then calling $log.debug(); to send logs to the console.

Example:
<iframe width="100%" height="300" src="//jsfiddle.net/bp3289/qabwzs2h/2/embedded/js,html,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## Turning off logging


You can disable logging (AngularJS 1.1.2+) by calling
$logProvider.debugEnabled(false);

Example:
<iframe width="100%" height="300" src="//jsfiddle.net/bp3289/304jm612/2/embedded/js,html,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Extending

AngularJS provides a mechanisms to extend the built in $logProvider, $provider.decorator(). An example will get the point across much more quickly than me trying to explain it all.

Example:
<iframe width="100%" height="300" src="//jsfiddle.net/bp3289/tfev9j4m/embedded/js,html,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Basically we intercept the call using decorate so we can add on the features and functionality we need to the $log.debug() call.

*AngualrJS version 1.2.16 was used as a basis for this article.*
*Thanks to Burleson Thomas and this post for the extension example.*