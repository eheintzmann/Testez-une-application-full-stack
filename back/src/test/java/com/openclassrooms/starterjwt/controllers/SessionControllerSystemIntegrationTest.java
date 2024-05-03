package com.openclassrooms.starterjwt.controllers;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class SessionControllerSystemIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Session : Get by id")
    @WithMockUser("user@test.com")
    void givenId_whenFindById_thenReturnsSession() throws Exception {
        // GIVEN
        long id = 1;

        // WHEN
        mockMvc.perform(get("/api/session/" + id))
        // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Session1"));
    }

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Session : List")
    @WithMockUser("user@test.com")
    void whenFindAll_thenReturnsSessionList() throws Exception {
        // WHEN
        mockMvc.perform(get("/api/session"))
        // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].id").value("1"))
                .andExpect(jsonPath("$.[0].name").value("Session1"))
                .andExpect(jsonPath("$.[1].id").value("2"))
                .andExpect(jsonPath("$.[1].name").value("Session2"));
    }

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Session : create")
    @WithMockUser("admin@test.com")
    void givenALoginRequest_whenLogin_thenReturnsSessionDto() throws Exception {
        // GIVEN
        String jsonSession = "{\"name\": \"NewSession\", \"date\": \"2001-01-01\", \"teacher_id\": 1, \"description\": \"New Session\", \"users\" : [2]}";


        // WHEN
        mockMvc.perform(post("/api/session")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonSession))
                // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.name").value("NewSession"));
    }

}
