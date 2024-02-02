package com.openclassrooms.starterjwt.controllers;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class UserControllerSITest {

    @Autowired
    private MockMvc mockMvc;

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
    @DisplayName("Account : Invalid token")
    void givenInvalidToken_whenFindBy_theReturnUnauthorized() throws Exception {
        // GIVEN
        String invalidToken = "token";
        long id = 1;

        // WHEN
        mockMvc.perform(get("/api/user/" + id)
        // THEN
                .header("Authorization","Bearer " + invalidToken))
                .andExpect(status().isUnauthorized());
    }

}
