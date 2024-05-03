package com.openclassrooms.starterjwt.controllers;

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
class TeacherControllerSystemIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Teacher : Get by id")
    @WithMockUser("user@test.com")
    void givenId_whenFindById_thenReturnsTeacherDto() throws Exception {
        // GIVEN
        long id = 1;

        // WHEN
        mockMvc.perform(get("/api/teacher/" + id))
        // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.lastName").value("Teacher1"));
    }

    @Test
    @Tag("IntegrationTest")
    @DisplayName("Session : List")
    @WithMockUser("user@test.com")
    void whenFindAll_thenReturnsTeacherList() throws Exception {
        // WHEN
        mockMvc.perform(get("/api/teacher"))
        // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].id").value("1"))
                .andExpect(jsonPath("$.[0].lastName").value("Teacher1"))
                .andExpect(jsonPath("$.[1].id").value("2"))
                .andExpect(jsonPath("$.[1].lastName").value("Teacher2"));
    }

}
