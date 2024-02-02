package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.services.SessionService;
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
class SessionControllerTest {

    @Mock
    SessionService mockSessionService;

    @Mock
    SessionMapper mockSessionMapper;

    @Mock
    Session mockSession;

    @Mock
    SessionDto mockSessionDto;

    @Mock
    List<Session> mockSessionList;

    @Mock
    List<SessionDto> mockSessionDtoList;

    SessionController classUnderTest;

    @BeforeEach
    public void init() {
        classUnderTest = new SessionController(mockSessionService,mockSessionMapper);
    }

    @AfterEach
    public void undefClassUnderTest() {
        classUnderTest = null;
    }


    @Test
    @Tag("UnitTest")
    void givenId_whenFindById_thenReturnsSession() {
        // GIVEN
        String id = "1";
        when(this.mockSessionService.getById(Long.valueOf(id))).thenReturn(mockSession);
        when(this.mockSessionMapper.toDto(mockSession)).thenReturn(mockSessionDto);

        // WHEN
        ResponseEntity<?> result = classUnderTest.findById(id);

        // WHEN
        verify(this.mockSessionService, times(1)).getById(Long.valueOf(id));
        verify(this.mockSessionMapper,times(1)).toDto(mockSession);
        assertThat(result).isEqualTo(ResponseEntity.ok().body(mockSessionDto));
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenFindById_thenReturnsNotFound() {
        // GIVEN
        String id = "0";
        when(this.mockSessionService.getById(Long.valueOf(id))).thenReturn(null);

        // WHEN
        ResponseEntity<?> result = classUnderTest.findById(id);

        // WHEN
        verify(this.mockSessionService, times(1)).getById(Long.valueOf(id));
        verify(this.mockSessionMapper,times(0)).toDto(any(Session.class));
        assertThat(result).isEqualTo(ResponseEntity.notFound().build());
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenFindById_thenReturnsBadRequest() {
        // GIVEN
        String id = "NotANumber";

        // WHEN
        ResponseEntity<?> result = classUnderTest.findById(id);

        // WHEN
        verify(this.mockSessionService, times(0)).getById(anyLong());
        verify(this.mockSessionMapper,times(0)).toDto(any(Session.class));
        assertThat(result).isEqualTo(ResponseEntity.badRequest().build());
    }

    @Test
    @Tag("UnitTest")
    void whenFindAll_thenReturnsTeachersList() {
        // GIVEN
        when(mockSessionService.findAll()).thenReturn(mockSessionList);
        when(mockSessionMapper.toDto(mockSessionList)).thenReturn(mockSessionDtoList);

        // WHEN
        ResponseEntity<?> result = classUnderTest.findAll();

        // THEN
        verify(mockSessionService, times(1)).findAll();
        verify(mockSessionMapper, times(1)).toDto(mockSessionList);
        assertThat(result).isEqualTo(ResponseEntity.ok().body(mockSessionDtoList));
    }

    @Test
    @Tag("UnitTest")
    void givenSession_whenCreate_thenReturnsSession() {
        // GIVEN
        when(this.mockSessionMapper.toEntity(mockSessionDto)).thenReturn(mockSession);
        when(this.mockSessionService.create(mockSession)).thenReturn(mockSession);
        when(this.mockSessionMapper.toDto(mockSession)).thenReturn(mockSessionDto);

        // WHEN
        ResponseEntity<?> result = classUnderTest.create(mockSessionDto);

        // THEN
        verify(mockSessionMapper, times(1)).toEntity(mockSessionDto);
        verify(mockSessionService, times(1)).create(mockSession);
        verify(mockSessionMapper, times(1)).toDto(mockSession);
        assertThat(result).isEqualTo(ResponseEntity.ok().body(mockSessionDto));
    }

    @Test
    @Tag("UnitTest")
    void givenSession_whenUpdate_thenReturnsSession() {
        // GIVEN
        String id = "1";
        when(this.mockSessionMapper.toEntity(mockSessionDto)).thenReturn(mockSession);
        when(this.mockSessionService.update(Long.valueOf(id), mockSession)).thenReturn(mockSession);
        when(this.mockSessionMapper.toDto(mockSession)).thenReturn(mockSessionDto);

        // WHEN
        ResponseEntity<?> result = classUnderTest.update(id, mockSessionDto);

        // THEN
        verify(mockSessionMapper, times(1)).toEntity(mockSessionDto);
        verify(mockSessionService, times(1)).update(Long.valueOf(id), mockSession);
        verify(mockSessionMapper, times(1)).toDto(mockSession);
        assertThat(result).isEqualTo(ResponseEntity.ok().body(mockSessionDto));
    }

    @Test
    @Tag("UnitTest")
    void givenSession_whenUpdate_thenReturnsBadRequest() {
        // GIVEN
        String id = "NotANumber";

        // WHEN
        ResponseEntity<?> result = classUnderTest.update(id, mockSessionDto);

        // THEN
        verify(mockSessionMapper, times(0)).toEntity(any(SessionDto.class));
        verify(mockSessionService, times(0)).update(anyLong(), any(Session.class));
        verify(mockSessionMapper, times(0)).toDto(any(Session.class));
        assertThat(result).isEqualTo(ResponseEntity.badRequest().build());
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenSave_thenReturnsDelete() {
        // GIVEN
        String id = "1";
        when(this.mockSessionService.getById(Long.valueOf(id))).thenReturn(mockSession);

        // WHEN
        ResponseEntity<?> result = classUnderTest.save(id);

        // WHEN
        verify(this.mockSessionService, times(1)).getById(Long.valueOf(id));
        assertThat(result).isEqualTo(ResponseEntity.ok().build());
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenSave_thenReturnsNotFound() {
        // GIVEN
        String id = "0";
        when(this.mockSessionService.getById(Long.valueOf(id))).thenReturn(null);

        // WHEN
        ResponseEntity<?> result = classUnderTest.save(id);

        // WHEN
        verify(this.mockSessionService, times(1)).getById(Long.valueOf(id));
        assertThat(result).isEqualTo(ResponseEntity.notFound().build());
    }

    @Test
    @Tag("UnitTest")
    void givenId_whenSave_thenReturnsBadRequest() {
        // GIVEN
        String id = "NotANumber";

        // WHEN
        ResponseEntity<?> result = classUnderTest.save(id);

        // WHEN
        verify(this.mockSessionService, times(0)).getById(anyLong());
        assertThat(result).isEqualTo(ResponseEntity.badRequest().build());
    }

    @Test
    @Tag("UnitTest")
    void givenIdAndUserId_whenParticipate_thenReturnsOk() {
        // GIVEN
        String id = "1";
        String userId = "1";
        doNothing().when(mockSessionService).participate(Long.valueOf(id), Long.valueOf(userId));

        // WHEN
        ResponseEntity<?> result = classUnderTest.participate(id, userId);

        // THEN
        verify(mockSessionService, times(1)).participate(
                Long.valueOf(id),
                Long.valueOf(userId)
        );
        assertThat(result).isEqualTo(ResponseEntity.ok().build());
    }

    @Test
    @Tag("UnitTest")
    void givenIdAndUserId_whenParticipate_thenReturnsBadRequest() {
        // GIVEN
        String id = "NotANumber";
        String userId = "NotANumber";

        // WHEN
        ResponseEntity<?> result = classUnderTest.participate(id, userId);

        // THEN
        verify(mockSessionService, times(0)).participate(anyLong(), anyLong());
        assertThat(result).isEqualTo(ResponseEntity.badRequest().build());
    }

    @Test
    @Tag("UnitTest")
    void givenIdAndUserId_whenNoLongerParticipate_thenReturnsOK() {
        // GIVEN
        String id = "1";
        String userId = "1";
        doNothing().when(mockSessionService).noLongerParticipate(Long.valueOf(id), Long.valueOf(userId));

        // WHEN
        ResponseEntity<?> result = classUnderTest.noLongerParticipate(id, userId);

        // THEN
        verify(mockSessionService, times(1)).noLongerParticipate(
                Long.valueOf(id),
                Long.valueOf(userId)
        );
        assertThat(result).isEqualTo(ResponseEntity.ok().build());
    }

    @Test
    @Tag("UnitTest")
    void givenIdAndUserId_whenNoLongerParticipate_thenReturnsBadRequest() {
        // GIVEN
        String id = "NotANumber";
        String userId = "NotANumber";

        // WHEN
        ResponseEntity<?> result = classUnderTest.noLongerParticipate(id, userId);

        // THEN
        verify(mockSessionService, times(0)).noLongerParticipate(anyLong(), anyLong());
        assertThat(result).isEqualTo(ResponseEntity.badRequest().build());
    }
}
