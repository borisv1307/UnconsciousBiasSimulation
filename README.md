# UnconsciousBiasSimulation
---
## Introduction

All humans have unconscious biases, and those in human resources often undergo training to reveal them so they can consciously work on them. Job seekers make many choices when setting up their online profile and do not know how HR professionals will respond to it before there are consequences. This website serves both populations with a simulation.

#### Requirements
---
#### Job Seekers

Create a basic online profile similar to Linked In but with a reduced scope. It should include space for one image, name, educational background, position being sought, career highlights. It should not include a full resume or CV, recommendations from others or connections. The job seeker would tag the profile with keywords related to the image and content. Once submitted, it would enter a pool to be randomly shown to HR professionals.

The job seeker would eventually receive a report from the simulation providing statistics related to their profile. This information would reveal how likely that profile was to move on to the next step in the hiring process. The job seeker could then use that information to tweak their profile and try again. In this way, after several iterations, they could fine tune their profile for a positive response.

---
#### HR Professionals

We can assume that most companies do not want their HR professionals, or any employee, to allow personal unconscious bias to influence company decisions. This simulation could be part of an overall training package or program to help employees uncover their unconscious biases.

The employee would open the site or app and see a randomly chosen applicant profile. They would either ‘throw it away’ or ‘send it forward’ with a tinder-like swipe. The next one would automatically load. The employee would be able to do this as an interstitial task. When they have viewed a given number, perhaps 100, the simulation would produce a report. The report may include common biases such as gender, race, and ethnicity but could also include deeper insights including photo tags, such as preferring outdoor candids over indoor headshots or one college over another.

If machine learning were applied to the data set thus produced, the employee may even get a report detailing biases based on details like hair color, length of last name, or clothing style.

---

## Features
- Material Design
- Emoji support
- User @mentioning
- Private messaging
- Message deleting (for admins)
- Ability to kick/ban users (for admins)
- See other user's IPs (for admins)
- Other awesome features yet to be implemented

.
![User Features](http://i.imgur.com/WbF1fi2.png)

.
![Admin Features](http://i.imgur.com/xQFaadt.png)


#### There are 3 admin levels:
- **Helper:** Can delete chat messages
- **Moderator:** The above plus the ability to kick and ban users
- **Administrator:** All the above plus send global alerts and promote/demote users

---

## Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies.

You might want to look into `config.json` to make change the port you want to use and set up a SSL certificate.

---

## Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run  `npm start` to start the application. You will then be able to access it at localhost:3000

To give yourself administrator permissions on the chat, you will have to type `/role [your-name]` in the app console.

---

## License
>You can check out the full license [here](https://github.com/IgorAntun/node-chat/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.

