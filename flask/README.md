### Testing the Flask Version

If you want to test the original version of the project built with Flask, follow these steps:

> [!TIP]
> I recommend installing Pyenv to manage your Python versions easily.

```bash
# Install pyenv
curl https://pyenv.run | bash

# Add pyenv to bash so that it loads every time you open a terminal
echo -e '\n# Pyenv\nexport PATH="$HOME/.pyenv/bin:$PATH"\neval "$(pyenv init --path)"\neval "$(pyenv init -)"' >> ~/.bashrc

# Reload your shell configuration
source ~/.bashrc

# Check the version of pyenv installed
pyenv --version

# Install the latest stable version of Python
pyenv install 3.11.4

# Set the installed version as the default globally
pyenv global 3.11.4

# Verify the version of Python installed
python --version
```

### Prerequisites

> [!IMPORTANT]
> **Python:** Ensure that you have Python installed on your system using `pyenv` or another version manager.
> **Pip:** Ensure that `pip`, Python's package manager, is installed and up to date.

1. **Create a virtual environment:**

It's recommended to create a virtual environment to isolate your Python dependencies. Use the following commands:

```bash
# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

2. **Install the Flask dependencies:**

With your virtual environment activated, install the required dependencies using the `requirements.txt` file:

```bash
pip install -r flask/requirements.txt
```

If the `requirements.txt` file doesn't exist yet, you can create it by listing the necessary dependencies as mentioned earlier.

3. **Run the Flask application:**

Once the dependencies are installed, start the Flask server:

```bash
python app.py
```

The application should now be running locally on `http://127.0.0.1:5000/`.

4. **Access the Flask app:**

Open your web browser and go to `http://127.0.0.1:5000/` to interact with the Flask version of the chatbot.

> [!TIP]
> This will start the original Flask version of the chatbot as it was before being refactored to Node.js.


