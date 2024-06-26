package com.openclassrooms.starterjwt;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class SpringBootSecurityJwtApplicationIntegrationTest {

	@Test
	@Tag("IntegrationTest")
	void contextLoads() {
	}

}
