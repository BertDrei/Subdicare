export const handleSignup = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }
  
    if (!/^\+63\d{10}$/.test(formData.number)) {
      alert("Phone number must start with +63 and have exactly 10 digits.");
      return false;
    }
  
    const address = `Block ${formData.block}, Lot ${formData.lot}, Phase ${formData.phase}, Street ${formData.street}, ${formData.subdivision}`;
  
    const finalData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      middle_initial: formData.middleInitial,
      address,
      number: formData.number,
    };
  
    try {
      const response = await fetch("http://localhost:8080/subdicare_api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Sign-up successful!");
        return true;
      } else {
        alert(`Error: ${result.message}`);
        return false;
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
      return false;
    }
  };
  