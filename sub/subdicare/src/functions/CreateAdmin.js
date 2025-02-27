const handleCreateAdmin = async () => {
    const response = await fetch("http://localhost:8080/subdicare_api/create_admin.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin1",
        email: "admin1@example.com",
        password: "securepassword123",
      }),
    });
    const data = await response.json();
    console.log("Admin Response:", data);
  };

  const handleCreateModerator = async () => {
    const response = await fetch("http://localhost:8080/subdicare_api/create_moderator.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "moderator1",
        email: "moderator1@example.com",
        password: "securepassword123",
      }),
    });
    const data = await response.json();
    console.log("Moderator Response:", data);
  };
