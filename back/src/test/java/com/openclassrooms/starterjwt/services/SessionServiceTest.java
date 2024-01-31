package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SessionServiceTest {

    @Mock
    private SessionRepository mockSessionRepository;

    @Mock
    private UserRepository mockUserRepository;

    @Mock
    private Session mockSession;

    @Mock
    private List<Session> mockSessions;

    @Mock
    private User mockUser;

    @Mock
    private List<User> mockUsers;

    @Mock
    private Stream<User> mockUserStream;

    private SessionService classUnderTest;

    @BeforeEach
    public void init() {
        classUnderTest = new SessionService(
                mockSessionRepository,
                mockUserRepository
        );
    }

    @AfterEach
    public void undefClassUnderTest() {
        classUnderTest = null;
    }

    @Test
    void givenSession_whenSave_thenReturnsSession() {
        //GIVEN
        when(mockSessionRepository.save(mockSession)).thenReturn(mockSession);

        //WHEN
        Session result = classUnderTest.create(mockSession);

        //THEN
        verify(mockSessionRepository, times(1)).save(mockSession);
        assertThat(result).isEqualTo(mockSession);
    }

    @Test
    void givenId_whenDelete_thenReturnsVoid() {
        // GIVEN
        long id = 1;
        doNothing().when(mockSessionRepository).deleteById(1L);

        // WHEN
        classUnderTest.delete(id);

        // THEN
        verify(mockSessionRepository, times(1)).deleteById(1L);
    }

    @Test
    void whenFindAll_thenReturnsSessions() {
        // GIVEN
        when(mockSessionRepository.findAll()).thenReturn(mockSessions);

        // WHEN
        List<Session> result = classUnderTest.findAll();

        // THEN
        verify(mockSessionRepository, times(1)).findAll();
        assertThat(result).isEqualTo(mockSessions);
    }

    @Test
    void givenId_whenGetById_thenReturnsSession() {
        // GIVEN
        long id = 1;
        when(mockSessionRepository.findById(1L)).thenReturn(Optional.of(mockSession));

        // WHEN
        Session result = classUnderTest.getById(id);

        // THEN
        verify(mockSessionRepository, times(1)).findById(1L);
        assertThat(result).isEqualTo(mockSession);
    }

    @Test
    void givenId_whenGetById_thenReturnsNull() {
        // GIVEN
        long id = 0;
        when(mockSessionRepository.findById(0L)).thenReturn(Optional.empty());

        //WHEN
        Session result = classUnderTest.getById(id);

        // THEN
        verify(mockSessionRepository, times(1)).findById(0L);
        assertThat(result).isNull();

    }

    @Test
    void givenIdAndUserId_whenParticipate_thenParticipate() {
        // GIVEN
        long id = 1;
        long userId = 1;
        when(mockSessionRepository.findById(1L)).thenReturn(Optional.of(mockSession));
        when(mockUserRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(mockSessionRepository.save(mockSession)).thenReturn(mockSession);

        // WHEN
        classUnderTest.participate(id, userId);

        // THEN
        verify(mockSessionRepository, times(1)).save(mockSession);
    }

    @Test
    void givenInvalidId_whenParticipate_ThrowNotFoundException() {
        // GIVEN
        long id = 0;
        long userId = 1;
        when(mockSessionRepository.findById(0L)).thenReturn(Optional.empty());

        // WHEN
        assertThrows(NotFoundException.class, () -> classUnderTest.participate(id, userId));

        // THEN
        verify(mockSessionRepository, times(1)).findById(0L);
    }

    @Test
    void givenInvalidUserId_whenParticipate_ThrowNotFoundException() {
        // GIVEN
        long id = 1;
        long userId = 0;
        when(mockSessionRepository.findById(1L)).thenReturn(Optional.of(mockSession));
        when(mockUserRepository.findById(0L)).thenReturn(Optional.empty());

        // WHEN
        assertThrows(NotFoundException.class, () -> classUnderTest.participate(id, userId));

        // THEN
        verify(mockSessionRepository, times(1)).findById(1L);
        verify(mockUserRepository, times(1)).findById(0L);
    }

    @Test
    void givenIdAndUserId_whenNoLongerParticipate_thenNoLongerParticipate() {
        // GIVEN
        long id = 1;
        long userId = 1;
        when(mockSessionRepository.findById(1L)).thenReturn(Optional.of(mockSession));
        when(mockSession.getUsers()).thenReturn(mockUsers);
        when(mockUsers.stream()).thenReturn(mockUserStream);
        when(mockUserStream.anyMatch(any())).thenReturn(true);

        // WHEN
        classUnderTest.noLongerParticipate(id, userId);

        // THEN
        verify(mockSessionRepository, times(1)).save(mockSession);
    }

    @Test
    void givenIdAndUserId_whenNoLongerParticipate_ThrowBadRequestException() {
        // GIVEN
        long id = 1;
        when(mockSessionRepository.findById(1L)).thenReturn(Optional.of(mockSession));

        // WHEN
        assertThrows(BadRequestException.class, () -> classUnderTest.noLongerParticipate(id, 0L));
    }

    @Test
    void givenInvalidId_whenNoLongerParticipate_ThrowNotFoundException() {
        // GIVEN
        long id = 0;
        long userId = 1;
        when(mockSessionRepository.findById(0L)).thenReturn(Optional.empty());

        // WHEN
        assertThrows(NotFoundException.class, () -> classUnderTest.noLongerParticipate(id, userId));

        // THEN
        verify(mockSessionRepository, times(1)).findById(0L);
    }
}
