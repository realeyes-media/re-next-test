+++
headerColorOne = "Using JMeter to Load Test Live HLS Concurrency of Wowza Streaming Engine"
author = "John G. Gainfort, Jr."
date = "2018-07-24"
title = "Using JMeter to Load Test Live HLS Concurrency of Wowza Streaming Engine"
backgroundImage = "img/camera.png"
accentTextColor = ""
tags = ["Docker", "Raspberry Pi", "Devices", "Marcy", "Nugent"]
categories = ["category1", "marcy"]
thumbnail = "img/camera.png"

+++

## Introduction 

When I was tasked with determine the max users that an m4.xlarge AWS instance running WowzaStreamingEngine delivering HLS content could reliably handle; I found out quickly I had a fairly difficult task ahead of me. Luckily I found a few blog posts that pointed me in the right direction and provided the base JMeter test plan to work with.

## Understanding HLS Protocol

HLS or HTTP Live Streaming is an HTTP based media streaming protocol developed by Apple, Inc. It works by breaking a media resource into a sequence of smaller chunks and fragments that may be split among a variety of different encoding data rates. Since HLS is an HTTP based protocol it is able to bypass any firewall or proxy server that lets through standard HTTP traffic unlike other protocols such as RTMP. This allows content to be delivered by standard HTTP servers and delivered from a wide variety of CDN’s and streaming engines such as Wowza.

## Testing Platforms and Plugins

When first researching the best methods to successfully test our service I came across a few options:  

First option was to use flood.io following the directions in this blog post provided by flood.io. This provided some good information but since the project was fairly small it did not seem worth it to have to pay the extra money for this load test. Maybe in the future if we need to perform load tests more often, this might be a good route for us.

Second option that I found was to use a HLS Plugin for JMeter developed by Ubik Ingénierie. Ubik wrote a great blog post that describes how most load testing of HLS content can be very unrealistic and it would be very time consuming to create an exact real-world simulation of how a browser handles the HLS protocol. After downloading their plugin and starting some initial testing I found their plugin to be very easy to setup and provided some great test results. However their free plugin only allows a very limited number of concurrent users, and the price for the plugin with the number of users we wanted was too much for this project. If we ever run into a very large project that needed the most reliable test data, this plugin would be a great choice for us.

The third option that I found and ultimately followed through with was to create my own test script using JMeter. The results would not be as accurate as the first two options but they would be good enough for the size of the project that I was working on. I started with the code base I found here, and the steps mentioned by Itay Mendel in his blog post on blazemeter.com, then modifying a test plan to match my needs.

## Creating the Test Plan

The first step is to make a standard HTTP Request for the contents playlist manifest.

![](http://realeyes.com/wp-content/uploads/playlist_request.png)

Once the playlist is requested I created a Gaussian Random Timer with a deviation of 3000 ms and a constant delay of 1000 ms. This creates a delay between subsequent requests with a minimum delay of 0 seconds and maximum delay of 4 seconds with a Gaussian curve distribution (similar to a symmetric bell curve).

![](http://realeyes.com/wp-content/uploads/Screen-Shot-2015-08-14-at-10.43.24-AM.png)

The next step is to parse the response of the playlist request for a list of chunk-lists using a Regular Expression Extractor.

![](http://realeyes.com/wp-content/uploads/Screen-Shot-2015-08-14-at-10.43.27-AM.png)

Then using a ForeachController that will loop through each chunk provided by the chunk-list and make another HTTP Request to the chunklist manifest.

![](http://realeyes.com/wp-content/uploads/chunk_loop.png)
![](http://realeyes.com/wp-content/uploads/chunk_request.png)

Now we perform the same process to extract the stream fragments from the chunk manifests.

![](http://realeyes.com/wp-content/uploads/streams_extraction.png)
![](http://realeyes.com/wp-content/uploads/stream_loop.png)
![](http://realeyes.com/wp-content/uploads/stream_request.png)

Overall the structure of the requests and variable extractions looks like:

![](http://realeyes.com/wp-content/uploads/structure.png)

Finally once the test structure is complete and all bugs are worked out, the last step is to configure the ThreadGroup for concurrency and duration of the test. For our load testing we wanted to start with 300 users with a 60 second ramp up that streamed video for 5 minutes each. Than after each test bump the number of users up by 300. To do this I setup the thread group options as such:

![](http://realeyes.com/wp-content/uploads/thread_group.png)

One interesting point is that for this test in order to control the duration each user streamed the video for, a scheduler was created with a random date in the past. This would start the test  instantly and make the duration option available for use.

## Cost and Server Optimization

Since we are testing on an Amazon EC2 AWS Instance we wanted to limit costs during the load testing. To avoid having to pay for large bandwidth amounts, since we ultimately wanted to test against more than 1000 users streaming content, we launched a second m4.large instance and installed Jmeter on it. This new instance became the server with which we ran the tests from which allowed us to capitalize on AWS pricing for private IP address data transfer costs which is exactly $0.

While optimizing, I found a post by Philippe Mouawad here, which explains the best practices and tuning tips for using JMeter with high concurrency. Here are the tips that I integrated into my testing environment:  

*  Remove all listeners and instead generate results after the test is complete.  
*  Log all results to csv format  
*  Run JMeter in cli instead of gui. <JMETER_HOME>/bin/jmeter -t <Path to Test Plan>  -n -l <path to results>/results.csv  

Some other tunings we performed on both the JMeter instance and the Wowza instance were:  

*  Increased the number of files allowed to be opened on the server, “nofile”  
*  Increased the maximum file handles that can be allocated, “fs.file-max”  
*  Increased the max amount of file handles that can be opened, “fs.nr_open”  
*  Increased how many connections the NAT can keep track of in the “tracking” table before it starts to drop packets and just break connections, “net.ipv4.netfilter.ip_conntrack_max”  


We did this by adding the following to  

#### /etc/security/limits.d/custom.conf
<pre id="crayon-55d20ae6793fd291098330-1" class="crayon-line"><span class="crayon-e">root </span><span class="crayon-e">soft </span><span class="crayon-i">nofile</span> <span class="crayon-cn">1000000
</span><span class="crayon-e">root </span><span class="crayon-e">hard </span><span class="crayon-i">nofile</span> <span class="crayon-cn">1000000
</span><span class="crayon-o">*</span> <span class="crayon-e">soft </span><span class="crayon-i">nofile</span> <span class="crayon-cn">1000000
</span><span class="crayon-o">*</span> <span class="crayon-e">hard </span><span class="crayon-i">nofile</span> <span class="crayon-cn">1000000</span></pre>


#### /etc/sysctl.conf
<pre id="crayon-55d20ae679408461069956-1" class="crayon-line"><span class="crayon-v">fs</span><span class="crayon-sy">.</span><span class="crayon-v">file</span><span class="crayon-o">-</span><span class="crayon-v">max</span> <span class="crayon-o">=</span> <span class="crayon-cn">1000000
</span><span class="crayon-v">fs</span><span class="crayon-sy">.</span><span class="crayon-v">nr_open</span> <span class="crayon-o">=</span> <span class="crayon-cn">1000000</span><span class="crayon-h">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span><span class="crayon-v">net</span><span class="crayon-sy">.</span><span class="crayon-v">ipv4</span><span class="crayon-sy">.</span><span class="crayon-v">netfilter</span><span class="crayon-sy">.</span><span class="crayon-v">ip_conntrack_max</span> <span class="crayon-o">=</span> <span class="crayon-cn">1048576
</span><span class="crayon-v">net</span><span class="crayon-sy">.</span><span class="crayon-v">nf_conntrack_max</span> <span class="crayon-o">=</span> <span class="crayon-cn">1048576</span></pre>

#  Server Monitoring

To monitor the EC2 instance and verify that its CPU usage, Memory usage, Network I/O, and the Load Average are within tolerable limits we used NewRelic’s monitoring platform.  

![](http://realeyes.com/wp-content/uploads/new_relic.png)

NewRelic performs agent-based monitoring which allowed us to watch the server’s stats during the test. This helps us ensure with confidence not only the users are able to view the stream properly with the JMeter test, but the server is handling the loads properly and there will be no server side problems during production.

# Summary 

We’re grateful to know that there are so many resources available on the Internet to help work through new challenges. With a little creativity and the ability to piece together information from multiple sources there’s so much that can be accomplished. For instance, even if you’re testing VOD HLS on Adobe Media Server or some other streaming solution, you should be able to take some pieces from our article and the resources we leveraged to jumpstart your own load testing initiative.

We enjoyed working through our challenge, and hopefully this article helps you work through your challenge in the way that the articles we found helped us.