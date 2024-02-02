package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.mapper.UserMapper;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    User mockUser;

    @Mock
    UserDto mockUserDto;

    @Mock
    UserService mockUserService;

    @Mock
    UserMapper mockUserMapper;

    @Mock
    UserDetails mockUserDetails;

    @Mock
    SecurityContext mockSecurityContext;

    @Mock
    Authentication mockAuthentification;

    UserController classUnderTest;

    @BeforeEach
    public void init() {
        classUnderTest = new UserController(mockUserService, mockUserMapper);
    }

    @AfterEach
    public void undefClassUnderTest() {
        classUnderTest = null;
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenFindById_thenReturnsUser() {
        // GIVEN
        String id = "1";
        when(this.mockUserService.findById(1L)).thenReturn(mockUser);
        when(this.mockUserMapper.toDto(mockUser)).thenReturn(mockUserDto);

        // WHEN
        ResponseEntity<?> result = classUnderTest.findById(id);

        // THEN
        verify(this.mockUserService, times(1)).findById(1L);
        verify(this.mockUserMapper, times(1)).toDto(mockUser);
        assertThat(result).isEqualTo(ResponseEntity.ok().body(mockUserDto));
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenFindById_thenReturnsNotFound() {
        // GIVEN
        String id = "0";
        when(this.mockUserService.findById(0L)).thenReturn(null);

        // WHEN
        ResponseEntity<?> result = classUnderTest.findById(id);

        // THEN
        verify(this.mockUserService, times(1)).findById(0L);
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
        verify(this.mockUserService, times(0)).findById(anyLong());
        assertThat(result).isEqualTo(ResponseEntity.badRequest().build());
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenSave_thenDeleteUser() {
        // GIVEN
        String id = "1";
        when(this.mockUserService.findById(1L)).thenReturn(mockUser);
        doNothing().when(this.mockUserService).delete(1L);
        try (MockedStatic<SecurityContextHolder> mockSecurityContextHolder = mockStatic(SecurityContextHolder.class)) {
            mockSecurityContextHolder.when(SecurityContextHolder::getContext).thenReturn(mockSecurityContext);

            when(mockSecurityContext.getAuthentication()).thenReturn(mockAuthentification);
            when(mockAuthentification.getPrincipal()).thenReturn(mockUserDetails);

            when(mockUserDetails.getUsername()).thenReturn("username");
            when(mockUser.getEmail()).thenReturn("username");

            // WHEN
            ResponseEntity<?> result = classUnderTest.save(id);

            // THEN
            verify(this.mockUserService, times(1)).delete(1L);
            assertThat(result).isEqualTo(ResponseEntity.ok().build());
        }
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenSave_thenReturnsNotFound() {
        // GIVEN
        String id = "0";
        when(this.mockUserService.findById(0L)).thenReturn(null);

        // WHEN
        ResponseEntity<?> result = classUnderTest.save(id);

        // THEN
        verify(this.mockUserService, times(0)).delete(0L);
        assertThat(result).isEqualTo(ResponseEntity.notFound().build());
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenSave_thenReturnsBadRequest() {
        // GIVEN
        String id = "NotANumber";

        // WHEN
        ResponseEntity<?> result = classUnderTest.save(id);

        // THEN
        verify(this.mockUserService, times(0)).delete(anyLong());
        assertThat(result).isEqualTo(ResponseEntity.badRequest().build());
    }

}
