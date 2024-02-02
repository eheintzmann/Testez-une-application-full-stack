package com.openclassrooms.starterjwt.controllers;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @Tag("Integration")
    @DisplayName("Login : successful user connection")
    void givenALoginRequest_whenLogin_thenReturnsAJwtToken() throws Exception {
        // GIVEN
        String jsonLoginRequest = "{\"email\": \"user@test.com\", \"password\": \"test!1234\"}";

        // WHEN
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonLoginRequest))
        // THEN

                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.admin").value(false));
    }

    @Test
    @Tag("Integration")
    @DisplayName("Login : successful admin connection")
    void givenAnAdminLoginRequest_whenLogin_thenReturnsAJwtToken() throws Exception {
        // GIVEN
        String jsonAdminLoginRequest = "{\"email\": \"admin@test.com\", \"password\": \"test!1234\"}";

        // WHEN
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonAdminLoginRequest))
        // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.admin").value(true));
    }

    @Test
    @Tag("Integration")
    @DisplayName("Login : connection error")
    void givenALoginRequest_whenLogin_thenReturnsUnauthorized() throws Exception {
        // GIVEN
        String jsonLoginRequest = "{\"email\": \"anonymous@test.com\", \"password\": \"test!1234\"}";

        // WHEN
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonLoginRequest))
        // THEN
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Bad credentials"));
    }

    @Test
    @Tag("Integration")
    @DisplayName("Register : successful account creation")
    void givenASignupRequest_whenRegister_thenReturnsOK() throws Exception {
        // GIVEN
        String jsonSignUpRequest = "{\"email\": \"newuser@test.com\", "
                + "\"firstName\": \"newuser\", "
                + "\"lastName\": \"newuser\", "
                + "\"password\": \"test!1234\"}";

        // WHEN
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonSignUpRequest))
        // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User registered successfully!"));
    }

    @Test
    @Tag("Integration")
    @DisplayName("Register : already existing user")
    void givenASignupRequest_whenRegister_thenReturnsError() throws Exception {
        // GIVEN
        String jsonSignUpRequest = "{\"email\": \"user@test.com\", "
                + "\"firstName\": \"user\", "
                + "\"lastName\": \"user\", "
                + "\"password\": \"test!1234\"}";

        // WHEN
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonSignUpRequest))
        // THEN
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Error: Email is already taken!"));
    }

    @Test
    @Tag("Integration")
    @DisplayName("Register : invalid email")
    void givenAnInvalidSignupRequest_whenRegister_thenReturnsBadRequest() throws Exception {
        // GIVEN
        String jsonSignUpRequest = "{\"email\": \"user@\", "
                + "\"firstName\": \"user\", "
                + "\"lastName\": \"user\", "
                + "\"password\": \"test!1234\"}";

        // WHEN
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonSignUpRequest))
        // THEN
                .andExpect(status().isBadRequest());
    }
}
