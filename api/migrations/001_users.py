steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE user_table (
                user_id SERIAL PRIMARY KEY NOT NULL,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                profile_picture_url VARCHAR(500) DEFAULT 'https://images.coplusk.net/project_images/208626/image/2019-11-27-210127-burger.jpg'

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE user_table;
        """,
    ]
]
