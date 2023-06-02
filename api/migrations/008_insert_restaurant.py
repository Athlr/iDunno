steps = [
    [
        # "Up" SQL statement
        """
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('McDonalds', '$', 18, 1, TRUE);
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('Burger King', '$', 18, 1, TRUE);
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('Arbys', '$', 18, 1, TRUE);
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('Chick-fil-a', '$', 18, 1, TRUE);
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('Canes', '$', 18, 1, TRUE);
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('Del Taco', '$', 18, 1, TRUE);
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('Panda Express', '$', 18, 1, TRUE);
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('Chipotle', '$', 18, 1, TRUE);
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('Subway', '$', 18, 1, TRUE);
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('Jersey Mikes', '$', 18, 1, TRUE);
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('Carls Jr', '$', 18, 1, TRUE);
        INSERT INTO restaurant (name, price, cuisine_id, user_id, suggested) VALUES ('Wingstop', '$', 18, 1, TRUE);
        """,
        # "Down" SQL statement
        """
        DROP TABLE testingtable;
        """
    ]
]
