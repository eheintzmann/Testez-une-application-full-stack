package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository mockUserRepository;

    @Mock
    private User mockUser;

    private UserService classUnderTest;

    @BeforeEach
    public void init() {
        classUnderTest = new UserService(mockUserRepository);
    }

    @AfterEach
    public void undefClassUnderTest() {
        classUnderTest = null;
    }

    @Test
    void givenId_whenFindById_thenReturnsUser() {
        // GIVEN
        long id = 1;
        when(mockUserRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        // WHEN
        User result = classUnderTest.findById(id);

        // THEN
        verify(mockUserRepository, times(1)).findById(1L);
        assertThat(result).isEqualTo(mockUser);
    }

    @Test
    void givenId_whenFindById_thenReturnsNull() {
        // GIVEN
        long id = 0;
        when(mockUserRepository.findById(0L)).thenReturn(Optional.empty());

        // WHEN
        User result = classUnderTest.findById(id);

        // THEN
        verify(mockUserRepository, times(1)).findById(0L);
        assertThat(result).isNull();
    }

    @Test
    void givenId_whenDelete_thenReturnsVoid() {
        // GIVEN
        long id = 1;
        doNothing().when(mockUserRepository).deleteById(1L);

        // WHEN
        classUnderTest.delete(id);

        // THEN
        verify(mockUserRepository, times(1)).deleteById(1L);
    }
}
