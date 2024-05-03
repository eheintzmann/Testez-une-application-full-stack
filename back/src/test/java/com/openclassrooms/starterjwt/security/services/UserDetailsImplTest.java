package com.openclassrooms.starterjwt.security.services;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class UserDetailsImplTest {

    UserDetailsImpl classUnderTest;

    @BeforeEach
    public void init() {
        classUnderTest = new UserDetailsImpl(
                1L,
                "jane@doe.com",
                "Jane",
                "Doe",
                false,
                "none"
        );
    }

    @AfterEach
    public void undefClassUnderTest() {
        classUnderTest = null;
    }

    @Test
    @Tag("UnitTest")
    void givenObject_whenEquals_thenReturnsTrue() {
        // GIVEN
        Object user = UserDetailsImpl.builder()
                .id(1L)
                .username("jane@doe.com")
                .lastName("Doe")
                .firstName("Jane")
                .admin(false)
                .password("none")
                .build();
        // WHEN
        boolean result = classUnderTest.equals(user);

        // THEN
        assertThat(result).isTrue();
    }

    @Test
    @Tag("UnitTest")
    void givenObject_whenEquals_thenReturnsFalse() {
        // GIVEN
        Object user = UserDetailsImpl.builder()
                .id(2L)
                .username("john@doe.com")
                .lastName("Doe")
                .firstName("John")
                .admin(false)
                .password("none")
                .build();
        // WHEN
        boolean result = classUnderTest.equals(user);

        // THEN
        assertThat(result).isFalse();
    }

}
