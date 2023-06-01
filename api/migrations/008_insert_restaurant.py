steps = [
    [
        # "Up" SQL statement
        """
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('McDonalds', '$', 18, 1);
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('Burger King', '$', 18, 1);
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('Arbys', '$', 18, 1);
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('Chick-fil-a', '$', 18, 1);
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('Canes', '$', 18, 1);
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('Del Taco', '$', 18, 1);
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('Panda Express', '$', 18, 1);
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('Chipotle', '$', 18, 1);
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('Subway', '$', 18, 1);
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('Jersey Mikes', '$', 18, 1);
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('Carls Jr', '$', 18, 1);
        INSERT INTO restaurant (name, price, cuisine_id, user_id) VALUES ('Wingstop', '$', 18, 1);
        """,
        # "Down" SQL statement
        """
        DROP TABLE testingtable;
        """
    ]
]
