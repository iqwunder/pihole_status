# Information
This chrome extension is a very simple and not secure way to enable/disable pi-hole.

It was developed only for my personal use.

The idea with building an own api was inspired by [Pihole Chrome Extension](https://github.com/packtloss/pihole-extension) which is an extension for editing the blacklists/whitelists.

The idea for disabling / enabling Pi-Hole by renaming the gravity.list-File i got through this [article](http://thetimmy.silvernight.org/pages/endisbutton/).

# Installation

At first you need the Pi-Hole. For more Information look at the [website](https://pi-hole.net/).

The installation is very easy.

###Raspberry Pi:

1. Copy file apiext.php from server directory to your webserver of your raspberry pi.
   You can use the admin-directory: /var/www/html/admin.

### Chrome:
1. Install	extension
2. Change the URL (and api key if changed).
