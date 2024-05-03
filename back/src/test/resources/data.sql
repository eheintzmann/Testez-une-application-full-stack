INSERT INTO `USERS` (`last_name`, `first_name`, `admin`, `email`, `password`) VALUES
    ('Admin', 'Admin', true, 'admin@test.com', '$2a$10$.Hsa/ZjUVaHqi0tp9xieMeewrnZxrZ5pQRzddUXE/WjDu2ZThe6Iq'),
    ('User', 'User', false, 'user@test.com', '$2a$10$.Hsa/ZjUVaHqi0tp9xieMeewrnZxrZ5pQRzddUXE/WjDu2ZThe6Iq');

INSERT INTO `TEACHERS` (`last_name`, `first_name`) VALUES
    ('Teacher1', 'Teacher1'),
    ('Teacher2', 'Teacher2');

INSERT INTO `SESSIONS` (`name`, `description`, `date`, `teacher_id`) VALUES
    ('Session1', 'Session 1 by teacher1', '2001-01-01 00:00:00', 1),
    ('Session2', 'Session 2 by teacher1', '2001-01-02 00:00:00', 1);

INSERT INTO `PARTICIPATE` (`user_id`, `session_id`) VALUES (2, 1);


