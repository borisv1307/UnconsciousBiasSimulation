# Unconscious Bias Simulation [![Build Status](https://travis-ci.org/Jijogeorge69/UnconsciousBiasSimulation.svg?branch=master)](https://travis-ci.org/Jijogeorge69/UnconsciousBiasSimulation)

---
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Jijogeorge69_UnconsciousBiasSimulation)](https://sonarcloud.io/dashboard?id=Jijogeorge69_UnconsciousBiasSimulation)

## Introduction

All humans have unconscious biases, and those in human resources often undergo training to reveal them so they can consciously work on them. Job seekers make many choices when setting up their online profile and do not know how HR professionals will respond to it before there are consequences. This website serves both populations with a simulation..

## Requirements

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

-
- ***
- ***

## Architecture

![](images/Architecture.png)

---

## Setup

## Dependencies
1. Python 3.8
2. pip install -r requirements.txt
3. pip install pytest

```
Steps to install Python on windows: -
      •	https://www.howtogeek.com/197947/how-to-install-python-on-windows/
Steps to install Python on mac: -
      •	https://python.tutorials24x7.com/blog/how-to-install-python-3-9-on-mac
```

## Steps to run backend code

```
1. Clone git repository into your local.
   Command: - git clone https://github.com/Jijogeorge69/UnconsciousBiasSimulation.git
2. cd backend
3. python app.py
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

## Continuous Integration.
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

#  API LIST:
1. [REGISTRATION API](#REGISTRATION)
2. [LOGIN API](#LOGIN)
3. [VERIFY OTP](#VERIFY_OTP)
4. [RESEND OTP](#RESEND_OTP)
5. [LOGOUT](#LOGOUT)
6. [GET EMAIL DOMAIN COUNT](#GET_EMAIL_DOMAIN_COUNT)
7. [CREATE PROFILE](#CREATE_PROFILE)
8. [GET PROFILES](#GET_PROFILES)
9. 
10. 
11. [ADD PRESENCE](#ADD_PRESENCE)
12. [GET ALL PRESENCE BY REVIEWER ID ](#getAllPresence)
13. [SAVE PRESENCE REVIEW](#savePresenceReview)
14. [GET REVIEW COUNT BASED ON GENDER](#getCount)
15. [GET REVIEW COUNT BASED ON GENDER FOR BATCH](#getCountBatch)
16. [GET ACCEPTANCE RATE](#getAcceptanceRate)
17. [GET REVIEW COUNT BASED ON ETHNICITY FOR BATCH](#getCountEthnicity)
18. [GET REVIEW COUNT BASED ON ETHNICITY](#getCountByEthnicity)
19. [GET ALL BATCHES FOR A REVIEWER](#getAllBatches)
20. [GET TAGS COUNT FOR A BATCH](#batchesTagsCount)
21. [GET BATCH COUNT BASED ON AGE](#getCountByAge)


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

## GET ALL PRESENCE BY REVIEWERID
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

## SAVE PRESENCE REVIEW
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

## GET REVIEW COUNT BASED ON GENDER
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

## GET REVIEW COUNT BASED ON GENDER FOR BATCH
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

## GET ACCEPTANCE COUNT FOR JOB SEEKER
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

## GET REVIEW COUNT BASED ON ETHNICITY FOR BATCH
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


## GET REVIEW COUNT BASED ON ETHNICITY
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

## GET ALL BATCHES FOR A REVIEWER
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


## GET TAGS COUNT FOR A BATCH
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

## GET BATCH COUNT BASED ON AGE
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
