+++
headerColorOne = "Apache mod_rewrite-"
headerColorTwo = "Useful Tips for Testing"
author = "Jun Heider"
date = "2018-10-11"
title = "Apache mod_rewrite"
backgroundImage = "img/apache.jpg"
accentTextColor = ""
tags = ["Docker", "Raspberry Pi", "Devices", "Marcy", "Nugent"]
categories = ["category1", "marcy"]
thumbnail = "img/apache-thumbnail.jpg"

+++
Lately, I’ve been dealing a lot with Apache web server’s mod_rewrite module to redirect users to alternate URLs. The mod_rewrite tool utilizes Regular Expressions (RegEx) and anyone who’s worked with them knows that they can be very cumbersome to create and test for validity. That being said, I’ve recently found several useful tools to help ease my suffering while working through to create regexs for mod_rewrite.

## RegEx 101

The first tool is RegEx 101. It’s a very fancy tool that not only allows you to write your regex online, but also allows you to test the regex on various strings to make sure that the regex will work correctly. The other added bonus is that it has some useful help information.

### Screenshot

![](/img/blog-content/regex101.png)

Also, regex 101 has some cool sharing features too. For instance, here’s a permalink to a regex that I was playing around with recently for HLS streaming. One note, Apache uses PHP (PCRE) style regex syntax so make sure that’s selected for “Your Regular Expression In:” otherwise you might end up creating a useless regex.


## Htaccess Tester


Sometimes coming up with the right regex is not enough, especially if you’re unfamiliar with how mod_rewrite rules are written. In those cases, you can leverage the htaccess tester application. To use it, fill in the URL that people will be hitting, then create your rewrite rules and check to see what the result would be. 

### Screenshot

![](http://realeyes.com/wp-content/uploads/2013/10/Screen-Shot-2013-10-11-at-12.12.39-PM.png)

Here’s what the mod_rewrite rules ended up looking like after it was successfully debugged:

<pre>RewriteEngine On
RewriteBase /hls-vod
RewriteRule /[a-zA-Z0-9]+/[a-zA-Z0-9]+/(.+).ts$ /$1.ts [L]</pre>

## Logging mod_rewrite Activity

Once you’ve hooked up your mod_rewrite rules, you may still experience some issues depending on where you configured them. For instance, having to modify the paths when configuring them in httpd.conf vs. .htaccess. (httpd.conf being the more performant option if you have access to modify that configuration file)  

In those cases, being able to turn on mod_rewrite logging can be very handy. To do this, you can use the following directives – Courtesy of “Owen” at StackOverflow:  
<pre><code># logs can't be enabled from .htaccess
#loglevel > 2 is really spammy!
RewriteLog /path/to/rewrite.log
RewriteLogLevel 2
</code></pre>

If you’re going to turn logging on, just make sure you have access to httpd.conf or know the person that does!  

Enjoy your rewriting!