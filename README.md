# quartz.gg

An advanced Tampermonkey script designed to autonomously solve math problems on the Kwyk platform using the power of Google's Gemini AI. With a sleek and modern user interface, quartz.gg provides a seamless experience for automated problem-solving.

### ⚠️ **Disclaimer** ⚠️

**quartz.gg is intended for educational and demonstrative purposes only.** Using this tool may violate the terms of service of the Kwyk platform, potentially leading to account suspension or other penalties. Use at your own risk.

---

### ✨ **Features**

* **AI-Powered Solving**: Leverages the Gemini API to analyze math problems from screenshots and provide accurate solutions.
* **Screenshot Integration**: Captures problem screenshots directly from the Kwyk platform, no manual saving or uploading required.
* **One-Click Auto-Solve**: Automatically fills in the correct answer fields with a single click after a successful solve.
* **Sleek & Modern UI**: A minimalist, non-intrusive user interface built to feel native and intuitive.
* **Easy Installation**: Deploys as a simple Tampermonkey script, with no complex setup.

---

### ⚙️ **How It Works**

1.  **Capture**: The script detects a math problem on the Kwyk platform.
2.  **Analyze**: On user command, it takes a screenshot of the problem area and sends it, along with a text prompt, to the Gemini AI API.
3.  **Solve**: The Gemini AI analyzes the image and returns the computed solution.
4.  **Inject**: The solution is automatically populated into the appropriate answer field on the webpage.

---

### 🚀 **Getting Started**

### **Requirements**

* A **Google Account**
* A **Gemini API key**
* A **Stable Connexion**
* Obviously **the archive**
* A modern web browser (like Chrome or Firefox)
* The **Tampermonkey** browser extension
* The **`quartz.gg` script**

### **Installation**

1.  Open the Tampermonkey dashboard, then click the "+" tab to create a new script.
2.  Copy the entire content of the `quartz.gg.js` script, including the requirements listed above, and paste it into the new script editor.
3.  Click the save icon to save and enable the script.

### **Usage**

1.  Navigate to the Kwyk platform.
2.  The first time the script runs, a prompt will appear asking for your personal **Gemini API key**. Enter the key and click "Save."
3.  A small button or UI element will appear on the Kwyk page. Click this to activate the solver and automatically solve the current problem.

---

### 🤝 **Contributing**

Contributions are welcome! If you find a bug or have a feature suggestion, please open an issue or submit a pull request.

---

### 📄 **License**

This project is licensed under the GNU Public License - see the `LICENSE` file for details.
