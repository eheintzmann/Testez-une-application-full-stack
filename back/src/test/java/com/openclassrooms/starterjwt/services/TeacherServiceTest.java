package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TeacherServiceTest {
    @Mock
    private TeacherRepository mockTeacherRepository;

    @Mock
    private Teacher mockTeacher;

    @Mock
    private List<Teacher> mockTeachers;

    private TeacherService classUnderTest;

    @BeforeEach
    public void init() {
        classUnderTest = new TeacherService(mockTeacherRepository);
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
        when(mockTeacherRepository.findById(1L)).thenReturn(Optional.of(mockTeacher));

        // WHEN
        Teacher result = classUnderTest.findById(id);

        // THEN
        verify(mockTeacherRepository, times(1)).findById(1L);
        assertThat(result).isEqualTo(mockTeacher);
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenFindById_thenReturnsNull() {
        // GIVEN
        long id = 0;
        when(mockTeacherRepository.findById(0L)).thenReturn(Optional.empty());

        // WHEN
        Teacher result = classUnderTest.findById(id);

        // THEN
        verify(mockTeacherRepository, times(1)).findById(0L);
        assertThat(result).isNull();
    }

    @Test
    @Tag("UnitTest")
    void whenFindAll_thenReturnsTeachers() {
        // GIVEN
        when(mockTeacherRepository.findAll()).thenReturn(mockTeachers);

        // WHEN
        List<Teacher> result = classUnderTest.findAll();

        // THEN
        verify(mockTeacherRepository, times(1)).findAll();
        assertThat(result).isEqualTo(mockTeachers);
    }
}
