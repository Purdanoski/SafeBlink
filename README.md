<div align="center">
  <h1>SafeBlink</h1>
  <p>
  Single-page web application aimed at educating users about personal data protection and online safety. This was my second project for the Front-end development academy.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>  
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#build-with">Build with</a></li>
    <li><a href="#about-the-project">About</a></li>
    <li><a href="#description-of-project">Instructions</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<h2 id="build-with">Technologies Used</h2>

- ![HTML](https://img.shields.io/badge/-HTML5-e34c26?logo=html5&logoColor=white)
- ![CSS](https://img.shields.io/badge/-CSS3-264de4?logo=css3&logoColor=white)
- ![Bootstrap](https://img.shields.io/badge/-Bootstrap-533B78?logo=bootstrap&logoColor=white)
- ![Javascript](https://img.shields.io/badge/-Javascript-EFD81D?logo=javascript&logoColor=white)

<h2 id="about-the-project">About the Project</h2>

SafeBlink was my second project for the Front end development academy, a single page web application for SafeBlink. The goal of the organization is to educate us on topics of personal data protection and online safety. The design was already main and my job was using dummy data and vanila JavaScript to make it functional and responsive. Please refer to the instructions below.

<!-- - [Project 01 - Brainster Lab](https://git.brainster.co/Filip.Purdanoski-FE16/BrainsterChallenges_FilipPurdanoskiFE16/-/tree/Challenge-01-HTML)
- [Challenge 02 - CSS](https://git.brainster.co/Filip.Purdanoski-FE16/BrainsterChallenges_FilipPurdanoskiFE16/-/tree/Challenge-02-CSS-Intro)
- [Challenge 03 -CSS Flex](https://git.brainster.co/Filip.Purdanoski-FE16/BrainsterChallenges_FilipPurdanoskiFE16/-/tree/Challenge-03-CSS-Flex)
- [Challenge 04 -CSS Flex Sass](https://git.brainster.co/Filip.Purdanoski-FE16/BrainsterChallenges_FilipPurdanoskiFE16/-/tree/Challenge-04-CSS-Flex-SASS)
- [Challenge 05 -CSS Flex Git](https://git.brainster.co/Filip.Purdanoski-FE16/BrainsterChallenges_FilipPurdanoskiFE16/-/tree/Challenge-05-CSS-Flex-and-Git)
- [Challenge 06 -Git & GitLab](https://git.brainster.co/Filip.Purdanoski-FE16/BrainsterChallenges_FilipPurdanoskiFE16/-/tree/Challenge-06-Git-and-GitLab) -->

<h2 id="description-of-project">Project Instructions</h2>

1. <h3>Navigation within the app:</h3>

- With the lack of a home link on the design, I have used the logo of SafeBlink as link that can take you on the home page any time.
- Other links are functional as it should be.
- If a user is not logged in then the link to the profile page is hidden, when a user logins, the link shows up and the button "Најави се" changes to "Одјави се".
- The logo and the links in the footer are also functional

2. <h3>Login functionality:</h3>

- In order to enable the login functionality, you need to set up a simple REST API locally written in Python with the Flask library. For this, you need to have Python installed locally. The version which was used for developing the application is 3.12.3. After installing Python, you should download the
- [REST API](https://drive.google.com/file/d/1aMD9TNHF2sQYY9ijwUnJEUIlz4j-396c/view) locally and then run it by using the following CLI command in the directory where the extracted REST API directory is located:<br>
  <b>python '.\REST API\authenticator.py'</b><br>
  When you execute this command, if you get an error like “No module named ‘flask_cors’”, then you should install the flask library and/or the flask_cors by running the following CLI commands: <br>
  <b>pip install flask</b><br>
  <b>pip install flask_cors</b><br>
  and retry the python command from above.<br>
  Afterwards, you can use the REST API for authenticating.
- The default users are:
  1. First user<br>
     Username: User123<br>
     Password: Pass123
  2. Second user<br>
     Username: User456<br>
     Password: Pass456
  3. Third user<br>
     Username: User789<br>
     Password: Pass789

3. <h3>App functionality and usage</h3>

- In order the app to work properly please use Live Server extension in VSCode when opening the index.html file. If you do not want to install Live Server, there are several other ways you can serve your index.html file and achieve a similar result and these are few of them:
  1. Use Python's Built-In HTTP Server, If you have Python installed, you can start a server with the following command in your terminal: <br>
     <b>python -m http.server 5500</b><br>
     or
     <b>python -m SimpleHTTPServer 5500</b><br>
  2. Use Node.js with HTTP-Server, If you have Node.js installed, you can use the http-server package to serve your files, use the following command in your terminal: <br>
     Install http-server globally (if you haven't already): <b>npm install -g http-server</b><br>
     Navigate to your project directory and start the server: <b>http-server -p 5500</b><br>
  3. Use NPM's Serve Package which is a simple static file server built with Node.js, use the following command in your terminal: <br>
     Install serve globally: <b>npm install -g serve</b><br>
     Serve your project directory: <b>serve -l 5500</b><br>
- In the Profile page there are badges that will appear depending on the user activity, for example if a user post an experience on the Discussion page a badge
  "Active in discussion" will appear on his profile page, also if a user opens at least 5 card modals on the Information page a badge "Watched five" will appear on his profile page.
- Comments made by users on videos or in discussions are saved in local storage and will stay permanently visible for everyone (until clearing local storage).

<h2 id="contact">Contact</h2>

- Email: purdanoski@yahoo.com
- Telephone: 076/302-724
- GitLab profile: <a href="https://gitlab.com/Purdanoski">https://gitlab.com/Purdanoski</a>
- Github profile: <a href="https://github.com/Purdanoski">https://github.com/Purdanoski</a>
- LinkedIn profile: <a href="https://www.linkedin.com/in/filip-purdanoski-3b1b2a2a1">https://www.linkedin.com/in/filip-purdanoski-3b1b2a2a1</a>

<!-- # BrainsterChallenges_FilipPurdanoskiFE16

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://git.brainster.co/Filip.Purdanoski-FE16/BrainsterChallenges_FilipPurdanoskiFE16.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://git.brainster.co/Filip.Purdanoski-FE16/BrainsterChallenges_FilipPurdanoskiFE16/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

---

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name

Choose a self-explaining name for your project.

## Description

Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges

On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals

Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation

Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage

Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support

Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap

If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing

State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment

Show your appreciation to those who have contributed to the project.

## License

For open source projects, say how it is licensed.

## Project status

If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers. -->
