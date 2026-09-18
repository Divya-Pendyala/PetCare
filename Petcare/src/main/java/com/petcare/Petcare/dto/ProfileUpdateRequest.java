package com.petcare.Petcare.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ProfileUpdateRequest 
{
	@NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    private String email;

    private String profileImage;

    public ProfileUpdateRequest() {   }

    public String getName() 
    {
        return name;
    }

    public void setName(String name) 
    {
        this.name = name;
    }

    public String getEmail() 
    {
        return email;
    }

    public void setEmail(String email) 
    {
        this.email = email;
    }

    public String getProfileImage() 
    {
        return profileImage;
    }

    public void setProfileImage(String profileImage) 
    {
        this.profileImage = profileImage;
    }
}
