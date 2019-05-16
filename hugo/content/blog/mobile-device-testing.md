+++
headerColorOne = "Mobile device testing is necessary,"
headerColorTwo = "but presents many challenges"
author = "Realeyes Media"
date = "2018-02-19"
title = "Mobile device testing is necessary, but presents many challenges"
backgroundImage = "img/mobile.jpg"
accentTextColor = ""
tags = ["Mobile device testing", "Mobile device testing is necessary, but presents many challenges", "Mobile Device Emulation", "Emulation", "Chrome’s Dev Tools", "DevTools"]
categories = ["How To"]
thumbnail = "img/mobile-thumbnail.jpg"

+++
# Mobile device testing is necessary, but presents many challenges

When you consider that over the past 5 years mobile devices have risen from 0.9% to over 15% of all internet traffic (and that number will continue to climb (source – slide #32)), it’s become increasingly important to make sure that there is at least a basic level of support for mobile users in anything you build. While there are new tools and technologies popping up daily to help make that easier, there are still an incredible number of challenges involved. One of the most common, is finding devices to test your creations with. Even for those of us that tend to collect far more gadgets than the average bear, there are almost certainly a very great number of devices that will not be available to us.  There is a recent phenomena of Open Device Labs that can definitely offer some help with that (for instance, the Rocky Mountain Open Device Lab here in Denver) but there isn’t always going to be one that is convenient, or even available.
When devices simply aren’t available, it’s still important to try to test the best that you can with some fallback options. There are many available options for emulating various mobile devices on a desktop, ranging from some small browser extensions that simply resize your window to match the pixel dimensions of a few devices, to subscription services that offer many more features, to full-blown device simulators available in Xcode or the Android SDK. Any of these options are far better than nothing, but there always seems to be a compromise. Most free and lightweight options tend to be lacking in features, the subscription services can be quite pricey, and the 9.6GB footprint of Xcode (on my machine at least) can seem a bit ridiculous, especially if you don’t actually tend to build native iOS or Mac apps.

## Chrome’s Dev Tools now offer a solution

![](/img/blog-content/robot.png)

Luckily, as of version 32, Google Chrome has added a rather impressive, and built-in, set of capabilities for Mobile Device Emulation to DevTools. By and large, this new offering addresses all of the compromises I listed above. There is a rather comprehensive level of functionality as compared to any device emulator, the tools are free and built right into Chrome, and while Chrome can eat up a lot of resources (especially if you tend to open and use as many tabs as I do), it is still much, much lighter than Xcode and is probably one of your primary browsers anyway.

## Enabling device emulation


So, with that bit of Chrome DevTools fanboyism finished, here’s a quick introduction on how to enable and use the new mobile device emulation features.  They are a bit hidden, so here’s how to turn them on and get to them:  
* Open DevTools (Menu>View>Developer>Developer Tools – OR – CMD(CTRL)+ALT+I)  
* Open DevTools Settings (Click on the Gear icon near the right-hand side of the DevTools menu bar)  
* Click on the “Overrides” tab  
    * If you’re using Chrome Canary, stay on the “General” tab and look under the heading “Appearance”  
* Tick the checkbox for “Show ‘Emulation’ view in console drawer”  
* Close the settings  

![](/img/blog-content/devTools-settings.png)
![](/img/blog-content/Enable-Emulation-Tab1.png)

That will enable the device emulation features, or at least enable the menu for them, now to get to them, all you have to do is open up the console drawer (hit ESC in any Dev Tools tab other than the Console Tab) and you’ll see a new tab available titled “Emulation”.

![](/img/blog-content/emulationTab.png)

## Emulating a device

When you first open that tab “Device” in the list on the left-side should be selected by default, and will allow you to select from a fairly impressive list of devices, I’ll be using the Google Nexus 4 in this example. Selecting a device will display a few key data points specific to that device, which Chrome will then emulate.  
* Viewport  
   * Pixel Dimensions (768×1280)  
   *  Pixel Ratio (2)  
   *   Font Scale Factor (1.083)  
* User Agent  
  * Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19

![](/img/blog-content/availableDevice.png)

At that point, all you have to do is click the “Emulate” button, and Chrome will resize it’s view and reload the current page as though it were the device you selected.
By default, emulating a device will turn on a standard set of options, though you can easily add or remove the available capabilities, as well as tweak and fine-tune the settings for almost all of them.

## Manipulating your emulated device


Drilling down through the remainder of the list on the left-side of the “Emulation” tab will allow you to see and customize all the available details that Chrome is using to emulate your selected device. The “Screen” section seems the most immediately useful, but the “Sensors” section seems the coolest.

There is one other very important thing to call out as a use for all these customization options. Since we have the ability to fine-tune so many different device properties, it means that it is entirely possible to emulate almost any device you can find the specs for. Granted, DevTools provides presets for just about all of the popular devices out there, but it’s good to know that you’re not limited to their list.

## Working with screen properties

The “Screen” section allows several options for fine-tuning the way Chrome emulates the selected device’s display. By default, the Resolution values will be set to match the chosen device’s real-world pixel resolution. In general, when emulating tablets, Chrome will set the initial Resolution values as though the tablet is in Landscape (horizontal) orientation. When emulating phones, they will initially be shown in Portrait (vertical) orientation. You can easily swap the two values by clicking the button between the two resolution text fields.

![](/img/blog-content/Screen-Options.png)

One thing to be aware of, is that swapping these values will make the device viewport appear as though it has rotated, though in terms of device behavior, it has really just resized. What this means for your debugging, is that any styling that uses breakpoints based on width should behave just fine. If, on the other hand, you happen to have JavaScript listening for an orientationchange event in iOS, it won’t fire because there isn’t any accelerometer activity being emulated when you swap those values. This is a prime example of why, as impressive as these tools are, it’s still important to test on actual devices whenever possible.

It is also important to note that if you enable the “Shrink to fit” option in this panel, it can override the resolution values that are set. The aspect ratio will be maintained, but if your browser window is smaller than the defined dimensions, the emulated display will be resized to fit within it. While this is definitely useful in some instances, you’ll want to remember to disable this option before you measure anything.

## Changing the user agent

Next in our list is the “User Agent” section, which is fairly  straightforward. It allows you to toggle between using Chrome’s default User Agent String, which will provide (relatively) accurate information about your browser and hardware set up to sites that you visit, with the thought that they may serve up different content and experiences, depending on your configuration. With that mind, it makes sense that when attempting to emulate the Nexus 4 from our examples earlier, you probably don’t want to provide a User Agent String that identifies your setup as a Mac Desktop with the latest version of OSX. Conveniently, if you’re using one of the default device presets available from the list in the “device” section, Chrome will have already selected and enabled the the corresponding User Agent from it’s list. If you would like to edit the string for some reason, simply make your change in the textbox and hit Enter. If you are emulating a custom device other than the provided presets, you can replace the entire User Agent String. I find that UserAgentString.com is usually a good resource for finding strings from any number of browser versions.

![](/img/blog-content/User-Agent-Options.png)

## Emulating sensor data

Last in the list, is the “Sensors” section, which offers up some settings that are possibly a bit less commonly needed in day to day web development, but are extremely cool. Only the first option, “Emulate touch screen”, will get enabled by default. When it is active, your cursor will render as a semi-transparent circle that is just large enough to help you keep touch-targets in mind. Paul Irish has a nice demo available on his site for experimenting with the touch events.

![](/img/blog-content/Sensors-Options.png)

At this point in time, there are some limited capabilities for emulating multi-touch interactions. Currently only a simple implementation of the Pinch to Zoom action is available, though it seems likely to me that functionality for other common multi-touch gestures may be added in future updates. To use this action, hold down the SHIFT key, then either click and drag, or scroll.

As with most of the options available in the emulation panel, it is possible to turn on or off the touch screen option independent of any other settings.

On the back end of things, touch events will be added in with some of your mouse events. Using this option will not disable mouse events, it simply adds in touch events.  As an example, while “Emulate touch screen” is active, when you click with your mouse, the page will receive a touchstart event in addition to the mousedown event. To see this illustrated, you can visit this Event Listener Test and turn touch screen emulation on and off.

The sensors section also has Geolocation and Accelerometer properties. I think these properties would be best explained by pointing you to some cool little demos that have been created. I encourage you to experiment:  
*  Geolocation Demo  
*  Device Orientation Demo  
Wrapping your head around the Accelerometer values can be a rather daunting task, especially when looking at text only values, which is what’s currently available in the mainstream version of Chrome (32.0.1700.107). If you are interested in working more with the accelerometer, I would highly recommend downloading Chrome Canary, as that version of the Device Emulation panel includes a small, 3D representation of your device, which rotates to illustrate the accelerometer values. The good news, is that since that’s currently available in Canary, it will probably show up in regular Chrome sometime relatively soon.

![](/img/blog-content/Sensors-Options-Chrome-Canary.png)

## Getting your normal browser back

Once you’ve finished testing (or playing) with a device, and are ready to exit device emulation and get Chrome back to normal, just go back to the “Device” section and click the “Reset” button. Everything will return immediately to the normal desktop browser state, with a whole set of Mobile Devices that are quickly and easily available to emulate whenever you need them again.

## Keep calm and continue testing

As I’ve already mentioned, these tools should not replace actual device testing by any means, but they should augment the process nicely, and provide a very convenient method for doing quick checks during development.







