function initializeForm() {
    console.log("Initializing form...");
    
    const user = document.getElementById("user");
    const pass = document.getElementById("pass");
    const submitBtn = document.getElementById("submitBtn");

    console.log("User element:", user);
    console.log("Pass element:", pass);
    console.log("Submit button element:", submitBtn);

    submitBtn.addEventListener("click", async () => {
        console.log("Submit button clicked");

        const email = user.value;
        const password = pass.value;

        console.log("Email:", email);
        console.log("Password:", password);

        // Check if email and password are provided
        if (!email.trim() || !password.trim()) {
            console.error("Email and password are required");
            return;
        }

        try {
            const response = await fetch("/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                console.log("Form submitted successfully");
            } else {
                console.error("Form submission failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeForm);
