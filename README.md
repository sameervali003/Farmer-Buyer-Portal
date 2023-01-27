# FarmEasy

The main goal of the project is to provide utilitarian services, which can make them more productive, like detecting diseases, and to create a platform where farmers can share their resources with their peers



## Local Installation

1. Clone the repository.

2. If you are using nvm, run `nvm use` to use the version of Node from the .nvmrc file.

3. Install dependencies: `npm install`.

4. `cd server` and `npm install` to set up backend server. Copy `.env.template` to `.env` and edit the environment variables in */server*.

5. `cd flask` and create a virtual evironment with the help of this command `virtualenv venv`.

6. `source venv/bin/activate` this will activate virtual environment.

7. Install dependencies `pip install flask torch torchvision`

8. Start up the flask using the command `python app.py` in */flask*.

9. Start up the server using the command `node main` in */server*.

10. Start up the client app using `npm start` from root.

## Description about folders

1. `flask` folder contains model and plant disease detection code

2. `server` folder contains `mongodb` database for sell and share features of our application

3. `src` folder contains user interface of our application


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

