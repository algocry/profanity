# Profanity - An Inclusive Exploit

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg)](https://saythanks.io/to/0x0is1off@gmail.com)
![Version](https://img.shields.io/badge/Version-1.0.1-red)
![Deprecation](https://img.shields.io/badge/Deprecation-No-orange)


This repository contains exploit for bug in Authetication and API Access of the affected platform. This exploit has been released without the original vendor's prior knowledege as of now.

# Affected Modules
The result (`single and multiple both`), which has not been published yet, The questions available on the platform, can be accessed without user authetication just by proper API calling.

## Result section
After analyzing and modifying API callings, it has been acknowledged that Data can be accessed without authetication which is (here) two kind of tokens
- Marks access POC
![POCSS-1](./resources/POCSS1.png)

As you can see there are no other authetication than formal headers and encrypted registration number. (The encryption backtracking was possible just by taking a look in query file).

## Complete Section Result section
Same as previous can be access for whole bunch of registration numbers, while in the exploit, getting accessed through Vendor's chat API (another platform API of the same vendor) and writing into a Excel file.

## Questions and Options section
All questions and their options is accessible regardless of user's interest or not, just by question id.

- Question Access POC
![POCSS-2](./resources/POCSS2.png)

- Option Access POC
![POCSS-3](./resources/POCSS3.png)

*It is often believed that the timer and even whole tests happening on this platform can be simulated. (Not proved technically yet)*

# Suggested FIX
A valid authetication of API with mock access tokens being used, can save all these leaks.

# Usage

## Requirements
- node-js
- git
- node-fetch (`2.6.1`) **same version important**
- prompt-sync (`4.2.0`)
- xlsx (`0.18.5`)

## Installation
*Note: If node is installed, it works for every operating system*

***Open cmd and write following:***
```sh
$ git clone https://github.com/0x0is1/profanity.git

$ cd profanity

$ npm install
```

## Use case

```sh
# for single result
## no authentication required
$ npm run result

# for whole section
## authetication required for whole section registration number access
$ npm run export

# for questions
## no authetication required
$ npm run question
```

# Disclaimer
We do not promote any harmful usage of this exploit. This is just a proof of concept being proposed to the vendor. If vendor has any conflict regarding this repository, we will remove it. You may contact us through our [mail](mailto://0x0is1@protonmail.com).

### **Support authors**:
We are group of indie developers and testers, working for open source. Your tiny help can boost us to provide more good works for everyone for free.
Thank you.

[![Donate](https://raw.githubusercontent.com/0x0is1/inproject-asset-container/master//default-pink.png)](https://www.buymeacoffee.com/6dciIwk)

[![Donate](https://raw.githubusercontent.com/0x0is1/inproject-asset-container/master//-460.png)](https://paypal.me/0x0is1?locale.x=en_GB)
