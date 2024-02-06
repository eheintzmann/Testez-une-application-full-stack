package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.security.jwt.JwtUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class UserControllerSystemIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Account : User")
    @WithMockUser("user@test.com")
    void givenUser_whenFindById_thenReturnsUser() throws Exception {
        // GIVEN
        long id = 2;

        // WHEN
        mockMvc.perform(get("/api/user/" + id))
        // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("user@test.com"))
                .andExpect(jsonPath("$.admin").value(false));

    }

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Account : Admin")
    @WithMockUser("admin@test.com")
    void givenUser_whenFindById_thenReturnsAdmin() throws Exception {
        // GIVEN
        long id = 1;

        // WHEN
        mockMvc.perform(get("/api/user/" + id))
                // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("admin@test.com"))
                .andExpect(jsonPath("$.admin").value(true));

    }

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Account : None")
    @WithMockUser("admin@test.com")
    void givenUser_whenFindById_thenReturnsError() throws Exception {
        // GIVEN
        long id = 3;

        // WHEN
        mockMvc.perform(get("/api/user/" + id))
        // THEN
                .andExpect(status().isNotFound());
    }

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Account : Malformed Token token")
    void givenMalformedToken_whenFindBy_theReturnUnauthorized() throws Exception {
        // GIVEN
        String malformedToken = "token";
        long id = 1;

        // WHEN
        mockMvc.perform(get("/api/user/" + id)
        // THEN
                .header("Authorization","Bearer " + malformedToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Account : Empty token")
    void givenEmptyToken_whenFindBy_theReturnUnauthorized() throws Exception {
        // GIVEN
        String emptyToken = "";
        long id = 1;

        // WHEN
        mockMvc.perform(get("/api/user/" + id)
        // THEN
                        .header("Authorization","Bearer " + emptyToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Account : Invalid token")
    void givenInvalidToken_whenFindBy_theReturnUnauthorized() throws Exception {
        // GIVEN
        String invalidToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg";
        long id = 1;

        // WHEN
        mockMvc.perform(get("/api/user/" + id)
        // THEN
                        .header("Authorization","Bearer " + invalidToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Account : Valid Token")
    void givenValidToken_whenFindBy_theReturnAdmin() throws Exception {
        // GIVEN
        long id = 1;
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("admin@test.com", "test!1234"));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtils.generateJwtToken(authentication);

        // WHEN
        mockMvc.perform(get("/api/user/" + id)
                        // THEN
                        .header("Authorization","Bearer " + token))
        // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("admin@test.com"))
                .andExpect(jsonPath("$.admin").value(true));
    }
}
