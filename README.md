### **Sprout Support**

### **Environmental Variables**

#### **Required Variables for App to Function**

Once you have an API key, this repo relies on a .env file (already listed in the .gitignore) that should have the following environmental variables defined:

- **APIKEY** : set to the key given to you by Harvard
- **GOOGLE_CLIENT_ID** : Necessary for Authentication.  Create a project in your [Google Developer Console](http://console.cloud.google.com/) and create an OAuth client ID. For more details, we followed [this guide](https://www.passportjs.org/tutorials/google/register/) from the Passport docs.
- **GOOGLE_CLIENT_SECRET** : (see above)
- **EXPRESS_SECRET** : a random string of your liking, also used in the authentication set-up
- **NODE_ENV** : set to 'development' for local and 'production' for deployment
Deploy to an AWS EC2 Ubuntu machine with the following steps:

### **1. Set up AWS root account**

[Here](https://aws.amazon.com/) if you do not already have an account...

### **2. Launch an Ubuntu instance**

Provide a project name, select the Ubuntu option in the 'Quick Start' menu, then select a free tier, and create a new key pair for SSH access (see Shortly Deploy instructions for clarity if needed), and save the key where you can find it. Create a new security group, then skip configuring ssh and IP access for now-we'll do it all in a sec. Lastly, click 'Launch instance' in the lower-right corner of the screen.

Beware: make sure you only have one running instance, or you will quickly deplenish the free-tier hours and incur overage charges.

### **3. Change firewall rules**

Navigate to the 'Instance summary' in AWS and click on the Security tab about halfway down the page. Then click the link to access the Security Group that contains the firewall rules for the instance ("sg-somethingSomethingSomething" or similar). Then click 'Edit inbound rules', and add the three rules below:

|     TYPE      |  PORT RANGE   |     SOURCE      |      WHY?                             |
| ------------- | ------------- | -------------   | ------------------------------------- |
| SSH           |  22           | Local-Dev-IP/32 |  SSH into instance from your computer |
| Custom TCP    | 8000 (server) | 0.0.0.0/0       | User access from internet             |

Now that SSH access is enabled, we'll connect to the instance and set it up to host the app.

### **4. Connect to instance**

Instructions for connecting to the instance can be found by clicking Connect in the menu at the top of the AWS instance panel.

SSH into the instance by using either OpenSSH or Putty.

AWS suggests running `chmod 400 your-Key.pem` from the folder in which the key is located to ensure the key is private. A typical OpenSSH command to access the instance from that same directory location is below:

`ssh -i "your-Key.pem" ubuntu@public-DNS-Address`

The public DNS address typically ends with 'compute.amazonaws.com'.

### **5. Clone repo, download dependencies, configure db**

From the instance's root folder, clone down the app's repo from Github.

`git clone https://github.com/Group-Name/repo-Name`

Then cd into the project's folder and install its dependencies.

`npm install`

Lastly, you must recreate the .env file by running the following command:

`vim .env` (and paste in the variables outlined above)

You must then exit the text editor with `:wq` or `^x` depending on your editor and follow the prompts to save the file.  Check your work by running `cat .env` to read the newly created .env file with the correct environmental variables.

### 7. Build the app, start the server, and access

Run the following commands to a build the app for deployment and start the server:

```npm run build```

```npm run start```

## **Contributing**

## **Contact Info**
[Cam’ron Calldwell](https://github.com/ccaldwell11)

[Gage Cantrelle](https://github.com/gagecantrelle)

[Josh Roberts](https://github.com/jrob112)

[Trelana Martin](https://github.com/TreMartin-OS)

############