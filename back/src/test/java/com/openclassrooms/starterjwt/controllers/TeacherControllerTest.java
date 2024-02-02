package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.TeacherService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TeacherControllerTest {

    @Mock
    TeacherService mockTeacherService;

    @Mock
    TeacherMapper mockTeacherMapper;

    @Mock
    Teacher mockTeacher;

    @Mock
    TeacherDto mockTeacherDto;

    @Mock
    List<Teacher> mockTeacherList;

    @Mock
    List<TeacherDto> mockTeacherDtoList;

    TeacherController classUnderTest;

    @BeforeEach
    public void init() {
        classUnderTest = new TeacherController(mockTeacherService, mockTeacherMapper);
    }

    @AfterEach
    public void undefClassUnderTest() {
        classUnderTest = null;
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenFindById_thenReturnsTeacher() {
        // GIVEN
        long id = 1;
        when(this.mockTeacherService.findById(id)).thenReturn(mockTeacher);
        when(this.mockTeacherMapper.toDto(mockTeacher)).thenReturn(mockTeacherDto);

        // WHEN
        ResponseEntity<?> result = classUnderTest.findById(String.valueOf(id));

        // THEN
        verify(mockTeacherService, times(1)).findById(id);
        verify(mockTeacherMapper, times(1)).toDto(mockTeacher);
        assertThat(result).isEqualTo(ResponseEntity.ok().body(mockTeacherDto));
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenFindById_thenReturnsNotFound() {
        // GIVEN
        long id = 1;
        when(this.mockTeacherService.findById(id)).thenReturn(null);

        // WHEN
        ResponseEntity<?> result = classUnderTest.findById(String.valueOf(id));

        // THEN
        verify(mockTeacherService, times(1)).findById(id);
        verify(mockTeacherMapper, times(0)).toDto(any(Teacher.class));
        assertThat(result).isEqualTo(ResponseEntity.notFound().build());
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenFindById_thenReturnsBadRequest() {
        // GIVEN
        String id = "NotANumber";

        // WHEN
        ResponseEntity<?> result = classUnderTest.findById(id);

        // THEN
        verify(mockTeacherService, times(0)).findById(anyLong());
        verify(mockTeacherMapper, times(0)).toDto(any(Teacher.class));
        assertThat(result).isEqualTo(ResponseEntity.badRequest().build());
    }

    @Test
    @Tag("UnitTest")
    void whenFindAll_thenReturnsTeachersList() {
        // GIVEN
        when(mockTeacherService.findAll()).thenReturn(mockTeacherList);
        when(mockTeacherMapper.toDto(mockTeacherList)).thenReturn(mockTeacherDtoList);

        // WHEN
        ResponseEntity<?> result = classUnderTest.findAll();

        // THEN
        verify(mockTeacherService, times(1)).findAll();
        verify(mockTeacherMapper, times(1)).toDto(mockTeacherList);
        assertThat(result).isEqualTo(ResponseEntity.ok().body(mockTeacherDtoList));
    }
}
