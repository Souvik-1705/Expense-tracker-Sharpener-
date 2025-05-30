import React from 'react';
import { useState,useEffect } from 'react';
import { updateProfile } from "firebase/auth"; 
import { auth } from '../Firebase';
import "../styles/CompleteProfile.css";

function CompleteProfile() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    const fetchProfile = async () => {
      const idToken = await auth.currentUser.getIdToken();
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCDmXL7rGHKZqsGV4syUI5r8qYfEkpoSZg",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: idToken,
            }),
          }
        );

        const data = await res.json();
        if (data && data.users && data.users.length > 0) {
          const user = data.users[0];
          setName(user.displayName || "");
          setPhotoUrl(user.photoUrl || "");
        }
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !photoUrl) {
      setError("All fields are required.");
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl,
      });
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError("Failed to update profile: " + err.message);
    }
  };

  return (
    <div className='profile-form-container'>
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleUpdate}>
            <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}/>
          <input
          type="text"
          placeholder="Profile Photo URL"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
           <button type="submit">Update</button>
        </form>
          {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
    </div>
  )
}

export default CompleteProfile;