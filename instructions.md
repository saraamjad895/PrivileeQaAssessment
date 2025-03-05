# How to execute

Follow these steps to get the project up and running on your local machine. Follow first 3 steps and all done :-) 

 

**1- Clone the repository:** 

git clone https://github.com/saraamjad895/PrivileeTask.git

cd PrivileeTask

 

**2- Install project dependencies:** 

npm install 

 

**3- Install Playwright Browsers:** 

npx playwright test 



**4- Install API Test cases:** 

newman run ./collections/collection.json


**5- Reports:** 

npx allure generate allure-results --clean -o allure-report

npx allure open allure-report
