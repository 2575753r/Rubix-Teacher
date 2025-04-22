# Rubik's Teacher - Description

An interactive web application designed to teach beginners how to solve the Rubik’s Cube using the layer-by-layer (beginner) method. 
It combines real-time 3D animations, guided instructions, and algorithm visualization to help users learn step-by-step.

---

#  Features

- Beginner method algorithm solver
- Step-by-step solution playback
- Animated 3D Rubik’s Cube using Three.js
- Real-time 2D cube view
- Cube input tool and scrambler
- Instructional content for each solving stage
- Keyboard controls and playback navigation

---

# Installation

# Prerequisite System Requirements

- Node.js (vXX+)
- Python 3.x
- Flask
- npm 

Setup Instructions


# Clone the repository
git clone https://github.com/2575753r/rubiks-teacher.git
cd rubiks-teacher

# Frontend and backend must be configured seperately

# Frontend - React

# Open a terminal and cd into the projects root directory 'Rubiks-Teacher'
cd ../Rubiks-Teacher

# Install front-end dependencies
npm install

# Start the React development server
npm start

# Backend - Flask

# In another terminal, cd into the 'flaskBackend' directory with the projects root  and 
# setup the backend Flask environment

cd ../Rubiks-Teacher/flaskBackend

# Create a virtual environement 

# On macOS/Linux
python3 -m venv venv

# On Windows
python -m venv venv

# Activate it within the terminal

# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate

# Now install requirements
pip install -r requirements.txt

# After successfull installation, run the flask server using
flask run

