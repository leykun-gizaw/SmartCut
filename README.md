![SmartCut](/frontend/assets/smartcut_logo.png)
# Introduction
SmartCut is a software that is able to take data from a cutlist provided by a user by means of common spreadsheet formats. It will analyze and report the best way to cut 1D structural members so as to reduce waste. It will utilize a mathematical method called Linear Programming (Linear Optimization) to achieve this.

# Technologies
We used [Eel](https://github.com/ChrisKnott/Eel) a python library which is light-weight Electronjs look alike to work on the front-end and the backend is handled by python and C++ libraries.

# Challenge
Coming from the background of mechanical engineering, we have worked on designing steel structures using softwares like [SolidWorks](https://www.solidworks.com/). SolidWorks is a great software to design and analyze components but is not equipped with the capability to optimize manufacturing. That is the job of the site engineer. In our work there is a constant need of efficiency to try to minimize any wastage of resources that arise due to poor execution of the manufacturing process. Structural steel members are no exception.
A company can either buy those members on-demand or have a stock of them. These members come in standard lengths from the factory so need arises to cut them into lengths required by the project. If done without any optimization, there will be lots of wastages. This is where SmartCut comes in.
SmartCut will use Linear optimization to increase the number of cuts from a single standard member while minimizing wastage. SmartCut will take the output from SolidWorks (which is various lengths required for a project in a specific format) and create a cut plan as well as the amount of stock required to perform the project.
Although SmartCut will perform one dimensional cut optimization that is not the only thing required to be optimized in a project. There usually exists a need to optimize cuts on sheet metals as well. That is beyond the scope of SmartCut at this time but it can be a feature in future iterations.

# Risks
# Infrastructure
# Existing Solutions
# Architecture
# Data Model

Portfolio Project for ALX (Holberton) Foundations.
