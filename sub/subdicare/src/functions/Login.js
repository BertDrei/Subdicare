export const handleLogin = async (email, password, navigate) => {
  if (!email || !password) {
      alert("Please enter both email and password.");
      return { success: false };
  }

  try {
      const response = await fetch("http://localhost:8080/subdicare_api/login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
      });

      // Check if the response is valid JSON
      let result;
      try {
          result = await response.json();
      } catch (e) {
          console.error("Invalid JSON response:", e);
          alert("Server error. Please try again later.");
          return { success: false };
      }

      console.log("Server Response:", result);

      if (result.success) {
          const { data } = result;

          if (data && data.id && data.name && data.table) {
              // Store user info in localStorage
              localStorage.setItem("user_id", data.id);
              localStorage.setItem("user_name", data.name);
              localStorage.setItem("user_table", data.table);

              // Welcome message
              alert(`Welcome, ${data.name}!`);

              // Navigate based on role
              switch (data.table) {
                  case "admin":
                      navigate("/admin", { replace: true });
                      break;
                  case "moderators":
                      navigate("/moderator", { replace: true });
                      break;
                  case "members":
                      navigate("/member", { replace: true });
                      break;
                  default:
                      alert("Unknown user role!");
                      break;
              }

              return { success: true, nextRoute: `/${data.table}/home` };
          } else {
              console.log("Invalid response data:", data);
              alert("Invalid response from server.");
          }
      } else {
          alert(result.message || "Invalid credentials.");
          console.log("Login failed:", result.message);
      }

      return { success: false };
  } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred during login.");
      return { success: false };
  }
};
