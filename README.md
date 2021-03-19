# Unconscious Bias Simulation [![Build Status](https://travis-ci.org/Jijogeorge69/UnconsciousBiasSimulation.svg?branch=master)](https://travis-ci.org/Jijogeorge69/UnconsciousBiasSimulation)

---
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Jijogeorge69_UnconsciousBiasSimulation)](https://sonarcloud.io/dashboard?id=Jijogeorge69_UnconsciousBiasSimulation)

## Introduction


All humans have unconscious biases, and those in human resources often undergo training to reveal them so they can consciously work on them. Job seekers make many choices when setting up their online profile and do not know how HR professionals will respond to it before there are consequences. The project focuses on creating an application that serves both job seekers and HR professionals navigate through unconscious biases in online presences. 

For job seekers, the application serves to allow users to create presences. Presences are online profiles that are sent to HR professionals for assessment for acceptance or rejection. Job seekers are able to create multiple presences to see how well each one does under the examination of an HR professional.



## Requirements

#### Job Seekers

Create a basic online profile similar to Linked In but with a reduced scope. It should include space for one image, name, educational background, position being sought, career highlights. It should not include a full resume or CV, recommendations from others or connections. The job seeker would tag the profile with keywords related to the image and content. Once submitted, it would enter a pool to be randomly shown to HR professionals.

The job seeker would eventually receive a report from the simulation providing statistics related to their profile. This information would reveal how likely that profile was to move on to the next step in the hiring process. The job seeker could then use that information to tweak their profile and try again. In this way, after several iterations, they could fine tune their profile for a positive response.

#### HR Professionals

We can assume that most companies do not want their HR professionals, or any employee, to allow personal unconscious bias to influence company decisions. This simulation could be part of an overall training package or program to help employees uncover their unconscious biases.

The employee would open the site or app and see a randomly chosen applicant profile. They would either ‘throw it away’ or ‘send it forward’ with a tinder-like swipe. The next one would automatically load. The employee would be able to do this as an interstitial task. When they have viewed a given number, perhaps 100, the simulation would produce a report. The report may include common biases such as gender, race, and ethnicity but could also include deeper insights including photo tags, such as preferring outdoor candids over indoor headshots or one college over another.

If machine learning were applied to the data set thus produced, the employee may even get a report detailing biases based on details like hair color, length of last name, or clothing style.

## Features

- Registration and login: Users can register as job seekers or HR professionals and login to the application. This includes OTP verification for user's emails.
- Create presences: Job seekers can create and view multiple presences that can be sent as applications for HR professionals to assess.
- Assess applications: HR professionals can view applications sent by job seekers to accept or reject. 
- Visualization: Job seekers can view the acceptance rate of presences that they have sent as applications. HR professionals can view the acceptance rate of the applications that they have assessed in batches based on factors such as gender, ethnicity, age, etc.
- Image tagging: Images that job seekers include in their presences are tagged with labels describing the image using AWS and custom image classification models. 

## Architecture

![](images/Architecture.png)

---

# Backend

## Dependencies
1. Python 3.8
2. virtualenv (if you wish)
3. git (only to clone repository)

```
Steps to install Python on windows: -
      •	https://www.howtogeek.com/197947/how-to-install-python-on-windows/
Steps to install Python on mac: -
      •	https://python.tutorials24x7.com/blog/how-to-install-python-3-9-on-mac
```

## Steps to run backend code

```
The commands below set everything up to run the code base:

$ git clone https://github.com/Jijogeorge69/UnconsciousBiasSimulation.git
$ cd backend
$ virtualenv venv
$ . venv/bin/activate
(venv) pip install -r requirements.txt
(venv) pip install pytest

Note for Microsoft Windows users: replace the virtual environment activation command above with venv\Scripts\activate.
```

## Steps to run backend testcase

```
1. pytest --setup-show tests/functional

```

## MongoDB Connection setup
1. Login into mongo db atlas.

```
   https://account.mongodb.com/account/login
   Email Address: - xxx@xxx.com
   Password: - xxxx@xxxx
```

2. Click on connect.

![](images/first.png)

3. Click on connect your application.

![](images/mongo_menu.png)

4. Select driver name and version from the drop down, replace username, password and database name.

![](images/cn_string.png)

## Steps to change the batch size

```
1. Clone git repository into your local.
   Command: - git clone https://github.com/Jijogeorge69/UnconsciousBiasSimulation.git
2. cd backend
3. cd project
4. Edit __init__.py and modify BATCH_COUNT to the desired value.
```
![](images/batch_size.png)

## Continuous Integration
```
CI is implemented using Travis CI. The file '.travis.yml' in the rool directory has the commands to perform the build.
The following description explains the commands in .travis.yml file.

To setup Travis look into travis documentation https://docs.travis-ci.com/user/tutorial/

1. Language, environment and Python version are declared.
2. In the addons section, additional checks on the code are mentioned. We have implemented sonarcloud static code analysis.
3. Change the organization in sonar cloud to your account for a successful run.
4. Requirements for frontend, backend and other dependencies are installed.
5. The commands in the Script section runs the tests for Backend, Frontend as well as code coverage

```
## Steps to setup AWS Rekognition
```
1. Create a new AWS account using this link: https://portal.aws.amazon.com/billing/signup#/start
2. Install the AWS CLI using this link: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
3. Create the access keys by referring this link: https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys
4. Configure the access keys by following this link: https://chalice-workshop.readthedocs.io/en/latest/env-setup.html#id5

```
## Steps to setup Heroku App

1. Sign up on Heroku using below link.

```
https://id.heroku.com/login
```

2. Login into Heroku dashboard, click on new >> Create new app.

![](images/heroku_1.png)

3. Provide app name and then select region.

![](images/heroku_2.png)

4. Under deploy tab, Select GitHub as deployment method, Search for the code base and select corresponding code base.

![](images/heroku_3.png)

5. Under Automatic deploys click on enable automatic deploys. Deployment happens automatically whenever the code base is updated on GitHub.

![](images/heroku_4.png)

6. Select the deployment branch from GitHub and then click on deploy. View build log gives you additional details on what is being deployed.

![](images/heroku_5.png)

![](images/heroku_6.png)

7. We have used two separate GitHub repos and two separate Heroku app. Below are the URL’s.

```
     Frontend Heroku app: -  https://ubs-application-dev.herokuapp.com/
     Frontend GitHub repo: - https://github.com/Jijogeorge69/ubs-application.git
     Backend Heroku app: -  https://ubs-app-api-dev.herokuapp.com/
     Backend GitHub repo: - https://github.com/Jijogeorge69/ubsapp-rest-api.git
```

## JWT Token for API Authentication
1. Fetch appropriate JWT token via login API.

![](images/login_auth.png)

2. Pass Key as Authorization and JWT token as value.

![](images/login_auth1.png)

#  API LIST:
1. [REGISTRATION](#REGISTRATION)
2. [LOGIN](#LOGIN)
3. [VERIFY OTP](#VERIFY_OTP)
4. [RESEND OTP](#RESEND_OTP)
5. [LOGOUT](#LOGOUT)
6. [GET EMAIL DOMAIN COUNT](#GET_EMAIL_DOMAIN_COUNT)
7. [CREATE PROFILE](#CREATE_PROFILE)
8. [GET PROFILES](#GET_PROFILES)
9. [EDIT PROFILES](#EDIT_PROFILES)
10. [AWS TAGS](#EDIT_PROFILES)
11. [ADD PRESENCE](#ADD_PRESENCE)
12. [GET ALL PRESENCE BY REVIEWER ID ](#GET_ALL_PRESENCE_BY_REVIEWERID)
13. [SAVE PRESENCE REVIEW](#SAVE_PRESENCE_REVIEW)
14. [GET REVIEW COUNT BASED ON GENDER](#GET_REVIEW_COUNT_BASED_ON_GENDER)
15. [GET REVIEW COUNT BASED ON GENDER FOR BATCH](#GET_REVIEW_COUNT_BASED_ON_GENDER_FOR_BATCH)
16. [GET ACCEPTANCE RATE](#GET_ACCEPTANCE_COUNT_FOR_JOB_SEEKER)
17. [GET REVIEW COUNT BASED ON ETHNICITY FOR BATCH](#GET_REVIEW_COUNT_BASED_ON_ETHNICITY_FOR_BATCH)
18. [GET REVIEW COUNT BASED ON ETHNICITY](#GET_REVIEW_COUNT_BASED_ON_ETHNICITY)
19. [GET ALL BATCHES FOR A REVIEWER](#GET_ALL_BATCHES_FOR_A_REVIEWER)
20. [GET TAGS COUNT FOR A BATCH](#GET_TAGS_COUNT_FOR_A_BATCH)
21. [GET BATCH COUNT BASED ON AGE](#GET_BATCH_COUNT_BASED_ON_AGE)


## REGISTRATION
### (POST REQUEST): /api/v1/createUser/</br>

#### REQUEST
```
{
            "first_name": "first",
            "last_name": "last",
            "email": "itsme@yopmail.com",
            "password": "Hello3",
            "registration_type": "jobSeeker",
            "gender": "Male",
            "ethnicity": "Asian",
            "date_of_birth": "2020-11-19",
            "email_validation": "False",
            "contact_details": {
                "address": "test Street",
                "address2": "test Street 2",
                "city": "Philadelphia",
                "state": "PA",
                "zip": "19104",
                "contact_number": "12345678"
            }
}

```

#### RESPONSE SUCCESS
```
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTYwMTUwNDMsIm5iZiI6MTYxNjAxNTA0MywianRpIjoiN2Q3OTdhYzktMWI2Zi00ZDljLWJjNTEtY2I5ZWRkNTU5MjIwIiwiZXhwIjoxNjE2MDE1OTQzLCJpZGVudGl0eSI6eyJ1c2VyX2lkIjoxMDEsImRhdGVfam9pbmVkIjoiV2VkLCAxNyBNYXIgMjAyMSAyMTowNDowMiBHTVQifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.UcDkQF1REOVe7kJGC4K3JhpbD9xT0A4fXoGUUhsKIz4",
    "user": {
        "user_id": 101,
        "first_name": "first",
        "email": "itsme@yopmail.com",
        "registration_type": "jobSeeker",
        "otp_delivery_status": "Successfully sent email"
    }
}

```
## LOGIN
### (POST REQUEST): /api/v1/login/</br>

#### REQUEST
```
{
        "email":"XXXX@gmail.com",
        "password": "XXXXX"
}

```

#### RESPONSE SUCCESS
```
{
    "user_id": 3,
    "email": "XXXX@gmail.com",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTYwMTM3NDgsIm5iZiI6MTYxNjAxMzc0OCwianRpIjoiOTcyYjljM2ItNGIwNS00NzViLTg3MDQtY2Q1ZjE4ODM2Mjc3IiwiZXhwIjoxNjE2MDE0NjQ4LCJpZGVudGl0eSI6eyJpZCI6MywiZGF0ZV9qb2luZWQiOiJUaHUsIDI5IE9jdCAyMDIwIDA0OjA0OjI2IEdNVCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.ufbqRzQ99fJWW3_0OyGQr93cCWgsynA1j6fdBMCdP4g",
    "registration_type": "HR",
    "first_name": "X",
    "last_name": "XX",
    "gender": "Male",
    "date_of_birth": "1992-10-01",
    "email_validation": "True",
    "ethnicity": "Asian"
}

```

## VERIFY_OTP
### (POST REQUEST): /api/v1/verify_otp/</br>

#### REQUEST
```
{
    "user_id":101,
    "otp":"FUYOVA4NE33Y7PEI"
}

```

#### RESPONSE SUCCESS
```
{
    "success": "Email validation successful"
}

```

![](images/verify.png)

## RESEND_OTP
### (POST REQUEST): /api/v1/resend_otp/</br>

#### REQUEST
```
{
    "email":"itsme@yopmail.com"
}
```

#### RESPONSE SUCCESS
```
{
    "success": "OTP sent via email"
}

```

![](images/resend_otp.png)

## LOGOUT
### (POST REQUEST): /api/v1/logout/</br>

#### REQUEST
```
{
    "user_id":101,
    "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTYwMTUwNDMsIm5iZiI6MTYxNjAxNTA0MywianRpIjoiN2Q3OTdhYzktMWI2Zi00ZDljLWJjNTEtY2I5ZWRkNTU5MjIwIiwiZXhwIjoxNjE2MDE1OTQzLCJpZGVudGl0eSI6eyJ1c2VyX2lkIjoxMDEsImRhdGVfam9pbmVkIjoiV2VkLCAxNyBNYXIgMjAyMSAyMTowNDowMiBHTVQifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.UcDkQF1REOVe7kJGC4K3JhpbD9xT0A4fXoGUUhsKIz4"
}
```

#### RESPONSE SUCCESS
```
{
    "success": "Successfully logged out"
}

```

## GET_EMAIL_DOMAIN_COUNT
### (GET REQUEST): /api/v1/getCount/emailDomain/<reviewer_id>/<batch_no>/</br>

#### REQUEST
```
https://ubs-app-api-dev.herokuapp.com/api/v1/getCount/emailDomain/994/994/
```

#### RESPONSE SUCCESS
```
{
    "accepted_email_count": 13,
    "accepted": {
        "gmail.com": 13
    },
    "rejected_email_count": 87,
    "rejected": {
        "gmail.com": 85,
        "drexel.edu": 1,
        "wqcefp.com": 1
    }
}
```

## CREATE_PROFILE
### (POST REQUEST): /api/v1/createProfile/</br>

#### REQUEST
```
{
        "user_id":96,
        "profileName":"Test AWS CLI 2",
        "profileImg":"https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1613053524/unconsciousbias/gvaqsvbiv0uejvdc8lus.jpg",
        "first_name": "VJ",
        "last_name": "Maxino",
        "position": "Developer",
        "gender":"Male",
        "email":"vjboss@yopmail.com",
        "ethnicity":"Asian",
        "aboutMe": "Hello World",
        "education": [
            {
            "school": "Drexel",
            "degree": "MA",
            "major": "SE",
            "eduStartDate": "0001-01",
            "eduEndDate": "0001-01",
            "gpa": "3"
            }
        ],
        "experience": [
            {
            "title": "Developer",
            "company": "ABC",
            "location": "PH",
            "expStartDate": "0001-01",
            "expEndDate": "0001-01"
            }
        ]  
        }

```

#### RESPONSE SUCCESS
```
{
    "profile_id": 85,
    "user_id": 96,
    "profileName": "Test AWS CLI 2",
    "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1613053524/unconsciousbias/gvaqsvbiv0uejvdc8lus.jpg",
    "first_name": "VJ",
    "last_name": "Maxino",
    "position": "Developer",
    "aboutMe": "Hello World",
    "education": [
        {
            "school": "Drexel",
            "degree": "MA",
            "major": "SE",
            "eduStartDate": "0001-01",
            "eduEndDate": "0001-01",
            "gpa": "3"
        }
    ],
    "experience": [
        {
            "title": "Developer",
            "company": "ABC",
            "location": "PH",
            "expStartDate": "0001-01",
            "expEndDate": "0001-01"
        }
    ],
    "gender": "Male",
    "email": "vjboss@yopmail.com",
    "ethnicity": "Asian"
}

```
## GET_PROFILES
### (GET REQUEST): /api/v1/getProfiles/<user_id>/</br>

#### REQUEST
```
https://ubs-app-api-dev.herokuapp.com/api/v1/getProfiles/33/
```

#### RESPONSE SUCCESS
```
{
    "count": 10,
    "results": [
        {
            "profile_id": 18,
            "profileName": "Software Developer",
            "user_id": 33,
            "state": "PA",
            "zip": "19104-5477",
            "city": "PHILADELPHIA",
            "email": "ER.JIJOGEORGE@GMAIL.COM",
            "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1605163769/unconsciousbias/hvj2kx7opzmrwrycsgbt.jpg",
            "first_name": "Jijo",
            "last_name": "George",
            "position": "Senior Software Engineer",
            "aboutMe": "I'm a software engineer based in Boston, MA specializing in building (and occasionally designing) exceptional websites, applications, and everything in between.",
            "education": [
                {
                    "school": "Drexel University",
                    "degree": "Masters ",
                    "major": "Software Engineering ",
                    "eduStartDate": "2020-01",
                    "eduEndDate": "2021-10",
                    "gpa": "4"
                }
            ],
            "experience": [
                {
                    "title": "DevOps Engineer",
                    "company": "DXC Technology",
                    "location": "Bostan",
                    "expStartDate": "2014-01",
                    "expEndDate": "2020-11",
                    "duration": "6 years 10 months"
                }
            ],
            "gender": "Male",
            "ethnicity": "Asian"
        },
        {
            "profile_id": 19,
            "profileName": "DevOps Engineer",
            "user_id": 33,
            "state": "PA",
            "zip": "19104-5477",
            "city": "PHILADELPHIA",
            "email": "ER.JIJOGEORGE@GMAIL.COM",
            "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1605164326/unconsciousbias/nvrvfkklri6cxiuabzqc.jpg",
            "first_name": "Jijo",
            "last_name": "George",
            "position": "Senior DevOps Engineer",
            "aboutMe": "Spent 10 years developing the skills to increase velocity, reliability, and quality for BFSI vertical with a high focus on security. Deep experience with AWS, Docker, Kubernetes, and Openstack, helping organizations instill Devops for the modern age.",
            "education": [
                {
                    "school": "RGPV University",
                    "degree": "B.E",
                    "major": "Computer Science",
                    "eduStartDate": "2010-01",
                    "eduEndDate": "2014-12",
                    "gpa": ""
                },
                {
                    "school": "Drexel University",
                    "degree": "Masters",
                    "major": "Software Engineering ",
                    "eduStartDate": "2019-09",
                    "eduEndDate": "2021-06",
                    "gpa": ""
                }
            ],
            "experience": [
                {
                    "title": "Technology Consultant ",
                    "company": "Hewlett Packard",
                    "location": "Bangalore",
                    "expStartDate": "2014-03",
                    "expEndDate": "2019-07",
                    "duration": "5 years 4 months"
                },
                {
                    "title": "DevOps Engineer ",
                    "company": "DXC Technology",
                    "location": "Bangalore",
                    "expStartDate": "2019-06",
                    "expEndDate": "2020-11",
                    "duration": "1 year 5 months"
                }
            ],
            "gender": "Male",
            "ethnicity": "Asian"
        },
        {
            "profile_id": 29,
            "profileName": "Manager",
            "user_id": 33,
            "state": "PA",
            "zip": "19104-5477",
            "city": "PHILADELPHIA",
            "email": "ER.JIJOGEORGE@GMAIL.COM",
            "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1611164810/unconsciousbias/hgnhxc0eoc6j63u9mwp5.jpg",
            "first_name": "Jijo",
            "last_name": "George",
            "position": "Manager",
            "aboutMe": "aosasclclclkadclclacdlkclkclc;cjchdckjdchkk",
            "education": [
                {
                    "school": "Drexel",
                    "degree": "MBA",
                    "major": "Business Analytics",
                    "eduStartDate": "2020-01",
                    "eduEndDate": "2021-01",
                    "gpa": ""
                }
            ],
            "experience": [
                {
                    "title": "Team Lead",
                    "company": "Google",
                    "location": "California",
                    "expStartDate": "2019-01",
                    "expEndDate": "2020-01"
                }
            ],
            "gender": "Male",
            "ethnicity": "Asian"
        },
        {
            "profile_id": 30,
            "profileName": "Test Presence",
            "user_id": 33,
            "state": "PA",
            "zip": "19104-5477",
            "city": "PHILADELPHIA",
            "email": "ER.JIJOGEORGE@GMAIL.COM",
            "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1611176450/unconsciousbias/q85rypgvub3ctumfswpw.png",
            "first_name": "Jijo",
            "last_name": "George",
            "position": "Dev",
            "aboutMe": "Dev",
            "education": [
                {
                    "school": "Drexel",
                    "degree": "BS",
                    "major": "SE",
                    "eduStartDate": "2018-01",
                    "eduEndDate": "2021-02",
                    "gpa": "3.99"
                }
            ],
            "experience": [
                {
                    "title": "Dev",
                    "company": "DXC Technology",
                    "location": "4r42",
                    "expStartDate": "2013-02",
                    "expEndDate": "2021-06",
                    "duration": "8 years 4 months"
                }
            ],
            "gender": "Male",
            "ethnicity": "Asian"
        },
        {
            "profile_id": 69,
            "profileName": "Martin Test",
            "user_id": 33,
            "state": "PA",
            "zip": "19104-5477",
            "city": "PHILADELPHIA",
            "email": "ER.JIJOGEORGE@GMAIL.COM",
            "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1613626844/unconsciousbias/jjlxsdcizjdxdotatskb.jpg",
            "first_name": "Jijo",
            "last_name": "George",
            "position": "Dev",
            "aboutMe": "Dev",
            "education": [],
            "experience": [],
            "gender": "Male",
            "ethnicity": "Asian"
        },
        {
            "profile_id": 73,
            "profileName": "Test Girls Image",
            "user_id": 33,
            "state": "PA",
            "zip": "19104-5477",
            "city": "PHILADELPHIA",
            "email": "ER.JIJOGEORGE@GMAIL.COM",
            "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1613647912/unconsciousbias/tiwo9dssdoc5kiwtfz0w.jpg",
            "first_name": "Jijo",
            "last_name": "George",
            "position": "Senior Software Engineer",
            "aboutMe": "Dev",
            "education": [],
            "experience": [],
            "gender": "Male",
            "ethnicity": "Asian"
        },
        {
            "profile_id": 74,
            "profileName": "Test My Picture",
            "user_id": 33,
            "state": "PA",
            "zip": "19104-5477",
            "city": "PHILADELPHIA",
            "email": "ER.JIJOGEORGE@GMAIL.COM",
            "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1613648009/unconsciousbias/wrxkrgddj83jun4qzpfk.jpg",
            "first_name": "Jijo",
            "last_name": "George",
            "position": "Senior Software Engineer Edit",
            "aboutMe": "Dev",
            "education": [],
            "experience": [],
            "gender": "Male",
            "ethnicity": "Asian"
        },
        {
            "profile_id": 75,
            "profileName": "Test Invalid",
            "user_id": 33,
            "state": "PA",
            "zip": "19104-5477",
            "city": "PHILADELPHIA",
            "email": "ER.JIJOGEORGE@GMAIL.COM",
            "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1613648161/unconsciousbias/fzyx45ahaclldu54kjov.jpg",
            "first_name": "Jijo",
            "last_name": "George",
            "position": "Senior Software Engineer Edit",
            "aboutMe": "Invalid",
            "education": [],
            "experience": [],
            "gender": "Male",
            "ethnicity": "Asian"
        },
        {
            "profile_id": 76,
            "profileName": "Random Invalid",
            "user_id": 33,
            "state": "PA",
            "zip": "19104-5477",
            "city": "PHILADELPHIA",
            "email": "ER.JIJOGEORGE@GMAIL.COM",
            "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1613650122/unconsciousbias/plrhpcwwcy3oe9bya6wp.jpg",
            "first_name": "Jijo",
            "last_name": "George",
            "position": "Senior Software Engineer Edit",
            "aboutMe": "Dev",
            "education": [],
            "experience": [],
            "gender": "Male",
            "ethnicity": "Asian"
        },
        {
            "profile_id": 80,
            "profileName": "New Dynamic Presence",
            "user_id": 33,
            "state": "PA",
            "zip": "19104-5477",
            "city": "PHILADELPHIA",
            "email": "ER.JIJOGEORGE@GMAIL.COM",
            "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1614261152/unconsciousbias/oxeldhguprn5t5b7sktr.jpg",
            "first_name": "Jijo",
            "last_name": "George",
            "position": "New Dynamic Presence",
            "aboutMe": "New Dynamic Presence",
            "education": [],
            "experience": [],
            "gender": "Male",
            "ethnicity": "Asian"
        }
    ]
}
```

## EDIT_PROFILES
### (PUT REQUEST): /api/v1/editProfile/</br>

#### REQUEST
```
{
        "user_id":20,
        "profile_id":14,
        "profileName":"Test AWS CLI 2",
        "profileImg":"https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1613053524/unconsciousbias/gvaqsvbiv0uejvdc8lus.jpg",
        "first_name": "VJ",
        "last_name": "Maxino",
        "position": "Developer",
        "gender":"Male",
        "email":"vjboss@yopmail.com",
        "ethnicity":"Asian",
        "aboutMe": "Hello World",
        "education": [
            {
            "school": "Drexel",
            "degree": "MA",
            "major": "SE",
            "eduStartDate": "0001-01",
            "eduEndDate": "0001-01",
            "gpa": "3"
            }
        ],
        "experience": [
            {
            "title": "Developer",
            "company": "ABC",
            "location": "PH",
            "expStartDate": "0001-01",
            "expEndDate": "0001-01"
            }
        ]  
        }

```

#### RESPONSE SUCCESS
```
{
    "profile_id": 14,
    "user_id": 20,
    "profileName": "Test AWS CLI 2",
    "profileImg": "https://res.cloudinary.com/unconsciousbiassimulator/image/upload/v1613053524/unconsciousbias/gvaqsvbiv0uejvdc8lus.jpg",
    "first_name": "VJ",
    "last_name": "Maxino",
    "position": "Developer",
    "aboutMe": "Hello World",
    "education": [
        {
            "school": "Drexel",
            "degree": "MA",
            "major": "SE",
            "eduStartDate": "0001-01",
            "eduEndDate": "0001-01",
            "gpa": "3"
        }
    ],
    "experience": [
        {
            "title": "Developer",
            "company": "ABC",
            "location": "PH",
            "expStartDate": "0001-01",
            "expEndDate": "0001-01"
        }
    ],
    "gender": "Male",
    "email": "vjboss@yopmail.com",
    "ethnicity": "Asian"
}
```

## ADD_PRESENCE
### (POST REQUEST): /api/v1/addPresence/</br>
Add Presence USING POSTMAN: body, raw </br>

#### REQUEST
```
{
        "profileName": string,
        "gender": "string",
        "user_id": int,
        "profile_id": int,
        "state": "string",
        "zip": "string",
        "city": "string",
        "email": "string@gmail.com",
        "profileImg": "string",
        "first_name": "string",
        "last_name": "string",
        "position": "string",
        "aboutMe": "string World",
        "education": [
            {
                "school": "string",
                "degree": "string",
                "major": "string",
                "eduStartDate": "string",
                "eduEndDate": "string",
                "gpa": "string"
            }
        ],
        "experience": [
            {
                "title": "string",
                "company": "string",
                "location": "string",
                "expStartDate": "string",
                "expEndDate": "string"
            }
        ],
        "reviewed_by": [
            {
                "reviewed_by": "",
                "reviewed_on": "",
                "status": ""
            }
        ],
        "added_on": datetime(),
        "gender": "string",
        "ethnicity": "string"
    }
```

#### RESPONSE SUCCESS
```
{
      "user_id": int,
      "profile_id": int,
      "profile_name": "string",
      "profileImg": "string",
      "gender": "string",
      "state": "string",
      "zip": "string",
      "city": "string",
      "email": "string@test.com",
      "first_name": "string",
      "last_name": "string",
      "aboutMe": "string",
      "position": "string",
      "education": [
          {
              "school": "string",
              "degree": "string",
              "major": "string",
              "eduStartDate": "string",
              "eduEndDate": "string",
              "gpa": "string"
          }
      ],
      "experience": [
          {
              "title": "string",
              "company": "string",
              "location": "string",
              "expStartDate": "string",
              "expEndDate": "string"
          }
      ],
      "reviewed_by": [
          {
              "reviewed_by": "string",
              "reviewed_on": datetime(),
              "status": "string"
          }
      ]
}

```

#### RESPONSE PRESENCE ALREADY EXISTS
```
{
    "code": 4,
    "error": "User presence already exists"
}
```

#### RESPONSE USERID DOES NOT EXISTS
```
{
    "code": 4,
    "error": "User account does not exist"
}
```

## GET_ALL_PRESENCE_BY_REVIEWERID
### (GET REQUEST): /api/v1/getAllPresence/<reviewer_id>/</br>
Get Presences USING POSTMAN: body, raw </br>

#### REQUEST
```
GET:- https://localhost/api/v1/getAllPresence/32/

```

#### RESPONSE SUCCESS
```
[{
      "user_id": int,
      "profile_id": int,
      "profile_name": "string",
      "profileImg": "string",
      "gender": "string",
      "state": "string",
      "zip": "string",
      "city": "string",
      "email": "string@test.com",
      "first_name": "string",
      "last_name": "string",
      "aboutMe": "string",
      "position": "string",
      "education": [
          {
              "school": "string",
              "degree": "string",
              "major": "string",
              "eduStartDate": "string",
              "eduEndDate": "string",
              "gpa": "string"
          }
      ],
      "experience": [
          {
              "title": "string",
              "company": "string",
              "location": "string",
              "expStartDate": "string",
              "expEndDate": "string"
          }
      ],
      "reviewed_by": [
          {
              "reviewed_by": "string",
              "reviewed_on": datetime(),
              "status": "string"
          }
      ]
}]

```

#### RESPONSE NO PRESENCES FOUND
```
{
    "code": 4,
    "error": "No more presence to be reviewed"
}
```

## SAVE_PRESENCE_REVIEW
### (PATCH REQUEST): /api/v1/savePresenceReview/</br>
Save Presence Review USING POSTMAN: body, raw </br>

#### REQUEST
```
{
        "profile_id": "string",
        "user_id": "string",
        "feedback": {
            "reviewer_id": int,
            "reviewed_on": "datetime()",
            "application_status": "string"
        }
}
```

#### RESPONSE SUCCESS
```

{
      "user_id": int,
      "profile_id": int,
      "profile_name": "string",
      "profileImg": "string",
      "gender": "string",
      "state": "string",
      "zip": "string",
      "city": "string",
      "email": "string@test.com",
      "first_name": "string",
      "last_name": "string",
      "aboutMe": "string",
      "position": "string",
      "education": [
          {
              "school": "string",
              "degree": "string",
              "major": "string",
              "eduStartDate": "string",
              "eduEndDate": "string",
              "gpa": "string"
          }
      ],
      "experience": [
          {
              "title": "string",
              "company": "string",
              "location": "string",
              "expStartDate": "string",
              "expEndDate": "string"
          }
      ],
      "reviewed_by": [
          {
              "reviewed_by": "string",
              "reviewed_on": datetime(),
              "status": "string"
          }
      ]
}
```

#### RESPONSE IMPROPER REQUEST
```
{
    "error": "feedback details cannot be empty"
}
```

#### RESPONSE DUPLICATE FEEDBACK
```
{
    "code": 1,
    "error": "Unable to update batch details, Please delete duplicate instance of batch details"
}
```

#### RESPONSE FOR NO PRESENCE
```
{
    "code": 2,
    "error": "User presence not found"
}
```

## GET_REVIEW_COUNT_BASED_ON_GENDER
### (GET REQUEST): /api/v1/getCount/<reviewer_id>/</br>
Get Count For Review USING POSTMAN: body, raw </br>

#### REQUEST
```
GET:- https://localhost/api/v1/getCount/31/

```

#### RESPONSE SUCCESS
```
{
        "reviewer_id": int,
        "declined_male_count": int,
        "declined_female_count": int,
        "declined_other_count": int,
        "declined_undisclosed_count": int,
        "accepted_male_count": int,
        "accepted_female_count": int,
        "accepted_other_count": int,
        "accepted_undisclosed_count" : int
}
```

#### RESPONSE IMPROPER REVIEWER ID
```
{
    "error": "reviewer id must be numeric"
}
```

## GET_REVIEW_COUNT_BASED_ON_GENDER_FOR_BATCH
### (GET REQUEST): /api/v1/getCount/<reviewer_id>/<batch_no>/</br>
Get Count For Review USING POSTMAN: body, raw </br>

#### REQUEST
```
GET:- https://localhost/api/v1/getCount/31/1/

```

#### RESPONSE SUCCESS
```
{
        "reviewer_id": int,
        "declined_male_count": int,
        "declined_female_count": int,
        "declined_other_count": int,
        "declined_undisclosed_count": int,
        "accepted_male_count": int,
        "accepted_female_count": int,
        "accepted_other_count": int,
        "accepted_undisclosed_count" : int
}
```

#### RESPONSE IMPROPER REVIEWER ID
```
{
    "error": "reviewer id must be numeric"
}
```

## GET_ACCEPTANCE_COUNT_FOR_JOB_SEEKER
### (GET REQUEST): /api/v1/getCount/<reviewer_id>/<batch_no>/</br>
Get Acceptance Rate For Job Seeker USING POSTMAN: body, raw </br>

#### REQUEST
```
GET:- https://localhost/api/v1/getAcceptanceRate/1/

```

#### RESPONSE SUCCESS
```
{
        "accepted": int,
        "rejected": int
}
```

#### RESPONSE IMPROPER REVIEWER ID
```
{
    "error": "reviewer id must be numeric"
}
```

## GET_REVIEW_COUNT_BASED_ON_ETHNICITY_FOR_BATCH
### (GET REQUEST): /api/v1/getCount/Ethnicity/<reviewer_id>/<batch_no>/</br>
Get Review Count Based on Ethnicity For a Batch USING POSTMAN: body, raw </br>

#### REQUEST
```
GET:- https://localhost/api/v1/getCount/Ethnicity/34/1/

```

#### RESPONSE SUCCESS
```
{
        "reviewer_id": int,
        "declined_american_indian_count": int,
        "declined_asian_count": int,
        "declined_black_american_count": int,
        "declined_hispanic_latino_count": int,
        "declined_pacific_islander_count": int,
        "declined_white_count": int,
        "declined_other_count": int,
        "declined_undisclosed_count": int,
        "accepted_american_indian_count": int,
        "accepted_asian_count": int,
        "accepted_black_american_count": int,
        "accepted_hispanic_latino_count": int,
        "accepted_pacific_islander_count" : int,
        "accepted_white_count": int,
        "accepted_other_count": int,
        "accepted_undisclosed_count": int
    }
```

#### RESPONSE IMPROPER REVIEWER ID
```
{
    "error": "reviewer id and batch no must be numeric"
}
```


## GET_REVIEW_COUNT_BASED_ON_ETHNICITY
### (GET REQUEST): /api/v1/getCountByEthnicity/<reviewer_id>/</br>
Get Review Count Based on Ethnicity USING POSTMAN: body, raw </br>

#### REQUEST
```
GET:- https://localhost/api/v1/getCountByEthnicity/34/

```

#### RESPONSE SUCCESS
```
{
        "reviewer_id": int,
        "declined_american_indian_count": int,
        "declined_asian_count": int,
        "declined_black_american_count": int,
        "declined_hispanic_latino_count": int,
        "declined_pacific_islander_count": int,
        "declined_white_count": int,
        "declined_other_count": int,
        "declined_undisclosed_count": int,
        "accepted_american_indian_count": int,
        "accepted_asian_count": int,
        "accepted_black_american_count": int,
        "accepted_hispanic_latino_count": int,
        "accepted_pacific_islander_count" : int,
        "accepted_white_count": int,
        "accepted_other_count": int,
        "accepted_undisclosed_count": int
    }
```

#### RESPONSE IMPROPER REVIEWER ID
```
{
    "error": "reviewer id must be numeric"
}
```

## GET_ALL_BATCHES_FOR_A_REVIEWER
### (GET REQUEST): /api/v1/getAllBatches/<reviewer_id>/</br>
Get All Batches Data USING POSTMAN: body, raw </br>

#### REQUEST
```
GET:- https://localhost/api/v1/getAllBatches/34/

```

#### RESPONSE SUCCESS
```
[
  {     "count": int,
        "result":{
            "hr_user_id": int,
            "batch_no": int,
            "batch_size": int,
            "date": datetime()
        }
    }
]
```

#### RESPONSE NO RECORDS FOR BATCH
```
{   
    "code": 4,
    "error": "Batch details for this reviewer not found"
}
```


## GET_TAGS_COUNT_FOR_A_BATCH
### (GET REQUEST): /api/v1/batchesTagsCount/<reviewer_id>/</br>
Get Tags Count For A  Batches USING POSTMAN: body, raw </br>

#### REQUEST
```
GET:- https://localhost/api/v1/batchesTagsCount/34/

```

#### RESPONSE SUCCESS
```
{
      "accept_smile": int,
      "reject_smile": int,
      "accept_without_smile": int,
      "reject_without_smile": int,
      "accept_eyeglasses": int,
      "reject_eyeglasses": int,
      "accept_without_eyeglasses": int,
      "reject_without_eyeglasses": int,
      "accept_facial_hair": int,
      "reject_facial_hair": int,
      "accept_without_facial_hair": int,
      "reject_without_facial_hair": int,
      "accept_short_hair": int,
      "reject_short_hair": int,
      "accept_long_hair": int,
      "reject_long_hair": int,
      "accept_indoor": int,
      "reject_indoor": int,
      "accept_outdoor": int,
      "reject_outdoor": int
}

```

#### RESPONSE NO RECORDS FOR BATCH
```
{   
    "code": 4,
    "error": "Batch details for this reviewer not found"
}
```

## GET_BATCH_COUNT_BASED_ON_AGE
### (GET REQUEST): /api/v1/getCountByAge/<reviewer_id>/<batch_no>/</br>
Get Batch count based on Age USING POSTMAN: body, raw </br>

#### REQUEST
```
GET:- https://localhost/api/v1/getCountByAge/34/1/

```

#### RESPONSE SUCCESS
```
{
        "declined_young" : int,
        "declined_middle": int,
        "declined_old": int,
        "accepted_young": int,
        "accepted_middle": int,
        "accepted_old": int
}
```

#### RESPONSE NO RECORDS FOR BATCH
```
{   
    "error": "reviewer id must be numeric"
}
```

# Frontend
The frontend of the project is a web application that uses [React](https://reactjs.org/). 

To use the application, run the following in the project directory:

 `npm install`: Installs all the dependencies that have been used so far
 
 `npm start`: Runs the application and opens it in browser on http://localhost:3000/
 
 `npm test`: Runs the tests based on [Enzyme](https://enzymejs.github.io/enzyme/docs/guides/react-native.html)

Note: `npm install` only has to be used on the first run of the application.

## Pages
The Unconscious Bias Simulation web application currently has pages for registration, login, OTP verification, home, create presence, view presence, and view application. 

#### Registration
When a user registers, the following form fields are displayed:
- First name
- Last name
- Email
- Password
- Gender
- Ethnicity
- Birth Date
- Registration Type

Registration type allows the user to select if they are a job seeker or an HR professional. If the user is a job seeker, more form fields would be displayed for the following:
- Address
- Phone number

#### Login
The login page is the default page that the application would go to when it is first loaded. It includes a form for a user's email and password. It includes a link to registration.

#### OTP Verification
The OTP verification page is displayed after a user logs in for the first time. Once the user has verified their OTP, the user is redirected to the homepage. If a user has verified their OTP previously, the user is redirected to the homepage immediately after logging in. 

The OTP verification page includes a form to submit the OTP that they receive through email. The page also includes a button to resend an OTP if the user was unable to receive their OTP.

#### Homepage
The homepage is the first page that the user is redirected to after logging in. There are two homepages that a user can be redirected to depending on the type of user. 
- Job Seeker: The homepage includes a horizontal bar graph displaying the acceptance and rejection rate of presences submitted.
- HR Professional: The homepage includes several graphs to show the user's acceptance and rejection rate of applications based on gender, ethnicity, tags of the application's image, age, and email. The data of the graphs displayed are dependent on the batch of applications that the HR professional went through. The batch can be chosen through a dropdown menu in the homepage.

#### Create Presence
This is a page unique to the job seeker. It displays the form for job seekers to create a presence. The form includes the following fields:
- Profile name: name of the profile for users to differentiate each one
- Email
- First name
- Last name
- Position sought
- Objective
- Education: includes a form for school, degree, major, start date, end date, and GPA. (Start dates must precede end dates).
- Experience: includes a form for title, company, location, start date, and end date. (Start dates must precede end dates).

#### View Presence
This is a page unique to the job seeker. It displays all of the presences that job seekers have created in an accordion. The header of each is named after the profile name of each presence. Each presence includes two buttons. The "Send" button is used to send the presence to the HR professionals. This puts it in the pool of applications that HR professionals can assess. The "Edit" button allows the job seeker to edit the presence.

#### View Application

This is a page unique to the HR professional. It displays applications one by one. Each application includes an Accept or Decline button. When a button is clicked, the next application is displayed. When the HR professional has gone through all the applications, a message shows that there are no more applications to be assessed. When the HR professional completes a whole batch, the results of that batch becomes available in the drop down menu of batches in the homepage.

Note: HR professionals are able to assess applications and not complete a batch. A batch is only completed when the HR professional assesses a number of applications corresponding to the batch size. A batch does not have to be completed in one sitting.

## Components
Components have been written for several parts of the project. The components can be found in [src/components/](https://github.com/Jijogeorge69/UnconsciousBiasSimulation/tree/refactored_Code/frontend/src/components). Components are separated in folders named according to their function. Each folder contains the following files:

 #### [Header](https://github.com/Jijogeorge69/UnconsciousBiasSimulation/tree/refactored_Code/frontend/src/components/Header)
 Displays the Navbar for each page.

 - Header.jsx: Displays the name of the job seeker and links to create a presence, view created presences, and to logout.
 - HeaderHR.jsx: Displays the name of the HR professional and links to view applications to assess them and to logout.

#### [Home](https://github.com/Jijogeorge69/UnconsciousBiasSimulation/tree/refactored_Code/frontend/src/components/Home)
Displays the page that includes the graphs corresponding to each user. It is the first page that users are redirected to after logging in.
 - Home.jsx: Displays the homepage of the job seeker. 
 - HomeHR.jsx: Displays the homepage of the HR professional.
 
#### [Login](https://github.com/Jijogeorge69/UnconsciousBiasSimulation/tree/refactored_Code/frontend/src/components/Login)
 -	login.jsx: Displays the login page of the application.
 -	EmailValidation.jsx: Displays the page where users enter the OTP they receive through email.
 
#### [createProfile](https://github.com/Jijogeorge69/UnconsciousBiasSimulation/tree/refactored_Code/frontend/src/components/createProfile)
- createProfile.jsx: Displays the page that holds the form for creating a presence.

#### [graphs](https://github.com/Jijogeorge69/UnconsciousBiasSimulation/tree/refactored_Code/frontend/src/components/graphs): 
Includes files that are templates to create graphs. There are templates for doughnut charts, horizontal bar graphs, and pie charts. Each template are named according to the type of graph that they display. Graphs are created using [React Chart.js 2](https://reactchartjs.github.io/react-chartjs-2/#/).

####  [profileForm](https://github.com/Jijogeorge69/UnconsciousBiasSimulation/tree/refactored_Code/frontend/src/components/profileForm)
Displays the form for job seekers to create or edit presences. This is used in createProfile.jsx and in viewProfiles.jsx when the user is editing their profile.

#### [register](https://github.com/Jijogeorge69/UnconsciousBiasSimulation/tree/refactored_Code/frontend/src/components/register)
Displays the registration page of the application. 
####  [viewApplications](https://github.com/Jijogeorge69/UnconsciousBiasSimulation/tree/refactored_Code/frontend/src/components/viewApplications)
Displays the page where HR professionals view applications one by one to accept or reject them.

#### [viewProfile](https://github.com/Jijogeorge69/UnconsciousBiasSimulation/tree/refactored_Code/frontend/src/components/viewProfile)
- Profile.jsx: Displays a single profile. This component is used to display profiles in viewProfiles and viewApplications
- viewProfiles.jsx: Displays the page that shows job seekers all of their presences

Each folder also contains the files to test each component. These are the files with extension of .spec.js. Each test file is named exactly the same as the file that they are testing. 

## Defining the path of each page
The path to each page is defined in [src/index.js](https://github.com/Jijogeorge69/UnconsciousBiasSimulation/blob/refactored_Code/frontend/src/index.js). Each component that corresponds to a page to be displayed under a certain URL is imported in this file. Each route is defined in the Router with the URL defined in path. 

# Image Classifier
The images provided for each presence is tagged using AWS and custom image classifier models. Custom models were created to classify features that AWS did not have. The custom models were created by referencing Tanishq Gautam's [Create your Own Image Classification Model using Python and Keras](https://www.analyticsvidhya.com/blog/2020/10/create-image-classification-model-python-keras/).

### Dependencies
These are the dependencies that have to be installed with python 3
- tensorflow 2
- scikit-image
- sklearn
- Pillow

### Training the model

The model is trained using train.py. This currently trains and saves a model to classify an image between two labels. To use the training file, the following should be defined:
- SAVED_MODEL_NAME: name of the saved model at the end of training. This is an h5 file.
- TRAIN_DIR: directory pointing to the training data
- TEST_DIR: directory pointing to the test data
- labels: array containing the two labels that the model will classify an image to

#### Training data
The data for each model is current saved in a file structure such that the train and test data are found in separate folders. The data is separated in the 80/20 split that image classification training usually applies. This pertains to the train folder containing 80% of the dataset and the test folder containing 20% of the dataset. For example, if a dataset contains 100 images, the train folder would have 80 images and the test folder would have 20 images.

#### Using the model
The model can be loaded and ran using Load_Model.py. To use the loading file, the following should be defined:
- MODEL_DIR: the directory and name of the model
- IMAGE_DIR: the directory and name of the image
- labels: array containing the two labels that the model will classify an image to

This file will print the label that the model classifies the image as.

### Existing Models
The project currently has two trained models. 
- Hair_Model: classifies if the person in the image has short or long hair
- Background_Location_Model: classifies if the person in the image is indoor or outdoor

The model is currently limited to classifying images between two labels at a time, which is why there are two trained models for hair and background location.

Datasets for the models created were sourced from Kaggle.


### Model Deployment
We deployed our locally trained models on [Algorithmia](https://algorithmia.com/developers/model-deployment)  which allows us to get passed the performance bottleneck that was present when loading and running models on Heroku.

- This video by Algorithmia provides a step-by-step guide to model deployment:
https://www.youtube.com/watch?v=NLq2gFhoMvI

In order to follow through you will need an account on Algorithmia to have access to an API key as well as downloading the python Algorithmia package.

The source code we used for the algorithm that we published on Algorithmia to load and utilize the models can be found in the local image classifier folder  named Algorithmia_Source_Code.py.

