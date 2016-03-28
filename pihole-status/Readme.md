This chrome extension is a very simple and not secure way to enable/disable pi-hole.

It was developed only for my personal use.

The idea with building an own api was inspired by https://github.com/packtloss/pihole-extension which is an extension for editing the blacklists/whitelists.


How to install it:

Raspberry Pi:

1. Copy file apiext.php from server directory to your webserver of your raspberry pi.
   You can use the admin-directory: /var/www/html/admin or create a new directory under /var/www/html.
2. Copy file pihole_status.sh to the directory: /usr/local/bin
3. Execute chmod +x pihole_status.sh to make it executable.
4. Edit File: /etc/sudoers and add the following lines at the end:

	User_Alias WWW_USER = www-data
	Cmnd_Alias WWW_COMMANDS = /usr/local/bin/pihole_status.sh
	WWW_USER ALL = (ALL) NOPASSWD: WWW_COMMANDS

	This will allow the webserver user (www-data) to execute the status script as root.

Chrome:
1. Install	extension
2. Change the URL (and api key if changed).
